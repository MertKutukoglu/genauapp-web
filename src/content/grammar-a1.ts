/**
 * Grammar — A1 deck (20 items). Verbatim port of
 * claude/GenauApp_Web_Try_Grammar_Content_A1.md §2, with `tr`
 * overlays carrying the Turkish copy per the same localization
 * pattern used by WORDS_A1.
 *
 * Shape (summary — full spec in the content doc):
 *   - 5 anchor questions (one per topic) carry a `learn` block and
 *     drive the Learn deck. The remaining 15 are exercise-only drills
 *     that share the anchor's `topic`.
 *   - `exerciseType` is `multipleChoice` (12 items) or `fillBlank`
 *     (8 items).
 *   - `learn.layout` dispatches to one of four Learn-card layouts:
 *     verbParadigm, pronounChart, articleSingle (one per article —
 *     der / die / das get their own card each), verbConjugation.
 *   - `sample.highlight` is a substring of `sample.de`; the renderer
 *     wraps it in grammar-purple bold inside the sunk sample card.
 *
 * Localization:
 *   German data — the verb, pronoun forms, article strings,
 *   sample.de, highlight substring, prompt, option tokens, answer —
 *   is locale-agnostic. The TR overlay translates only the
 *   learner-facing English copy: the English gloss above a paradigm,
 *   the role labels on article cards, the English column of the
 *   pronoun chart, sample.en, hint, options text for translation-style
 *   MCs (none here — Grammar MCs pick German tokens, no translation),
 *   and the explanation shown in the Incorrect banner.
 */

import type { Locale } from "@/lib/i18n/config";

export type GrammarExerciseType = "multipleChoice" | "fillBlank";

export type GrammarLearnLayout =
  | "verbParadigm"
  | "pronounChart"
  | "articleSingle"
  | "verbConjugation"
  // A2 layouts — see GenauApp_Web_Try_Grammar_Content_A2.md §2:
  | "participleParadigm"
  | "verbCards"
  | "articleCards";

/** A verb paradigm row: pronoun → fully-conjugated form. */
export interface ParadigmForm {
  pronoun: string;
  form: string;
}

/** A pronoun-chart row: German pronoun → English gloss. */
export interface PronounForm {
  german: string;
  english: string;
}

/**
 * One suffix → example row inside an article card. `suffix` is the
 * ending (e.g. "-ung"); `example` is the German noun that shows the
 * pattern in action (e.g. "Zeitung"); `gloss` carries both locale
 * translations so the card can show the English or Turkish meaning
 * in italic next to the example — vocab reinforcement folded into
 * the grammar lesson, since the learner otherwise has to guess what
 * "Honig" or "Freundschaft" means.
 *
 * Both locale strings live on the pattern itself (not in a parallel
 * TR overlay) so the translator sees the pairing in one place and
 * can't drift the arrays apart by index.
 */
export interface ArticleSuffixPattern {
  suffix: string;
  example: string;
  gloss: { en: string; tr: string };
}

/**
 * Legacy three-column article-card spec (unused by the live deck; the
 * live Grammar deck uses three dedicated `articleSingle` cards
 * instead). Kept exported for anyone pulling the type for a different
 * surface, and for the stories that still exercise the data shape.
 */
export interface ArticleCardSpec {
  article: "der" | "die" | "das";
  role: string;
  patterns: ArticleSuffixPattern[];
}

/** A regular-verb conjugation row: pronoun → stem + ending (split). */
export interface ConjugationForm {
  pronoun: string;
  stem: string;
  ending: string;
}

/**
 * A2 `participleParadigm` row: infinitive → aux + Partizip II.
 * Three locale-neutral German cells; the card renders a 3-column
 * table (infinitive muted, aux purple, participle bold).
 */
export interface ParticipleForm {
  infinitive: string;
  aux: "hat" | "ist";
  partizip: string;
}

/**
 * A2 `verbCards` row: one separable verb (infinitive + sample + a
 * short English gloss). Kept exported for anyone pulling the type
 * for a different surface; the live Trennbare Verben anchor uses
 * the prefix-carousel shape (`SeparablePrefix`) below instead.
 */
