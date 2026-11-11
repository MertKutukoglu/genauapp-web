/**
 * Grammar — A2 deck (20 items). Verbatim port of
 * claude/GenauApp_Web_Try_Grammar_Content_A2.md §4.
 *
 * Deck composition:
 *   1-5   Anchors (with `learn`): Perfekt, Modalverben, Trennbare
 *         Verben, Akkusativ-Artikel, Personalpronomen (Akk/Dat).
 *   6-20  15 topic-grouped drills (3 per anchor).
 *
 * Mix: 12 multipleChoice + 8 fillBlank (same ratio as A1).
 *
 * Reuses the A1 TypeScript shape from `./grammar-a1.ts`:
 *   - `GrammarQuestion` and `GrammarLearnBlock` are the same shape;
 *     `GrammarLearnLayout` has been extended with
 *     `participleParadigm`, `verbCards`, `articleCards` (A2 layouts).
 *   - New form shapes (ParticipleForm, SeparableVerb, ArticleCaseForm,
 *     PronounCaseForm) live in grammar-a1.ts so they're importable
 *     from one place.
 *   - `normalizeDE` from A1 is reused for fillBlank comparisons.
 *
 * Content rules honored (§6 of the brief):
 *   - No em-dashes.
 *   - `___` always three literal underscores (renderer handles it).
 *   - `hint` always shown below the prompt.
 *   - Umlauts live as real characters (`ä`, `ö`, `ü`, `ß`); the
 *     normalizer handles alt input.
 *   - German paradigm cells (`forms`, `verbs`, `articles`) stay
 *     German in the TR mirror — they're language-neutral tables.
 *   - `sample.highlight` is a substring of `sample.de`; the Perfekt
 *     anchor falls back to single-token `"gelernt"` since the
 *     renderer's `indexOf` match doesn't span non-adjacent tokens
 *     (`"habe gelernt"` would render plain).
 */

import type { GrammarQuestion } from "@/content/grammar-a1";

/** Re-export A1 helpers so callers can import from one place. */
export {
  grammarLearnAnchors,
  localizeGrammar,
  normalizeDE,
} from "@/content/grammar-a1";

