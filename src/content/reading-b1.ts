/**
 * Reading — B1 content. Verbatim port of
 * claude/GenauApp_Web_Try_Reading_Content_B1.md §3.
 *
 * Lifts from A2:
 *   - Passage grows to ~310 German words in 5 paragraphs (A2 was
 *     ~165 words, 4 paragraphs). ReadingPassageCard already splits
 *     on `\n\n`, so no renderer change needed.
 *   - 12 questions (A1/A2 shipped 5/10). qType mix extends Inference
 *     to 4 (2 Main Idea + 2 Detail + 2 Vocabulary + 4 Inference +
 *     2 Sequence). Chip just walks the array, no count-aware code.
 *   - Grammar ceiling at B1: Konjunktiv II (wäre, würde, hätte),
 *     Vorgangspassiv (wurde + Partizip II), lexical Präteritum
 *     (fragte, sagte, überlegte, erzählte, kam, wusste, war), full
 *     set of subordinate connectors (obwohl/damit/nachdem/bevor/
 *     seit/trotzdem), relative clauses with case, Plusquamperfekt in
 *     service of narrative, Infinitiv mit zu. Still no Konjunktiv I.
 *
 * Vocab re-exposure: 15 of 20 B1 Words items appear in the passage
 * (Entscheidung, Erfahrung, Verantwortung, sich bewerben, Vorteil,
 * Nachteil, Unterschied, Zweck, überlegen, Beispiel, entscheiden,
 * Ergebnis, sich freuen auf, ausdrücken, Meinung, Gefühl). The
 * four not reused — teilnehmen, sich kümmern, Vorurteil, Lösung —
 * don't fit the career-decision narrative.
 */

import type { ReadingContent } from "@/content/reading-a1";

