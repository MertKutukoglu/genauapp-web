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
 *   - `tr` is an optional per-item overlay mirroring the English-side
 *     fields in Turkish. The German word, article, chunks, sample.de
 *     and grammar tags stay language-agnostic; only the
 *     learner-facing English copy gets a TR variant. Consumers pass
 *     each item through `localizeWord(item, locale)` before rendering
 *     — the helper swaps the overlay fields in and leaves the
 *     German-side data untouched.
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
import type { Locale } from "@/lib/i18n/config";

export type ExerciseType = "articlePicker" | "translationMC" | "typing";

export interface WordsLearnBlock {
  layout: "wordCard";
  article: "der" | "die" | "das" | null;
  wordKind?: "verb";
  word: string;
  english: string;
  /**
   * The grammar rule shown on the Learn card's RuleCard.
   *
   * Only included when there IS a real, teachable suffix/pattern rule
   * that predicts the article — e.g. -ie feminine, -e feminine, -o
   * loan-neuter, -in feminine, natural gender for people. Words that
   * take their article by convention alone (Brot, Haus, Tisch, Zeit,
   * Wasser, …) deliberately have no `rule`; inventing a rule like
   * "-brot ending is neuter" is tautological and misleading. The
   * RuleCard is only rendered when this field is present.
   *
   * On verbs, this field carries conjugation notes instead; the Learn
   * card hides the RuleCard for verbs because the grammar pills row
   * (case, aux, irregular) already carries the information that
   * paragraph would.
   */
  rule?: string;
  sample: { de: string; en: string };
}

/**
 * Per-locale overlay for the English-facing fields of a WordItem.
 * Each key is optional so a partial overlay is valid; `localizeWord`
 * falls back to the English source for anything missing.
 */