export interface SeparableVerb {
  infinitive: string;
  example: string;
  english: string;
}

/**
 * A2 `verbCards` prefix-carousel entry: one separable prefix with
 * a handful of sample verbs that use it and a one-line rule. The
 * renderer walks the twelve prefixes (ab-, an-, auf-, aus-, bei-,
 * ein-, los-, mit-, nach-, vor-, weg-, zu-) with chevron taps or
 * ← → — same pattern as the Modalverben carousel, so the learner
 * learns the interaction once per chip.
 */
export interface SeparablePrefix {
  /** The prefix with trailing hyphen (`"ab-"`, `"ein-"`). */
  prefix: string;
  /** 3-5 verbs built on this prefix (`"abfahren"`, `"ablegen"`). */
  samples: string[];
  /** One-line rule: what the prefix roughly means + one example of
   *  it separated in a main clause. Shown in the purple RuleCard
   *  below the sample-words tile. Supports `**bold**` markdown. */
  rule: string;
}

/**
 * One paradigm inside a carousel-style `verbParadigm` anchor. Used
 * by the A2 Modalverben anchor so a single card walks the learner
 * through müssen → können → möchten → wollen → dürfen → sollen via
 * chevron taps (or arrow keys) instead of five extra anchor cards.
 *
 * The outer `GrammarLearnBlock.variants[]` holds all of these; the
 * card renders the active index and the shared `note` beneath. The
 * top-level `verb` / `english` / `forms` / `sample` fields stay as
 * single-paradigm anchors' source of truth — when `variants` is
 * present the card ignores them.
 */
export interface VerbParadigmVariant {
  verb: string;
  english: string;
  forms: ParadigmForm[];
  sample: GrammarSample;
}

/**
 * A2 `articleCards` row: one article with Nominativ + Akkusativ
 * forms side by side. `change: true` on the masculine card flags
 * the only case where the article visibly changes (der → den) so
 * the renderer can underline it.
 */
export interface ArticleCaseForm {
  article: "der" | "die" | "das";
  role: string;
  nom: { de: string; en: string };
  akk: { de: string; en: string };
  change?: boolean;
}

/**
 * A2 `pronounChart` (extended) row: a pronoun with its Akkusativ
 * and Dativ forms, plus an English gloss. The chart's `columns`
 * field signals this case-table variant; without it, the chart
 * falls back to A1's 2-column pronoun → English rendering.
 */
export interface PronounCaseForm {
  german: string;
  akk: string;
  dat: string;
  english: string;
}

export interface GrammarSample {
  de: string;
  en: string;
  /** Substring of `de` to render purple/bold inside the sample card. */
  highlight: string;
}

