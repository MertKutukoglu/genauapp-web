/**
 * Dictionary UI strings, keyed by DictLocale. Keep every surface
 * string here so the TR/EN pair stays in lock-step and the agent
 * never guesses at translations inline.
 */

import type { DictLocale, WordType } from "./types";

type S = Record<DictLocale, string>;

export const STR = {
  back: {
    en: "Dictionary",
    tr: "Sözlük",
  } satisfies S,

  grammarInfo: {
    en: "Grammar info",
    tr: "Gramer bilgisi",
  } satisfies S,

  flagTitle: {
    en: "See something wrong?",
    tr: "Bir hata mı var?",
  } satisfies S,

  flagBody: {
    en: "Flag it so we can fix it",
    tr: "Bildir, düzeltelim",
  } satisfies S,

  rule: {
    en: "Rule",
    tr: "Kural",
  } satisfies S,

  sampleSentence: {
    en: "Sample sentence",
    tr: "Örnek cümle",
  } satisfies S,

  commonPhrases: {
    en: "Common phrases",
    tr: "Sık kullanılan kalıplar",
  } satisfies S,

  nounDetails: {
    en: "Noun details",
    tr: "İsim bilgisi",
  } satisfies S,

  article: {
    en: "Article",
    tr: "Artikel",
  } satisfies S,

  plural: {
    en: "Plural",
    tr: "Çoğul",
  } satisfies S,

  noPlural: {
    en: "No plural form",
    tr: "Çoğulu yok",
  } satisfies S,

  declension: {
    en: "Declension",
    tr: "Çekim",
  } satisfies S,

  nDeclination: {
    en: "n-Deklination",
    tr: "n-Deklination",
  } satisfies S,

  case: {
    en: "Case",
    tr: "Hal",
  } satisfies S,

  definite: {
    en: "Definite",
    tr: "Belirli",
  } satisfies S,

  indefinite: {
    en: "Indefinite",
    tr: "Belirsiz",
  } satisfies S,

  pluralCol: {
    en: "Plural",
    tr: "Çoğul",
  } satisfies S,

  praesens: {
    en: "Präsens (present)",
    tr: "Präsens (şimdiki zaman)",
  } satisfies S,

  praeteritum: {
    en: "Präteritum (simple past)",
    tr: "Präteritum (geçmiş zaman)",
  } satisfies S,

  perfekt: {
    en: "Perfekt",
    tr: "Perfekt",
  } satisfies S,

  auxiliary: {
    en: "Auxiliary",
    tr: "Yardımcı fiil",
  } satisfies S,

  perfektForm: {
    en: "Perfekt form",
    tr: "Perfekt formu",
  } satisfies S,

  pronoun: {
    en: "Pronoun",
    tr: "Zamir",
  } satisfies S,

  form: {
    en: "Form",
    tr: "Çekim",
  } satisfies S,

  verbProperties: {
    en: "Verb properties",
    tr: "Fiil özellikleri",
  } satisfies S,

  grammarTags: {
    en: "Grammar tags",
    tr: "Gramer etiketleri",
  } satisfies S,

  comparison: {
    en: "Comparison",
    tr: "Karşılaştırma",
  } satisfies S,

  positive: {
    en: "Positive",
    tr: "Pozitif",
  } satisfies S,

  komparativ: {
    en: "Komparativ",
    tr: "Komparativ",
  } satisfies S,

  superlativ: {
    en: "Superlativ",
    tr: "Superlativ",
  } satisfies S,

  relatedWords: {
    en: "Related words",
    tr: "İlişkili kelimeler",
  } satisfies S,

  listenInApp: {
    en: "Listen to pronunciation in GenauApp",
    tr: "Telaffuzu GenauApp'te dinle",
  } satisfies S,

  saveInApp: {
    en: "Save this word in GenauApp",
    tr: "Bu kelimeyi GenauApp'te kaydet",
  } satisfies S,
} as const;

/** Type label on the right side of result rows / under the H1. */
export const TYPE_LABEL: Record<WordType, S> = {
  noun: { en: "Noun", tr: "İsim" } satisfies S,
  verb: { en: "Verb", tr: "Fiil" } satisfies S,
  adjective: { en: "Adjective", tr: "Sıfat" } satisfies S,
  adverb: { en: "Adverb", tr: "Zarf" } satisfies S,
  other: { en: "Word", tr: "Kelime" } satisfies S,
};

/** Case label lookup for TR (Yalın / Belirtme / Yönelme / İyelik). */
export const CASE_LABEL_TR: Record<string, string> = {
  Nominativ: "Yalın",
  Akkusativ: "Belirtme",
  Dativ: "Yönelme",
  Genitiv: "İyelik",
};

export function pick(s: S, locale: DictLocale): string {
  return s[locale];
}