export interface WordItemLocaleOverlay {
  /** Eyebrow category shown above the card. */
  topic?: string;
  /** Learn-block overrides: gloss, rule paragraph, sample translation. */
  learn?: {
    english?: string;
    rule?: string;
    sample?: { en?: string };
  };
  /** Exercise hint under the prompt (articlePicker) / typing instruction. */
  hint?: string;
  /** Exercise prompt — only needs localizing for typing (EN gloss → TR gloss). */
  prompt?: string;
  /** translationMC option labels in picker order. */
  options?: string[];
  /** Explanation paragraph shown on reveal. */
  explanation?: string;
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
  /** Turkish overlay — same shape as the EN-side learner copy. */
  tr?: WordItemLocaleOverlay;
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
      // No reliable suffix rule — Brot takes das by convention.
      sample: { de: "Ich esse ein Brot mit Käse.", en: "I eat a slice of bread with cheese." },
    },
    prompt: "Brot",
    hint: "bread",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: '"Brot" is neuter → das. One to learn with its article.',
    noun: "Brot",
    chunks: ["Brot"],
    tr: {
      topic: "Yiyecek",
      learn: {
        english: "ekmek",
        sample: { en: "Peynirli bir dilim ekmek yiyorum." },
      },
      hint: "ekmek",
      explanation: '"Brot" nötr → das. Artikeliyle birlikte ezberlemek gerek.',
    },
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
    tr: {
      topic: "Aile",
      learn: {
        english: "aile",
        rule: "-ie ile biten isimler genelde dişildir → die.",
        sample: { en: "Ailem Berlin'de yaşıyor." },
      },
      hint: "aile",
      explanation: "-ie ile biten isimler genelde dişildir → die.",
    },
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
    tr: {
      topic: "Hareket fiilleri",
      learn: {
        english: "gitmek (yürüyerek)",
        rule: "Düzenli fiil: ich gehe, du gehst, er geht.",
        sample: { en: "Eve gidiyorum." },
      },
      prompt: "gitmek (yürüyerek)",
      hint: "Almancasını yaz.",
      explanation: '"gehen" yürüyerek gitmenin mastar hâlidir.',
    },
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
    tr: {
      topic: "Yemek fiilleri",
      learn: {
        english: "yemek",
        rule: "Düzensiz fiil, du/er formlarında kök sesli değişir: du isst, er isst.",
        sample: { en: "Birlikte akşam yemeği yiyoruz." },
      },
      options: ["yemek", "içmek", "uyumak", "yürümek"],
      explanation: '"essen" yemek demektir; du/er formlarında kök sesli değişir.',
    },
  },
  {
    topic: "Daily items",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Schlüssel",
      english: "key",
      // -el isn't a reliable gender signal. Schlüssel is simply masculine.
      sample: { de: "Der Schlüssel liegt auf dem Tisch.", en: "The key is on the table." },
    },
    prompt: "der Schlüssel",
    options: ["key", "chair", "door", "window"],
    correctIndex: 0,
    explanation: '"der Schlüssel" is masculine. One to learn with its article.',
    chunks: ["Schlüs", "sel"],
    tr: {
      topic: "Günlük eşyalar",
      learn: {
        english: "anahtar",
        sample: { en: "Anahtar masanın üstünde." },
      },
      options: ["anahtar", "sandalye", "kapı", "pencere"],
      explanation: '"der Schlüssel" eril. Artikeliyle birlikte ezberlenecek bir kelime.',
    },
  },
  {
    topic: "Home",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Haus",
      english: "house",
      // No reliable suffix rule — Haus takes das by convention.
      sample: { de: "Das Haus ist sehr groß.", en: "The house is very big." },
    },
    prompt: "Haus",
    hint: "house",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: '"Haus" is neuter → das. Plural: die Häuser.',
    noun: "Haus",
    chunks: ["Haus"],
    tr: {
      topic: "Ev",
      learn: {
        english: "ev",
        sample: { en: "Ev çok büyük." },
      },
      hint: "ev",
      explanation: '"Haus" nötr → das. Çoğulu: die Häuser.',
    },
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
    tr: {
      topic: "Okul",
      learn: {
        english: "okul",
        rule: "Yer/eşya için -e ile biten isimler genelde dişildir → die.",
        sample: { en: "Okulum şehir merkezinde." },
      },
      hint: "okul",
      explanation: "-e ile biten isimler genelde dişildir → die.",
    },
  },
  {
    topic: "Animals",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Hund",
      english: "dog",
      // No reliable suffix rule — Hund takes der by convention.
      sample: { de: "Der Hund läuft im Park.", en: "The dog is running in the park." },
    },
    prompt: "Hund",
    hint: "dog",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Hund" is masculine → der.',
    noun: "Hund",
    chunks: ["Hund"],
    tr: {
      topic: "Hayvanlar",
      learn: {
        english: "köpek",
        sample: { en: "Köpek parkta koşuyor." },
      },
      hint: "köpek",
      explanation: '"Hund" eril → der.',
    },
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
    tr: {
      topic: "Hayvanlar",
      learn: {
        english: "kedi",
        rule: "-e ile biten isimler genelde dişildir → die.",
        sample: { en: "Kedi kanepede uyuyor." },
      },
      options: ["kedi", "fare", "kuş", "at"],
      explanation: '"die Katze" dişil; -e eki genelde die alır.',
    },
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
    tr: {
      topic: "İçecek fiilleri",
      learn: {
        english: "içmek",
        rule: "Düzenli fiil: ich trinke, du trinkst, er trinkt.",
        sample: { en: "Her sabah kahve içerim." },
      },
      prompt: "içmek",
      hint: "Almancasını yaz.",
      explanation: '"trinken" içmenin mastar hâlidir.',
    },
  },
  {
    topic: "Furniture",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Tisch",
      english: "table",
      // No reliable suffix rule — Tisch takes der by convention.
      sample: { de: "Auf dem Tisch steht ein Glas.", en: "There's a glass on the table." },
    },
    prompt: "Tisch",
    hint: "table",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Tisch" is masculine → der.',
    noun: "Tisch",
    chunks: ["Tisch"],
    tr: {
      topic: "Mobilya",
      learn: {
        english: "masa",
        sample: { en: "Masanın üstünde bir bardak var." },
      },
      hint: "masa",
      explanation: '"Tisch" eril → der.',
    },
  },
  {
    topic: "Home",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Tür",
      english: "door",
      // No reliable suffix rule — Tür takes die by convention.
      sample: { de: "Die Tür ist offen.", en: "The door is open." },
    },
    prompt: "Tür",
    hint: "door",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: '"Tür" is feminine → die.',
    noun: "Tür",
    chunks: ["Tür"],
    tr: {
      topic: "Ev",
      learn: {
        english: "kapı",
        sample: { en: "Kapı açık." },
      },
      hint: "kapı",
      explanation: '"Tür" dişil → die.',
    },
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
    tr: {
      topic: "Ulaşım",
      learn: {
        english: "araba",
        rule: "-o ile biten yabancı kökenli isimler genelde nötrdür → das.",
        sample: { en: "Araba çok hızlı gidiyor." },
      },
      options: ["araba", "bisiklet", "tren", "tekne"],
      explanation: '"das Auto" nötr; -o ile biten isimler genelde nötrdür.',
    },
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
    tr: {
      topic: "İletişim",
      learn: {
        english: "konuşmak",
        rule: "Düzensiz fiil, du/er'de kök sesli değişir: du sprichst, er spricht.",
        sample: { en: "Almanca ve İngilizce konuşurum." },
      },
      prompt: "konuşmak",
      hint: "Almancasını yaz.",
      explanation: '"sprechen", du/er formlarında kök sesli e → i olur.',
    },
  },
  {
    topic: "Time",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Zeit",
      english: "time",
      // No reliable suffix rule — Zeit takes die by convention.
      sample: { de: "Ich habe heute keine Zeit.", en: "I have no time today." },
    },
    prompt: "Zeit",
    hint: "time",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: '"Zeit" is feminine → die.',
    noun: "Zeit",
    chunks: ["Zeit"],
    tr: {
      topic: "Zaman",
      learn: {
        english: "zaman",
        sample: { en: "Bugün hiç zamanım yok." },
      },
      hint: "zaman",
      explanation: '"Zeit" dişil → die.',
    },
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
    tr: {
      topic: "İnsanlar",
      learn: {
        english: "adam",
        rule: "Erkek kişileri anlatan isimler erildir → der.",
        sample: { en: "Adam otobüs durağında bekliyor." },
      },
      hint: "adam",
      explanation: '"Mann" eril → der.',
    },
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
    tr: {
      topic: "Okuma fiilleri",
      learn: {
        english: "okumak",
        rule: "Düzensiz fiil, du/er'de kök sesli değişir: du liest, er liest.",
        sample: { en: "Her akşam kitap okurum." },
      },
      prompt: "okumak",
      hint: "Almancasını yaz.",
      explanation: '"lesen", du/er formlarında kök sesli e → ie olur.',
    },
  },
  {
    topic: "Drinks",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Wasser",
      english: "water",
      // No reliable suffix rule — Wasser takes das by convention.
      sample: { de: "Das Wasser ist kalt.", en: "The water is cold." },
    },
    prompt: "Wasser",
    hint: "water",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: '"Wasser" is neuter → das.',
    noun: "Wasser",
    chunks: ["Was", "ser"],
    tr: {
      topic: "İçecekler",
      learn: {
        english: "su",
        sample: { en: "Su soğuk." },
      },
      hint: "su",
      explanation: '"Wasser" nötr → das.',
    },
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
    tr: {
      topic: "Yazma fiilleri",
      learn: {
        english: "yazmak",
        rule: "Düzenli fiil: ich schreibe, du schreibst, er schreibt.",
        sample: { en: "Anneme bir e-posta yazıyorum." },
      },
      prompt: "yazmak",
      hint: "Almancasını yaz.",
      explanation: '"schreiben", şimdiki zamanda düzenli çekim.',
    },
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
    tr: {
      topic: "İlişkiler",
      learn: {
        english: "kız arkadaş / kadın arkadaş",
        rule: "Meslek ve rol isimlerinin -in ekli dişil formları her zaman dişildir → die.",
        sample: { en: "Kız arkadaşım Münih'te yaşıyor." },
      },
      options: ["kız arkadaş / kadın arkadaş", "erkek arkadaş", "kız kardeş", "komşu"],
      explanation: '"die Freundin" dişil form; -in eki her zaman dişildir.',
    },
  },
];

