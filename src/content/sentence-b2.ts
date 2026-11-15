/**
 * Sentence, B2 deck (17 items). Based on
 * claude/GenauApp_Web_Try_Sentence_Content_B2.md §4, with one
 * deviation: the doc's single "Zweiteilige Konnektoren" anchor is
 * split here into two separate anchors (zwar ... aber and
 * nicht nur ... sondern auch), one pattern per card. One card
 * teaching both patterns was too much at once.
 *
 * Deck composition:
 *   1-9    Formula anchors (with `learn`): Indirekte Rede,
 *          Passiv mit Modalverb, Doppelter Infinitiv, je ... desto,
 *          Korrelat + Nebensatz, Konditional ohne wenn, als ob / als,
 *          zwar ... aber, nicht nur ... sondern auch.
 *   10-17  Pack-themed scenes (Exercise only): Phone message,
 *          Apartment repairs, Leaving early, Practice makes progress,
 *          Weekend plans, One phone call, Tired neighbor, Hard worker.
 *
 * Reserve pair for shortening the session back to 12 items: anchors
 * 7, 8, 9 and scenes 15, 16, drop all five. Scene 16 ("Hard worker")
 * drills the new anchor 9 (nicht nur ... sondern auch) with
 * different content.
 *
 * No schema changes vs A2 / B1, same SentenceQuestion shape, same
 * role palette. Anchor-2 / 3 / 6 all stack cherry pills at the end
 * (the verb cluster is the lesson); anchor 5 keeps the correlate on
 * `object` (green) so the Verbklammer visually brackets it from the
 * separable prefix. Anchor 7 (als vs als ob) and anchor 8 (paired
 * connectors) are word-order-first lessons that a paradigm table
 * can't teach.
 *
 * Content rules honored:
 *   - No em-dashes anywhere.
 *   - Punctuation attached to its chip (sagte,, warte,, ab,, gewusst,,
 *     müssen.).
 *   - `correctOrder` identity for every item.
 *   - Scenes 9-16 have no `learn`, only `topic` / `words` / `correctOrder`
 *     (+ scene-only tr.topic).
 *   - Example segments cover the entire DE line; the first example of
 *     every anchor equals its own `words` joined on spaces.
 *   - `body` supports `**bold**` only.
 *   - `headline` stays German in the TR overlay (Indirekte Rede,
 *     Passiv mit Modalverb, Doppelter Infinitiv, je ... desto, ...).
 */

import type { SentenceQuestion } from "@/content/sentence-a1";

/** Re-export A1 helpers so callers can import from one place. */
export {
  localizeSentence,
  sentenceLearnAnchors,
} from "@/content/sentence-a1";