export interface GrammarLearnBlock {
  layout: GrammarLearnLayout;
  /** verbParadigm + verbConjugation. */
  verb?: string;
  /** Gloss for the headline: verbs use their English infinitive;
   *  pronounChart uses a short subtitle. */
  english?: string;
  /** pronounChart headline (big title). */
  headline?: string;
  /** verbParadigm forms (6 rows). A2 adds ParticipleForm (for
   *  `participleParadigm`) and PronounCaseForm (for the extended
   *  `pronounChart` with `columns`). */
  forms?:
    | ParadigmForm[]
    | ConjugationForm[]
    | PronounForm[]
    | ParticipleForm[]
    | PronounCaseForm[];
  /** articleSingle: which article this card teaches. */
  article?: "der" | "die" | "das";
  /** articleSingle: localized role label (masculine/feminine/neuter). */
  role?: string;
  /** articleSingle: suffix → example rows that reliably predict this
   *  article at A1. */
  patterns?: ArticleSuffixPattern[];
  /** verbConjugation standalone rule paragraph. A2 reuses the same
   *  field for a one-line note on every anchor, rendered in a
   *  purple-tinted RuleCard below the paradigm/cards/chart. */
  note?: string;
  /** A2 `verbCards`: 3–4 separable verbs rendered side by side.
   *  Kept for anyone pulling the old shape; the live A2 anchor uses
   *  the prefix-carousel field below. */
  verbs?: SeparableVerb[];
  /** A2 `verbCards` prefix carousel: 12 separable prefixes walked
   *  with chevrons + arrow keys. Replaces `verbs` on the Trennbare
   *  Verben anchor so the anchor teaches the whole family at once
   *  (one prefix per step) instead of four verbs side by side. */
  prefixes?: SeparablePrefix[];
  /** A2 `articleCards`: 3 article cards with Nominativ + Akkusativ
   *  forms side by side. Distinct from the legacy `patterns` field
   *  on `articleSingle`. */
  articles?: ArticleCaseForm[];
  /** A2 extended `pronounChart`: column headers for the 3-col case
   *  table (`["Nominativ", "Akkusativ", "Dativ"]`). When absent,
   *  the chart renders A1's 2-column pronoun → English layout. */
  columns?: string[];
  /** A2 carousel-style `verbParadigm`: when present, the card
   *  renders a chevron pair next to the verb and cycles through the
   *  variants. Lets one anchor teach a family of paradigms (all six
   *  modals in one card). When set, the top-level `verb/english/
   *  forms/sample` fields are ignored by the renderer. */
  variants?: VerbParadigmVariant[];
  /**
   * articleSingle "by meaning" rule paragraph — the semantic
   * categories that take this article (Days/months → der,
   * Trees/flowers → die, Diminutives → das, etc.). Rendered in the
   * shared RuleCard with the article's own tint.
   */
  rule?: string;
  sample: GrammarSample;
}

/** Per-locale overlay for the English-facing fields of a GrammarQuestion. */
export interface GrammarLocaleOverlay {
  hint?: string;
  explanation?: string;
  options?: string[]; // only when the MC is translation-based (unused in Grammar A1 but kept for parity)
  learn?: {
    /** Verb gloss for verbParadigm/verbConjugation headlines. */
    english?: string;
    /** Headline for pronounChart. */
    headline?: string;
    /** Note paragraph for verbConjugation. */
    note?: string;
    /** "By meaning" rule paragraph for articleSingle. */
    rule?: string;
    /** articleSingle localized role label (masculine → eril). */
    role?: string;
    /** Pronoun-chart English column translations (same order as forms). */
    pronounGlosses?: string[];
    sample?: { en?: string };
    /**
     * A2 carousel-style `verbParadigm`: per-variant translations.
     * Same length and order as `learn.variants`. Only the
     * learner-facing English fields need overlaying; the paradigm
     * cells stay German across locales.
     */
    variants?: Array<{
      english?: string;
      sample?: { en?: string };
    }>;
    /**
     * A2 prefix-carousel `verbCards`: per-prefix rule translation.
     * Same length and order as `learn.prefixes`. Only `rule` needs
     * swapping; `prefix` + `samples` stay German across locales.
     */
    prefixes?: Array<{ rule?: string }>;
  };
}

export interface GrammarQuestion {
  topic: string;
  exerciseType: GrammarExerciseType;
  prompt: string;
  hint: string;
  explanation: string;
  options?: string[];
  correctIndex?: number;
  answer?: string;
  /** Only on the 5 anchor questions. */
  learn?: GrammarLearnBlock;
  /** Turkish overlay — same shape as the EN learner copy. */
  tr?: GrammarLocaleOverlay;
}

/**
 * Normalize a German answer string for case-insensitive, umlaut-folded
 * comparison on the fillBlank exercise. Keep in sync with the Words
 * typing normalizer so the two chips behave the same on edge cases.
 */
export function normalizeDE(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss");
}

