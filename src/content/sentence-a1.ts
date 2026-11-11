/**
 * Sentence — A1 deck (12 items). Verbatim port of
 * claude/GenauApp_Web_Try_Sentence_Content_A1.md §2, with a `tr`
 * overlay on each item translating every learner-facing English
 * string: subtitle, pill captions, example glosses, body prose, and
 * (on pack-themed scenes) the topic eyebrow label.
 *
 * German-side data stays German across locales:
 *   - `words` (the sentence tokenization, with punctuation attached)
 *   - `learn.headline` (Hauptsatz, Ortsangabe, ... — brand-stable
 *     grammar terms the learner needs to recognize in any locale)
 *   - `learn.parts[].text` (Subjekt, Verb, Objekt, Zeit, Ort, W-Wort —
 *     ditto, structural German terms)
 *   - `learn.examples[].segments[].text` (the example sentence content)
 *
 * Learn deck = the 6 items carrying a `learn` block (items 1-6);
 * Exercise deck = all 12 in authored order.
 */

import type { Locale } from "@/lib/i18n/config";

export type SentenceRole =
  | "subject"
  | "verb"
  | "object"
  | "time"
  | "place"
  | "qword"
  | "modal"
  | "reflexive"
  | "neutral";

export type SentenceLearnLayout = "sentenceFormula";

/** One pill in the formula strip. */
export interface FormulaPart {
  /** German role label shown as the pill's primary text. Stays in
   *  German across locales (Subjekt, Verb, Objekt, …). May embed a
   *  literal "\n" for a two-line label ("Possessiv +\nNomen"). */
  text: string;
  /** English translation of `text`, rendered muted under the German
   *  label so learners always see the German name of the role AND
   *  what it means. Preserves embedded `\n` the same way `text`
   *  does. Localized via `partTranslations` in the overlay. */
  translation: string;
  /** Short helper line under the role. Localized via overlay. */
  caption: string;
  role: SentenceRole;
}

/** One inline-role-colored word (or word group) in an example. */
export interface FormulaExampleSegment {
  text: string;
  role: SentenceRole;
}

/** An example sentence rendered with per-segment role colors. */
export interface FormulaExample {
  segments: FormulaExampleSegment[];
  /** English gloss under the German line. Localized via overlay. */
  en: string;
}

export interface SentenceLearnBlock {
  layout: SentenceLearnLayout;
  headline: string;
  /** One-line subtitle under the headline. Localized via overlay. */
  english: string;
  parts: FormulaPart[];
  examples: FormulaExample[];
  /** Prose block, supports `**bold**` only. Localized via overlay. */
  body: string;
}

/**
 * Per-locale overlay for the English-facing fields of a
 * SentenceQuestion. The overlay carries flat arrays for the nested
 * arrays (partCaptions index-maps to parts, exampleEns index-maps to
 * examples) so the translator can see pairings in one place and
 * can't drift them by index.
 */
export interface SentenceLocaleOverlay {
  /** Translated topic eyebrow (used on pack-themed scenes mainly —
   *  Learn-anchor topics like "Subject + Verb + Object" also get a
   *  TR gloss here). */
  topic?: string;
  learn?: {
    /** Translated subtitle. */
    english?: string;
    /** Translated body prose. Same `**bold**` markdown supported. */
    body?: string;
    /** Translated pill captions, same index order as parts. */
    partCaptions?: string[];
    /** Translated role names (Subject → Özne, Verb → Fiil, …),
     *  rendered muted between the German text and the caption. Same
     *  index order as parts. `\n` preserved for two-line labels. */
    partTranslations?: string[];
    /** Translated example EN glosses, same index order as examples. */
    exampleEns?: string[];
  };
}

export interface SentenceQuestion {
  topic: string;
  /** Tokenized sentence in canonical order, punctuation attached. */
  words: string[];
  /** Index array that reproduces the target from the shuffled pool.
   *  Identity map (`[0, 1, 2, …]`) in all current content. */
  correctOrder: number[];
  learn?: SentenceLearnBlock;
  tr?: SentenceLocaleOverlay;
}

