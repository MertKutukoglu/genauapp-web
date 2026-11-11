/**
 * Reading — A2 content (1 passage + 10 MC questions). Verbatim port
 * of claude/GenauApp_Web_Try_Reading_Content_A2.md §3.
 *
 * Differences from A1:
 *   - Passage grows to ~165 German words in 4 paragraphs (A1 was
 *     ~90 words, 1 paragraph). The `\n\n` paragraph splitter in
 *     ReadingPassageCard already handles multi-paragraph bodies.
 *   - 10 questions, exactly 2 per qType in Main Idea → Detail →
 *     Vocabulary → Inference → Sequence order (standing rule from
 *     GenauApp_Reading_Feature_Reference.md §7.1).
 *   - Chip-level `tr.title` translates the passage title; the
 *     passage itself stays German.
 *   - ~70% overlap with WORDS_A2 (sich beeilen, aufstehen, Termin,
 *     Nachbarin, vergessen, Glück, Kollege, anrufen, Angst, Freude,
 *     einladen, sich erinnern, Wochenende). Reading reinforces the
 *     vocab the learner just drilled next door.
 */

import type { ReadingContent } from "@/content/reading-a1";

export const READING_A2: ReadingContent = {
  title: "Max hat einen schlechten Morgen",
  subtitle: "A2 · ~2 min read",
  passage:
    "Am Montagmorgen klingelt der Wecker um sieben, aber Max hört ihn nicht. Er wacht erst um halb neun auf. Er hat einen wichtigen Termin im Büro und muss sich beeilen. Er steht schnell auf, wäscht sich und zieht sich an.\n\nDann sucht er seinen Schlüssel. Wo ist er? Max hat gestern vergessen, den Schlüssel auf den Tisch zu legen. Zum Glück klingelt in diesem Moment seine Nachbarin. Sie hat den Schlüssel im Flur gefunden. Max bedankt sich schnell und läuft zur Bushaltestelle.\n\nIm Büro wartet sein Kollege Tom. Tom ruft Max an, weil der Termin bald beginnt. Max hat Angst, dass sein Chef böse wird. Aber Tom sagt, der Termin beginnt erst in zehn Minuten. Max fühlt große Freude.\n\nAm Abend lädt Tom ihn zum Essen am Wochenende ein. Max erinnert sich: Gute Nachbarn und Kollegen sind Gold wert.",
  tr: {
    title: "Max'ın kötü bir sabahı",
  },
  questions: [
    // 1 — Main Idea
    {
      qType: "Main Idea",
      topic: "Main idea",
      prompt: "Was ist das Hauptproblem in der Geschichte?",
      options: [
        "Max hat verschlafen und muss sich sehr beeilen.",
        "Max hat seinen Job verloren.",
        "Max ist krank und bleibt zu Hause.",
        "Max fährt in den Urlaub.",
      ],
      correctIndex: 0,
      explanation:
        'The text opens with Max oversleeping ("Er wacht erst um halb neun auf") and having to hurry for an important appointment.',
      tr: {
        topic: "Ana fikir",
        prompt: "Hikâyedeki ana problem nedir?",
        options: [
          "Max uyuyakalmıştır ve çok acele etmesi gerekiyor.",
          "Max işini kaybetmiştir.",
          "Max hastadır ve evde kalır.",
          "Max tatile gider.",
        ],
        explanation:
          'Hikâye Max\'ın uyuyakalmasıyla ("Er wacht erst um halb neun auf") başlar ve önemli bir randevuya acele etmesi gerekir.',
      },
    },
    // 2 — Main Idea
    {
      qType: "Main Idea",
      topic: "Main idea",
      prompt: "Wie endet die Geschichte für Max?",
      options: [
        "Mit einer schönen Überraschung von seinem Kollegen.",
        "Mit einem Streit mit dem Chef.",
        "Mit einem Umzug in eine neue Wohnung.",
        "Mit einem Arztbesuch.",
      ],
      correctIndex: 0,
      explanation:
        "At the end Tom invites Max for dinner on the weekend. The stressful morning turns into a positive moment.",
      tr: {
        topic: "Ana fikir",
        prompt: "Hikâye Max için nasıl bitiyor?",
        options: [
          "Meslektaşından güzel bir sürprizle.",
          "Patronuyla bir kavgayla.",
          "Yeni bir daireye taşınmayla.",
          "Doktor ziyaretiyle.",
        ],
        explanation:
          "Sonunda Tom, Max'ı hafta sonu yemeğe davet eder. Stresli sabah güzel bir ana dönüşür.",
      },
    },
    // 3 — Detail
    {
      qType: "Detail",
      topic: "Detail",
      prompt: "Wann wacht Max wirklich auf?",
      options: ["um sieben", "um halb acht", "um halb neun", "um zehn"],
      correctIndex: 2,
      explanation:
        '"Er wacht erst um halb neun auf." The alarm rang at seven but he slept through it.',
      tr: {
        topic: "Detay",
        prompt: "Max gerçekten saat kaçta uyanıyor?",
        options: [
          "saat yedide",
          "yedi buçukta",
          "sekiz buçukta",
          "saat onda",
        ],
        explanation:
          '"Er wacht erst um halb neun auf." Alarm yedide çaldı ama uyuyakaldı.',
      },
    },
    // 4 — Detail
    {
      qType: "Detail",
      topic: "Detail",
      prompt: "Wer findet Max' Schlüssel?",
      options: [
        "sein Kollege Tom",
        "seine Nachbarin",
        "sein Chef",
        "er selbst",
      ],
      correctIndex: 1,
      explanation:
        '"Zum Glück klingelt in diesem Moment seine Nachbarin. Sie hat den Schlüssel im Flur gefunden."',
      tr: {
        topic: "Detay",
        prompt: "Max'ın anahtarını kim buluyor?",
        options: [
          "meslektaşı Tom",
          "komşusu (kadın)",
          "patronu",
          "kendisi",
        ],
        explanation:
          '"Zum Glück klingelt in diesem Moment seine Nachbarin. Sie hat den Schlüssel im Flur gefunden."',
      },
    },
    // 5 — Vocabulary
    {
      qType: "Vocabulary",
      topic: "Vocabulary",
      prompt: 'Was bedeutet "sich beeilen" im Text?',
      options: ["to hurry", "to relax", "to sleep", "to shower"],
      correctIndex: 0,
      explanation:
        '"Er muss sich beeilen" — the verb means to hurry, used reflexively.',
      tr: {
        topic: "Kelime",
        prompt: 'Metindeki "sich beeilen" ne demek?',
        options: ["acele etmek", "rahatlamak", "uyumak", "duş almak"],
        explanation:
          "\"Er muss sich beeilen\", bu fiil dönüşlü hâliyle 'acele etmek' demektir.",
      },
    },
    // 6 — Vocabulary
    {
      qType: "Vocabulary",
      topic: "Vocabulary",
      prompt: 'Was bedeutet "lädt ... ein" (einladen) hier?',
      options: ["to invite", "to visit", "to cancel", "to forget"],
      correctIndex: 0,
      explanation:
        '"Tom lädt ihn zum Essen ein" — einladen is a separable verb meaning to invite.',
      tr: {
        topic: "Kelime",
        prompt: 'Burada "lädt ... ein" (einladen) ne demek?',
        options: ["davet etmek", "ziyaret etmek", "iptal etmek", "unutmak"],
        explanation:
          "\"Tom lädt ihn zum Essen ein\", einladen ayrılabilir bir fiildir ve 'davet etmek' demektir.",
      },
    },
    // 7 — Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt: "Warum ruft Tom Max an?",
      options: [
        "Weil er sich Sorgen macht, dass Max den Termin verpasst.",
        "Weil Tom einen neuen Job gefunden hat.",
        "Weil Tom krank ist.",
        "Weil Tom seinen Schlüssel sucht.",
      ],
      correctIndex: 0,
      explanation:
        'The text says "Tom ruft Max an, weil der Termin bald beginnt" — Tom calls because he\'s worried Max won\'t make it on time. The \'worry\' part is inferred from the friendly context.',
      tr: {
        topic: "Çıkarım",
        prompt: "Tom neden Max'ı arıyor?",
        options: [
          "Max'ın randevuyu kaçıracağından endişelendiği için.",
          "Tom yeni bir iş bulduğu için.",
          "Tom hasta olduğu için.",
          "Tom kendi anahtarını aradığı için.",
        ],
        explanation:
          "Metinde \"Tom ruft Max an, weil der Termin bald beginnt\" diyor; Tom, Max zamanında yetişemez diye endişelendiği için arıyor. 'Endişelenme' kısmı dostça bağlamdan çıkarılıyor.",
      },
    },
    // 8 — Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt: "Warum fühlt Max am Ende Freude?",
      options: [
        "Weil er noch pünktlich ist und einen netten Kollegen hat.",
        "Weil er seinen Chef kennengelernt hat.",
        "Weil er einen neuen Schlüssel bekommen hat.",
        "Weil er ein neues Auto gekauft hat.",
      ],
      correctIndex: 0,
      explanation:
        "Tom tells Max the appointment starts in ten minutes, not now — plus a nice colleague makes the stressful morning worth it.",
      tr: {
        topic: "Çıkarım",
        prompt: "Max sonunda neden sevinç hissediyor?",
        options: [
          "Hâlâ zamanında olduğu ve iyi bir meslektaşı olduğu için.",
          "Patronuyla tanıştığı için.",
          "Yeni bir anahtar aldığı için.",
          "Yeni bir araba aldığı için.",
        ],
        explanation:
          "Tom, Max'a randevunun on dakika sonra başlayacağını söyler; ayrıca iyi bir meslektaş stresli sabahı değerli kılar.",
      },
    },
    // 9 — Sequence
    {
      qType: "Sequence",
      topic: "Sequence",
      prompt: "Was macht Max zuerst, nachdem er aufwacht?",
      options: [
        "Er sucht seinen Schlüssel.",
        "Er wäscht sich und zieht sich an.",
        "Er ruft Tom an.",
        "Er fährt zum Büro.",
      ],
      correctIndex: 1,
      explanation:
        '"Er steht schnell auf, wäscht sich und zieht sich an." Washing and dressing come before the key search.',
      tr: {
        topic: "Sıra",
        prompt: "Max uyandıktan sonra ilk ne yapıyor?",
        options: [
          "Anahtarını arıyor.",
          "Yıkanıyor ve giyiniyor.",
          "Tom'u arıyor.",
          "Büroya gidiyor.",
        ],
        explanation:
          '"Er steht schnell auf, wäscht sich und zieht sich an." Yıkanma ve giyinme, anahtar aramasından önce gelir.',
      },
    },
    // 10 — Sequence
    {
      qType: "Sequence",
      topic: "Sequence",
      prompt: "Wann passiert die Einladung zum Essen?",
      options: [
        "Vor dem Termin im Büro.",
        "Direkt nachdem die Nachbarin den Schlüssel findet.",
        "Am Abend, am Ende der Geschichte.",
        "Am Montagmorgen.",
      ],
      correctIndex: 2,
      explanation:
        '"Am Abend lädt Tom ihn zum Essen am Wochenende ein" — the invitation happens in the evening, after the work day.',
      tr: {
        topic: "Sıra",
        prompt: "Yemek daveti ne zaman oluyor?",
        options: [
          "Bürodaki randevudan önce.",
          "Komşu anahtarı bulduktan hemen sonra.",
          "Akşamleyin, hikâyenin sonunda.",
          "Pazartesi sabahı.",
        ],
        explanation:
          '"Am Abend lädt Tom ihn zum Essen am Wochenende ein", davet akşamleyin, iş gününden sonra oluyor.',
      },
    },
  ],
};