export const READING_B1: ReadingContent = {
  title: "Lenas schwere Entscheidung",
  subtitle: "B1 · ~3 min read",
  passage:
    "Lena arbeitet seit fünf Jahren als Lehrerin in Berlin. Die Arbeit macht ihr Spaß, aber sie trägt viel Verantwortung. In letzter Zeit überlegt sie oft, ob sie einen anderen Beruf ausprobieren möchte. Als junges Mädchen wollte sie immer Journalistin werden.\n\nLetzte Woche hat sie mit ihrer Schwester Anna gesprochen. \"Was denkst du?\", fragte Lena. \"Soll ich mich um die Stelle bei der Zeitung bewerben?\" Anna überlegte und sagte: \"Es gibt Vorteile und Nachteile. Als Lehrerin hast du viel Erfahrung und gute Kollegen. Aber wenn du dich nicht bewirbst, wirst du es später vielleicht bereuen.\"\n\nLena wusste, dass Anna recht hatte. Der größte Vorteil wäre die Chance, etwas Neues zu lernen. Der größte Nachteil wäre, dass sie am Anfang weniger Geld verdienen würde. Zwischen den beiden Berufen gibt es einen großen Unterschied: Als Lehrerin kann sie planen, als Journalistin muss sie jeden Tag neue Themen finden.\n\nNach langem Überlegen hat Lena sich für die Bewerbung entschieden. Sie hat ihren Lebenslauf aktualisiert und einen Brief geschrieben, in dem sie ihre Meinung und Erfahrungen klar ausdrückte. Der Zweck des Briefes war, die Zeitung zu überzeugen. Zum Beispiel erzählte sie von einem Projekt, bei dem sie mit Jugendlichen gearbeitet hatte.\n\nNach einigen Tagen wurde Lena zu einem Gespräch eingeladen. Am Freitag kam das Ergebnis per E-Mail. Lena hat die Stelle bekommen! Sie freut sich jetzt auf ihren neuen Beruf. Trotzdem ist sie ein bisschen traurig, weil sie ihre Schüler verlassen muss. \"Jede Entscheidung hat zwei Seiten\", sagt sie. \"Aber ich glaube, das Gefühl war richtig.\"",
  tr: {
    title: "Lena'nın zor kararı",
  },
  questions: [
    // 1 — Main Idea
    {
      qType: "Main Idea",
      topic: "Main idea",
      prompt: "Was ist die Hauptfrage der Geschichte?",
      options: [
        "Soll Lena ihre Karriere wechseln oder nicht?",
        "Soll Lena nach Berlin umziehen?",
        "Soll Lena ihre Schwester besuchen?",
        "Soll Lena ihre Wohnung kündigen?",
      ],
      correctIndex: 0,
      explanation:
        "The entire narrative turns on whether Lena should switch from teaching to journalism. The opening paragraph sets up the career-doubt; the rest walks through the decision.",
      tr: {
        topic: "Ana fikir",
        prompt: "Hikâyedeki ana soru nedir?",
        options: [
          "Lena kariyerini değiştirmeli mi, değiştirmemeli mi?",
          "Lena Berlin'e taşınmalı mı?",
          "Lena kız kardeşini ziyaret etmeli mi?",
          "Lena dairesini feshetmeli mi?",
        ],
        explanation:
          "Tüm anlatı Lena'nın öğretmenlikten gazeteciliğe geçip geçmeyeceği etrafında döner. Giriş paragrafı kariyer tereddüdünü kurar; gerisi kararı yürütür.",
      },
    },
    // 2 — Main Idea
    {
      qType: "Main Idea",
      topic: "Main idea",
      prompt: "Wie endet die Geschichte?",
      options: [
        "Lena bekommt die neue Stelle und freut sich, aber mit gemischten Gefühlen.",
        "Lena bleibt in ihrem alten Beruf.",
        "Lena und Anna streiten sich.",
        "Lena verlässt Berlin.",
      ],
      correctIndex: 0,
      explanation:
        'She gets the job ("Lena hat die Stelle bekommen") and looks forward to it, but is also sad about leaving her students — the mixed-feeling ending is explicit in the final paragraph.',
      tr: {
        topic: "Ana fikir",
        prompt: "Hikâye nasıl bitiyor?",
        options: [
          "Lena yeni işi alır ve sevinir, ama karışık duygularla.",
          "Lena eski mesleğinde kalır.",
          "Lena ve Anna tartışır.",
          "Lena Berlin'den ayrılır.",
        ],
        explanation:
          'İşi alır ("Lena hat die Stelle bekommen") ve ona sabırsızlıkla bekler, ama öğrencilerini bırakacağı için de üzgün — karışık duygu finali son paragrafta açık.',
      },
    },
    // 3 — Detail
    {
      qType: "Detail",
      topic: "Detail",
      prompt: "Wie lange arbeitet Lena schon als Lehrerin?",
      options: ["drei Jahre", "fünf Jahre", "zehn Jahre", "ein Jahr"],
      correctIndex: 1,
      explanation:
        '"Lena arbeitet seit fünf Jahren als Lehrerin in Berlin." Right in the opening sentence.',
      tr: {
        topic: "Detay",
        prompt: "Lena ne kadar süredir öğretmenlik yapıyor?",
        options: ["üç yıl", "beş yıl", "on yıl", "bir yıl"],
        explanation:
          '"Lena arbeitet seit fünf Jahren als Lehrerin in Berlin." Açılış cümlesinde.',
      },
    },
    // 4 — Detail
    {
      qType: "Detail",
      topic: "Detail",
      prompt: "Wer gibt Lena einen Rat?",
      options: [
        "ihre Schwester Anna",
        "ihr Vater",
        "ihr Chef",
        "ihre Freundin",
      ],
      correctIndex: 0,
      explanation:
        '"Letzte Woche hat sie mit ihrer Schwester Anna gesprochen." Anna is the consultant in paragraph 2.',
      tr: {
        topic: "Detay",
        prompt: "Lena'ya kim tavsiye veriyor?",
        options: [
          "kız kardeşi Anna",
          "babası",
          "patronu",
          "kız arkadaşı",
        ],
        explanation:
          '"Letzte Woche hat sie mit ihrer Schwester Anna gesprochen." Anna 2. paragrafın danışmanı.',
      },
    },
    // 5 — Vocabulary
    {
      qType: "Vocabulary",
      topic: "Vocabulary",
      prompt: 'Was bedeutet "bereuen" im Text?',
      options: ["to regret", "to forget", "to apologize", "to repeat"],
      correctIndex: 0,
      explanation:
        '"Aber wenn du dich nicht bewirbst, wirst du es später vielleicht bereuen." — Anna warns that NOT applying could lead to later regret.',
      tr: {
        topic: "Kelime",
        prompt: 'Metindeki "bereuen" ne demek?',
        options: ["pişman olmak", "unutmak", "özür dilemek", "tekrarlamak"],
        explanation:
          '"Aber wenn du dich nicht bewirbst, wirst du es später vielleicht bereuen." Anna, başvurmamanın daha sonra pişmanlığa yol açabileceği uyarısında bulunuyor.',
      },
    },
    // 6 — Vocabulary
    {
      qType: "Vocabulary",
      topic: "Vocabulary",
      prompt: 'Was bedeutet "überzeugen" hier?',
      options: ["to convince", "to translate", "to recognize", "to apply"],
      correctIndex: 0,
      explanation:
        '"Der Zweck des Briefes war, die Zeitung zu überzeugen." The letter\'s purpose is to persuade the newspaper to hire her.',
      tr: {
        topic: "Kelime",
        prompt: 'Burada "überzeugen" ne demek?',
        options: ["ikna etmek", "tercüme etmek", "tanımak", "başvurmak"],
        explanation:
          '"Der Zweck des Briefes war, die Zeitung zu überzeugen." Mektubun amacı gazeteyi onu işe almaya ikna etmek.',
      },
    },
    // 7 — Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt: 'Warum ist Lena am Ende "ein bisschen traurig"?',
      options: [
        "Weil sie ihre Schüler verlassen muss.",
        "Weil Anna sich geärgert hat.",
        "Weil sie weniger Geld verdient.",
        "Weil die neue Firma weit weg ist.",
      ],
      correctIndex: 0,
      explanation:
        '"Trotzdem ist sie ein bisschen traurig, weil sie ihre Schüler verlassen muss." The sadness is explicitly tied to leaving her students — not to money or distance.',
      tr: {
        topic: "Çıkarım",
        prompt: 'Lena sonunda neden "biraz üzgün"?',
        options: [
          "Öğrencilerini bırakmak zorunda olduğu için.",
          "Anna kızdığı için.",
          "Daha az kazandığı için.",
          "Yeni şirket uzakta olduğu için.",
        ],
        explanation:
          '"Trotzdem ist sie ein bisschen traurig, weil sie ihre Schüler verlassen muss." Üzüntü açıkça öğrencileri bırakmaya bağlanmış, paraya ya da mesafeye değil.',
      },
    },
    // 8 — Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt: "Warum erzählt Lena in ihrem Brief von dem Projekt mit Jugendlichen?",
      options: [
        "Um zu zeigen, dass sie relevante Erfahrung hat.",
        "Um ihre Schwester glücklich zu machen.",
        "Um ihr Gehalt zu erhöhen.",
        "Um die Zeitung zu kritisieren.",
      ],
      correctIndex: 0,
      explanation:
        'The paragraph states the letter\'s purpose was to convince the newspaper; the youth project is given as an example ("Zum Beispiel"). That example proves relevant experience.',
      tr: {
        topic: "Çıkarım",
        prompt: "Lena mektubunda gençlerle yaptığı projeyi neden anlatıyor?",
        options: [
          "İlgili deneyime sahip olduğunu göstermek için.",
          "Kız kardeşini mutlu etmek için.",
          "Maaşını artırmak için.",
          "Gazeteyi eleştirmek için.",
        ],
        explanation:
          'Paragraf, mektubun amacının gazeteyi ikna etmek olduğunu söyler; gençlik projesi örnek olarak verilir ("Zum Beispiel"). O örnek ilgili deneyimi kanıtlar.',
      },
    },
    // 9 — Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt: "Warum spricht Lena mit Anna, bevor sie sich entscheidet?",
      options: [
        "Weil sie eine zweite Meinung hören möchte.",
        "Weil Anna auch Journalistin ist.",
        "Weil Anna arbeitslos ist.",
        "Weil Lena sich vor ihrer Schwester schämt.",
      ],
      correctIndex: 0,
      explanation:
        'The text doesn\'t say directly, but Lena opens with "Was denkst du?" — she\'s seeking her sister\'s perspective before deciding. Classic second-opinion move.',
      tr: {
        topic: "Çıkarım",
        prompt: "Lena karar vermeden önce neden Anna ile konuşuyor?",
        options: [
          "İkinci bir görüş almak istediği için.",
          "Anna da gazeteci olduğu için.",
          "Anna işsiz olduğu için.",
          "Lena kız kardeşinden utandığı için.",
        ],
        explanation:
          'Metin doğrudan söylemez ama Lena "Was denkst du?" diye başlar — karar vermeden önce kız kardeşinin perspektifini arıyor. Klasik ikinci görüş davranışı.',
      },
    },
    // 10 — Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt: 'Was zeigt die Aussage "Jede Entscheidung hat zwei Seiten"?',
      options: [
        "Lena hat ihre Entscheidung reflektiert und akzeptiert beide Seiten.",
        "Lena bereut ihre Entscheidung.",
        "Lena will zur alten Stelle zurück.",
        "Lena ist sich nicht sicher.",
      ],
      correctIndex: 0,
      explanation:
        "She says this right after describing the mixed joy-sadness. It's the acceptance line — she's reflected and is at peace with both sides.",
      tr: {
        topic: "Çıkarım",
        prompt: '"Jede Entscheidung hat zwei Seiten" ifadesi neyi gösteriyor?',
        options: [
          "Lena kararını tartmış ve her iki tarafı da kabul etmiş.",
          "Lena kararından pişman.",
          "Lena eski işine dönmek istiyor.",
          "Lena emin değil.",
        ],
        explanation:
          "Bu cümleyi karışık sevinç-üzüntüyü anlattıktan hemen sonra söyler. Kabullenme cümlesi — kararını tartmış ve her iki tarafla barışık.",
      },
    },
    // 11 — Sequence
    {
      qType: "Sequence",
      topic: "Sequence",
      prompt: "Was passiert direkt nachdem Lena mit Anna gesprochen hat?",
      options: [
        "Lena denkt über die Vor- und Nachteile nach.",
        "Lena bewirbt sich sofort.",
        "Lena sagt Anna ab.",
        "Lena verlässt Berlin.",
      ],
      correctIndex: 0,
      explanation:
        "Paragraph 3 (right after the Anna conversation in P2) walks through the pros, cons, and the difference between the two careers. Only after that does paragraph 4 show the application.",
      tr: {
        topic: "Sıra",
        prompt: "Lena Anna ile konuştuktan hemen sonra ne oluyor?",
        options: [
          "Lena avantajları ve dezavantajları düşünüyor.",
          "Lena hemen başvuruyor.",
          "Lena Anna'ya hayır diyor.",
          "Lena Berlin'den ayrılıyor.",
        ],
        explanation:
          "3. paragraf (Anna konuşmasından sonra, P2'den sonra) avantajları, dezavantajları ve iki meslek arasındaki farkı anlatır. Ancak ondan sonra 4. paragraf başvuruyu gösterir.",
      },
    },
    // 12 — Sequence
    {
      qType: "Sequence",
      topic: "Sequence",
      prompt: "Wann kommt das Ergebnis der Bewerbung?",
      options: [
        "vor dem Gespräch",
        "am Freitag",
        "am gleichen Tag wie die Bewerbung",
        "nach einem Jahr",
      ],
      correctIndex: 1,
      explanation:
        '"Am Freitag kam das Ergebnis per E-Mail." The timeline in P5 is: interview invitation → Friday result → joy + reflection.',
      tr: {
        topic: "Sıra",
        prompt: "Başvurunun sonucu ne zaman geliyor?",
        options: [
          "görüşmeden önce",
          "cuma günü",
          "başvuru ile aynı gün",
          "bir yıl sonra",
        ],
        explanation:
          '"Am Freitag kam das Ergebnis per E-Mail." P5\'in zaman çizgisi: görüşme daveti → cuma sonucu → sevinç + düşünce.',
      },
    },
  ],
};