export const GRAMMAR_A1: GrammarQuestion[] = [
  // 1 — Anchor: Verb sein
  {
    topic: "Verb sein",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbParadigm",
      verb: "sein",
      english: "to be",
      forms: [
        { pronoun: "ich", form: "bin" },
        { pronoun: "du", form: "bist" },
        { pronoun: "er / sie / es", form: "ist" },
        { pronoun: "wir", form: "sind" },
        { pronoun: "ihr", form: "seid" },
        { pronoun: "sie / Sie", form: "sind" },
      ],
      sample: { de: "Ich bin Student.", en: "I am a student.", highlight: "bin" },
    },
    prompt: "Ich ___ Student.",
    hint: "I am a student.",
    options: ["bin", "bist", "ist"],
    correctIndex: 0,
    explanation: "sein, 1st person singular.",
    tr: {
      hint: "Öğrenciyim.",
      explanation: "sein, tekil 1. kişi.",
      learn: {
        english: "olmak",
        sample: { en: "Öğrenciyim." },
      },
    },
  },
  // 2 — Anchor: Verb haben
  {
    topic: "Verb haben",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbParadigm",
      verb: "haben",
      english: "to have",
      forms: [
        { pronoun: "ich", form: "habe" },
        { pronoun: "du", form: "hast" },
        { pronoun: "er / sie / es", form: "hat" },
        { pronoun: "wir", form: "haben" },
        { pronoun: "ihr", form: "habt" },
        { pronoun: "sie / Sie", form: "haben" },
      ],
      sample: { de: "Wir haben eine Katze.", en: "We have a cat.", highlight: "haben" },
    },
    prompt: "Wir ___ eine Katze.",
    hint: "We have a cat.",
    options: ["haben", "habe", "hat"],
    correctIndex: 0,
    explanation: "haben, 1st person plural.",
    tr: {
      hint: "Bir kedimiz var.",
      explanation: "haben, çoğul 1. kişi.",
      learn: {
        english: "sahip olmak",
        sample: { en: "Bir kedimiz var." },
      },
    },
  },
  // 3 — Anchor: Pronouns
  {
    topic: "Pronouns",
    exerciseType: "multipleChoice",
    learn: {
      layout: "pronounChart",
      headline: "Personal pronouns",
      english: "who's doing what",
      forms: [
        { german: "ich", english: "I" },
        { german: "du", english: "you" },
        { german: "er", english: "he" },
        { german: "sie", english: "she / they" },
        { german: "es", english: "it" },
        { german: "wir", english: "we" },
        { german: "ihr", english: "you (plural)" },
        { german: "Sie", english: "you (formal)" },
      ],
      sample: { de: "Er ist mein Vater.", en: "He is my father.", highlight: "Er" },
    },
    prompt: "___ ist mein Vater.",
    hint: "He is my father.",
    options: ["Er", "Sie", "Es"],
    correctIndex: 0,
    explanation: "Personal pronoun, male referent.",
    tr: {
      hint: "O (erkek) babam.",
      explanation: "Kişi zamiri, erkek özne.",
      learn: {
        headline: "Kişi zamirleri",
        english: "kim ne yapıyor",
        pronounGlosses: [
          "ben",
          "sen",
          "o (erkek)",
          "o (kadın) / onlar",
          "o (nötr)",
          "biz",
          "siz",
          "siz (resmî)",
        ],
        sample: { en: "O babam." },
      },
    },
  },
  // 4 — Anchor: Articles — der
  //
  // Three per-article anchors in authored order (der → die → das).
  // Each one teaches that article's reliable suffix set in the sunk
  // pattern panel and adds a shared RuleCard body carrying the
  // "by meaning" semantic categories (what else takes that article
  // beyond the ending signals). Suffix set is faithful to the
  // standard A1 cheat sheet: der 7 endings, die 11 endings, das 5.
  {
    topic: "Articles (der)",
    exerciseType: "multipleChoice",
    learn: {
      layout: "articleSingle",
      article: "der",
      role: "masculine",
      patterns: [
        { suffix: "-ig", example: "Honig", gloss: { en: "honey", tr: "bal" } },
        { suffix: "-ling", example: "Schmetterling", gloss: { en: "butterfly", tr: "kelebek" } },
        { suffix: "-ismus", example: "Optimismus", gloss: { en: "optimism", tr: "iyimserlik" } },
        { suffix: "-or", example: "Motor", gloss: { en: "engine", tr: "motor" } },
        { suffix: "-ant", example: "Elefant", gloss: { en: "elephant", tr: "fil" } },
        { suffix: "-ich", example: "Teppich", gloss: { en: "carpet", tr: "halı" } },
        { suffix: "-er", example: "Lehrer", gloss: { en: "teacher", tr: "öğretmen" } },
      ],
      rule: "Days, months and seasons; weather; directions; alcoholic drinks; car brands are also masculine.",
      sample: {
        de: "Der Lehrer ist neu.",
        en: "The teacher is new.",
        highlight: "Der",
      },
    },
    prompt: "___ Lehrer ist neu.",
    hint: "The teacher is new.",
    options: ["Der", "Die", "Das"],
    correctIndex: 0,
    explanation: '"Lehrer" ends in -er → der.',
    tr: {
      hint: "Öğretmen yeni.",
      explanation: '"Lehrer" -er ile biter → der.',
      learn: {
        role: "eril",
        rule: "Gün, ay ve mevsimler; hava olayları; yönler; alkollü içecekler; araba markaları da erildir.",
        sample: { en: "Öğretmen yeni." },
      },
    },
  },
  // 5 — Anchor: Articles — die
  {
    topic: "Articles (die)",
    exerciseType: "multipleChoice",
    learn: {
      layout: "articleSingle",
      article: "die",
      role: "feminine",
      patterns: [
        { suffix: "-ung", example: "Zeitung", gloss: { en: "newspaper", tr: "gazete" } },
        { suffix: "-heit", example: "Freiheit", gloss: { en: "freedom", tr: "özgürlük" } },
        { suffix: "-keit", example: "Höflichkeit", gloss: { en: "politeness", tr: "nezaket" } },
        { suffix: "-schaft", example: "Freundschaft", gloss: { en: "friendship", tr: "arkadaşlık" } },
        { suffix: "-ei", example: "Bäckerei", gloss: { en: "bakery", tr: "fırın" } },
        { suffix: "-in", example: "Studentin", gloss: { en: "student (f)", tr: "öğrenci (kadın)" } },
        { suffix: "-ion", example: "Station", gloss: { en: "station", tr: "istasyon" } },
        { suffix: "-ität", example: "Universität", gloss: { en: "university", tr: "üniversite" } },
        { suffix: "-ik", example: "Musik", gloss: { en: "music", tr: "müzik" } },
        { suffix: "-ur", example: "Natur", gloss: { en: "nature", tr: "doğa" } },
        { suffix: "-e", example: "Lampe", gloss: { en: "lamp", tr: "lamba" } },
      ],
      rule: "Numbers; trees and flowers; ships and aircraft are also feminine.",
      sample: {
        de: "Die Zeitung ist neu.",
        en: "The newspaper is new.",
        highlight: "Die",
      },
    },
    prompt: "___ Zeitung ist neu.",
    hint: "The newspaper is new.",
    options: ["Der", "Die", "Das"],
    correctIndex: 1,
    explanation: '"Zeitung" ends in -ung → die.',
    tr: {
      hint: "Gazete yeni.",
      explanation: '"Zeitung" -ung ile biter → die.',
      learn: {
        role: "dişil",
        rule: "Sayılar; ağaç ve çiçek isimleri; gemi ve uçak isimleri de dişildir.",
        sample: { en: "Gazete yeni." },
      },
    },
  },
  // 6 — Anchor: Articles — das
  {
    topic: "Articles (das)",
    exerciseType: "multipleChoice",
    learn: {
      layout: "articleSingle",
      article: "das",
      role: "neuter",
      patterns: [
        { suffix: "-chen", example: "Mädchen", gloss: { en: "girl", tr: "kız çocuk" } },
        { suffix: "-lein", example: "Fräulein", gloss: { en: "young woman", tr: "genç kız" } },
        { suffix: "-ment", example: "Dokument", gloss: { en: "document", tr: "belge" } },
        { suffix: "-um", example: "Zentrum", gloss: { en: "center", tr: "merkez" } },
        { suffix: "-ma", example: "Thema", gloss: { en: "topic", tr: "konu" } },
      ],
      rule: "Infinitives used as nouns (das Essen, das Lesen); colors (das Blau); metals (das Gold); fractions (das Drittel) are also neuter.",
      sample: {
        de: "Das Mädchen ist nett.",
        en: "The girl is kind.",
        highlight: "Das",
      },
    },
    prompt: "___ Mädchen ist nett.",
    hint: "The girl is kind.",
    options: ["Der", "Die", "Das"],
    correctIndex: 2,
    explanation: '"Mädchen" ends in -chen → das.',
    tr: {
      hint: "Kız çocuk kibar.",
      explanation: '"Mädchen" -chen ile biter → das.',
      learn: {
        role: "nötr",
        rule: "İsimleştirilmiş mastarlar (das Essen, das Lesen); renkler (das Blau); metaller (das Gold); kesirler (das Drittel) de nötrdür.",
        sample: { en: "Kız çocuk kibar." },
      },
    },
  },
  // 5 — Anchor: Regular verbs
  {
    topic: "Regular verbs",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbConjugation",
      verb: "gehen",
      english: "to go",
      note: "Regular verbs use six endings on a stable stem.",
      forms: [
        { pronoun: "ich", stem: "geh", ending: "e" },
        { pronoun: "du", stem: "geh", ending: "st" },
        { pronoun: "er / sie / es", stem: "geh", ending: "t" },
        { pronoun: "wir", stem: "geh", ending: "en" },
        { pronoun: "ihr", stem: "geh", ending: "t" },
        { pronoun: "sie / Sie", stem: "geh", ending: "en" },
      ],
      sample: { de: "Sie gehen nach Hause.", en: "They are going home.", highlight: "gehen" },
    },
    prompt: "Sie ___ nach Hause.",
    hint: "They are going home.",
    options: ["gehen", "gehst", "gehe"],
    correctIndex: 0,
    explanation: "Regular verb, 3rd person plural (sie).",
    tr: {
      hint: "Eve gidiyorlar.",
      explanation: "Düzenli fiil, çoğul 3. kişi (sie).",
      learn: {
        english: "gitmek",
        note: "Düzenli fiiller sabit bir kök üzerine altı farklı ek alır.",
        sample: { en: "Eve gidiyorlar." },
      },
    },
  },

  // 6–20 — drill-only (no learn block). Translations cover hint + explanation.
  {
    topic: "Verb sein",
    exerciseType: "fillBlank",
    prompt: "Du ___ freundlich.",
    answer: "bist",
    explanation: "sein, 2nd person singular: du bist.",
    hint: "You are friendly.",
    tr: { hint: "Arkadaş canlısısın.", explanation: "sein, tekil 2. kişi: du bist." },
  },
  {
    topic: "Verb sein",
    exerciseType: "multipleChoice",
    prompt: "Wir ___ müde.",
    options: ["sind", "seid", "ist", "bin"],
    correctIndex: 0,
    explanation: "sein, 1st person plural: wir sind.",
    hint: "We are tired.",
    tr: { hint: "Yorgunuz.", explanation: "sein, çoğul 1. kişi: wir sind." },
  },
  {
    topic: "Verb sein",
    exerciseType: "fillBlank",
    prompt: "Ihr ___ Studenten.",
    answer: "seid",
    explanation: "sein, 2nd person plural: ihr seid.",
    hint: "You (plural) are students.",
    tr: { hint: "(Siz) öğrencisiniz.", explanation: "sein, çoğul 2. kişi: ihr seid." },
  },
  {
    topic: "Verb haben",
    exerciseType: "fillBlank",
    prompt: "Ich ___ einen Hund.",
    answer: "habe",
    explanation: "haben, 1st person singular: ich habe.",
    hint: "I have a dog.",
    tr: { hint: "Bir köpeğim var.", explanation: "haben, tekil 1. kişi: ich habe." },
  },
  {
    topic: "Verb haben",
    exerciseType: "multipleChoice",
    prompt: "Du ___ ein Problem?",
    options: ["hast", "habt", "haben", "hat"],
    correctIndex: 0,
    explanation: "haben, 2nd person singular: du hast.",
    hint: "Do you have a problem?",
    tr: { hint: "Bir sorunun mu var?", explanation: "haben, tekil 2. kişi: du hast." },
  },
  {
    topic: "Verb haben",
    exerciseType: "fillBlank",
    prompt: "Ihr ___ viele Bücher.",
    answer: "habt",
    explanation: "haben, 2nd person plural: ihr habt.",
    hint: "You (plural) have many books.",
    tr: { hint: "(Siz) birçok kitabınız var.", explanation: "haben, çoğul 2. kişi: ihr habt." },
  },
  {
    topic: "Pronouns",
    exerciseType: "multipleChoice",
    prompt: "___ ist meine Mutter.",
    options: ["Sie", "Er", "Es", "Ihr"],
    correctIndex: 0,
    explanation: '"Sie" (she, singular) stands for a female person.',
    hint: "She is my mother.",
    tr: {
      hint: "O (kadın) annem.",
      explanation: '"Sie" (tekil "o") kadın bir kişi için kullanılır.',
    },
  },
  {
    topic: "Pronouns",
    exerciseType: "fillBlank",
    prompt: "___ wohnen in Berlin.",
    answer: "Wir",
    explanation: '"Wir" means "we", used for 1st person plural.',
    hint: "We live in Berlin.",
    tr: { hint: "Berlin'de yaşıyoruz.", explanation: '"Wir" "biz" demektir; çoğul 1. kişi.' },
  },
  {
    topic: "Pronouns",
    exerciseType: "multipleChoice",
    prompt: "___ spielt im Garten.",
    options: ["Es", "Er", "Sie", "Ihr"],
    correctIndex: 0,
    explanation: '"Es" (it) stands for neuter nouns like "das Kind".',
    hint: "It plays in the garden.",
    tr: {
      hint: "Bahçede oynuyor.",
      explanation: '"Es" ("o" nötr) nötr isimler için kullanılır, örn. "das Kind".',
    },
  },
  {
    topic: "Articles (der / die / das)",
    exerciseType: "multipleChoice",
    prompt: "___ Frau ist Lehrerin.",
    options: ["die", "der", "das", "dem"],
    correctIndex: 0,
    explanation: '"Frau" is feminine → die.',
    hint: "The woman is a teacher.",
    tr: { hint: "Kadın öğretmen.", explanation: '"Frau" dişildir → die.' },
  },
  {
    topic: "Articles (der / die / das)",
    exerciseType: "fillBlank",
    prompt: "___ Mann kommt spät.",
    answer: "Der",
    explanation: '"Mann" is masculine → der (capitalised at sentence start).',
    hint: "The man is coming late.",
    tr: {
      hint: "Adam geç geliyor.",
      explanation: '"Mann" erildir → der (cümle başında büyük harfle).',
    },
  },
  {
    topic: "Articles (der / die / das)",
    exerciseType: "multipleChoice",
    prompt: "___ Auto ist rot.",
    options: ["das", "der", "die", "den"],
    correctIndex: 0,
    explanation: '"Auto" is neuter → das.',
    hint: "The car is red.",
    tr: { hint: "Araba kırmızı.", explanation: '"Auto" nötrdür → das.' },
  },
  {
    topic: "Regular verbs",
    exerciseType: "fillBlank",
    prompt: "Wir ___ Deutsch.",
    answer: "lernen",
    explanation: '"lernen", infinitive = wir/sie-plural form in present tense.',
    hint: "We learn German.",
    tr: {
      hint: "Almanca öğreniyoruz.",
      explanation: '"lernen"; şimdiki zamanda mastar hâli = wir/sie-çoğul.',
    },
  },
  {
    topic: "Regular verbs",
    exerciseType: "multipleChoice",
    prompt: "Du ___ Musik.",
    options: ["hörst", "höre", "hören", "hört"],
    correctIndex: 0,
    explanation: '"hören", 2nd person singular ends in -st: du hörst.',
    hint: "You listen to music.",
    tr: {
      hint: "Müzik dinliyorsun.",
      explanation: '"hören", tekil 2. kişi -st ekini alır: du hörst.',
    },
  },
  {
    topic: "Regular verbs",
    exerciseType: "fillBlank",
    prompt: "Er ___ Fußball.",
    answer: "spielt",
    explanation: '"spielen", 3rd person singular ends in -t: er spielt.',
    hint: "He plays football.",
    tr: {
      hint: "Futbol oynuyor.",
      explanation: '"spielen", tekil 3. kişi -t ekini alır: er spielt.',
    },
  },
];