export const SENTENCE_B2: SentenceQuestion[] = [
  // 1, Anchor: Indirekte Rede
  {
    topic: "Indirekte Rede",
    words: ["Sie", "sagte,", "die", "Lösung", "sei", "nicht", "perfekt."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    learn: {
      layout: "sentenceFormula",
      headline: "Indirekte Rede",
      english: "Reported speech: Konjunktiv I, with or without dass",
      parts: [
        { text: "Redeeinleitung", translation: "Reporting intro", caption: "sagte, meinte ...", role: "neutral" },
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Verb (K-I)", translation: "Verb (Konjunktiv I)", caption: "Position 2", role: "verb" },
        { text: "Rest", translation: "Rest", caption: "Mittelfeld", role: "neutral" },
      ],
      examples: [
        {
          segments: [
            { text: "Sie sagte,", role: "neutral" },
            { text: "die Lösung", role: "subject" },
            { text: "sei", role: "verb" },
            { text: "nicht perfekt.", role: "neutral" },
          ],
          en: "She said the solution wasn't perfect.",
        },
        {
          segments: [
            { text: "Sie sagte,", role: "neutral" },
            { text: "dass", role: "verb" },
            { text: "die Lösung", role: "subject" },
            { text: "nicht perfekt", role: "neutral" },
            { text: "sei.", role: "verb" },
          ],
          en: "She said that the solution wasn't perfect.",
        },
      ],
      body:
        "**Konjunktiv I** marks reported speech: you pass on someone's words without claiming them yourself. Two word orders are both correct. **Without dass**, the reported part is a normal main clause with the verb in **position 2** (die Lösung **sei** nicht perfekt). **With dass**, it becomes a Nebensatz and the verb goes to the **end** (dass die Lösung nicht perfekt **sei**). Forms for er/sie/es: stem + **e** (sei, habe, komme, könne).",
    },
    tr: {
      topic: "Dolaylı anlatım",
      learn: {
        english: "Aktarılan söz: Konjunktiv I, dass ile veya dass olmadan",
        partCaptions: ["sagte, meinte ...", "1. pozisyon", "2. pozisyon", "Mittelfeld"],
        partTranslations: ["Giriş cümlesi", "Özne", "Fiil (K-I)", "Kalan"],
        exampleEns: [
          "Çözümün mükemmel olmadığını söyledi.",
          "Dedi ki çözüm mükemmel değilmiş.",
        ],
        body:
          "**Konjunktiv I** aktarılan sözü işaretler: başkasının sözünü kendin iddia etmeden aktarırsın, Türkçedeki '-mış' gibi. İki dizilim de doğru. **dass olmadan** aktarılan kısım normal bir ana cümledir, fiil **2. pozisyonda** durur (die Lösung **sei** nicht perfekt). **dass ile** yan cümle olur ve fiil **sona** gider (dass die Lösung nicht perfekt **sei**). er/sie/es biçimi: kök + **e** (sei, habe, komme, könne).",
      },
    },
  },

  // 2, Anchor: Passiv mit Modalverb
  {
    topic: "Passiv mit Modalverb",
    words: ["Die", "Regel", "muss", "noch", "geprüft", "werden."],
    correctOrder: [0, 1, 2, 3, 4, 5],
    learn: {
      layout: "sentenceFormula",
      headline: "Passiv mit Modalverb",
      english: "Modal passive: Modalverb + ... + Partizip II + werden",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Modalverb", translation: "Modal verb", caption: "Position 2", role: "verb" },
        { text: "Mittelfeld", translation: "Middle field", caption: "the rest", role: "neutral" },
        { text: "Partizip II + werden", translation: "Participle + werden", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Die Regel", role: "subject" },
            { text: "muss", role: "verb" },
            { text: "noch", role: "neutral" },
            { text: "geprüft werden.", role: "verb" },
          ],
          en: "The rule still has to be checked.",
        },
        {
          segments: [
            { text: "Es ist klar,", role: "neutral" },
            { text: "dass", role: "verb" },
            { text: "die Regel", role: "subject" },
            { text: "geprüft werden muss.", role: "verb" },
          ],
          en: "It's clear that the rule has to be checked.",
        },
      ],
      body:
        "Passive plus a modal: the **modal** takes position 2, and the end holds **Partizip II + werden** (the passive infinitive): muss geprüft **werden**, kann repariert **werden**. In a **Nebensatz** the modal joins the end as well, and the order is fixed: **Partizip II → werden → Modal** (dass die Regel geprüft werden **muss**). Three verbs in a row, read from the action outward.",
    },
    tr: {
      topic: "Modal fiilli edilgen",
      learn: {
        english: "Modal edilgen: modal fiil + ... + Partizip II + werden",
        partCaptions: ["1. pozisyon", "2. pozisyon", "aradaki her şey", "Son"],
        partTranslations: ["Özne", "Modal fiil", "Mittelfeld", "Partizip II + werden"],
        exampleEns: [
          "Kuralın hâlâ kontrol edilmesi gerekiyor.",
          "Kuralın kontrol edilmesi gerektiği açık.",
        ],
        body:
          "Edilgen artı modal fiil: **modal fiil** 2. pozisyona geçer, sonda **Partizip II + werden** (edilgen mastar) durur: muss geprüft **werden**, kann repariert **werden**. **Yan cümlede** modal fiil de sona gelir ve sıra sabittir: **Partizip II → werden → Modal** (dass die Regel geprüft werden **muss**). Arka arkaya üç fiil, eylemden dışarıya doğru okunur.",
      },
    },
  },

  // 3, Anchor: Doppelter Infinitiv
  {
    topic: "Doppelter Infinitiv",
    words: ["Sie", "kam", "zu", "spät,", "weil", "sie", "hat", "arbeiten", "müssen."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    learn: {
      layout: "sentenceFormula",
      headline: "Doppelter Infinitiv",
      english: "Perfekt of a modal + verb: haben + Infinitiv + Modal-Infinitiv",
      parts: [
        { text: "weil / dass", translation: "Connector", caption: "Konnektor", role: "verb" },
        { text: "Subjekt", translation: "Subject", caption: "Nebensatz", role: "subject" },
        { text: "haben", translation: "haben", caption: "BEFORE the infinitives", role: "verb" },
        { text: "Infinitiv + Modal", translation: "Infinitive + modal", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Sie kam zu spät,", role: "neutral" },
            { text: "weil", role: "verb" },
            { text: "sie", role: "subject" },
            { text: "hat", role: "verb" },
            { text: "arbeiten müssen.", role: "verb" },
          ],
          en: "She came late because she had to work.",
        },
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "habe", role: "verb" },
            { text: "das Auto", role: "object" },
            { text: "nicht", role: "neutral" },
            { text: "reparieren können.", role: "verb" },
          ],
          en: "I wasn't able to repair the car.",
        },
      ],
      body:
        "In the Perfekt, a modal used with another verb drops its Partizip (gemusst, gekonnt) and uses its **infinitive** instead: hat arbeiten **müssen**, habe reparieren **können**. That's the double infinitive. In a main clause nothing surprising happens: haben in position 2, both infinitives at the end. The twist is the **Nebensatz**: haben does NOT go to the very end. It jumps **in front of** both infinitives: weil sie **hat** arbeiten müssen. Spoken German often dodges this with Präteritum: weil sie arbeiten musste.",
    },
    tr: {
      topic: "Çift mastar",
      learn: {
        english: "Modal fiil + fiilin Perfekt'i: haben + mastar + modal mastarı",
        partCaptions: ["Bağlaç", "Yan cümle", "mastarlardan ÖNCE", "Son"],
        partTranslations: ["weil / dass", "Özne", "haben", "Mastar + Modal"],
        exampleEns: [
          "Çalışmak zorunda kaldığı için geç geldi.",
          "Arabayı tamir edemedim.",
        ],
        body:
          "Perfekt'te başka bir fiille kullanılan modal fiil Partizip'ini (gemusst, gekonnt) bırakır ve yerine **mastar** hâlini kullanır: hat arbeiten **müssen**, habe reparieren **können**. Çift mastar budur. Ana cümlede sürpriz yok: haben 2. pozisyonda, iki mastar sonda. İşin püf noktası **yan cümle**: haben en sona GİTMEZ, iki mastarın **önüne** atlar: weil sie **hat** arbeiten müssen. Konuşma dilinde bundan çoğu zaman Präteritum ile kaçılır: weil sie arbeiten musste.",
      },
    },
  },

  // 4, Anchor: je ... desto
  {
    topic: "je ... desto",
    words: ["Je", "länger", "ich", "warte,", "desto", "nervöser", "werde", "ich."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    learn: {
      layout: "sentenceFormula",
      headline: "je ... desto",
      english:
        "The more ..., the more ...: je-clause (verb at end) + desto-clause (inversion)",
      parts: [
        { text: "je + Komparativ", translation: "je + comparative", caption: "Nebensatz start", role: "verb" },
        { text: "Verb", translation: "Verb", caption: "End of Nebensatz", role: "verb" },
        { text: "desto + Komparativ", translation: "desto + comparative", caption: "Position 1", role: "verb" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "Subjekt", translation: "Subject", caption: "after the verb", role: "subject" },
      ],
      examples: [
        {
          segments: [
            { text: "Je länger", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "warte,", role: "verb" },
            { text: "desto nervöser", role: "verb" },
            { text: "werde", role: "verb" },
            { text: "ich.", role: "subject" },
          ],
          en: "The longer I wait, the more nervous I get.",
        },
        {
          segments: [
            { text: "Je später", role: "verb" },
            { text: "es", role: "subject" },
            { text: "wird,", role: "verb" },
            { text: "desto ruhiger", role: "verb" },
            { text: "ist", role: "verb" },
            { text: "die Stadt.", role: "subject" },
          ],
          en: "The later it gets, the quieter the city is.",
        },
      ],
      body:
        "**je + Komparativ** opens a Nebensatz, so its verb goes to the **end** (je länger ich **warte**). **desto + Komparativ** then fills **position 1** of the main clause, so the verb comes right after it and the subject follows: desto nervöser **werde ich**, never desto nervöser ich werde. **umso** works exactly like desto.",
    },
    tr: {
      topic: "ne kadar ... o kadar",
      learn: {
        english: "-dıkça ...: je-cümlesi (fiil sonda) + desto-cümlesi (devrik)",
        partCaptions: [
          "Yan cümle başı",
          "Yan cümle sonu",
          "1. pozisyon",
          "2. pozisyon",
          "fiilden sonra",
        ],
        partTranslations: [
          "je + karşılaştırma",
          "Fiil",
          "desto + karşılaştırma",
          "Fiil",
          "Özne",
        ],
        exampleEns: [
          "Ne kadar uzun beklersem o kadar gerginleşiyorum.",
          "Saat ilerledikçe şehir sessizleşiyor.",
        ],
        body:
          "**je + karşılaştırma** bir yan cümle açar, bu yüzden fiili **sona** gider (je länger ich **warte**). **desto + karşılaştırma** ise ana cümlenin **1. pozisyonunu** doldurur, yani fiil hemen arkasından gelir ve özne onu izler: desto nervöser **werde ich**, asla desto nervöser ich werde değil. **umso** da desto ile birebir aynı çalışır.",
      },
    },
  },

  // 5, Anchor: Korrelat + Nebensatz
  {
    topic: "Korrelat + Nebensatz",
    words: ["Das", "hängt", "davon", "ab,", "ob", "die", "Busse", "pünktlich", "fahren."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    learn: {
      layout: "sentenceFormula",
      headline: "Korrelat + Nebensatz",
      english:
        "Prepositional verb + whole clause: da(r) + Präposition as a placeholder",
      parts: [
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "da(r) + Präp.", translation: "da(r) + preposition", caption: "placeholder", role: "object" },
        { text: "Präfix", translation: "Prefix", caption: "End of Hauptsatz", role: "verb" },
        { text: "ob / dass", translation: "ob / dass", caption: "Nebensatz", role: "verb" },
        { text: "Verb", translation: "Verb", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Das", role: "subject" },
            { text: "hängt", role: "verb" },
            { text: "davon", role: "object" },
            { text: "ab,", role: "verb" },
            { text: "ob", role: "verb" },
            { text: "die Busse pünktlich", role: "neutral" },
            { text: "fahren.", role: "verb" },
          ],
          en: "That depends on whether the buses run on time.",
        },
        {
          segments: [
            { text: "Ich", role: "subject" },
            { text: "freue mich", role: "verb" },
            { text: "darauf,", role: "object" },
            { text: "dass", role: "verb" },
            { text: "du", role: "subject" },
            { text: "morgen", role: "time" },
            { text: "kommst.", role: "verb" },
          ],
          en: "I'm looking forward to you coming tomorrow.",
        },
      ],
      body:
        "When the object of a prepositional verb is a **whole clause**, German leaves a placeholder in the main clause: **da(r) + Präposition** (davon, darauf, damit). It sits where the object would be, so a separable prefix still comes **after** it: hängt **davon ab**, ob ... The real content follows the comma as a **dass-** or **ob-**clause with the verb at the end. To ask about it, use **wo(r)-**: Wovon hängt das ab?",
    },
    tr: {
      topic: "Yer tutucu + yan cümle",
      learn: {
        english:
          "Edatlı fiil + koca bir yan cümle: yer tutucu olarak da(r) + edat",
        partCaptions: [
          "2. pozisyon",
          "yer tutucu",
          "Ana cümle sonu",
          "Yan cümle",
          "Son",
        ],
        partTranslations: [
          "Fiil",
          "da(r) + edat",
          "Ön ek",
          "ob / dass",
          "Fiil",
        ],
        exampleEns: [
          "Bu, otobüslerin dakik olup olmamasına bağlı.",
          "Yarın gelecek olmana seviniyorum.",
        ],
        body:
          "Edatlı bir fiilin nesnesi **koca bir cümle** olunca Almanca ana cümlede bir yer tutucu bırakır: **da(r) + edat** (davon, darauf, damit). Nesnenin duracağı yerde durur, bu yüzden ayrılabilir ön ek yine **ondan sonra** gelir: hängt **davon ab**, ob ... Asıl içerik virgülden sonra fiili sonda olan bir **dass** veya **ob** cümlesiyle gelir. Soru sormak için **wo(r)-** kullanılır: Wovon hängt das ab?",
      },
    },
  },

  // 6, Anchor: Konditional ohne wenn
  {
    topic: "Konditional ohne wenn",
    words: ["Hätte", "ich", "das", "gewusst,", "wäre", "ich", "gekommen."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    learn: {
      layout: "sentenceFormula",
      headline: "Konditional ohne wenn",
      english: "If-clause without wenn: the Konjunktiv II verb moves to position 1",
      parts: [
        { text: "Verb (K-II)", translation: "Verb (Konjunktiv II)", caption: "Position 1!", role: "verb" },
        { text: "Subjekt", translation: "Subject", caption: "after the verb", role: "subject" },
        { text: "Partizip II", translation: "Participle", caption: "End of if-part", role: "verb" },
        { text: "Verb (K-II)", translation: "Verb (Konjunktiv II)", caption: "Hauptsatz", role: "verb" },
        { text: "Partizip II", translation: "Participle", caption: "End", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Hätte", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "das", role: "neutral" },
            { text: "gewusst,", role: "verb" },
            { text: "wäre", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "gekommen.", role: "verb" },
          ],
          en: "Had I known that, I would have come.",
        },
        {
          segments: [
            { text: "Wenn", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "das", role: "neutral" },
            { text: "gewusst hätte,", role: "verb" },
            { text: "wäre", role: "verb" },
            { text: "ich", role: "subject" },
            { text: "gekommen.", role: "verb" },
          ],
          en: "If I had known that, I would have come.",
        },
      ],
      body:
        "Past hypothetical = **hätte / wäre + Partizip II** (Konjunktiv II Vergangenheit). Drop **wenn**, and the finite verb jumps to **position 1**: **Hätte** ich das gewusst, ... It looks like a question, but the comma and the second clause make it a condition. Same meaning as the wenn version, just more compact. The main clause can start with **dann** or **so**.",
    },
    tr: {
      topic: "wenn'siz koşul",
      learn: {
        english: "wenn olmadan koşul: Konjunktiv II fiili 1. pozisyona geçer",
        partCaptions: [
          "1. pozisyon!",
          "fiilden sonra",
          "Koşul kısmı sonu",
          "Ana cümle",
          "Son",
        ],
        partTranslations: [
          "Fiil (K-II)",
          "Özne",
          "Partizip II",
          "Fiil (K-II)",
          "Partizip II",
        ],
        exampleEns: ["Bunu bilseydim gelirdim.", "Eğer bunu bilseydim gelirdim."],
        body:
          "Geçmişe dair hipotez = **hätte / wäre + Partizip II** (Konjunktiv II Vergangenheit). **wenn** düşünce çekimli fiil **1. pozisyona** atlar: **Hätte** ich das gewusst, ... Soru cümlesine benzer ama virgül ve ikinci cümle onu bir koşul yapar. Anlam wenn'li hâliyle aynı, sadece daha derli toplu. Ana cümle **dann** veya **so** ile de başlayabilir.",
      },
    },
  },

  // 7, Anchor: als ob / als (reserve)
  {
    topic: "als ob / als",
    words: ["Er", "tut", "so,", "als", "wüsste", "er", "nichts."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    learn: {
      layout: "sentenceFormula",
      headline: "als ob / als",
      english:
        "As if: als ob + verb at the end, or als + verb immediately",
      parts: [
        { text: "Hauptsatz", translation: "Main clause", caption: "so tun, aussehen ...", role: "neutral" },
        { text: "als", translation: "als", caption: "Konnektor", role: "verb" },
        { text: "Verb (K-II)", translation: "Verb (Konjunktiv II)", caption: "right after als", role: "verb" },
        { text: "Subjekt", translation: "Subject", caption: "after the verb", role: "subject" },
        { text: "Rest", translation: "Rest", caption: "Mittelfeld", role: "neutral" },
      ],
      examples: [
        {
          segments: [
            { text: "Er tut so,", role: "neutral" },
            { text: "als", role: "verb" },
            { text: "wüsste", role: "verb" },
            { text: "er", role: "subject" },
            { text: "nichts.", role: "neutral" },
          ],
          en: "He acts as if he knew nothing.",
        },
        {
          segments: [
            { text: "Er tut so,", role: "neutral" },
            { text: "als ob", role: "verb" },
            { text: "er", role: "subject" },
            { text: "nichts", role: "neutral" },
            { text: "wüsste.", role: "verb" },
          ],
          en: "He acts as if he knew nothing.",
        },
      ],
      body:
        "**als ob** (or als wenn) is a normal Nebensatz: verb at the **end** (als ob er nichts **wüsste**). Plain **als** does something unusual: it pulls the verb **directly after itself**, before the subject (als **wüsste** er nichts). Same meaning. The verb is in **Konjunktiv II** because the comparison isn't real. In written German you'll also see Konjunktiv I (als **sei** er krank).",
    },
    tr: {
      topic: "-mış gibi",
      learn: {
        english:
          "-mış gibi: als ob + fiil sonda, ya da als + fiil hemen arkasında",
        partCaptions: [
          "so tun, aussehen ...",
          "Bağlaç",
          "als'ın hemen ardından",
          "fiilden sonra",
          "Mittelfeld",
        ],
        partTranslations: [
          "Ana cümle",
          "als",
          "Fiil (K-II)",
          "Özne",
          "Kalan",
        ],
        exampleEns: [
          "Hiçbir şey bilmiyormuş gibi davranıyor.",
          "Hiçbir şey bilmiyormuş gibi davranıyor.",
        ],
        body:
          "**als ob** (veya als wenn) normal bir yan cümledir: fiil **sonda** (als ob er nichts **wüsste**). Tek başına **als** ise alışılmadık bir şey yapar: fiili **hemen arkasına**, öznenin önüne çeker (als **wüsste** er nichts). Anlam aynı. Karşılaştırma gerçek olmadığı için fiil **Konjunktiv II**'dedir. Yazı dilinde Konjunktiv I de görürsün (als **sei** er krank).",
      },
    },
  },

  // 8, Anchor: zwar ... aber (reserve).
  // Split from the original "Zweiteilige Konnektoren" mixed anchor,
  // one paired connector per card reads cleaner, so this card only
  // teaches the contrast pattern. The addition pattern (nicht nur …
  // sondern auch) is now the next anchor.
  {
    topic: "zwar ... aber",
    words: ["Die", "Wohnung", "ist", "zwar", "klein,", "aber", "sie", "ist", "günstig."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    learn: {
      layout: "sentenceFormula",
      headline: "zwar ... aber",
      english: "Paired contrast: adverb zwar in the Mittelfeld, aber at position 0",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "zwar", translation: "zwar", caption: "Mittelfeld adverb", role: "verb" },
        { text: "aber", translation: "aber", caption: "Position 0 of clause 2", role: "verb" },
        { text: "Hauptsatz", translation: "Main clause", caption: "normal order", role: "neutral" },
      ],
      examples: [
        {
          segments: [
            { text: "Die Wohnung", role: "subject" },
            { text: "ist", role: "verb" },
            { text: "zwar", role: "verb" },
            { text: "klein,", role: "neutral" },
            { text: "aber", role: "verb" },
            { text: "sie", role: "subject" },
            { text: "ist", role: "verb" },
            { text: "günstig.", role: "neutral" },
          ],
          en: "The apartment is small, but it's affordable.",
        },
        {
          segments: [
            { text: "Zwar", role: "verb" },
            { text: "ist", role: "verb" },
            { text: "die Wohnung", role: "subject" },
            { text: "klein,", role: "neutral" },
            { text: "aber", role: "verb" },
            { text: "günstig.", role: "neutral" },
          ],
          en: "True, the apartment is small, but it's affordable.",
        },
      ],
      body:
        "**zwar** is an adverb that frames the first half as a concession: \"true, …\". It usually sits in the **Mittelfeld** (die Wohnung ist **zwar** klein), but can also take **position 1** with inversion (**Zwar ist** die Wohnung klein, ...). **aber** then opens the second main clause at **position 0**, and the rest of that clause reads in normal word order: aber sie ist günstig. The whole pattern says \"yes this, but also that\", same job as \"true, but ...\" in English.",
    },
    tr: {
      topic: "zwar ... aber",
      learn: {
        english: "Karşıtlık: Mittelfeld'de zwar zarfı, 0. pozisyonda aber",
        partCaptions: [
          "1. pozisyon",
          "2. pozisyon",
          "Mittelfeld zarfı",
          "2. cümlenin 0. pozisyonu",
          "normal dizilim",
        ],
        partTranslations: ["Özne", "Fiil", "zwar", "aber", "Ana cümle"],
        exampleEns: [
          "Daire küçük ama uygun fiyatlı.",
          "Doğru, daire küçük ama uygun fiyatlı.",
        ],
        body:
          "**zwar** bir zarftır ve ilk yarıyı bir kabulleniş gibi çerçeveler: \"evet, …\". Genellikle **Mittelfeld**'de durur (die Wohnung ist **zwar** klein), ama devrik yapıyla **1. pozisyona** da geçebilir (**Zwar ist** die Wohnung klein, ...). **aber** sonra ikinci ana cümleyi **0. pozisyonda** açar ve o cümlenin geri kalanı normal dizilimle okunur: aber sie ist günstig. Bütün kalıp \"evet bu, ama şu da\" der.",
      },
    },
  },

  // 9, Anchor: nicht nur ... sondern auch (reserve).
  // Split from the original mixed anchor. This one is simpler than
  // 8, no inversion games, but it belongs with the paired
  // connectors family and deserves its own card so the learner
  // doesn't read two patterns at once.
  {
    topic: "nicht nur ... sondern auch",
    words: ["Sie", "spricht", "nicht", "nur", "Deutsch,", "sondern", "auch", "Türkisch."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    learn: {
      layout: "sentenceFormula",
      headline: "nicht nur ... sondern auch",
      english: "Paired addition: nicht nur before part 1, sondern auch before part 2",
      parts: [
        { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
        { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
        { text: "nicht nur", translation: "nicht nur", caption: "before part 1", role: "verb" },
        { text: "sondern auch", translation: "sondern auch", caption: "before part 2", role: "verb" },
      ],
      examples: [
        {
          segments: [
            { text: "Sie", role: "subject" },
            { text: "spricht", role: "verb" },
            { text: "nicht nur", role: "verb" },
            { text: "Deutsch,", role: "object" },
            { text: "sondern auch", role: "verb" },
            { text: "Türkisch.", role: "object" },
          ],
          en: "She speaks not only German but also Turkish.",
        },
        {
          segments: [
            { text: "Der Kurs", role: "subject" },
            { text: "ist", role: "verb" },
            { text: "nicht nur", role: "verb" },
            { text: "günstig,", role: "neutral" },
            { text: "sondern auch", role: "verb" },
            { text: "gut.", role: "neutral" },
          ],
          en: "The course is not only affordable but also good.",
        },
      ],
      body:
        "**nicht nur ... sondern auch** is paired addition: two parts of the same sentence held together as \"not just A, but also B\". Unlike zwar ... aber, this pair **doesn't change word order at all**, it drops into whatever slot the two parts share. **sondern** (not aber) is the right word here, because it follows a **negative** (nicht nur). Same family: **sowohl ... als auch**, **weder ... noch**, **entweder ... oder**.",
    },
    tr: {
      topic: "nicht nur ... sondern auch",
      learn: {
        english: "Ekleme: 1. parçadan önce nicht nur, 2. parçadan önce sondern auch",
        partCaptions: [
          "1. pozisyon",
          "2. pozisyon",
          "1. parçadan önce",
          "2. parçadan önce",
        ],
        partTranslations: ["Özne", "Fiil", "nicht nur", "sondern auch"],
        exampleEns: [
          "Sadece Almanca değil, Türkçe de konuşuyor.",
          "Kurs sadece uygun fiyatlı değil, aynı zamanda iyi.",
        ],
        body:
          "**nicht nur ... sondern auch** ekleme çiftidir: aynı cümlenin iki parçasını \"sadece A değil, B de\" olarak bir arada tutar. zwar ... aber'in aksine bu çift **kelime sırasını hiç değiştirmez**, iki parçanın paylaştığı slota girer. Burada **sondern** doğru bağlaçtır (aber değil), çünkü bir **olumsuzluğun** (nicht nur) ardından gelir. Aynı aileden: **sowohl ... als auch**, **weder ... noch**, **entweder ... oder**.",
      },
    },
  },

  // 10, Scene: Phone message
  {
    topic: "Phone message",
    words: ["Der", "Chef", "sagt,", "er", "komme", "später."],
    correctOrder: [0, 1, 2, 3, 4, 5],
    tr: { topic: "Telefon mesajı" },
  },

  // 11, Scene: Apartment repairs (modal passive in Nebensatz)
  {
    topic: "Apartment repairs",
    words: ["Ich", "glaube,", "dass", "die", "Heizung", "repariert", "werden", "muss."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    tr: { topic: "Daire tamiri" },
  },

  // 12, Scene: Leaving early (double infinitive after dass)
  {
    topic: "Leaving early",
    words: ["Schade,", "dass", "er", "hat", "gehen", "müssen."],
    correctOrder: [0, 1, 2, 3, 4, 5],
    tr: { topic: "Erken ayrılış" },
  },

  // 13, Scene: Practice makes progress
  {
    topic: "Practice makes progress",
    words: ["Je", "mehr", "du", "übst,", "desto", "leichter", "wird", "es."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    tr: { topic: "Pratik ilerletir" },
  },

  // 14, Scene: Weekend plans
  {
    topic: "Weekend plans",
    words: ["Es", "kommt", "darauf", "an,", "ob", "es", "regnet."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    tr: { topic: "Hafta sonu planları" },
  },

  // 15, Scene: One phone call (mixed-time wenn-less conditional)
  {
    topic: "One phone call",
    words: ["Hätte", "er", "angerufen,", "wäre", "alles", "gut."],
    correctOrder: [0, 1, 2, 3, 4, 5],
    tr: { topic: "Tek bir telefon" },
  },

  // 16, Scene: Tired neighbor (reserve, als + K-II past)
  {
    topic: "Tired neighbor",
    words: ["Sie", "sieht", "aus,", "als", "hätte", "sie", "nicht", "geschlafen."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    tr: { topic: "Uykusuz komşu" },
  },

  // 17, Scene: Hard worker (reserve, drills anchor 9)
  {
    topic: "Hard worker",
    words: ["Er", "arbeitet", "nicht", "nur", "viel,", "sondern", "auch", "gern."],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    tr: { topic: "Çalışkan" },
  },
];
