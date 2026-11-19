/**
 * Dictionary types.
 *
 * Shape of a dictionary entry as consumed by the dictionary surface
 * (WordCard, GrammarInfoModule). These match the shape of
 * `public.words.details` in Supabase (see GenauApp_Web_Dictionary_Brief
 * §4.1) at the fields the web actually renders. Everything is
 * optional because the publish gate only guarantees a subset per
 * type; missing fields collapse their sections.
 */

export type ArticleColor = "der" | "die" | "das";

export type WordType = "noun" | "verb" | "adjective" | "adverb" | "other";

export type CefrLevel = "A1" | "A2" | "B1" | "B2";

export interface LeveledExample {
  de: string;
  en?: string;
  tr?: string;
  level: CefrLevel;
}

export interface Collocation {
  de: string;
  en?: string;
  tr?: string;
}

export interface Rule {
  german?: string;
  english?: string;
  turkish?: string;
}

export interface CaseRow {
  label: string;           // "Nominativ"
  question: string;        // "Wer?"
  definite: string;        // "das Buch"
  indefinite: string;      // "ein Buch"
  plural?: string;         // desktop extra column
}

export interface ConjugationRow {
  pronoun: string;         // "ich"
  form: string;            // "buchstabiere"
}

export interface GrammarTag {
  key: string;             // "regular", "separable", "accusative"
  label: string;           // "Regular", "Separable", "+ Akkusativ"
  tone: "ok" | "warn" | "danger" | "info" | "neutral";
  explanation?: string;    // shown in popover (locale aware upstream)
}

export interface NounDetails {
  article: ArticleColor;
  plural?: string;         // "die Bücher"
  noPluralMarker?: boolean;
  declension?: CaseRow[];
  nDeclension?: boolean;
}

export interface VerbDetails {
  present?: ConjugationRow[];
  praeteritum?: ConjugationRow[];
  auxiliary?: "haben" | "sein";
  perfektForm?: string;    // "hat buchstabiert"
  separablePrefix?: string;
  impersonal?: boolean;
}

export interface AdjectiveDetails {
  positive: string;
  komparativ?: string;
  superlativ?: string;
  declensionWeak?: CaseRow[];
}

export interface DictionaryEntry {
  slug: string;
  german: string;
  type: WordType;
  level: CefrLevel;
  translations: {
    english?: string;
    turkish?: string;
  };
  rule?: Rule;
  tags: GrammarTag[];
  leveledExamples: LeveledExample[];
  collocations?: Collocation[];
  noun?: NounDetails;
  verb?: VerbDetails;
  adjective?: AdjectiveDetails;
}

/** UI language the dictionary renders in. */
export type DictLocale = "en" | "tr";