export const SENTENCE_A1: SentenceQuestion[] = [
  // 1 — Anchor: Hauptsatz (SVO)
  {
    topic: "Subject + Verb + Object",
    words: ["Ich", "esse", "Brot."],
    correctOrder: [0, 1, 2],
    learn: {
      layout: "sentenceFormula",
      headline: "Hauptsatz",
      english: "Main clause (Subject · Verb · Object)",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "Objekt", translation: "Object", caption: "Rest", role: "object" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "esse", role: "verb" },
            { text: "Brot.", role: "object" },
          ],
          en: "I eat bread.",
        },
        {
          segments: [
            { text: "Wir", role: "subject" },
            { text: "lernen", role: "verb" },
            { text: "Deutsch.", role: "object" },
          ],
          en: "We learn German.",
        },
      ],
      body: "German's backbone: **Subject, Verb, Object**. The verb is always in position 2.",
    },
    tr: {
      topic: "Özne + Fiil + Nesne",
      learn: {
        english: "Ana cümle (Özne · Fiil · Nesne)",
        partCaptions: ["Pozisyon 1", "Pozisyon 2", "Geri kalan"],
        partTranslations: ["Özne", "Fiil", "Nesne"],
        exampleEns: ["Ekmek yiyorum.", "Almanca öğreniyoruz."],
        body: "Almancanın iskeleti: **Özne, Fiil, Nesne**. Fiil her zaman 2. pozisyondadır.",
      },
    },
  },
  // 2 — Anchor: Ortsangabe (place)
  {
    topic: "Prepositional phrase",
    words: ["Wir", "wohnen", "in", "Berlin."],
    correctOrder: [0, 1, 2, 3],
    learn: {
      layout: "sentenceFormula",
      headline: "Ortsangabe",
      english: "Place expression (Subject · Verb · Place)",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Who", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "Ort", translation: "Place", caption: "Where", role: "place" },
      ],
      examples: [
        {
          segments: [
            { text: "Wir", role: "subject" },
            { text: "wohnen", role: "verb" },
            { text: "in Berlin.", role: "place" },
          ],
          en: "We live in Berlin.",
        },
        {
          segments: [
            { text: "Sie", role: "subject" },
            { text: "arbeitet", role: "verb" },
            { text: "im Büro.", role: "place" },
          ],
          en: "She works in the office.",
        },
      ],
      body: "Add a place: **in Berlin**, **zu Hause**, **im Büro**. The verb still stays in position 2.",
    },
    tr: {
      topic: "Yer tamlaması",
      learn: {
        english: "Yer bildirimi (Özne · Fiil · Yer)",
        partCaptions: ["Kim", "Pozisyon 2", "Nerede"],
        partTranslations: ["Özne", "Fiil", "Yer"],
        exampleEns: ["Berlin'de yaşıyoruz.", "Ofiste çalışıyor."],
        body: "Bir yer ekle: **in Berlin**, **zu Hause**, **im Büro**. Fiil yine 2. pozisyonda kalır.",
      },
    },
  },
  // 3 — Anchor: Possessivartikel
  {
    topic: "Possessive",
    words: ["Er", "ist", "mein", "Bruder."],
    correctOrder: [0, 1, 2, 3],
    learn: {
      layout: "sentenceFormula",
      headline: "Possessivartikel",
      english: "Possessive before the noun",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Who", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        {
          text: "Possessiv +\nNomen",
          translation: "Possessive +\nNoun",
          caption: "Who's",
          role: "object",
        },
      ],
      examples: [
        {
          segments: [
            { text: "Er", role: "subject" },
            { text: "ist", role: "verb" },
            { text: "mein Bruder.", role: "object" },
          ],
          en: "He is my brother.",
        },
        {
          segments: [
            { text: "Das", role: "subject" },
            { text: "ist", role: "verb" },
            { text: "deine Katze.", role: "object" },
          ],
          en: "That is your cat.",
        },
      ],
      body: "Possessives go before the noun: **mein** Bruder, **dein** Buch, **ihr** Hund. They change with the noun's gender.",
    },
    tr: {
      topic: "İyelik",
      learn: {
        english: "İsimden önce iyelik sıfatı",
        partCaptions: ["Kim", "Pozisyon 2", "Kiminki"],
        partTranslations: ["Özne", "Fiil", "İyelik +\nİsim"],
        exampleEns: ["O erkek kardeşim.", "Bu senin kedin."],
        body: "İyelik sıfatları isimden önce gelir: **mein** Bruder, **dein** Buch, **ihr** Hund. İsmin cinsine göre değişir.",
      },
    },
  },
  // 4 — Anchor: Zeitangabe (time adverb)
  {
    topic: "Time adverb",
    words: ["Ich", "kaufe", "heute", "Brot."],
    correctOrder: [0, 1, 2, 3],
    learn: {
      layout: "sentenceFormula",
      headline: "Zeitangabe",
      english: "Time expression (S · V · Time · Rest)",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Who", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "Zeit", translation: "Time", caption: "When", role: "time" },
        { text: "Rest", translation: "Rest", caption: "What / Where", role: "object" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "kaufe", role: "verb" },
            { text: "heute", role: "time" },
            { text: "Brot.", role: "object" },
          ],
          en: "I buy bread today.",
        },
        {
          segments: [
            { text: "Wir", role: "subject" },
            { text: "fahren", role: "verb" },
            { text: "morgen", role: "time" },
            { text: "nach Köln.", role: "place" },
          ],
          en: "We're going to Cologne tomorrow.",
        },
      ],
      body: "Time adverbs like **heute** (today), **morgen** (tomorrow), **oft** (often) sit right after the verb. S, V, Time, Rest.",
    },
    tr: {
      topic: "Zaman zarfı",
      learn: {
        english: "Zaman bildirimi (Ö · F · Zaman · Geri kalan)",
        partCaptions: ["Kim", "Pozisyon 2", "Ne zaman", "Ne / Nerede"],
        partTranslations: ["Özne", "Fiil", "Zaman", "Geri kalan"],
        exampleEns: ["Bugün ekmek alıyorum.", "Yarın Köln'e gidiyoruz."],
        body: "**heute** (bugün), **morgen** (yarın), **oft** (sık sık) gibi zaman zarfları fiilin hemen arkasına gelir. Ö, F, Zaman, Geri kalan.",
      },
    },
  },
  // 5 — Anchor: Richtung (direction — accusative two-way)
  {
    topic: "Direction (two-way preposition)",
    words: ["Sie", "geht", "in", "die", "Schule."],
    correctOrder: [0, 1, 2, 3, 4],
    learn: {
      layout: "sentenceFormula",
      headline: "Richtung",
      english: "Direction uses accusative",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Who", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "Ziel", translation: "Destination", caption: "To where", role: "place" },
      ],
      examples: [
        {
          segments: [
            { text: "Sie", role: "subject" },
            { text: "geht", role: "verb" },
            { text: "in die Schule.", role: "place" },
          ],
          en: "She goes to school.",
        },
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "fahre", role: "verb" },
            { text: "in die Stadt.", role: "place" },
          ],
          en: "I'm driving into town.",
        },
      ],
      body: "Direction toward a place uses accusative: **in die Schule**, **auf den Tisch**. Compare with location (`in der Schule` = at school).",
    },
    tr: {
      topic: "Yön (iki yönlü edat)",
      learn: {
        english: "Yön akkusatif ister",
        partCaptions: ["Kim", "Pozisyon 2", "Nereye"],
        partTranslations: ["Özne", "Fiil", "Hedef"],
        exampleEns: ["Okula gidiyor.", "Şehre gidiyorum."],
        body: "Bir yere doğru hareket akkusatif alır: **in die Schule**, **auf den Tisch**. Konumla karşılaştır (`in der Schule` = okulda).",
      },
    },
  },
  // 6 — Anchor: W-Frage (question word)
  {
    topic: "Question (W-word)",
    words: ["Wo", "wohnst", "du?"],
    correctOrder: [0, 1, 2],
    learn: {
      layout: "sentenceFormula",
      headline: "W-Frage",
      english: "Question with a W-word (W · Verb · Subject)",
      parts: [
        { text: "W-Wort", translation: "Question word", caption: "wo / was / wer", role: "qword" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "Subjekt", translation: "Subject", caption: "Who", role: "subject" },
      ],
      examples: [
        {
          segments: [
            { text: "Wo", role: "qword" },
            { text: "wohnst", role: "verb" },
            { text: "du?", role: "subject" },
          ],
          en: "Where do you live?",
        },
        {
          segments: [
            { text: "Was", role: "qword" },
            { text: "isst", role: "verb" },
            { text: "er?", role: "subject" },
          ],
          en: "What is he eating?",
        },
      ],
      body: "Questions with **wo / was / wer / wann / warum / wie** put the W-word first, verb second, then the subject. The verb still stays in position 2.",
    },
    tr: {
      topic: "Soru (W-kelimesi)",
      learn: {
        english: "W-kelimesiyle soru (W · Fiil · Özne)",
        partCaptions: ["wo / was / wer", "Pozisyon 2", "Kim"],
        partTranslations: ["Soru sözcüğü", "Fiil", "Özne"],
        exampleEns: ["Nerede yaşıyorsun?", "Ne yiyor?"],
        body: "**wo / was / wer / wann / warum / wie** ile sorularda W-kelimesi başta, fiil ikinci, sonra özne gelir. Fiil yine 2. pozisyondadır.",
      },
    },
  },
  // 7–12 — pack-themed drills (no learn block)
  {
    topic: "Daily Life",
    words: ["Ich", "trinke", "Kaffee."],
    correctOrder: [0, 1, 2],
    tr: { topic: "Günlük Hayat" },
  },
  {
    topic: "Food & Drink",
    words: ["Wir", "essen", "heute", "Pizza."],
    correctOrder: [0, 1, 2, 3],
    tr: { topic: "Yeme & İçme" },
  },
  {
    topic: "Health",
    words: ["Er", "geht", "zum", "Arzt."],
    correctOrder: [0, 1, 2, 3],
    tr: { topic: "Sağlık" },
  },
  {
    topic: "Hairdresser",
    words: ["Was", "kostet", "der", "Haarschnitt?"],
    correctOrder: [0, 1, 2, 3],
    tr: { topic: "Kuaför" },
  },
  {
    topic: "Official Appointments",
    words: ["Ich", "brauche", "einen", "Termin."],
    correctOrder: [0, 1, 2, 3],
    tr: { topic: "Resmî Randevular" },
  },
  {
    topic: "Shopping",
    words: ["Sie", "geht", "ins", "Geschäft."],
    correctOrder: [0, 1, 2, 3],
    tr: { topic: "Alışveriş" },
  },
];