/**
 * Localize a GrammarQuestion for display.
 *
 * In `en` mode the item passes through unchanged. In `tr` mode, the
 * `tr` overlay fields replace their EN counterparts; anything the
 * overlay omits falls back to the EN source. German-side data stays
 * untouched.
 *
 * For the pronoun chart and the article cards, the overlay carries
 * flat arrays (pronounGlosses, articleRoles) that the helper maps back
 * into the nested forms/articles arrays index-for-index. This keeps
 * the translator's surface area a bare list instead of a parallel
 * tree.
 */
export function localizeGrammar(
  item: GrammarQuestion,
  locale: Locale,
): GrammarQuestion {
  if (locale === "en" || !item.tr) return item;
  const tr = item.tr;
  const next: GrammarQuestion = {
    ...item,
    hint: tr.hint ?? item.hint,
    explanation: tr.explanation ?? item.explanation,
    options: tr.options ?? item.options,
  };

  if (item.learn) {
    const learn = item.learn;
    const trLearn = tr.learn ?? {};
    const localizedLearn: GrammarLearnBlock = {
      ...learn,
      english: trLearn.english ?? learn.english,
      headline: trLearn.headline ?? learn.headline,
      note: trLearn.note ?? learn.note,
      rule: trLearn.rule ?? learn.rule,
      role: trLearn.role ?? learn.role,
      sample: {
        ...learn.sample,
        en: trLearn.sample?.en ?? learn.sample.en,
      },
    };

    // pronounChart: map pronounGlosses[i] into forms[i].english.
    if (
      learn.layout === "pronounChart" &&
      trLearn.pronounGlosses &&
      Array.isArray(learn.forms)
    ) {
      const forms = (learn.forms as PronounForm[]).map((row, i) => ({
        german: row.german,
        english: trLearn.pronounGlosses?.[i] ?? row.english,
      }));
      localizedLearn.forms = forms;
    }

    // articleSingle: role swap happens in the generic branch above
    // (trLearn.role ?? learn.role). The suffix list stays German.

    // Prefix-carousel verbCards: swap each prefix's `rule` for its
    // TR mirror, same-index; `prefix` + `samples` stay German.
    if (learn.prefixes && learn.prefixes.length > 0) {
      localizedLearn.prefixes = learn.prefixes.map((p, i) => ({
        ...p,
        rule: trLearn.prefixes?.[i]?.rule ?? p.rule,
      }));
    }

    // Carousel verbParadigm: merge each variant's EN fields with
    // its TR mirror, same-index; paradigm cells (verb + forms)
    // stay German across locales.
    if (learn.variants && learn.variants.length > 0) {
      localizedLearn.variants = learn.variants.map((v, i) => {
        const trV = trLearn.variants?.[i];
        return {
          ...v,
          english: trV?.english ?? v.english,
          sample: {
            ...v.sample,
            en: trV?.sample?.en ?? v.sample.en,
          },
        };
      });
    }

    next.learn = localizedLearn;
  }

  return next;
}

/** Filter helper: the 5 anchor questions carrying Learn content. */
export function grammarLearnAnchors(items: GrammarQuestion[]): GrammarQuestion[] {
  return items.filter((q) => q.learn !== undefined);
}
