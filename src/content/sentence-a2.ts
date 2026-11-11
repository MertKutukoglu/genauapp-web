/**
 * Sentence — A2 deck (12 items). Verbatim port of
 * claude/GenauApp_Web_Try_Sentence_Content_A2.md §4.
 *
 * Deck composition:
 *   1-6  Formula anchors (with `learn`): Perfekt, Modalverb,
 *        Trennbares Verb, Nebensatz mit weil, Reflexivpronomen,
 *        Richtung vs. Ort.
 *   7-12 Pack-themed scenes (Exercise only): Daily rush, Weekend
 *        plans, Doctor visit, Phone call, Staying home, Remembering.
 *
 * Reuses the A1 TypeScript shape from `./sentence-a1.ts`:
 *   - `SentenceQuestion` structure is identical.
 *   - New `"reflexive"` role is added to `SentenceRole` (blue, same
 *     as `subject`), extending ROLE_COLORS in
 *     `src/lib/sentence/roleColors.ts`.
 *   - The Verbklammer teaching happens visually: Perfekt / Modalverb
 *     / Trennbares Verb all ship two cherry (`verb` role) pills at
 *     the edges of the parts strip with `neutral` in between — the
 *     color repetition IS the pedagogy.
 *
 * Content rules honored (§6 of the brief):
 *   - No em-dashes anywhere.
 *   - Punctuation attached to its chip (`"Hause,"`, `"bin."`,
 *     `"an."`, `"ein."`, etc.).
 *   - `correctOrder` always identity.
 *   - Scenes have NO `learn`.
 *   - Richtung/Ort use the same `place` role (violet); case contrast
 *     lives in the German text (die Stadt vs der Stadt).
 *   - `headline` stays German in the TR overlay.
 */

import type { SentenceQuestion } from "@/content/sentence-a1";

/** Re-export the A1 helpers so A2 consumers don't double-import. */
export {
  localizeSentence,
  sentenceLearnAnchors,
} from "@/content/sentence-a1";