/**
 * Return a locale-appropriate view of a WordItem.
 *
 * For `en`, the item passes through unchanged. For `tr`, the `tr`
 * overlay's fields replace their EN counterparts one-by-one; anything
 * missing from the overlay falls back to the EN source. German-side
 * data (word, article, sample.de, chunks, grammarTags, exerciseType)
 * is locale-agnostic and always passes through.
 *
 * Note: `learn.english` keeps its property name across locales — in
 * TR it carries the Turkish gloss. Renaming would force every consumer
 * to branch on locale, which is exactly what this helper exists to
 * avoid.
 */
export function localizeWord(item: WordItem, locale: Locale): WordItem {
  if (locale === "en" || !item.tr) return item;
  const tr = item.tr;
  return {
    ...item,
    topic: tr.topic ?? item.topic,
    prompt: tr.prompt ?? item.prompt,
    hint: tr.hint ?? item.hint,
    options: tr.options ?? item.options,
    explanation: tr.explanation ?? item.explanation,
    learn: {
      ...item.learn,
      english: tr.learn?.english ?? item.learn.english,
      rule: tr.learn?.rule ?? item.learn.rule,
      sample: {
        ...item.learn.sample,
        en: tr.learn?.sample?.en ?? item.learn.sample.en,
      },
    },
  };
}