/**
 * Localize a SentenceQuestion for display.
 *
 * In `en` mode the item passes through unchanged. In `tr` mode, the
 * overlay fields replace their EN counterparts; anything missing
 * falls back to the EN source. The two nested arrays (partCaptions,
 * exampleEns) are index-mapped onto parts and examples respectively,
 * leaving every German-side field (role, text, segments) untouched.
 */
export function localizeSentence(
  item: SentenceQuestion,
  locale: Locale,
): SentenceQuestion {
  if (locale === "en" || !item.tr) return item;
  const tr = item.tr;
  const next: SentenceQuestion = {
    ...item,
    topic: tr.topic ?? item.topic,
  };

  if (item.learn) {
    const learn = item.learn;
    const trLearn = tr.learn ?? {};
    // Captions and role translations both index-map onto parts. Apply
    // both in one pass so we don't walk the array twice.
    const hasCaptions =
      !!trLearn.partCaptions && trLearn.partCaptions.length > 0;
    const hasTranslations =
      !!trLearn.partTranslations && trLearn.partTranslations.length > 0;
    const parts =
      hasCaptions || hasTranslations
        ? learn.parts.map((p, i) => ({
            ...p,
            caption: trLearn.partCaptions?.[i] ?? p.caption,
            translation: trLearn.partTranslations?.[i] ?? p.translation,
          }))
        : learn.parts;
    const examples =
      trLearn.exampleEns && trLearn.exampleEns.length > 0
        ? learn.examples.map((ex, i) => ({
            ...ex,
            en: trLearn.exampleEns?.[i] ?? ex.en,
          }))
        : learn.examples;
    next.learn = {
      ...learn,
      english: trLearn.english ?? learn.english,
      body: trLearn.body ?? learn.body,
      parts,
      examples,
    };
  }

  return next;
}

/** Filter helper: the 6 anchor questions carrying Learn content. */
export function sentenceLearnAnchors(
  items: SentenceQuestion[],
): SentenceQuestion[] {
  return items.filter((q) => q.learn !== undefined);
}