export const GRAMMAR_A2: GrammarQuestion[] = [
  // ── 1 ─ Anchor: Perfekt ──────────────────────────────────────────
  {
    topic: "Perfekt",
    exerciseType: "multipleChoice",
    learn: {
      layout: "participleParadigm",
      headline: "Perfekt",
      english: "Past tense: aux + Partizip II at the end",
      note:
        "Use **sein** with motion or state-change verbs (gehen, fahren, kommen); **haben** everywhere else.",
      forms: [
        { infinitive: "lernen", aux: "hat", partizip: "gelernt" },
        { infinitive: "essen", aux: "hat", partizip: "gegessen" },
        { infinitive: "vergessen", aux: "hat", partizip: "vergessen" },
        { infinitive: "gehen", aux: "ist", partizip: "gegangen" },
        { infinitive: "fahren", aux: "ist", partizip: "gefahren" },
        { infinitive: "kommen", aux: "ist", partizip: "gekommen" },
      ],
      sample: {
        de: "Ich habe Deutsch gelernt.",
        en: "I learned German.",
        // Single-token fallback per content rule — the renderer's
        // indexOf cannot span non-adjacent tokens, so "habe gelernt"
        // would render plain. "gelernt" alone still lands the signal.
        highlight: "gelernt",
      },
    },
    prompt: "Ich ___ Brot gegessen.",
    hint: "I ate bread.",
    options: ["habe", "bin", "hast"],
    correctIndex: 0,
    explanation:
      "essen is not a motion verb → aux is haben. 1st person: ich habe.",
    tr: {
      hint: "Ekmek yedim.",
      explanation:
        "essen hareket fiili değil → yardımcı haben. 1. tekil: ich habe.",
      learn: {
        headline: "Perfekt",
        english: "Geçmiş zaman: yardımcı + Partizip II sonda",
        note:
          "Hareket/durum değişikliği fiillerinde (gehen, fahren, kommen) **sein**; diğerlerinde **haben**.",
        sample: { en: "Almanca öğrendim." },
      },
    },
  },

  // ── 2 ─ Anchor: Modalverben ──────────────────────────────────────
  {
    topic: "Modalverben",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbParadigm",
      verb: "müssen",
      english: "to have to / must",
      note:
        "Other A2 modals: **können** (can), **möchten** (would like), **wollen** (want to), **dürfen** (may), **sollen** (should). Modal in position 2; main verb stays as infinitive at the end.",
      forms: [
        { pronoun: "ich", form: "muss" },
        { pronoun: "du", form: "musst" },
        { pronoun: "er / sie / es", form: "muss" },
        { pronoun: "wir", form: "müssen" },
        { pronoun: "ihr", form: "müsst" },
        { pronoun: "sie / Sie", form: "müssen" },
      ],
      sample: {
        de: "Ich muss heute arbeiten.",
        en: "I have to work today.",
        highlight: "muss",
      },
    },
    prompt: "Du ___ zum Arzt gehen.",
    hint: "You have to go to the doctor.",
    options: ["musst", "muss", "müssen"],
    correctIndex: 0,
    explanation: "müssen, 2nd person singular: du musst.",
    tr: {
      hint: "Doktora gitmen lazım.",
      explanation: "müssen, 2. tekil: du musst.",
      learn: {
        english: "zorunda olmak / gerekmek",
        note:
          "A2'nin diğer modal fiilleri: **können** (-ebilmek), **möchten** (istemek), **wollen** (istemek), **dürfen** (izin), **sollen** (-meli). Modal 2. pozisyonda; asıl fiil mastar hâlde sonda.",
        sample: { en: "Bugün çalışmam lazım." },
      },
    },
  },

  // ── 3 ─ Anchor: Trennbare Verben ─────────────────────────────────
  {
    topic: "Trennbare Verben",
    exerciseType: "fillBlank",
    learn: {
      layout: "verbCards",
      headline: "Trennbare Verben",
      english: "Separable verbs: prefix moves to the end in main clauses",
      note:
        "Common separable prefixes: **auf-**, **ein-**, **an-**, **aus-**, **mit-**, **ab-**, **zu-**.",
      verbs: [
        {
          infinitive: "aufstehen",
          example: "Ich stehe auf.",
          english: "to get up",
        },
        {
          infinitive: "einkaufen",
          example: "Ich kaufe ein.",
          english: "to shop",
        },
        { infinitive: "anrufen", example: "Ich rufe an.", english: "to call" },
        {
          infinitive: "einladen",
          example: "Ich lade ein.",
          english: "to invite",
        },
      ],
      sample: {
        de: "Ich stehe um sieben auf.",
        en: "I get up at seven.",
        highlight: "auf",
      },
    },
    prompt: "Ich stehe um sieben ___.",
    hint: "I get up at seven.",
    answer: "auf",
    explanation:
      "aufstehen is separable; the prefix 'auf' moves to the end in main clauses.",
    tr: {
      hint: "Yedide kalkarım.",
      explanation:
        "aufstehen ayrılabilir; 'auf' ön eki ana cümlede sona gider.",
      learn: {
        headline: "Trennbare Verben",
        english: "Ayrılabilir fiiller: ana cümlede ön ek sona gider",
        note:
          "Sık görülen ayrılabilir ön ekler: **auf-**, **ein-**, **an-**, **aus-**, **mit-**, **ab-**, **zu-**.",
        sample: { en: "Yedide kalkarım." },
      },
    },
  },

  // ── 4 ─ Anchor: Akkusativ-Artikel ────────────────────────────────
  {
    topic: "Akkusativ-Artikel",
    exerciseType: "multipleChoice",
    learn: {
      layout: "articleCards",
      headline: "Akkusativ",
      english: "Direct object case: only masculine changes",
      note:
        "Only masculine changes: **der → den**. Feminine, neuter, and plural stay the same in Akkusativ.",
      articles: [
        {
          article: "der",
          role: "masculine",
          nom: { de: "der Mann", en: "the man" },
          akk: { de: "den Mann", en: "the man (direct object)" },
          change: true,
        },
        {
          article: "die",
          role: "feminine",
          nom: { de: "die Frau", en: "the woman" },
          akk: { de: "die Frau", en: "the woman" },
        },
        {
          article: "das",
          role: "neuter",
          nom: { de: "das Kind", en: "the child" },
          akk: { de: "das Kind", en: "the child" },
        },
      ],
      sample: {
        de: "Ich sehe den Mann.",
        en: "I see the man.",
        highlight: "den",
      },
    },
    prompt: "Ich sehe ___ Mann.",
    hint: "I see the man.",
    options: ["den", "der", "dem"],
    correctIndex: 0,
    explanation:
      "Mann is masculine → direct object (Akkusativ): der → den.",
    tr: {
      hint: "Adamı görüyorum.",
      explanation: "Mann eril → nesne hâli (Akkusativ): der → den.",
      learn: {
        headline: "Akkusativ",
        english: "Nesne hâli: sadece eril değişir",
        note:
          "Sadece eril değişir: **der → den**. Dişil, nötr ve çoğul Akkusatif'te aynı kalır.",
        sample: { en: "Adamı görüyorum." },
      },
    },
  },

  // ── 5 ─ Anchor: Personalpronomen (Akk/Dat) ───────────────────────
  {
    topic: "Personalpronomen",
    exerciseType: "multipleChoice",
    learn: {
      layout: "pronounChart",
      headline: "Personalpronomen (Akk/Dat)",
      english: "Personal pronouns in object positions",
      note:
        "**Akkusativ** = direct object (sehe ihn, seeing him). **Dativ** = indirect object (gebe ihm, giving to him).",
      columns: ["Nominativ", "Akkusativ", "Dativ"],
      forms: [
        { german: "ich", akk: "mich", dat: "mir", english: "I / me / to me" },
        { german: "du", akk: "dich", dat: "dir", english: "you" },
        { german: "er", akk: "ihn", dat: "ihm", english: "he / him" },
        { german: "sie", akk: "sie", dat: "ihr", english: "she / her" },
        { german: "es", akk: "es", dat: "ihm", english: "it" },
        { german: "wir", akk: "uns", dat: "uns", english: "we / us" },
        { german: "ihr", akk: "euch", dat: "euch", english: "you (pl.)" },
        {
          german: "sie / Sie",
          akk: "sie",
          dat: "ihnen",
          english: "they / you (formal)",
        },
      ],
      sample: {
        de: "Er gibt mir das Buch.",
        en: "He gives me the book.",
        highlight: "mir",
      },
    },
    prompt: "Er gibt ___ das Buch.",
    hint: "He gives me the book.",
    options: ["mir", "mich", "ihm"],
    correctIndex: 0,
    explanation: "geben + indirect object → Dativ. 'to me' = mir.",
    tr: {
      hint: "Bana kitabı veriyor.",
      explanation: "geben + dolaylı nesne → Dativ. 'bana' = mir.",
      learn: {
        headline: "Personalpronomen (Akk/Dat)",
        english: "Şahıs zamirleri nesne hâllerinde",
        note:
          "**Akkusativ** = -i hâli (ihn = onu). **Dativ** = -e hâli (ihm = ona).",
        sample: { en: "Bana kitabı veriyor." },
      },
    },
  },

  // ── 6 ─ Drill: Perfekt ───────────────────────────────────────────
  {
    topic: "Perfekt",
    exerciseType: "fillBlank",
    prompt: "Wir ___ nach Berlin gefahren.",
    answer: "sind",
    explanation:
      "fahren is a motion verb → aux is sein. 1st person plural: wir sind.",
    hint: "We drove to Berlin.",
    tr: {
      hint: "Berlin'e gittik (arabayla).",
      explanation:
        "fahren hareket fiili → yardımcı sein. 1. çoğul: wir sind.",
    },
  },
  {
    topic: "Perfekt",
    exerciseType: "multipleChoice",
    prompt: "Sie hat gestern Deutsch ___.",
    options: ["gelernt", "lernen", "gelernten", "lernt"],
    correctIndex: 0,
    explanation: "Regular verb: ge- + stem + -t. lernen → gelernt.",
    hint: "She learned German yesterday.",
    tr: {
      hint: "Dün Almanca öğrendi.",
      explanation: "Düzenli fiil: ge- + kök + -t. lernen → gelernt.",
    },
  },
  {
    topic: "Perfekt",
    exerciseType: "multipleChoice",
    prompt: "Ich ___ meinen Schlüssel vergessen.",
    options: ["habe", "bin", "hast", "hat"],
    correctIndex: 0,
    explanation:
      "vergessen is not a motion verb → aux is haben. 1st person: ich habe.",
    hint: "I forgot my key.",
    tr: {
      hint: "Anahtarımı unuttum.",
      explanation:
        "vergessen hareket fiili değil → yardımcı haben. 1. tekil: ich habe.",
    },
  },

  // ── 9 ─ Drills: Modalverben ──────────────────────────────────────
  {
    topic: "Modalverben",
    exerciseType: "multipleChoice",
    prompt: "Ihr ___ pünktlich sein.",
    options: ["müsst", "muss", "müssen", "musst"],
    correctIndex: 0,
    explanation: "müssen, 2nd person plural: ihr müsst.",
    hint: "You (all) have to be on time.",
    tr: {
      hint: "Dakik olmanız lazım.",
      explanation: "müssen, 2. çoğul: ihr müsst.",
    },
  },
  {
    topic: "Modalverben",
    exerciseType: "fillBlank",
    prompt: "Ich ___ heute Pizza essen.",
    answer: "möchte",
    explanation: "möchten, 1st person singular: ich möchte.",
    hint: "I'd like to eat pizza today.",
    tr: {
      hint: "Bugün pizza yemek istiyorum.",
      explanation: "möchten, 1. tekil: ich möchte.",
    },
  },
  {
    topic: "Modalverben",
    exerciseType: "multipleChoice",
    prompt: "Er ___ gut Deutsch sprechen.",
    options: ["kann", "können", "kannst", "könnt"],
    correctIndex: 0,
    explanation: "können, 3rd person singular: er kann.",
    hint: "He can speak German well.",
    tr: {
      hint: "İyi Almanca konuşabiliyor.",
      explanation: "können, 3. tekil: er kann.",
    },
  },

  // ── 12 ─ Drills: Trennbare Verben ────────────────────────────────
  {
    topic: "Trennbare Verben",
    exerciseType: "fillBlank",
    prompt: "Tom ruft mich heute Abend ___.",
    answer: "an",
    explanation:
      "anrufen is separable; 'an' goes to the end in main clauses.",
    hint: "Tom calls me tonight.",
    tr: {
      hint: "Tom bu akşam beni arıyor.",
      explanation: "anrufen ayrılabilir; ana cümlede 'an' sona gider.",
    },
  },
  {
    topic: "Trennbare Verben",
    exerciseType: "multipleChoice",
    prompt: "Wir ___ unsere Freunde zum Essen ein.",
    options: ["laden", "lade", "ladet", "lädst"],
    correctIndex: 0,
    explanation: "einladen, wir-form: wir laden (+ ein at end).",
    hint: "We invite our friends for dinner.",
    tr: {
      hint: "Arkadaşlarımızı yemeğe davet ediyoruz.",
      explanation: "einladen, wir çekimi: wir laden (+ 'ein' sonda).",
    },
  },
  {
    topic: "Trennbare Verben",
    exerciseType: "fillBlank",
    prompt: "Am Samstag ___ ich im Supermarkt ein.",
    answer: "kaufe",
    explanation: "einkaufen stem for ich: ich kaufe (+ ein at end).",
    hint: "On Saturday I shop at the supermarket.",
    tr: {
      hint: "Cumartesi süpermarkette alışveriş yapıyorum.",
      explanation: "einkaufen kökü (ich): ich kaufe (+ 'ein' sonda).",
    },
  },

  // ── 15 ─ Drills: Akkusativ-Artikel ───────────────────────────────
  {
    topic: "Akkusativ-Artikel",
    exerciseType: "multipleChoice",
    prompt: "Sie kauft ___ Tisch.",
    options: ["einen", "ein", "eine", "einem"],
    correctIndex: 0,
    explanation: "Tisch is masculine → Akk indefinite: ein → einen.",
    hint: "She buys a table.",
    tr: {
      hint: "Bir masa alıyor.",
      explanation: "Tisch eril → Akkusativ belgisiz: ein → einen.",
    },
  },
  {
    topic: "Akkusativ-Artikel",
    exerciseType: "fillBlank",
    prompt: "Ich habe ___ Hund.",
    answer: "einen",
    explanation: "Hund is masculine → Akk indefinite: einen.",
    hint: "I have a dog.",
    tr: {
      hint: "Bir köpeğim var.",
      explanation: "Hund eril → Akkusativ belgisiz: einen.",
    },
  },
  {
    topic: "Akkusativ-Artikel",
    exerciseType: "multipleChoice",
    prompt: "Er trinkt ___ Wasser.",
    options: ["das", "dem", "den", "der"],
    correctIndex: 0,
    explanation: "Wasser is neuter → stays as das in Akkusativ.",
    hint: "He drinks the water.",
    tr: {
      hint: "Suyu içiyor.",
      explanation: "Wasser nötr → Akkusativ'te aynı kalır: das.",
    },
  },

  // ── 18 ─ Drills: Personalpronomen ────────────────────────────────
  {
    topic: "Personalpronomen",
    exerciseType: "multipleChoice",
    prompt: "Ich sehe ___ im Park.",
    options: ["ihn", "er", "ihm", "sein"],
    correctIndex: 0,
    explanation: "sehen + direct object → Akkusativ. 'him' = ihn.",
    hint: "I see him in the park.",
    tr: {
      hint: "Onu parkta görüyorum.",
      explanation: "sehen + nesne → Akkusativ. 'onu' = ihn.",
    },
  },
  {
    topic: "Personalpronomen",
    exerciseType: "fillBlank",
    prompt: "Wir helfen ___.",
    answer: "ihnen",
    explanation: "helfen takes Dativ. 'them' = ihnen.",
    hint: "We help them.",
    tr: {
      hint: "Onlara yardım ediyoruz.",
      explanation: "helfen Dativ ister. 'onlara' = ihnen.",
    },
  },
  {
    topic: "Personalpronomen",
    exerciseType: "multipleChoice",
    prompt: "Die Mutter kocht ___ eine Suppe.",
    options: ["ihm", "ihn", "er", "ihrem"],
    correctIndex: 0,
    explanation: "indirect object (for him) → Dativ: ihm.",
    hint: "The mother cooks him a soup.",
    tr: {
      hint: "Anne ona bir çorba pişiriyor.",
      explanation: "dolaylı nesne (ona) → Dativ: ihm.",
    },
  },
];
