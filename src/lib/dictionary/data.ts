import { createClient } from "@supabase/supabase-js";
import type {
  ArticleColor,
  CaseRow,
  ConjugationRow,
  DictionaryEntry,
  GrammarTag,
  WordType,
} from "@/components/molecules/Dictionary/types";

/**
 * Supabase-backed data layer for the dictionary.
 *
 * At build time Next.js calls into here from generateStaticParams
 * and each word page's generator. The first call loads all
 * published rows from public.dict_entries into a module-scoped
 * cache; every subsequent getEntryBySlug / getAllSlugs /
 * getTopEntries served from the cache.
 *
 * Runtime search (/api/dict/search) does NOT go through this
 * cache; it hits the dict_search RPC directly, so a freshly
 * published row in the DB shows up in search without a redeploy.
 *
 * Why anon key + no service role: dict_entries has an RLS policy
 * that exposes `published = true` rows to the public role. That's
 * all the web needs. Service-role credentials never ship into the
 * build or the bundle.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

interface DictEntryRow {
  slug: string;
  german: string;
  type: string;
  level: string;
  translation: { english?: string; turkish?: string } | null;
  rule_key: string | null;
  rule: { rule_eng?: string; rule_tr?: string; rule_german?: string } | null;
  themes: string[] | null;
  frequency_rank: number | null;
  details: Record<string, unknown>;
}

let _entriesCache: DictionaryEntry[] | null = null;
let _bySlugCache: Map<string, DictionaryEntry> | null = null;

function makeClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

/** Load every published entry from Supabase once per build/boot. */
async function loadAll(): Promise<DictionaryEntry[]> {
  if (_entriesCache) return _entriesCache;
  const supabase = makeClient();
  if (!supabase) {
    _entriesCache = [];
    _bySlugCache = new Map();
    return _entriesCache;
  }
  // Pull in chunks so the Supabase 1000-row default limit doesn't
  // silently truncate once we grow past a thousand published rows.
  const CHUNK = 1000;
  let from = 0;
  const all: DictEntryRow[] = [];
  while (true) {
    const { data, error } = await supabase
      .from("dict_entries")
      .select(
        "slug, german, type, level, translation, rule_key, rule, themes, frequency_rank, details",
      )
      .eq("published", true)
      .order("frequency_rank", { ascending: true, nullsFirst: false })
      .order("slug", { ascending: true })
      .range(from, from + CHUNK - 1);
    if (error) {
      // Let the build see the error rather than render a blank
      // dictionary silently.
      throw new Error(`dict_entries fetch failed: ${error.message}`);
    }
    const rows = (data ?? []) as DictEntryRow[];
    all.push(...rows);
    if (rows.length < CHUNK) break;
    from += CHUNK;
  }
  _entriesCache = all.map(transformRow);
  _bySlugCache = new Map(_entriesCache.map((e) => [e.slug, e]));
  return _entriesCache;
}

export async function getAllEntries(): Promise<DictionaryEntry[]> {
  return loadAll();
}

export async function getAllSlugs(): Promise<string[]> {
  const all = await loadAll();
  return all.map((e) => e.slug);
}

export async function getEntryBySlug(
  slug: string,
): Promise<DictionaryEntry | null> {
  await loadAll();
  return _bySlugCache?.get(slug) ?? null;
}

/** Top N entries by frequency_rank for the popular grid. */
export async function getTopEntries(limit = 6): Promise<DictionaryEntry[]> {
  const all = await loadAll();
  return all.slice(0, limit);
}

/** Canonical entry of a given article (der/die/das), picked as
 *  the top-ranked noun of that gender in the published set. */
export async function getCanonicalForArticle(
  article: ArticleColor,
): Promise<DictionaryEntry | null> {
  const all = await loadAll();
  return (
    all.find((e) => e.type === "noun" && e.noun?.article === article) ??
    null
  );
}

/** Stat triple shown in the landing stat chip row:
 *  word_count · example_count · rule_count. Cached per build. */
export interface DictionaryStats {
  wordCount: number;
  exampleCount: number;
  ruleCount: number;
}

let _statsCache: DictionaryStats | null = null;

