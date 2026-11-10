/**
 * Words — A1 deck (20 items). Verbatim port of
 * claude/GenauApp_Web_Try_Words_Content_A1.md §2.
 *
 * Shape matches the JSON brief:
 *   - `learn` block drives the Learn card
 *   - `exercise` fields drive the Exercise card variant per item
 *   - `topic` is a small UI eyebrow above each card
 *   - `chunks` is a chunkCompose-ready syllable split (single chunk for
 *     one-syllable words; the Learn card picker falls back to normal
 *     or scrambled in that case per spec §3.1)
 *   - `grammarTags` on verbs — derived from standard A1 German
 *     grammar (not in the source JSON, added here so verb Learn cards
 *     show the pill row)
 *
 * Grammar-tag reasoning (verbs only, keeping pills minimal and
 * pedagogically useful):
 *   - gehen     → ["intransitive", "aux-sein"]  motion verb, takes sein in Perfekt, no object
 *   - essen     → ["irregular", "akkusativ"]    strong (du isst), transitive (direct object)
 *   - trinken   → ["akkusativ"]                 regular, transitive
 *   - sprechen  → ["irregular", "akkusativ"]    strong (du sprichst), Deutsch sprechen
 *   - lesen     → ["irregular", "akkusativ"]    strong (du liest), ein Buch lesen
 *   - schreiben → ["akkusativ"]                 regular, eine E-Mail schreiben
 *
 * Case tags carry the verb's standard object case so the NormalLearnCard
 * can skip the RuleCard for verbs — the pill row already says what the
 * rule body would say (which case the verb takes), without the extra
 * paragraph underneath.
 */

import type { GrammarTag } from "@/components/molecules/GrammarTagPills/GrammarTagPills";

export type ExerciseType = "articlePicker" | "translationMC" | "typing";

export interface WordsLearnBlock {
  layout: "wordCard";
  article: "der" | "die" | "das" | null;
  wordKind?: "verb";
  word: string;
  english: string;
  rule: string;
  sample: { de: string; en: string };
}

export interface WordItem {
  topic: string;
  exerciseType: ExerciseType;
  learn: WordsLearnBlock;
  prompt: string;
  hint?: string;
  options?: string[];
  correctIndex?: number;
  answer?: string;
  noun?: string;
  explanation: string;
  /** Syllable chunks for the ChunkCompose Learn variant. 1 element = not eligible. */
  chunks: string[];
  /** Verb-only grammar tags, rendered as pills on the Learn card. */
  grammarTags?: GrammarTag[];
}