export const SENTENCE_A2: SentenceQuestion[] = [
  // 1 — Anchor: Perfekt
  {
    topic: "Perfekt",
    words: ["Ich", "habe", "Brot", "gegessen."],
    correctOrder: [0, 1, 2, 3],
    learn: {
      layout: "sentenceFormula",
      headline: "Perfekt",
      english: "Past tense: aux in position 2, participle at the end",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Hilfsverb", translation: "Auxiliary", caption: "haben / sein", role: "verb" },
        { text: "Mittelfeld", translation: "Middle field", caption: "the rest", role: "neutral" },
        { text: "Partizip II", translation: "Participle", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "habe", role: "verb" },
            { text: "Brot", role: "object" },
            { text: "gegessen.", role: "verb" },
          ],
          en: "I ate bread.",
        },
        {
          segments: [
            { text: "Wir", role: "subject" },
            { text: "sind", role: "verb" },
            { text: "nach Berlin", role: "place" },
            { text: "gefahren.", role: "verb" },
          ],
          en: "We drove to Berlin.",
        },
      ],
      body:
        "In Perfekt, the auxiliary (**haben** or **sein**) sits in position 2 and the past participle goes to the **end**. Together they form the **Verbklammer** (verb bracket). Use **sein** with motion or state-change verbs (gehen, fahren, kommen); **haben** everywhere else.",
    },
    tr: {
      topic: "Perfekt",
      learn: {
        english: "Geçmiş zaman: yardımcı 2. pozisyonda, ortaç sonda",
        partCaptions: ["1. pozisyon", "haben / sein", "aradaki her şey", "Son"],
        partTranslations: ["Özne", "Yardımcı", "Mittelfeld", "Partizip II"],
        exampleEns: ["Ekmek yedim.", "Berlin'e gittik."],
        body:
          "Perfekt'te yardımcı fiil (**haben** veya **sein**) 2. pozisyondadır, Partizip II (geçmiş ortacı) cümlenin **sonuna** gider. Birlikte **Verbklammer** (fiil köprüsü) kurarlar. Hareket/durum değişikliği fiillerinde (gehen, fahren, kommen) **sein**; diğerlerinde **haben**.",
      },
    },
  },

  // 2 — Anchor: Modalverb
  {
    topic: "Modalverb",
    words: ["Ich", "möchte", "heute", "kochen."],
    correctOrder: [0, 1, 2, 3],
    learn: {
      layout: "sentenceFormula",
      headline: "Modalverb",
      english: "Modal in position 2, infinitive at the end",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Modalverb", translation: "Modal", caption: "möchten / müssen", role: "verb" },
        { text: "Mittelfeld", translation: "Middle field", caption: "the rest", role: "neutral" },
        { text: "Infinitiv", translation: "Infinitive", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "möchte", role: "verb" },
            { text: "heute", role: "time" },
            { text: "kochen.", role: "verb" },
          ],
          en: "I'd like to cook today.",
        },
        {
          segments: [
            { text: "Du", role: "subject" },
            { text: "musst", role: "verb" },
            { text: "zum Arzt", role: "place" },
            { text: "gehen.", role: "verb" },
          ],
          en: "You have to go to the doctor.",
        },
      ],
      body:
        "Modal verbs like **möchten**, **müssen**, **können**, **wollen**, **dürfen**, **sollen** take position 2. The main verb stays as a bare **infinitive** and moves to the end. Same **Verbklammer** pattern as Perfekt.",
    },
    tr: {
      topic: "Modal fiil",
      learn: {
        english: "Modal fiil 2. pozisyonda, mastar sonda",
        partCaptions: ["1. pozisyon", "möchten / müssen", "aradaki her şey", "Son"],
        partTranslations: ["Özne", "Modal fiil", "Mittelfeld", "Mastar"],
        exampleEns: ["Bugün yemek yapmak istiyorum.", "Doktora gitmen lazım."],
        body:
          "**möchten**, **müssen**, **können**, **wollen**, **dürfen**, **sollen** gibi modal fiiller 2. pozisyondadır. Asıl fiil **mastar** hâlde kalır ve cümlenin sonuna gider. Perfekt ile aynı **Verbklammer** yapısı.",
      },
    },
  },

  // 3 — Anchor: Trennbares Verb
  {
    topic: "Trennbares Verb",
    words: ["Ich", "stehe", "um", "sieben", "auf."],
    correctOrder: [0, 1, 2, 3, 4],
    learn: {
      layout: "sentenceFormula",
      headline: "Trennbares Verb",
      english: "Separable verb: stem in position 2, prefix at the end",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Verbstamm", translation: "Verb stem", caption: "Position 2", role: "verb" },
        { text: "Mittelfeld", translation: "Middle field", caption: "the rest", role: "neutral" },
        { text: "Präfix", translation: "Prefix", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "stehe", role: "verb" },
            { text: "um sieben", role: "time" },
            { text: "auf.", role: "verb" },
          ],
          en: "I get up at seven.",
        },
        {
          segments: [
            { text: "Tom", role: "subject" },
            { text: "ruft", role: "verb" },
            { text: "mich heute", role: "neutral" },
            { text: "an.", role: "verb" },
          ],
          en: "Tom calls me today.",
        },
      ],
      body:
        "In main clauses, separable verbs (**aufstehen**, **anrufen**, **einkaufen**, **einladen**) split in two. The stem sits in position 2; the prefix goes to the **end**. Same bracket as Perfekt and Modal, with the prefix playing the 'end' role.",
    },
    tr: {
      topic: "Ayrılabilir fiil",
      learn: {
        english: "Ayrılabilir fiil: kök 2. pozisyonda, ön ek sonda",
        partCaptions: ["1. pozisyon", "2. pozisyon", "aradaki her şey", "Son"],
        partTranslations: ["Özne", "Fiil kökü", "Mittelfeld", "Ön ek"],
        exampleEns: ["Yedide kalkarım.", "Tom beni bugün arıyor."],
        body:
          "Ana cümlede ayrılabilir fiiller (**aufstehen**, **anrufen**, **einkaufen**, **einladen**) ikiye bölünür. Fiil kökü 2. pozisyonda kalır, ön ek cümlenin **sonuna** gider. Perfekt ve Modal ile aynı köprü yapısı; bu sefer 'son' tarafında ön ek var.",
      },
    },
  },

  // 4 — Anchor: Nebensatz mit weil
  {
    topic: "Nebensatz mit weil",
    words: ["Ich", "bleibe", "zu", "Hause,", "weil", "ich", "müde", "bin."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    learn: {
      layout: "sentenceFormula",
      headline: "Nebensatz mit weil",
      english: "Subordinate clause: connector + ... + verb at the end",
      parts: [
        { text: "Hauptsatz", translation: "Main clause", caption: "Main clause", role: "neutral" },
        { text: "Konnektor", translation: "Connector", caption: "weil / dass", role: "verb" },
        { text: "Subjekt", translation: "Subject", caption: "Who", role: "subject" },
        { text: "Verb am Ende", translation: "Verb at end", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich bleibe zu Hause,", role: "neutral" },
            { text: "weil", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "müde", role: "neutral" },
            { text: "bin.", role: "verb" },
          ],
          en: "I'm staying home because I'm tired.",
        },
        {
          segments: [
            { text: "Er sagt,", role: "neutral" },
            { text: "dass", role: "verb" },
            { text: "er", role: "subject" },
            { text: "morgen", role: "time" },
            { text: "kommt.", role: "verb" },
          ],
          en: "He says that he's coming tomorrow.",
        },
      ],
      body:
        "Subordinating connectors — **weil** (because), **dass** (that), **wenn** (when/if), **obwohl** (although), **damit** (so that) — push the finite verb to the **end** of their clause. Comma before the connector. Same rule for all of them.",
    },
    tr: {
      topic: "weil ile yan cümle",
      learn: {
        english: "Yan cümle: bağlaç + ... + fiil sonda",
        partCaptions: ["Önce", "weil / dass", "Kim", "Son"],
        partTranslations: ["Ana cümle", "Bağlaç", "Özne", "Fiil sonda"],
        exampleEns: [
          "Yorgun olduğum için evde kalıyorum.",
          "Yarın geleceğini söylüyor.",
        ],
        body:
          "Alt bağlaçlar — **weil** (çünkü), **dass** (ki), **wenn** (ne zaman/eğer), **obwohl** (rağmen), **damit** (-sin diye) — çekimli fiili yan cümlenin **sonuna** gönderir. Bağlaçtan önce virgül. Hepsinde aynı kural.",
      },
    },
  },

  // 5 — Anchor: Reflexivpronomen
  {
    topic: "Reflexivpronomen",
    words: ["Ich", "wasche", "mich", "jeden", "Morgen."],
    correctOrder: [0, 1, 2, 3, 4],
    learn: {
      layout: "sentenceFormula",
      headline: "Reflexivpronomen",
      english: "Reflexive pronoun: right after the verb in Mittelfeld",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        {
          text: "Reflexivpronomen",
          translation: "Reflexive",
          caption: "mich / dich / sich",
          role: "reflexive",
        },
        { text: "Rest", translation: "Rest", caption: "the rest", role: "neutral" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "wasche", role: "verb" },
            { text: "mich", role: "reflexive" },
            { text: "jeden Morgen.", role: "time" },
          ],
          en: "I wash myself every morning.",
        },
        {
          segments: [
            { text: "Er", role: "subject" },
            { text: "erinnert", role: "verb" },
            { text: "sich", role: "reflexive" },
            { text: "an den Film.", role: "neutral" },
          ],
          en: "He remembers the film.",
        },
      ],
      body:
        "Reflexive verbs need a pronoun that matches the subject: **mich** (ich), **dich** (du), **sich** (er/sie/es/sie/Sie), **uns** (wir), **euch** (ihr). The pronoun usually sits **right after** the finite verb in the Mittelfeld.",
    },
    tr: {
      topic: "Dönüşlü zamir",
      learn: {
        english: "Dönüşlü zamir: fiilden hemen sonra, Mittelfeld'de",
        partCaptions: ["1. pozisyon", "2. pozisyon", "mich / dich / sich", "aradaki her şey"],
        partTranslations: ["Özne", "Fiil", "Dönüşlü zamir", "Kalan"],
        exampleEns: ["Her sabah yıkanırım.", "Filmi hatırlıyor."],
        body:
          "Dönüşlü fiiller özneyle uyumlu bir zamir ister: **mich** (ich), **dich** (du), **sich** (er/sie/es/sie/Sie), **uns** (wir), **euch** (ihr). Zamir genelde çekimli fiilden **hemen sonra** Mittelfeld'de durur.",
      },
    },
  },

  // 6 — Anchor: Richtung vs. Ort
  {
    topic: "Richtung vs. Ort",
    words: ["Ich", "fahre", "in", "die", "Stadt."],
    correctOrder: [0, 1, 2, 3, 4],
    learn: {
      layout: "sentenceFormula",
      headline: "Richtung vs. Ort",
      english: "Two-way prepositions: Akk (direction) vs. Dat (location)",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Who", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "Ort / Richtung", translation: "Place / Direction", caption: "Akk ↔ Dat", role: "place" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "fahre", role: "verb" },
            { text: "in die Stadt.", role: "place" },
          ],
          en: "I'm driving into town.",
        },
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "wohne", role: "verb" },
            { text: "in der Stadt.", role: "place" },
          ],
          en: "I live in the town.",
        },
      ],
      body:
        "With two-way prepositions (**in**, **auf**, **an**, **über**, **unter**, **vor**, **hinter**, **neben**, **zwischen**), the case reveals the meaning: **Akkusativ** = direction (where to?), **Dativ** = location (where at?). Same preposition, different case.",
    },
    tr: {
      topic: "Yön vs. Yer",
      learn: {
        english: "İki yönlü edatlar: Akk (yön) vs. Dat (yer)",
        partCaptions: ["Kim", "2. pozisyon", "Akk ↔ Dat"],
        partTranslations: ["Özne", "Fiil", "Yer / Yön"],
        exampleEns: ["Şehre gidiyorum.", "Şehirde yaşıyorum."],
        body:
          "İki yönlü edatlarla (**in**, **auf**, **an**, **über**, **unter**, **vor**, **hinter**, **neben**, **zwischen**) hâl ayırt edicidir: **Akkusativ** = yön (nereye?), **Dativ** = yer (nerede?). Aynı edat, farklı hâl.",
      },
    },
  },

  // 7 — Scene: Daily rush
  {
    topic: "Daily rush",
    words: ["Ich", "muss", "mich", "beeilen."],
    correctOrder: [0, 1, 2, 3],
    tr: { topic: "Günlük telaş" },
  },

  // 8 — Scene: Weekend plans
  {
    topic: "Weekend plans",
    words: ["Am", "Wochenende", "lade", "ich", "Tom", "ein."],
    correctOrder: [0, 1, 2, 3, 4, 5],
    tr: { topic: "Hafta sonu planları" },
  },

  // 9 — Scene: Doctor visit
  {
    topic: "Doctor visit",
    words: ["Ich", "bin", "zum", "Arzt", "gegangen."],
    correctOrder: [0, 1, 2, 3, 4],
    tr: { topic: "Doktor ziyareti" },
  },

  // 10 — Scene: Phone call
  {
    topic: "Phone call",
    words: ["Tom", "ruft", "mich", "heute", "Abend", "an."],
    correctOrder: [0, 1, 2, 3, 4, 5],
    tr: { topic: "Telefon görüşmesi" },
  },

  // 11 — Scene: Staying home
  {
    topic: "Staying home",
    words: ["Ich", "bleibe", "zu", "Hause,", "weil", "ich", "müde", "bin."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    tr: { topic: "Evde kalmak" },
  },

  // 12 — Scene: Remembering
  {
    topic: "Remembering",
    words: ["Ich", "habe", "mich", "an", "dich", "erinnert."],
    correctOrder: [0, 1, 2, 3, 4, 5],
    tr: { topic: "Hatırlamak" },
  },
];

