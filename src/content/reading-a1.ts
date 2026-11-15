/**
 * Reading — A1 content (1 passage + 5 MC questions). Verbatim port
 * of claude/GenauApp_Web_Try_Reading_Content_A1.md §2, with locale
 * overlays translating only the learner-facing English strings
 * (subtitle, topic eyebrows, explanations). The passage itself,
 * the prompts, and the option tokens stay German across locales —
 * the German text IS the content.
 *
 * Shape differs from the other three chips: Reading ships a single
 * ReadingContent record (title + subtitle + passage + questions)
 * rather than a `questions[]` array at the top level. The whole
 * passage is the "learn" content, surfaced in Read mode; there's
 * no per-question learn block.
 */

import type { Locale } from "@/lib/i18n/config";

/**
 * Analytics / routing enum. Title-case per the Swift source + the
 * analytics payloads. Deliberately NOT rendered on the card —
 * `topic` carries the visible signal.
 */
export type ReadingQType =
  | "Main Idea"
  | "Detail"
  | "Vocabulary"
  | "Inference"
  | "Sequence";

export interface ReadingQuestion {
  qType: ReadingQType;
  /** Sentence-case label for the eyebrow ("Main idea", "Detail"). */
  topic: string;
  /** Full German question. No `___` blanks (not cloze). */
  prompt: string;
  /** 4 options — complete sentences or short noun phrases. */
  options: string[];
  correctIndex: number;
  /**
   * One-sentence explanation shown in the Incorrect banner. May
   * contain double-quoted passage excerpts — preserve the quotes.
   */
  explanation: string;
  tr?: {
    /** Translated eyebrow. */
    topic?: string;
    /** Translated prompt (same question, in TR). */
    prompt?: string;
    /** Translated option set, index-matched to `options`. */
    options?: string[];
    /** Translated explanation. */
    explanation?: string;
  };
}

/**
 * ReadingHighlight — inline tap-to-translate hint for a single word
 * (or a separable-verb pair) inside the passage. When a highlight is
 * present, ReadingPassageCard underlines the matching word in the
 * prose and opens a sticky chip at the top of the card on tap, with
 * the German lemma and its EN / TR translation.
 *
 * Match strategy: the renderer walks the passage token-by-token and
 * wraps the FIRST unclaimed occurrence of `surface` (case-sensitive,
 * whole-word only). Word order inside the `highlights` array lets
 * the author pin which occurrence counts when a word repeats.
 *
 * For separable verbs: set `kind: "verb-separable"` and `companion`
 * to the detached prefix (or stem) as it appears elsewhere in the
 * same sentence. Both tokens share the same highlight and open the
 * same chip. A1 doesn't currently ship a separable example; the
 * field is here so the type is stable when A2+ passages use it.
 */
export interface ReadingHighlight {
  /** Exact surface form in the passage. Case-sensitive, whole-word. */
  surface: string;
  /** Dictionary / base form if different from `surface`. */
  lemma?: string;
  /** Drives the chip's header shape. */
  kind: "noun" | "verb" | "verb-separable" | "prep" | "conn";
  /** Nouns: article shown in the chip header ("die Lehrerin"). */
  article?: "der" | "die" | "das";
  /** English translation shown in the chip. */
  en: string;
  /** Turkish translation shown in the chip. */
  tr: string;
  /** Separable verbs: the detached prefix as it appears in the text. */
  companion?: string;
}

export interface ReadingContent {
  title: string;
  subtitle: string;
  /** Full German text. `\n\n` splits paragraphs. */
  passage: string;
  questions: ReadingQuestion[];
  /** Optional tap-to-translate hints over the passage. */
  highlights?: ReadingHighlight[];
  tr?: {
    /**
     * Translated passage title. Shown as the big centered heading
     * on the Read tab. Optional; A1 leaves it in German, A2 ships
     * one per the Reading content doc.
     */
    title?: string;
    /** Translated subtitle (keeps the "A1 · ~X" shape). */
    subtitle?: string;
    /**
     * Passage itself is German-only — it IS the material we're
     * teaching to read. The overlay has no slot for it.
     */
  };
}