export async function getDictionaryStats(): Promise<DictionaryStats> {
  if (_statsCache) return _statsCache;
  const entries = await loadAll();
  const wordCount = entries.length;
  const exampleCount = entries.reduce(
    (sum, e) => sum + e.leveledExamples.length,
    0,
  );
  const supabase = makeClient();
  let ruleCount = 0;
  if (supabase) {
    const { count } = await supabase
      .from("grammar_rules")
      .select("*", { count: "exact", head: true });
    ruleCount = count ?? 0;
  }
  _statsCache = { wordCount, exampleCount, ruleCount };
  return _statsCache;
}

/** Deterministic daily pick: hash YYYY-MM-DD (UTC) → modulo
 *  entries count. Same word for every visitor on the same day. */
export async function getWordOfTheDay(): Promise<DictionaryEntry | null> {
  const entries = await loadAll();
  if (entries.length === 0) return null;
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  return entries[Math.abs(hash) % entries.length];
}

/* ================================================================ *
 *  Row transform: dict_entries row → DictionaryEntry                *
 * ================================================================ */

function transformRow(row: DictEntryRow): DictionaryEntry {
  const d = row.details ?? {};
  const type = mapType(row.type);
  const entry: DictionaryEntry = {
    slug: row.slug,
    german: row.german,
    type,
    level: row.level as DictionaryEntry["level"],
    translations: {
      english: row.translation?.english,
      turkish: row.translation?.turkish,
    },
    rule: row.rule
      ? {
          english: row.rule.rule_eng,
          turkish: row.rule.rule_tr,
          german: row.rule.rule_german,
        }
      : undefined,
    tags: buildTags(row.type, d),
    leveledExamples: mapLeveledExamples(d["leveled_examples"]),
    collocations: mapCollocations(d["collocations"]),
  };

  if (row.type === "noun") {
    const article = (d["article"] as string | null) ?? null;
    if (article === "der" || article === "die" || article === "das") {
      entry.noun = {
        article,
        plural: (d["plural"] as string | undefined) ?? undefined,
        noPluralMarker: !d["plural"],
        nDeclension: Boolean(d["n_declension"]),
        declension: mapNounDeclension(d["declension"]),
      };
    }
  } else if (row.type === "verb") {
    const conj = (d["conjugation"] as Record<string, unknown> | undefined) ?? {};
    entry.verb = {
      auxiliary:
        d["auxiliary"] === "haben" || d["auxiliary"] === "sein"
          ? (d["auxiliary"] as "haben" | "sein")
          : undefined,
      perfektForm: (d["perfekt_form"] as string | undefined) ?? undefined,
      present: mapConjugation(conj["present"]),
      praeteritum: mapConjugation(conj["praeteritum"]),
      separablePrefix:
        (d["separable_prefix"] as string | undefined) ?? undefined,
    };
  } else if (row.type === "adjective") {
    entry.adjective = {
      positive: row.german,
      komparativ: (d["komparativ"] as string | undefined) ?? undefined,
      superlativ: (d["superlativ"] as string | undefined) ?? undefined,
    };
  }

  return entry;
}

function mapType(raw: string): WordType {
  if (raw === "noun") return "noun";
  if (raw === "verb") return "verb";
  if (raw === "adjective") return "adjective";
  if (raw === "adverb") return "adverb";
  return "other";
}

function mapLeveledExamples(
  raw: unknown,
): DictionaryEntry["leveledExamples"] {
  if (!Array.isArray(raw)) return [];
  const out: DictionaryEntry["leveledExamples"] = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    const de = r.de;
    const level = r.level;
    if (typeof de !== "string" || typeof level !== "string") continue;
    out.push({
      de,
      en: typeof r.en === "string" ? r.en : undefined,
      tr: typeof r.tr === "string" ? r.tr : undefined,
      level: level as DictionaryEntry["leveledExamples"][number]["level"],
    });
  }
  return out;
}

function mapCollocations(
  raw: unknown,
): DictionaryEntry["collocations"] {
  if (!Array.isArray(raw)) return undefined;
  const out: DictionaryEntry["collocations"] = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    const de = r.de;
    if (typeof de !== "string") continue;
    out.push({
      de,
      en: typeof r.en === "string" ? r.en : undefined,
      tr: typeof r.tr === "string" ? r.tr : undefined,
    });
  }
  return out.length > 0 ? out : undefined;
}

const NOUN_CASE_ORDER: Array<[string, string, string]> = [
  ["nom", "Nominativ", "Wer?"],
  ["akk", "Akkusativ", "Wen?"],
  ["dat", "Dativ", "Wem?"],
  ["gen", "Genitiv", "Wessen?"],
];

