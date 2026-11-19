import type { DictionaryEntry } from "@/components/molecules/Dictionary/types";

/**
 * Prototype dictionary entries, hand-authored for the first
 * /dictionary/[slug] pass. When the real `dict_entries` publish
 * pipeline lands, this file goes away and page data comes from
 * Supabase at build time via generateStaticParams.
 *
 * Covers one of each major type so the design can be sanity-
 * checked across the full visual space:
 *   - noun with rule + full declension (die Erfahrung)
 *   - noun with no rule, neutral plural (das Buch)
 *   - verb, regular, with full conjugation (buchstabieren)
 *   - adjective with comparison tiles (gut)
 */

export const DICT_ENTRIES: DictionaryEntry[] = [
  {
    slug: "erfahrung",
    german: "Erfahrung",
    type: "noun",
    level: "B1",
    translations: {
      english: "experience",
      turkish: "tecrübe",
    },
    rule: {
      english: "-ung → die",
      turkish: "-ung → die",
      german: "Nomen auf -ung sind feminin.",
    },
    tags: [
      {
        key: "feminine",
        label: "Feminine",
        tone: "danger",
        explanation:
          "Feminine nouns take die in nominative and accusative, der in dative and genitive.",
      },
    ],
    leveledExamples: [
      {
        de: "Sie hat viel Erfahrung als Lehrerin.",
        en: "She has a lot of experience as a teacher.",
        tr: "Öğretmen olarak çok tecrübesi var.",
        level: "A2",
      },
      {
        de: "Diese Erfahrung hat mich verändert.",
        en: "This experience changed me.",
        tr: "Bu tecrübe beni değiştirdi.",
        level: "B1",
      },
    ],
    collocations: [
      {
        de: "Erfahrung sammeln",
        en: "to gain experience",
        tr: "tecrübe kazanmak",
      },
      {
        de: "aus Erfahrung sprechen",
        en: "to speak from experience",
        tr: "tecrübeden konuşmak",
      },
    ],
    noun: {
      article: "die",
      plural: "die Erfahrungen",
      declension: [
        {
          label: "Nominativ",
          question: "Wer?",
          definite: "die Erfahrung",
          indefinite: "eine Erfahrung",
          plural: "die Erfahrungen",
        },
        {
          label: "Akkusativ",
          question: "Wen?",
          definite: "die Erfahrung",
          indefinite: "eine Erfahrung",
          plural: "die Erfahrungen",
        },
        {
          label: "Dativ",
          question: "Wem?",
          definite: "der Erfahrung",
          indefinite: "einer Erfahrung",
          plural: "den Erfahrungen",
        },
        {
          label: "Genitiv",
          question: "Wessen?",
          definite: "der Erfahrung",
          indefinite: "einer Erfahrung",
          plural: "der Erfahrungen",
        },
      ],
    },
  },

  {
    slug: "buch",
    german: "Buch",
    type: "noun",
    level: "A1",
    translations: {
      english: "book",
      turkish: "kitap",
    },
    tags: [
      {
        key: "neuter",
        label: "Neuter",
        tone: "ok",
        explanation:
          "Neuter nouns take das in nominative and accusative, dem in dative, des in genitive.",
      },
    ],
    leveledExamples: [
      {
        de: "Das Buch liegt auf dem Tisch.",
        en: "The book is on the table.",
        tr: "Kitap masanın üstünde.",
        level: "A1",
      },
      {
        de: "Ich habe mir in der Bibliothek drei Bücher ausgeliehen.",
        en: "I borrowed three books from the library.",
        tr: "Kütüphaneden üç kitap ödünç aldım.",
        level: "A2",
      },
    ],
    noun: {
      article: "das",
      plural: "die Bücher",
      declension: [
        {
          label: "Nominativ",
          question: "Wer?",
          definite: "das Buch",
          indefinite: "ein Buch",
          plural: "die Bücher",
        },
        {
          label: "Akkusativ",
          question: "Wen?",
          definite: "das Buch",
          indefinite: "ein Buch",
          plural: "die Bücher",
        },
        {
          label: "Dativ",
          question: "Wem?",
          definite: "dem Buch",
          indefinite: "einem Buch",
          plural: "den Büchern",
        },
        {
          label: "Genitiv",
          question: "Wessen?",
          definite: "des Buches",
          indefinite: "eines Buches",
          plural: "der Bücher",
        },
      ],
    },
  },

  {
    slug: "buchstabieren",
    german: "buchstabieren",
    type: "verb",
    level: "A2",
    translations: {
      english: "to spell",
      turkish: "harf harf söylemek",
    },
    tags: [
      {
        key: "regular",
        label: "Regular",
        tone: "ok",
        explanation: "The verb follows standard conjugation patterns.",
      },
    ],
    leveledExamples: [
      {
        de: "Ich habe meinen Namen am Telefon dreimal buchstabiert.",
        en: "I spelled my name three times on the phone.",
        tr: "Telefonda ismimi üç kere harf harf söyledim.",
        level: "A2",
      },
      {
        de: "Können Sie das bitte buchstabieren?",
        en: "Could you please spell that?",
        tr: "Bunu heceleyebilir misiniz lütfen?",
        level: "A2",
      },
    ],
    verb: {
      auxiliary: "haben",
      perfektForm: "hat buchstabiert",
      present: [
        { pronoun: "ich", form: "buchstabiere" },
        { pronoun: "du", form: "buchstabierst" },
        { pronoun: "er/sie/es", form: "buchstabiert" },
        { pronoun: "wir", form: "buchstabieren" },
        { pronoun: "ihr", form: "buchstabiert" },
        { pronoun: "sie/Sie", form: "buchstabieren" },
      ],
      praeteritum: [
        { pronoun: "ich", form: "buchstabierte" },
        { pronoun: "du", form: "buchstabiertest" },
        { pronoun: "er/sie/es", form: "buchstabierte" },
        { pronoun: "wir", form: "buchstabierten" },
        { pronoun: "ihr", form: "buchstabiertet" },
        { pronoun: "sie/Sie", form: "buchstabierten" },
      ],
    },
  },

  {
    slug: "gut",
    german: "gut",
    type: "adjective",
    level: "A1",
    translations: {
      english: "good",
      turkish: "iyi",
    },
    tags: [
      {
        key: "irregular",
        label: "Irregular comparison",
        tone: "warn",
        explanation: "gut takes the irregular comparative besser and superlative am besten.",
      },
    ],
    leveledExamples: [
      {
        de: "Der Kaffee ist gut.",
        en: "The coffee is good.",
        tr: "Kahve iyi.",
        level: "A1",
      },
      {
        de: "Heute war ein guter Tag.",
        en: "Today was a good day.",
        tr: "Bugün iyi bir gündü.",
        level: "A2",
      },
    ],
    adjective: {
      positive: "gut",
      komparativ: "besser",
      superlativ: "am besten",
    },
  },
];

export function getEntry(slug: string): DictionaryEntry | undefined {
  return DICT_ENTRIES.find((e) => e.slug === slug);
}

export function getAllSlugs(): string[] {
  return DICT_ENTRIES.map((e) => e.slug);
}