export const READING_A1: ReadingContent = {
  title: "Ein Samstag bei Max",
  subtitle: "A1 · ~1 min read",
  passage:
    "Max ist achtundzwanzig Jahre alt und wohnt in Berlin. Am Samstag bleibt er zu Hause. Morgens trinkt er einen Kaffee und liest ein Buch. Heute ist das Wetter schlecht, es regnet den ganzen Tag. Um zwölf Uhr isst Max ein Brot mit Käse. Dazu trinkt er ein Glas Wasser. Am Nachmittag telefoniert er mit seiner Schwester Anna. Anna ist zehn Jahre alt und geht in die Schule. Später kocht Max eine Suppe und sieht einen Film. Es ist ein ruhiger Tag.",
  // Tap-to-translate hints: 5 verbs (2 strong w/ vowel change,
  // 1 impersonal, 1 Latin loan, 1 regular) + 2 nouns (der + die).
  // All are A1-common but easy to misread — worth the tap even for
  // a learner who's seen them once.
  highlights: [
    {
      surface: "wohnt",
      lemma: "wohnen",
      kind: "verb",
      en: "to live (reside)",
      tr: "yaşamak (ikamet etmek)",
    },
    {
      surface: "liest",
      lemma: "lesen",
      kind: "verb",
      en: "to read (stem-change: lesen → liest)",
      tr: "okumak (kök değişimi: lesen → liest)",
    },
    {
      surface: "regnet",
      lemma: "regnen",
      kind: "verb",
      en: "to rain (impersonal: es regnet)",
      tr: "yağmur yağmak (öznesiz: es regnet)",
    },
    {
      surface: "Käse",
      article: "der",
      kind: "noun",
      en: "cheese",
      tr: "peynir",
    },
    {
      surface: "telefoniert",
      lemma: "telefonieren",
      kind: "verb",
      en: "to phone, to call (mit + Dat)",
      tr: "telefon etmek (mit + Dat ile)",
    },
    {
      surface: "sieht",
      lemma: "sehen",
      kind: "verb",
      en: "to see, to watch (stem-change: sehen → sieht)",
      tr: "görmek, izlemek (kök değişimi: sehen → sieht)",
    },
    {
      surface: "Suppe",
      article: "die",
      kind: "noun",
      en: "soup",
      tr: "çorba",
    },
  ],
  questions: [
    {
      qType: "Main Idea",
      topic: "Main idea",
      prompt: "Was macht Max am Samstag?",
      options: [
        "Er bleibt zu Hause und entspannt sich.",
        "Er arbeitet im Büro.",
        "Er geht spazieren.",
        "Er fährt in die Stadt.",
      ],
      correctIndex: 0,
      explanation:
        'The text opens with "Am Samstag bleibt er zu Hause", he stays home and relaxes.',
      tr: {
        topic: "Ana fikir",
        prompt: "Max cumartesi ne yapıyor?",
        options: [
          "Evde kalıyor ve dinleniyor.",
          "Ofiste çalışıyor.",
          "Yürüyüşe gidiyor.",
          "Şehre gidiyor.",
        ],
        explanation:
          'Metin "Am Samstag bleibt er zu Hause" (Cumartesi evde kalıyor) diye başlıyor; evde kalıp dinleniyor.',
      },
    },
    {
      qType: "Detail",
      topic: "Detail",
      prompt: "Wie alt ist Anna?",
      options: ["acht", "zehn", "zwölf", "achtzehn"],
      correctIndex: 1,
      explanation: '"Anna ist zehn Jahre alt und geht in die Schule."',
      tr: {
        topic: "Detay",
        prompt: "Anna kaç yaşında?",
        // Options are German number words; leave them untranslated —
        // the question tests whether the learner recognizes the
        // German number in the passage.
        explanation:
          'Metinde "Anna ist zehn Jahre alt und geht in die Schule." (Anna on yaşında ve okula gidiyor) yazıyor.',
      },
    },
    {
      qType: "Vocabulary",
      topic: "Vocabulary",
      prompt: 'Was bedeutet "kocht" im Text?',
      options: ["cooks", "reads", "drinks", "watches"],
      correctIndex: 0,
      explanation:
        '"Später kocht Max eine Suppe", "kocht" means "cooks".',
      tr: {
        topic: "Kelime bilgisi",
        prompt: 'Metinde "kocht" ne anlama geliyor?',
        options: ["pişiriyor", "okuyor", "içiyor", "izliyor"],
        explanation:
          '"Später kocht Max eine Suppe" (Sonra Max bir çorba pişiriyor); "kocht" = "pişiriyor".',
      },
    },
    {
      qType: "Inference",
      topic: "Inference",
      prompt: "Warum bleibt Max wahrscheinlich zu Hause?",
      options: [
        "Das Wetter ist schlecht.",
        "Er ist krank.",
        "Er hat Besuch.",
        "Er hat keine Zeit.",
      ],
      correctIndex: 0,
      explanation:
        '"Heute ist das Wetter schlecht, es regnet den ganzen Tag." The rain explains the stay-home mood.',
      tr: {
        topic: "Çıkarım",
        prompt: "Max muhtemelen neden evde kalıyor?",
        options: [
          "Hava kötü.",
          "Hasta.",
          "Misafiri var.",
          "Zamanı yok.",
        ],
        explanation:
          '"Heute ist das Wetter schlecht, es regnet den ganzen Tag." (Bugün hava kötü, bütün gün yağmur yağıyor); yağmur evde kalma havasını açıklıyor.',
      },
    },
    {
      qType: "Sequence",
      topic: "Sequence",
      prompt: "Was macht Max zuerst am Samstag?",
      options: [
        "einen Kaffee trinken",
        "mit Anna telefonieren",
        "eine Suppe kochen",
        "einen Film sehen",
      ],
      correctIndex: 0,
      explanation:
        'The morning sentence says "Morgens trinkt er einen Kaffee", this comes first in the day.',
      tr: {
        topic: "Sıra",
        prompt: "Max cumartesi ilk önce ne yapıyor?",
        options: [
          "kahve içmek",
          "Anna'yla telefonda konuşmak",
          "çorba pişirmek",
          "film izlemek",
        ],
        explanation:
          'Sabah cümlesi "Morgens trinkt er einen Kaffee" (Sabahları kahve içiyor) diyor; bu günün ilkidir.',
      },
    },
  ],
  tr: {
    subtitle: "A1 · ~1 dk okuma",
  },
};

/**
 * Localize a ReadingContent for display. In `en` the content passes
 * through unchanged. In `tr`, overlay fields swap in; anything the
 * overlay omits falls back to the EN source. Title + passage are
 * German-only by design (the passage IS the material).
 */
export function localizeReading(
  content: ReadingContent,
  locale: Locale,
): ReadingContent {
  if (locale === "en" || !content.tr) {
    // Still apply per-question TR overlays even without a top-level
    // tr block, in case subtitle was already in the right locale.
    return content;
  }
  return {
    ...content,
    title: content.tr.title ?? content.title,
    subtitle: content.tr.subtitle ?? content.subtitle,
    questions: content.questions.map((q) => localizeReadingQuestion(q, locale)),
  };
}

function localizeReadingQuestion(
  q: ReadingQuestion,
  locale: Locale,
): ReadingQuestion {
  if (locale === "en" || !q.tr) return q;
  const tr = q.tr;
  return {
    ...q,
    topic: tr.topic ?? q.topic,
    prompt: tr.prompt ?? q.prompt,
    options: tr.options ?? q.options,
    explanation: tr.explanation ?? q.explanation,
  };
}