function mapNounDeclension(raw: unknown): CaseRow[] | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const d = raw as Record<string, unknown>;
  const rows: CaseRow[] = [];
  for (const [key, label, question] of NOUN_CASE_ORDER) {
    const entry = d[key];
    if (!entry || typeof entry !== "object") continue;
    const e = entry as Record<string, unknown>;
    const def = typeof e.def === "string" ? e.def : "";
    const indef = typeof e.indef === "string" ? e.indef : "";
    if (!def && !indef) continue;
    rows.push({
      label,
      question,
      definite: def,
      indefinite: indef,
      plural: typeof e.pl === "string" ? e.pl : undefined,
    });
  }
  return rows.length > 0 ? rows : undefined;
}

const CONJ_PRONOUN_ORDER = [
  "ich",
  "du",
  "er/sie/es",
  "wir",
  "ihr",
  "sie/Sie",
] as const;

function mapConjugation(raw: unknown): ConjugationRow[] | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const c = raw as Record<string, unknown>;
  const rows: ConjugationRow[] = [];
  for (const p of CONJ_PRONOUN_ORDER) {
    const form = c[p];
    if (typeof form !== "string" || form.length === 0) continue;
    rows.push({ pronoun: p, form });
  }
  return rows.length > 0 ? rows : undefined;
}

/* ================================================================ *
 *  Grammar tags                                                     *
 * ================================================================ */

interface TagSpec {
  label: string;
  tone: GrammarTag["tone"];
}

/**
 * Label map for DB-sourced tag strings. Nothing on this surface
 * writes an explanation: the app/site never computes grammar,
 * and any text we invented here would be an unverified gloss on
 * a real linguistic fact. The pills stand as labels only; when a
 * rule exists for the word, it comes from public.words.rule in
 * the DB (shown as the WordCard rule pill).
 */
const CASE_TAG_MAP: Record<string, TagSpec> = {
  regular: { label: "Regular", tone: "ok" },
  irregular: { label: "Irregular", tone: "danger" },
  separable: { label: "Separable", tone: "warn" },
  inseparable: { label: "Inseparable", tone: "info" },
  accusative: { label: "+ Akkusativ", tone: "info" },
  dative: { label: "+ Dativ", tone: "info" },
  genitive: { label: "+ Genitiv", tone: "info" },
  reflexive: { label: "Reflexive", tone: "info" },
  modal: { label: "Modal", tone: "info" },
};

function buildTags(type: string, d: Record<string, unknown>): GrammarTag[] {
  const tags: GrammarTag[] = [];
  const seen = new Set<string>();

  // DB-sourced grammatical tag strings: details.cases
  // ("regular", "irregular", "separable", "accusative", ...).
  const rawCases = Array.isArray(d.cases) ? (d.cases as unknown[]) : [];
  for (const raw of rawCases) {
    if (typeof raw !== "string") continue;
    const key = raw.toLowerCase();
    const spec = CASE_TAG_MAP[key];
    if (!spec || seen.has(key)) continue;
    seen.add(key);
    tags.push({ key, label: spec.label, tone: spec.tone });
  }

  // Noun gender, read straight from details.article. The label
  // reports what the DB says; no commentary.
  if (type === "noun") {
    const article = d.article;
    if (article === "der" && !seen.has("masculine")) {
      tags.push({ key: "masculine", label: "Masculine", tone: "info" });
      seen.add("masculine");
    } else if (article === "die" && !seen.has("feminine")) {
      tags.push({ key: "feminine", label: "Feminine", tone: "danger" });
      seen.add("feminine");
    } else if (article === "das" && !seen.has("neuter")) {
      tags.push({ key: "neuter", label: "Neuter", tone: "ok" });
      seen.add("neuter");
    }
    if (d.n_declension === true && !seen.has("n-declension")) {
      tags.push({ key: "n-declension", label: "n-Deklination", tone: "warn" });
      seen.add("n-declension");
    }
  }

  // Verb auxiliary signal.
  if (type === "verb") {
    const aux = d.auxiliary;
    if (aux === "sein" && !seen.has("aux-sein")) {
      tags.push({ key: "aux-sein", label: "+ sein", tone: "info" });
      seen.add("aux-sein");
    }
  }

  return tags;
}
