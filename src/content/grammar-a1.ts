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
 *     verbParadigm, pronounChart, articleCards, verbConjugation.
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
  | "articleCards"
  | "verbConjugation";

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
 * ending (e.g. "-ung"); `example` is one A1-friendly noun that shows
 * the pattern in action (e.g. "Zeitung"). German-only, locale-
 * agnostic — the TR overlay never touches these.
 */
export interface ArticleSuffixPattern {
  suffix: string;
  example: string;
}

/**
 * An article card: article token + role label + the suffix patterns
 * that reliably predict that gender at A1.
 *
 * Earlier shape carried a single canonical example (`{ de, en }`)
 * which read as a reference card rather than a lesson. The current
 * shape drives a 2-4 row list where each row teaches one
 * suffix → gender fact, so the learner leaves with a decision rule
 * instead of a memorized triple.
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
   *  pronounChart/articleCards use a short subtitle. */
  english?: string;
  /** pronounChart + articleCards headline (big title). */
  headline?: string;
  /** verbParadigm forms (6 rows). */
  forms?: ParadigmForm[] | ConjugationForm[] | PronounForm[];
  /** articleCards cards (3 cards). */
  articles?: ArticleCardSpec[];
  /** verbConjugation standalone rule paragraph. */
  note?: string;
  /** articleCards caveat paragraph (patterns aren't absolute). */
  caveat?: string;
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
    /** Headline for pronounChart/articleCards. */
    headline?: string;
    /** Note paragraph for verbConjugation. */
    note?: string;
    /** Caveat paragraph for articleCards. */
    caveat?: string;
    /** Translated role labels for articleCards (3 entries, same order). */
    articleRoles?: string[];
    /** Pronoun-chart English column translations (same order as forms). */
    pronounGlosses?: string[];
    sample?: { en?: string };
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
  // 4 — Anchor: Articles
  //
  // High-reliability A1 suffix → gender patterns, 3 per column for
  // visual balance. Feminine naturally carries more ending signals
  // than the other two at A1 level (-e, -ung, -heit, -ion, -in, -ie,
  // -ei, -keit…); we cap at 3 and pick the highest-frequency ones so
  // the columns line up.
  //
  //   der   -er / -or / -ling
  //   die   -e  / -ung / -in
  //   das   -chen / -ment / -um
  //
  // Sample sentence: "Die Zeitung ist neu." — the German noun carries
  // the -ung pattern so the sample sentence closes the loop: card
  // teaches the pattern, sample shows it in a real sentence.
  {
    topic: "Articles (der / die / das)",
    exerciseType: "multipleChoice",
    learn: {
      layout: "articleCards",
      headline: "Articles by noun ending",
      english: "endings that predict the gender",
      articles: [
        {
          article: "der",
          role: "masculine",
          patterns: [
            { suffix: "-er", example: "Lehrer" },
            { suffix: "-or", example: "Motor" },
            { suffix: "-ling", example: "Liebling" },
          ],
        },
        {
          article: "die",
          role: "feminine",
          patterns: [
            { suffix: "-e", example: "Lampe" },
            { suffix: "-ung", example: "Zeitung" },
            { suffix: "-in", example: "Lehrerin" },
          ],
        },
        {
          article: "das",
          role: "neuter",
          patterns: [
            { suffix: "-chen", example: "Mädchen" },
            { suffix: "-ment", example: "Dokument" },
            { suffix: "-um", example: "Datum" },
          ],
        },
      ],
      caveat:
        "Endings are reliable, not absolute. Kinship terms (die Mutter, der Vater) and a handful of high-frequency nouns are exceptions.",
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
        headline: "Artikeller ve isim ekleri",
        english: "cinsiyeti öngören ekler",
        articleRoles: ["eril", "dişil", "nötr"],
        caveat:
          "Ekler güvenilirdir ama mutlak değildir. Akrabalık isimleri (die Mutter, der Vater) ve bazı yüksek frekanslı kelimeler istisnadır.",
        sample: { en: "Gazete yeni." },
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
      caveat: trLearn.caveat ?? learn.caveat,
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

    // articleCards: map articleRoles[i] into articles[i].role. The
    // suffix list (patterns) is German-only — the suffix tokens and
    // example nouns don't carry across locales.
    if (learn.layout === "articleCards" && trLearn.articleRoles && learn.articles) {
      localizedLearn.articles = learn.articles.map((card, i) => ({
        article: card.article,
        role: trLearn.articleRoles?.[i] ?? card.role,
        patterns: card.patterns,
      }));
    }

    next.learn = localizedLearn;
  }

  return next;
}

/** Filter helper: the 5 anchor questions carrying Learn content. */
export function grammarLearnAnchors(items: GrammarQuestion[]): GrammarQuestion[] {
  return items.filter((q) => q.learn !== undefined);
}