export const WORDS_A1: WordItem[] = [
  {
    topic: "Food",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Brot",
      english: "bread",
      rule: "Nouns ending in -brot are neuter → das.",
      sample: { de: "Ich esse ein Brot mit Käse.", en: "I eat a slice of bread with cheese." },
    },
    prompt: "Brot",
    hint: "bread",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: "Most nouns ending in -brot are neuter → das.",
    noun: "Brot",
    chunks: ["Brot"],
  },
  {
    topic: "Family",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Familie",
      english: "family",
      rule: "Most nouns ending in -ie are feminine → die.",
      sample: { de: "Meine Familie wohnt in Berlin.", en: "My family lives in Berlin." },
    },
    prompt: "Familie",
    hint: "family",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: "Nouns ending in -ie are typically feminine → die.",
    noun: "Familie",
    chunks: ["Fa", "mi", "lie"],
  },
  {
    topic: "Motion verbs",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "gehen",
      english: "to go (on foot)",
      rule: "Regular (weak) verb, ich gehe, du gehst, er geht.",
      sample: { de: "Ich gehe nach Hause.", en: "I'm going home." },
    },
    prompt: "to go (on foot)",
    hint: "Type the German word.",
    answer: "gehen",
    explanation: '"gehen" is the base infinitive for going on foot.',
    chunks: ["ge", "hen"],
    grammarTags: ["intransitive", "aux-sein"],
  },
  {
    topic: "Food verbs",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "essen",
      english: "to eat",
      rule: "Strong verb, stem vowel changes in du/er forms: du isst, er isst.",
      sample: { de: "Wir essen zusammen Abendbrot.", en: "We're eating dinner together." },
    },
    prompt: "essen",
    options: ["to eat", "to drink", "to sleep", "to walk"],
    correctIndex: 0,
    explanation: '"essen" means to eat, stem vowel changes in du/er forms.',
    chunks: ["es", "sen"],
    // Transitive: essen takes Akkusativ (direct object = what's eaten).
    grammarTags: ["irregular", "akkusativ"],
  },
  {
    topic: "Daily items",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Schlüssel",
      english: "key",
      rule: "Nouns ending in -el for tools/objects are often masculine → der.",
      sample: { de: "Der Schlüssel liegt auf dem Tisch.", en: "The key is on the table." },
    },
    prompt: "der Schlüssel",
    options: ["key", "chair", "door", "window"],
    correctIndex: 0,
    explanation: '"der Schlüssel", masculine; -el nouns for tools often take der.',
    chunks: ["Schlüs", "sel"],
  },
  {
    topic: "Home",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Haus",
      english: "house",
      rule: "Most one-syllable nouns ending in -aus (Haus, Maus) are neuter → das.",
      sample: { de: "Das Haus ist sehr groß.", en: "The house is very big." },
    },
    prompt: "Haus",
    hint: "house",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: '"Haus" is neuter → das. Plural: die Häuser.',
    noun: "Haus",
    chunks: ["Haus"],
  },
  {
    topic: "School",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Schule",
      english: "school",
      rule: "Most nouns ending in -e referring to places or things are feminine → die.",
      sample: { de: "Meine Schule ist in der Stadt.", en: "My school is downtown." },
    },
    prompt: "Schule",
    hint: "school",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: "Nouns ending in -e are usually feminine → die.",
    noun: "Schule",
    chunks: ["Schu", "le"],
  },
  {
    topic: "Animals",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Hund",
      english: "dog",
      rule: "Many short animal names for males are masculine → der.",
      sample: { de: "Der Hund läuft im Park.", en: "The dog is running in the park." },
    },
    prompt: "Hund",
    hint: "dog",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Hund" is masculine → der.',
    noun: "Hund",
    chunks: ["Hund"],
  },
  {
    topic: "Animals",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Katze",
      english: "cat",
      rule: "Most nouns ending in -e are feminine → die.",
      sample: { de: "Die Katze schläft auf dem Sofa.", en: "The cat is sleeping on the sofa." },
    },
    prompt: "die Katze",
    options: ["cat", "mouse", "bird", "horse"],
    correctIndex: 0,
    explanation: '"die Katze", feminine; -e endings usually take die.',
    chunks: ["Kat", "ze"],
  },
  {
    topic: "Drink verbs",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "trinken",
      english: "to drink",
      rule: "Regular verb, ich trinke, du trinkst, er trinkt.",
      sample: { de: "Ich trinke jeden Morgen Kaffee.", en: "I drink coffee every morning." },
    },
    prompt: "to drink",
    hint: "Type the German word.",
    answer: "trinken",
    explanation: '"trinken" is the infinitive for drinking.',
    chunks: ["trin", "ken"],
    // Transitive, regular — Akkusativ for the drink itself.
    grammarTags: ["akkusativ"],
  },
  {
    topic: "Furniture",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Tisch",
      english: "table",
      rule: "Many short nouns for furniture/objects are masculine → der.",
      sample: { de: "Auf dem Tisch steht ein Glas.", en: "There's a glass on the table." },
    },
    prompt: "Tisch",
    hint: "table",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Tisch" is masculine → der.',
    noun: "Tisch",
    chunks: ["Tisch"],
  },
  {
    topic: "Home",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Tür",
      english: "door",
      rule: "Nouns for openings in a house are often feminine → die.",
      sample: { de: "Die Tür ist offen.", en: "The door is open." },
    },
    prompt: "Tür",
    hint: "door",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: '"Tür" is feminine → die.',
    noun: "Tür",
    chunks: ["Tür"],
  },
  {
    topic: "Transport",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Auto",
      english: "car",
      rule: "Many borrowed/foreign nouns ending in -o are neuter → das.",
      sample: { de: "Das Auto fährt sehr schnell.", en: "The car drives very fast." },
    },
    prompt: "das Auto",
    options: ["car", "bike", "train", "boat"],
    correctIndex: 0,
    explanation: '"das Auto", neuter; many -o nouns are neuter.',
    chunks: ["Au", "to"],
  },
  {
    topic: "Communication",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "sprechen",
      english: "to speak",
      rule: "Strong verb, stem change in du/er: du sprichst, er spricht.",
      sample: { de: "Ich spreche Deutsch und Englisch.", en: "I speak German and English." },
    },
    prompt: "to speak",
    hint: "Type the German word.",
    answer: "sprechen",
    explanation: '"sprechen", stem vowel e → i in du/er forms.',
    chunks: ["spre", "chen"],
    // Transitive with Akkusativ (e.g. Deutsch sprechen, eine Sprache
    // sprechen). "sprechen mit" takes dative, but at A1 the default
    // framing is the direct-object use.
    grammarTags: ["irregular", "akkusativ"],
  },
  {
    topic: "Time",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Zeit",
      english: "time",
      rule: "Many abstract nouns ending in -t (Zeit, Stadt, Nacht) are feminine → die.",
      sample: { de: "Ich habe heute keine Zeit.", en: "I have no time today." },
    },
    prompt: "Zeit",
    hint: "time",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: '"Zeit" is feminine → die.',
    noun: "Zeit",
    chunks: ["Zeit"],
  },
  {
    topic: "People",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Mann",
      english: "man",
      rule: "Nouns for male persons are masculine → der.",
      sample: { de: "Der Mann wartet an der Bushaltestelle.", en: "The man is waiting at the bus stop." },
    },
    prompt: "Mann",
    hint: "man",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Mann" is masculine → der.',
    noun: "Mann",
    chunks: ["Mann"],
  },
  {
    topic: "Reading verbs",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "lesen",
      english: "to read",
      rule: "Strong verb, stem change in du/er: du liest, er liest.",
      sample: { de: "Ich lese jeden Abend ein Buch.", en: "I read a book every evening." },
    },
    prompt: "to read",
    hint: "Type the German word.",
    answer: "lesen",
    explanation: '"lesen", stem vowel e → ie in du/er forms.',
    chunks: ["le", "sen"],
    // Transitive: ein Buch lesen → Akkusativ.
    grammarTags: ["irregular", "akkusativ"],
  },
  {
    topic: "Drinks",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Wasser",
      english: "water",
      rule: "Most nouns ending in -er for materials/liquids are neuter → das.",
      sample: { de: "Das Wasser ist kalt.", en: "The water is cold." },
    },
    prompt: "Wasser",
    hint: "water",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: '"Wasser" is neuter → das.',
    noun: "Wasser",
    chunks: ["Was", "ser"],
  },
  {
    topic: "Writing verbs",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "schreiben",
      english: "to write",
      rule: "Strong verb, ich schreibe, du schreibst, er schreibt.",
      sample: { de: "Ich schreibe eine E-Mail an meine Mutter.", en: "I'm writing an email to my mother." },
    },
    prompt: "to write",
    hint: "Type the German word.",
    answer: "schreiben",
    explanation: '"schreiben", regular pattern in present tense.',
    chunks: ["schrei", "ben"],
    // Transitive with Akkusativ (eine E-Mail schreiben, ein Buch
    // schreiben). "schreiben an jemanden" also exists but at A1 the
    // direct-object use is the first lesson.
    grammarTags: ["akkusativ"],
  },
  {
    topic: "Relationships",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Freundin",
      english: "girlfriend / female friend",
      rule: "Feminine forms of professions and roles end in -in and are feminine → die.",
      sample: { de: "Meine Freundin wohnt in München.", en: "My girlfriend lives in Munich." },
    },
    prompt: "die Freundin",
    options: ["girlfriend / female friend", "boyfriend", "sister", "neighbor"],
    correctIndex: 0,
    explanation: '"die Freundin", the feminine form; -in endings are always feminine.',
    chunks: ["Freun", "din"],
  },
];
