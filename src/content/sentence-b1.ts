/**
 * Sentence — B1 deck (12 items). Verbatim port of
 * claude/GenauApp_Web_Try_Sentence_Content_B1.md §4.
 *
 * Deck composition:
 *   1-6  Formula anchors (with `learn`): Wenn-Satz, Vorgangspassiv,
 *        Relativsatz, um ... zu + Infinitiv, Zeit–Modal–Ort
 *        (TEKAMOLO), Nachdem + Perfekt/Plusquamperfekt.
 *   7-12 Pack-themed scenes (Exercise only): Job dream, House
 *        construction, The new neighbor, Study plan, Travel plans,
 *        Morning routine.
 *
 * No schema changes versus A2 — same SentenceQuestion shape,
 * same role palette (connector/verb/subject/object/time/place/
 * reflexive/neutral). The Verbklammer visual (two cherry pills
 * either side of neutral) repeats across anchors 1, 2 and 6
 * intentionally — that IS the lesson ("all these brackets work
 * the same way").
 *
 * Content rules honored (§6 of the brief):
 *   - No em-dashes.
 *   - Punctuation attached to its chip (`Hause,`, `wäre,`, `wohnt,`,
 *     `habe,`, `arbeiten.`).
 *   - `correctOrder` identity across every item.
 *   - Scenes have no `learn`.
 *   - Relativsatz main-clause portions (`Der Mann,`, `ist mein Vater.`)
 *     are intentionally `neutral` — understated so the relative
 *     clause itself visually pops.
 *   - Manner adverbials (TEKAMOLO) land on `neutral` role; no new
 *     manner colour.
 *   - `headline` stays German in the TR mirror (Wenn-Satz,
 *     Vorgangspassiv, Relativsatz …).
 */

import type { SentenceQuestion } from "@/content/sentence-a1";

/** Re-export A1 helpers so callers can import from one place. */
export {
  localizeSentence,
  sentenceLearnAnchors,
} from "@/content/sentence-a1";

export const SENTENCE_B1: SentenceQuestion[] = [
  // 1 — Anchor: Wenn-Satz (hypothetical conditional)
  {
    topic: "Wenn-Satz (hypothetical)",
    words: [
      "Wenn",
      "ich",
      "mehr",
      "Zeit",
      "hätte,",
      "würde",
      "ich",
      "reisen.",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    learn: {
      layout: "sentenceFormula",
      headline: "Wenn-Satz",
      english:
        "Hypothetical: wenn-clause (Konjunktiv II) + würde-clause with inversion",
      parts: [
        { text: "wenn", translation: "Connector", caption: "Konnektor", role: "verb" },
        { text: "Subjekt", translation: "Subject", caption: "Nebensatz", role: "subject" },
        { text: "Mittelfeld", translation: "Middle field", caption: "the rest", role: "neutral" },
        { text: "Verb (K-II)", translation: "Verb (Konjunktiv II)", caption: "End of Nebensatz", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Wenn", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "mehr Zeit", role: "neutral" },
            { text: "hätte,", role: "verb" },
            { text: "würde", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "reisen.", role: "verb" },
          ],
          en: "If I had more time, I would travel.",
        },
        {
          segments: [
            { text: "Wenn", role: "verb" },
            { text: "er", role: "subject" },
            { text: "hier", role: "neutral" },
            { text: "wäre,", role: "verb" },
            { text: "würden", role: "verb" },
            { text: "wir", role: "subject" },
            { text: "zusammen essen.", role: "verb" },
          ],
          en: "If he were here, we would eat together.",
        },
      ],
      body:
        "Hypothetical conditional has TWO Konjunktiv II clauses. The **wenn-Nebensatz** puts its verb (**hätte / wäre / würde**) at the end. The **Hauptsatz** starts with **würde** (because the Nebensatz occupies position 1, so the verb inverts before the subject) and the main verb's infinitive sits at the end.",
    },
    tr: {
      topic: "Wenn cümlesi (hipotetik)",
      learn: {
        english: "Hipotetik: wenn-cümlesi (Konjunktiv II) + würde-cümlesi, devrik",
        partCaptions: [
          "Bağlaç",
          "Yan cümle",
          "aradaki her şey",
          "Yan cümle sonu",
        ],
        partTranslations: ["Bağlaç", "Özne", "Mittelfeld", "Fiil (K-II)"],
        exampleEns: [
          "Daha fazla zamanım olsa, seyahat ederdim.",
          "O burada olsaydı, birlikte yerdik.",
        ],
        body:
          "Hipotetik koşul iki Konjunktiv II cümlesi içerir. **wenn yan cümlesi** fiili (**hätte / wäre / würde**) sona atar. **Ana cümle** **würde** ile başlar (yan cümle 1. pozisyonda olduğu için fiil özneyle yer değiştirir) ve asıl fiilin mastar hâli cümlenin sonundadır.",
      },
    },
  },

  // 2 — Anchor: Vorgangspassiv
  {
    topic: "Vorgangspassiv",
    words: ["Das", "Haus", "wird", "von", "Architekten", "gebaut."],
    correctOrder: [0, 1, 2, 3, 4, 5],
    learn: {
      layout: "sentenceFormula",
      headline: "Vorgangspassiv",
      english: "Passive bracket: werden + ... + Partizip II",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "werden", translation: "Auxiliary", caption: "Position 2", role: "verb" },
        { text: "Agent", translation: "Agent", caption: "von + Dativ", role: "neutral" },
        { text: "Partizip II", translation: "Participle", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Das Haus", role: "subject" },
            { text: "wird", role: "verb" },
            { text: "von Architekten", role: "neutral" },
            { text: "gebaut.", role: "verb" },
          ],
          en: "The house is being built by architects.",
        },
        {
          segments: [
            { text: "Der Brief", role: "subject" },
            { text: "wurde", role: "verb" },
            { text: "gestern", role: "time" },
            { text: "geschrieben.", role: "verb" },
          ],
          en: "The letter was written yesterday.",
        },
      ],
      body:
        "Same bracket as Perfekt — this time **werden** holds position 2 and the **Partizip II** goes to the end. The doer (the agent) often disappears; when named, it appears as **von + Dativ**. Tense lives in werden: **wird** (Präsens), **wurde** (Präteritum), **ist ... worden** (Perfekt).",
    },
    tr: {
      topic: "Edilgen (hareket)",
      learn: {
        english: "Edilgen köprüsü: werden + ... + Partizip II",
        partCaptions: ["1. pozisyon", "2. pozisyon", "von + Dativ", "Son"],
        partTranslations: ["Özne", "Yardımcı", "Eylemi yapan", "Partizip II"],
        exampleEns: [
          "Ev mimarlar tarafından inşa ediliyor.",
          "Mektup dün yazıldı.",
        ],
        body:
          "Perfekt ile aynı köprü — bu sefer **werden** 2. pozisyonu, **Partizip II** sonu tutar. Eylemi yapan genelde kaybolur; adı anıldığında **von + Dativ** ile görünür. Zaman werden'de yaşar: **wird** (Präsens), **wurde** (Präteritum), **ist ... worden** (Perfekt).",
      },
    },
  },

  // 3 — Anchor: Relativsatz
  {
    topic: "Relativsatz",
    words: ["Der", "Mann,", "der", "dort", "steht,", "ist", "mein", "Vater."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    learn: {
      layout: "sentenceFormula",
      headline: "Relativsatz",
      english:
        "Relative clause: NP + comma + rel-pron + ... + verb-final + comma + rest",
      parts: [
        { text: "Bezugswort", translation: "Referent (NP)", caption: "the NP", role: "neutral" },
        { text: "Relativpronomen", translation: "Rel. pronoun", caption: "der / die / das", role: "verb" },
        { text: "Mittelfeld", translation: "Middle field", caption: "the rest", role: "neutral" },
        { text: "Verb am Ende", translation: "Verb at end", caption: "End of clause", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Der Mann,", role: "neutral" },
            { text: "der", role: "verb" },
            { text: "dort", role: "neutral" },
            { text: "steht,", role: "verb" },
            { text: "ist mein Vater.", role: "neutral" },
          ],
          en: "The man who stands there is my father.",
        },
        {
          segments: [
            { text: "Das Buch,", role: "neutral" },
            { text: "das", role: "verb" },
            { text: "ich gestern", role: "neutral" },
            { text: "gelesen habe,", role: "verb" },
            { text: "ist spannend.", role: "neutral" },
          ],
          en: "The book I read yesterday is exciting.",
        },
      ],
      body:
        "A relative clause slides **between two commas** inside the main clause. The relative pronoun gets its **gender** from the referent (Bezugswort) and its **case** from its role inside the relative clause. The clause's verb sits at the **end**, exactly like a weil-Satz.",
    },
    tr: {
      topic: "İlgi cümleciği",
      learn: {
        english:
          "İlgi tümcesi: isim + virgül + ilgi-zamiri + ... + fiil sonda + virgül + kalan",
        partCaptions: [
          "isim öbeği",
          "der / die / das",
          "aradaki her şey",
          "Yan cümle sonu",
        ],
        partTranslations: [
          "İlgili isim",
          "İlgi zamiri",
          "Mittelfeld",
          "Fiil sonda",
        ],
        exampleEns: [
          "Orada duran adam babam.",
          "Dün okuduğum kitap heyecan verici.",
        ],
        body:
          "İlgi cümleciği ana cümlenin içinde **iki virgülün arasına** girer. İlgi zamirinin **cinsi** ilişkili isimden (Bezugswort), **hâli** yan cümledeki rolünden gelir. Yan cümlenin fiili **sondadır**, tam weil-Satz gibi.",
      },
    },
  },

  // 4 — Anchor: um ... zu + Infinitiv
  {
    topic: "um ... zu + Infinitiv",
    words: ["Ich", "lerne", "Deutsch,", "um", "in", "Berlin", "zu", "arbeiten."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    learn: {
      layout: "sentenceFormula",
      headline: "um ... zu + Infinitiv",
      english: "Purpose: 'in order to' with um + ... + zu + Infinitiv at the end",
      parts: [
        { text: "Hauptsatz", translation: "Main clause", caption: "main clause", role: "neutral" },
        { text: "um", translation: "Connector", caption: "Konnektor", role: "verb" },
        { text: "Mittelfeld", translation: "Middle field", caption: "where / how", role: "neutral" },
        { text: "zu + Infinitiv", translation: "zu + infinitive", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich lerne Deutsch,", role: "neutral" },
            { text: "um", role: "verb" },
            { text: "in Berlin", role: "place" },
            { text: "zu arbeiten.", role: "verb" },
          ],
          en: "I'm learning German in order to work in Berlin.",
        },
        {
          segments: [
            { text: "Er fährt zum Bahnhof,", role: "neutral" },
            { text: "um", role: "verb" },
            { text: "seinen Freund", role: "object" },
            { text: "abzuholen.", role: "verb" },
          ],
          en: "He drives to the station to pick up his friend.",
        },
      ],
      body:
        "**um ... zu + Infinitiv** = 'in order to'. The zu-Infinitiv sits at the end. With **separable verbs**, zu slides BETWEEN the prefix and the stem: ab + zu + holen → **abzuholen**, auf + zu + räumen → **aufzuräumen**. Alternative structure: a **damit**-Nebensatz.",
    },
    tr: {
      topic: "um ... zu + mastar",
      learn: {
        english: "Amaç: '-mek için' — um + ... + zu + mastar sonda",
        partCaptions: [
          "önce gelir",
          "Bağlaç",
          "nerede / nasıl",
          "Son",
        ],
        partTranslations: ["Ana cümle", "um", "Mittelfeld", "zu + mastar"],
        exampleEns: [
          "Berlin'de çalışmak için Almanca öğreniyorum.",
          "Arkadaşını almaya gara gidiyor.",
        ],
        body:
          "**um ... zu + mastar** = '-mek için'. zu-mastarı sondadır. **Ayrılabilir fiillerde** zu, ön ek ile fiil kökü ARASINA girer: ab + zu + holen → **abzuholen**, auf + zu + räumen → **aufzuräumen**. Alternatif yapı: **damit** yan cümlesi.",
      },
    },
  },

  // 5 — Anchor: Zeit – Modal – Ort (TEKAMOLO)
  {
    topic: "Zeit – Modal – Ort",
    words: [
      "Ich",
      "fahre",
      "morgen",
      "mit",
      "dem",
      "Auto",
      "nach",
      "Berlin.",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    learn: {
      layout: "sentenceFormula",
      headline: "Zeit – Modal – Ort",
      english:
        "Adverbial order in Mittelfeld: Time, then Manner, then Place",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "Zeit", translation: "Time", caption: "When", role: "time" },
        { text: "Modal", translation: "Manner", caption: "How", role: "neutral" },
        { text: "Ort", translation: "Place", caption: "Where", role: "place" },
      ],
      examples: [
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "fahre", role: "verb" },
            { text: "morgen", role: "time" },
            { text: "mit dem Auto", role: "neutral" },
            { text: "nach Berlin.", role: "place" },
          ],
          en: "Tomorrow I'll drive to Berlin by car.",
        },
        {
          segments: [
            { text: "Wir", role: "subject" },
            { text: "treffen uns", role: "verb" },
            { text: "heute", role: "time" },
            { text: "gern", role: "neutral" },
            { text: "im Café.", role: "place" },
          ],
          en: "We happily meet today at the café.",
        },
      ],
      body:
        "Inside the Mittelfeld, adverbials typically follow the order **Zeit → Modal → Ort** (Time → Manner → Place). Full mnemonic: **TEKAMOLO** (Temporal, Kausal, Modal, Lokal). Any one adverbial can move to position 1 for emphasis — the verb still stays in position 2.",
    },
    tr: {
      topic: "Zaman – Tarz – Yer",
      learn: {
        english: "Mittelfeld'de zarf sırası: Zaman, sonra Tarz, sonra Yer",
        partCaptions: [
          "1. pozisyon",
          "2. pozisyon",
          "Ne zaman",
          "Nasıl",
          "Nerede",
        ],
        partTranslations: ["Özne", "Fiil", "Zaman", "Tarz", "Yer"],
        exampleEns: [
          "Yarın arabayla Berlin'e gideceğim.",
          "Bugün kafede severek buluşuruz.",
        ],
        body:
          "Mittelfeld'de zarflar genelde şu sırayı izler: **Zaman → Tarz → Yer** (Zeit → Modal → Ort). Tam ipucu: **TEKAMOLO** (Temporal, Kausal, Modal, Lokal). Zarflardan herhangi biri vurgu için 1. pozisyona çıkabilir — fiil hâlâ 2. pozisyonda kalır.",
      },
    },
  },

  // 6 — Anchor: Nachdem + Perfekt / Plusquamperfekt
  {
    topic: "Nachdem",
    words: [
      "Nachdem",
      "ich",
      "gefrühstückt",
      "habe,",
      "gehe",
      "ich",
      "zur",
      "Arbeit.",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    learn: {
      layout: "sentenceFormula",
      headline: "Nachdem",
      english:
        "Temporal: 'after' — nachdem-clause one tense deeper than the Hauptsatz",
      parts: [
        { text: "Nachdem", translation: "Connector", caption: "Konnektor", role: "verb" },
        { text: "Subjekt", translation: "Subject", caption: "Nebensatz", role: "subject" },
        { text: "Partizip II", translation: "Participle", caption: "anterior action", role: "verb" },
        { text: "haben / sein", translation: "Auxiliary", caption: "End of Nebensatz", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Nachdem", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "gefrühstückt", role: "verb" },
            { text: "habe,", role: "verb" },
            { text: "gehe", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "zur Arbeit.", role: "place" },
          ],
          en: "After I've had breakfast, I go to work.",
        },
        {
          segments: [
            { text: "Nachdem", role: "verb" },
            { text: "er", role: "subject" },
            { text: "angekommen", role: "verb" },
            { text: "war,", role: "verb" },
            { text: "rief", role: "verb" },
            { text: "er mich", role: "neutral" },
            { text: "an.", role: "verb" },
          ],
          en: "After he had arrived, he called me.",
        },
      ],
      body:
        "**Nachdem** = 'after'. The nachdem-clause is one tense DEEPER than the Hauptsatz, because its action comes first. Common pairs: **Nachdem + Perfekt** → **Hauptsatz-Präsens**. Or: **Nachdem + Plusquamperfekt** → **Hauptsatz-Präteritum**. Verb at the end of the Nebensatz (the auxiliary haben/sein).",
    },
    tr: {
      topic: "Nachdem",
      learn: {
        english:
          "Zamansal: '-dikten sonra' — nachdem cümlesi ana cümleden bir zaman daha geride",
        partCaptions: [
          "Bağlaç",
          "Yan cümle",
          "önceki eylem",
          "Yan cümle sonu",
        ],
        partTranslations: [
          "Nachdem",
          "Özne",
          "Partizip II",
          "haben / sein",
        ],
        exampleEns: [
          "Kahvaltı ettikten sonra işe giderim.",
          "Geldikten sonra beni aradı.",
        ],
        body:
          "**Nachdem** = '-dikten sonra'. nachdem cümlesi ana cümleden bir zaman daha GERİDE olur, çünkü eylem önce gerçekleşir. Yaygın çiftler: **Nachdem + Perfekt** → **ana cümle Präsens**. Ya da: **Nachdem + Plusquamperfekt** → **ana cümle Präteritum**. Fiil (haben/sein) yan cümlenin sonunda.",
      },
    },
  },

  // 7 — Scene: Job dream (Wenn-Satz with sein-wäre)
  {
    topic: "Job dream",
    words: ["Wenn", "ich", "reich", "wäre,", "würde", "ich", "reisen."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    tr: { topic: "İş hayali" },
  },

  // 8 — Scene: House construction (Vorgangspassiv agent-less)
  {
    topic: "House construction",
    words: ["Das", "Haus", "wird", "gebaut."],
    correctOrder: [0, 1, 2, 3],
    tr: { topic: "Ev inşaatı" },
  },

  // 9 — Scene: The new neighbor (Relativsatz feminine Nom)
  {
    topic: "The new neighbor",
    words: ["Die", "Frau,", "die", "neben", "uns", "wohnt,", "ist", "nett."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    tr: { topic: "Yeni komşu" },
  },

  // 10 — Scene: Study plan (um…zu with object)
  {
    topic: "Study plan",
    words: [
      "Ich",
      "lerne",
      "Deutsch,",
      "um",
      "einen",
      "Job",
      "zu",
      "finden.",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    tr: { topic: "Çalışma planı" },
  },

  // 11 — Scene: Travel plans (TEKAMOLO variant)
  {
    topic: "Travel plans",
    words: [
      "Ich",
      "reise",
      "morgen",
      "mit",
      "dem",
      "Zug",
      "nach",
      "München.",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    tr: { topic: "Seyahat planları" },
  },

  // 12 — Scene: Morning routine (Nachdem + Perfekt chain)
  {
    topic: "Morning routine",
    words: ["Nachdem", "ich", "geduscht", "habe,", "trinke", "ich", "Kaffee."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    tr: { topic: "Sabah rutini" },
  },
];
