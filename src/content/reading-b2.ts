/**
 * Reading, B2 content. Verbatim port of
 * claude/GenauApp_Web_Try_Reading_Content_B2.md §3.
 *
 * Lifts from B1:
 *   - 1 cohesive news-style passage (~420 German words, 6 paragraphs)
 *     up from B1's ~310 words / 5 paragraphs.
 *   - 12 MC questions, B2 mix: 3 Main Idea + 2 Detail + 2 Vocabulary
 *     + 3 Inference + 2 Sequence.
 *   - Genre shift: personal narrative → local news article. Three
 *     voices (initiative, traders, mayor) so "who claims what"
 *     becomes the reading skill.
 *   - Grammar ceiling expands: Konjunktiv I (6 instances in P3,
 *     3 in P5, 1 in P6), Konjunktiv II as KI replacement (würden
 *     ... sehen in P2), reporting markers (so Kaya, betont sie,
 *     kündigt er an, zeigte sich erleichtert), multiple passive
 *     tenses, nominal style (NVV), complex Satzgefüge.
 *   - Fictional names: Wesselbach, Miriam Kaya, Thomas Berger,
 *     Sabine Hoffmann. No real town or person is quoted.
 *
 * Vocab re-exposure: 20 of 20 B2 Words items appear in the passage
 * (B1 managed 15/20). The B2 Words list was built around a public-
 * debate theme, so the news piece is a natural home.
 */

import type { ReadingContent } from "@/content/reading-a1";

export const READING_B2: ReadingContent = {
  title: "Autofreie Samstage in Wesselbach",
  subtitle: "B2 · ~4 min read",
  passage:
    "Die Kleinstadt Wesselbach hat eine Entscheidung getroffen, über die seit Monaten diskutiert wird: Ab April soll die Altstadt jeden Samstag autofrei sein. Der Stadtrat stimmte am Dienstagabend mit knapper Mehrheit für die Maßnahme. Sie ist zunächst als Versuch für ein Jahr geplant. Ob die Regel danach dauerhaft gilt, hängt von den Ergebnissen einer unabhängigen Untersuchung ab.\n\nDie Idee stammt nicht von der Verwaltung, sondern von einer Bürgerinitiative. Vor zwei Jahren hatten sich einige Anwohnerinnen und Anwohner zusammengeschlossen, die sich schon länger mit dem Thema Nachhaltigkeit beschäftigten. Ihr Engagement war beeindruckend: Sie sammelten über 3.000 Unterschriften und organisierten mehrere Informationsabende. \"Das Bewusstsein für Lärm und schlechte Luft ist in den letzten Jahren deutlich gewachsen\", sagt Sprecherin Miriam Kaya. Viele Menschen, so Kaya, würden inzwischen einen klaren Zusammenhang zwischen Verkehr und Lebensqualität sehen.\n\nNicht alle waren von Anfang an überzeugt. Thomas Berger, Vorsitzender des örtlichen Händlervereins, sah in dem Plan sogar einen Widerspruch: Die Stadt wolle die Altstadt beleben, mache sie aber gleichzeitig schwerer erreichbar. Ein großer Teil der Kundschaft komme aus den umliegenden Dörfern und könne nicht einfach auf das Auto verzichten. Für viele kleine Läden sei das eine echte Herausforderung, denn der Samstag sei ihr wichtigster Verkaufstag. Das Verhältnis zwischen Händlerverein und Initiative war deshalb lange angespannt.\n\nNach mehreren Gesprächsrunden einigten sich beide Seiten schließlich auf einen Kompromiss, und erst danach kam der Vorschlag in den Stadtrat. Lieferverkehr ist samstags bis 10 Uhr erlaubt, für Menschen mit eingeschränkter Mobilität gibt es Ausnahmen. Außerdem stellt die Stadt am Rand der Altstadt kostenlose Parkplätze zur Verfügung. Die meisten dieser Flächen sind ohnehin Eigentum der Stadt, sodass der Aufwand überschaubar bleibt. Zusätzlich fahren samstags Busse im 15-Minuten-Takt. Auch ein kostenloser Fahrradverleih wurde in Betracht gezogen, die Entscheidung darüber wurde aber auf das nächste Jahr verschoben.\n\nBürgermeisterin Sabine Hoffmann zeigte sich nach der Abstimmung erleichtert. Die Lösung sei nicht perfekt, sagte sie, aber sie nehme die Sorgen der Händler ernst. Eine wichtige Voraussetzung für den Erfolg sei, dass die Busse wirklich pünktlich fahren. \"Die Menschen müssen sich auf das Angebot verlassen können, sonst lassen sie das Auto nicht stehen.\" Wie die Bevölkerung mit der Umstellung umgehen wird, muss sich erst noch zeigen.\n\nThomas Berger bleibt skeptisch, will dem Versuch aber eine faire Chance geben. \"Wir werden sehr genau beobachten, wie sich unsere Umsätze entwickeln\", kündigt er an. Miriam Kaya dagegen spricht von einem guten Tag für Wesselbach. Es gehe nicht darum, Autofahrer zu bestrafen, betont sie. Es gehe um die Frage, wie man als Gesellschaft in Zukunft leben wolle.",
  tr: {
    title: "Wesselbach'ta arabasız cumartesiler",
  },
  // Tap-to-translate hints: 10 B2 flagship items, one per ~42 words
  // (looser than A1's 1-per-12, a B2 reader expects less hand-
  // holding). Article balance 4 die · 3 der · 2 das + 1 verb.
  // Picks recall every new B2 gender rule: -keit (Nachhaltigkeit),
  // -ment (Engagement, with the engagement-to-marry false-friend
  // warning), -schaft (Gesellschaft), compound-last-part
  // (Bewusstsein ← das Sein), plus -ung × 2 (Maßnahme / Voraussetzung
  // via abstract -e / -ung). No Konjunktiv I highlight, the reading
  // questions already teach reported speech, and marking only one
  // Konj-I form would leave the rest unexplained.
  highlights: [
    {
      surface: "Maßnahme",
      article: "die",
      kind: "noun",
      en: "measure, step (action taken)",
      tr: "önlem, tedbir",
    },
    {
      surface: "Nachhaltigkeit",
      article: "die",
      kind: "noun",
      en: "sustainability (-keit → die)",
      tr: "sürdürülebilirlik (-keit → die)",
    },
    {
      surface: "Engagement",
      article: "das",
      kind: "noun",
      en: "commitment, involvement (NOT engagement-to-marry, that's die Verlobung)",
      tr: "bağlılık, aktif katılım (nişan DEĞİL, nişan die Verlobung)",
    },
    {
      surface: "Bewusstsein",
      article: "das",
      kind: "noun",
      en: "awareness (compound: das Sein → das Bewusstsein)",
      tr: "farkındalık, bilinç (bileşik: das Sein → das Bewusstsein)",
    },
    {
      surface: "Zusammenhang",
      article: "der",
      kind: "noun",
      en: "connection, context (im Zusammenhang mit + Dat)",
      tr: "bağlantı, bağlam (im Zusammenhang mit + Dat)",
    },
    {
      surface: "Widerspruch",
      article: "der",
      kind: "noun",
      en: "contradiction, objection (im Widerspruch stehen zu)",
      tr: "çelişki, itiraz (im Widerspruch stehen zu)",
    },
    {
      surface: "verzichten",
      kind: "verb",
      en: "to do without, to give up (auf + Akk)",
      tr: "vazgeçmek (auf + Akk)",
    },
    {
      surface: "Kompromiss",
      article: "der",
      kind: "noun",
      en: "compromise (einen Kompromiss schließen)",
      tr: "uzlaşma (einen Kompromiss schließen)",
    },
    {
      surface: "Voraussetzung",
      article: "die",
      kind: "noun",
      en: "prerequisite (Voraussetzung für + Akk)",
      tr: "ön koşul (Voraussetzung für + Akk)",
    },
    {
      surface: "Gesellschaft",
      article: "die",
      kind: "noun",
      en: "society (-schaft → die)",
      tr: "toplum (-schaft → die)",
    },
  ],
  questions: [
    // 1, Main Idea
    {
      qType: "Main Idea",
      topic: "Main idea",
      prompt: "Worum geht es in dem Artikel hauptsächlich?",
      options: [
        "Um einen Versuch, die Altstadt samstags autofrei zu machen, und die Debatte darüber.",
        "Um eine neue Buslinie zwischen den Dörfern rund um Wesselbach.",
        "Um die Wahl einer neuen Bürgermeisterin.",
        "Um die Schließung mehrerer Geschäfte in der Altstadt.",
      ],
      correctIndex: 0,
      explanation:
        "The opening paragraph states the decision (car-free Saturdays as a one-year trial), and every later paragraph covers one side of the debate: the initiative, the traders, the compromise, the reactions.",
      tr: {
        topic: "Ana fikir",
        prompt: "Makale esas olarak ne hakkında?",
        options: [
          "Eski şehir merkezini cumartesileri arabasız yapma denemesi ve bunun etrafındaki tartışma.",
          "Wesselbach çevresindeki köyler arasında yeni bir otobüs hattı.",
          "Yeni bir belediye başkanının seçilmesi.",
          "Eski şehirdeki birkaç dükkânın kapanması.",
        ],
        explanation:
          "Giriş paragrafı kararı veriyor (bir yıllık deneme olarak arabasız cumartesiler). Sonraki her paragraf tartışmanın bir tarafını anlatıyor: girişim, esnaf, uzlaşma, tepkiler.",
      },
    },

    // 2, Main Idea
    {
      qType: "Main Idea",
      topic: "Main idea",
      prompt: "Welche Haltung hat der Händlerverein am Ende des Artikels?",
      options: [
        "Er unterstützt die Maßnahme jetzt ohne Einschränkung.",
        "Er bleibt skeptisch, gibt dem Versuch aber eine Chance.",
        "Er will gegen die Entscheidung vor Gericht gehen.",
        "Er hat sich nach der Abstimmung aufgelöst.",
      ],
      correctIndex: 1,
      explanation:
        '"Thomas Berger bleibt skeptisch, will dem Versuch aber eine faire Chance geben." His position moved from open criticism to cautious acceptance, not to full support.',
      tr: {
        topic: "Ana fikir",
        prompt: "Makalenin sonunda esnaf derneğinin tutumu ne?",
        options: [
          "Artık önlemi kayıtsız şartsız destekliyor.",
          "Şüpheci kalıyor ama denemeye bir şans veriyor.",
          "Karara karşı mahkemeye gitmek istiyor.",
          "Oylamadan sonra dağıldı.",
        ],
        explanation:
          '"Thomas Berger bleibt skeptisch, will dem Versuch aber eine faire Chance geben." Tutumu açık eleştiriden temkinli bir kabule geçti, tam desteğe değil.',
      },
    },

    // 3, Main Idea
    {
      qType: "Main Idea",
      topic: "Main idea",
      prompt: "Was ist die zentrale Aussage von Miriam Kaya am Schluss?",
      options: [
        "Es geht nicht um eine Strafe für Autofahrer, sondern um die Frage, wie man in Zukunft leben will.",
        "Autofahrer sollten in Zukunft höhere Steuern zahlen.",
        "Die Initiative hat ihr Ziel noch lange nicht erreicht.",
        "Die Stadt sollte mehr Parkplätze in der Altstadt bauen.",
      ],
      correctIndex: 0,
      explanation:
        '"Es gehe nicht darum, Autofahrer zu bestrafen ... Es gehe um die Frage, wie man als Gesellschaft in Zukunft leben wolle." She reframes the measure as a question about society, not a punishment.',
      tr: {
        topic: "Ana fikir",
        prompt: "Miriam Kaya'nın sondaki asıl mesajı ne?",
        options: [
          "Mesele sürücüleri cezalandırmak değil, gelecekte nasıl yaşamak istediğimiz sorusu.",
          "Sürücüler gelecekte daha yüksek vergi ödemeli.",
          "Girişim hedefine henüz hiç ulaşmadı.",
          "Belediye eski şehirde daha fazla otopark yapmalı.",
        ],
        explanation:
          '"Es gehe nicht darum, Autofahrer zu bestrafen ... Es gehe um die Frage, wie man als Gesellschaft in Zukunft leben wolle." Önlemi bir ceza olarak değil, toplum olarak nasıl yaşamak istediğimiz sorusu olarak çerçeveliyor.',
      },
    },

    // 4, Detail
    {
      qType: "Detail",
      topic: "Detail",
      prompt: "Wie lange soll der Versuch zunächst dauern?",
      options: ["sechs Monate", "ein Jahr", "zwei Jahre", "bis zum nächsten April"],
      correctIndex: 1,
      explanation:
        '"Sie ist zunächst als Versuch für ein Jahr geplant." The "zwei Jahre" distractor comes from P2, where it refers to when the initiative started.',
      tr: {
        topic: "Detay",
        prompt: "Denemenin ilk aşamada ne kadar sürmesi planlanıyor?",
        options: ["altı ay", "bir yıl", "iki yıl", "gelecek nisana kadar"],
        explanation:
          '"Sie ist zunächst als Versuch für ein Jahr geplant." "İki yıl" çeldiricisi 2. paragraftan geliyor, orada girişimin ne zaman başladığını anlatıyor.',
      },
    },

    // 5, Detail
    {
      qType: "Detail",
      topic: "Detail",
      prompt: "Welche Regel gilt samstags für den Lieferverkehr?",
      options: [
        "Er ist den ganzen Tag verboten.",
        "Er ist nur am Nachmittag erlaubt.",
        "Er ist bis 10 Uhr erlaubt.",
        "Er braucht eine Genehmigung der Bürgermeisterin.",
      ],
      correctIndex: 2,
      explanation:
        '"Lieferverkehr ist samstags bis 10 Uhr erlaubt." This is one of the concessions in the compromise (P4).',
      tr: {
        topic: "Detay",
        prompt: "Cumartesileri teslimat araçları için hangi kural geçerli?",
        options: [
          "Bütün gün yasak.",
          "Sadece öğleden sonra serbest.",
          "Saat 10'a kadar serbest.",
          "Belediye başkanının iznini gerektiriyor.",
        ],
        explanation:
          '"Lieferverkehr ist samstags bis 10 Uhr erlaubt." Bu, uzlaşmadaki tavizlerden biri (4. paragraf).',
      },
    },

    // 6, Vocabulary
    {
      qType: "Vocabulary",
      topic: "Vocabulary",
      prompt:
        'Was bedeutet "angespannt" im Satz "Das Verhältnis ... war deshalb lange angespannt"?',
      options: ["tense, strained", "relaxed", "exhausted", "well organized"],
      correctIndex: 0,
      explanation:
        '"angespannt" describes a relationship under pressure. The sentence follows Berger\'s criticism, and "deshalb" links the strain to that conflict.',
      tr: {
        topic: "Kelime",
        prompt:
          '"Das Verhältnis ... war deshalb lange angespannt" cümlesinde "angespannt" ne demek?',
        options: ["gergin", "rahat", "bitkin", "iyi organize"],
        explanation:
          '"angespannt" baskı altındaki bir ilişkiyi anlatır. Cümle Berger\'in eleştirisinden hemen sonra geliyor ve "deshalb" gerginliği bu çatışmaya bağlıyor.',
      },
    },

    // 7, Vocabulary
    {
      qType: "Vocabulary",
      topic: "Vocabulary",
      prompt:
        'Was bedeutet "überschaubar" in "sodass der Aufwand überschaubar bleibt"?',
      options: [
        "invisible",
        "manageable, limited",
        "enormous",
        "unpredictable",
      ],
      correctIndex: 1,
      explanation:
        'The land already belongs to the city, so ("sodass") the effort stays small enough to handle. "überschaubar" literally means you can see over it: limited, manageable.',
      tr: {
        topic: "Kelime",
        prompt:
          '"sodass der Aufwand überschaubar bleibt" ifadesinde "überschaubar" ne demek?',
        options: [
          "görünmez",
          "makul, idare edilebilir",
          "devasa",
          "öngörülemez",
        ],
        explanation:
          'Arazi zaten belediyenin, bu yüzden ("sodass") emek idare edilebilir ölçüde kalıyor. "überschaubar" kelime anlamıyla üzerinden bakılabilen demek: sınırlı, makul.',
      },
    },

    // 8, Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt:
        'Warum stehen Bergers Aussagen in Formen wie "wolle", "komme" und "sei"?',
      options: [
        "Weil Berger besonders höflich spricht.",
        "Weil die Aussagen sich auf die Zukunft beziehen.",
        "Weil Berger sich bei seinen Aussagen nicht sicher ist.",
        "Weil der Artikel seine Meinung wiedergibt, ohne sie selbst als Tatsache zu behaupten.",
      ],
      correctIndex: 3,
      explanation:
        'This is Konjunktiv I, the standard form for reported speech in news German. It signals "this is what he says", keeping distance between the journalist and the claim. It says nothing about politeness, tense or certainty.',
      tr: {
        topic: "Çıkarım",
        prompt:
          'Berger\'in sözleri neden "wolle", "komme" ve "sei" gibi biçimlerde?',
        options: [
          "Çünkü Berger çok kibar konuşuyor.",
          "Çünkü sözler geleceğe dair.",
          "Çünkü Berger söylediklerinden emin değil.",
          "Çünkü makale onun görüşünü aktarıyor, kendisi gerçek olarak iddia etmiyor.",
        ],
        explanation:
          'Bu Konjunktiv I, haber Almancasında aktarılan söz için standart biçim. "Bunu o söylüyor" mesajı verir ve gazeteciyle iddia arasına mesafe koyar. Kibarlık, zaman ya da emin olmamakla ilgisi yok.',
      },
    },

    // 9, Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt:
        "Warum betont die Bürgermeisterin, dass die Busse pünktlich fahren müssen?",
      options: [
        "Weil die Busse in Wesselbach bisher oft kaputt waren.",
        "Weil sie selbst jeden Tag mit dem Bus fährt.",
        "Weil die Maßnahme nur funktioniert, wenn die Menschen eine echte Alternative zum Auto haben.",
        "Weil der Händlerverein die Busse bezahlt.",
      ],
      correctIndex: 2,
      explanation:
        'She calls punctual buses a "Voraussetzung für den Erfolg" and adds that otherwise people won\'t leave the car at home. The text never says the buses were unreliable before, so the second option reads too much into it.',
      tr: {
        topic: "Çıkarım",
        prompt: "Belediye başkanı otobüslerin dakik olması gerektiğini neden vurguluyor?",
        options: [
          "Çünkü Wesselbach'ta otobüsler şimdiye kadar sık sık bozuluyordu.",
          "Çünkü kendisi her gün otobüse biniyor.",
          "Çünkü önlem ancak insanların arabaya gerçek bir alternatifi olursa işe yarar.",
          "Çünkü otobüslerin parasını esnaf derneği ödüyor.",
        ],
        explanation:
          'Dakik otobüsleri "Voraussetzung für den Erfolg" (başarının ön koşulu) olarak niteliyor ve aksi hâlde insanların arabayı evde bırakmayacağını ekliyor. Metin otobüslerin daha önce güvenilmez olduğunu hiç söylemiyor, ikinci şık metinde olmayanı okuyor.',
      },
    },

    // 10, Inference
    {
      qType: "Inference",
      topic: "Inference",
      prompt: "Was lässt sich über die Rolle der Bürgerinitiative sagen?",
      options: [
        "Sie war von Anfang an gegen autofreie Samstage.",
        "Ohne ihr Engagement wäre die Maßnahme wahrscheinlich nicht beschlossen worden.",
        "Sie wurde von der Stadtverwaltung gegründet.",
        "Sie hat den Kompromiss mit den Händlern abgelehnt.",
      ],
      correctIndex: 1,
      explanation:
        'The idea came from the initiative ("nicht von der Verwaltung"), it collected 3,000 signatures, and the council vote was close ("mit knapper Mehrheit"). Together these suggest the initiative was decisive, even though the text never says so directly.',
      tr: {
        topic: "Çıkarım",
        prompt: "Vatandaş girişiminin rolü hakkında ne söylenebilir?",
        options: [
          "Başından beri arabasız cumartesilere karşıydı.",
          "Onların çabası olmasaydı önlem büyük ihtimalle kabul edilmezdi.",
          "Belediye tarafından kuruldu.",
          "Esnafla yapılan uzlaşmayı reddetti.",
        ],
        explanation:
          'Fikir girişimden geldi ("nicht von der Verwaltung"), 3.000 imza topladılar ve meclis oylaması kıl payı geçti ("mit knapper Mehrheit"). Metin bunu doğrudan söylemese de bunlar bir araya gelince girişimin belirleyici olduğunu gösteriyor.',
      },
    },

    // 11, Sequence
    {
      qType: "Sequence",
      topic: "Sequence",
      prompt: "Was geschah, bevor der Vorschlag in den Stadtrat kam?",
      options: [
        "Die autofreien Samstage begannen.",
        "Die Untersuchung lieferte erste Ergebnisse.",
        "Händlerverein und Initiative einigten sich auf einen Kompromiss.",
        "Der Fahrradverleih wurde eingeführt.",
      ],
      correctIndex: 2,
      explanation:
        '"... einigten sich beide Seiten schließlich auf einen Kompromiss, und erst danach kam der Vorschlag in den Stadtrat." The car-free Saturdays start in April, after the vote, and the bike rental was postponed.',
      tr: {
        topic: "Sıra",
        prompt: "Öneri belediye meclisine gelmeden önce ne oldu?",
        options: [
          "Arabasız cumartesiler başladı.",
          "Araştırma ilk sonuçlarını verdi.",
          "Esnaf derneği ile girişim bir uzlaşmaya vardı.",
          "Bisiklet kiralama sistemi kuruldu.",
        ],
        explanation:
          '"... einigten sich beide Seiten schließlich auf einen Kompromiss, und erst danach kam der Vorschlag in den Stadtrat." Arabasız cumartesiler oylamadan sonra, nisanda başlıyor. Bisiklet kiralama ise ertelendi.',
      },
    },

    // 12, Sequence
    {
      qType: "Sequence",
      topic: "Sequence",
      prompt: "Was passiert nach dem einjährigen Versuch?",
      options: [
        "Die Regel gilt automatisch für immer.",
        "Die Altstadt wird an allen Tagen autofrei.",
        "Der Stadtrat wird neu gewählt.",
        "Auf Grundlage einer Untersuchung wird entschieden, ob die Regel bleibt.",
      ],
      correctIndex: 3,
      explanation:
        '"Ob die Regel danach dauerhaft gilt, hängt von den Ergebnissen einer unabhängigen Untersuchung ab." The trial is followed by an evaluation, not an automatic decision.',
      tr: {
        topic: "Sıra",
        prompt: "Bir yıllık denemeden sonra ne olacak?",
        options: [
          "Kural otomatik olarak kalıcı hâle gelecek.",
          "Eski şehir her gün arabasız olacak.",
          "Belediye meclisi yeniden seçilecek.",
          "Bir araştırmanın sonuçlarına göre kuralın kalıp kalmayacağına karar verilecek.",
        ],
        explanation:
          '"Ob die Regel danach dauerhaft gilt, hängt von den Ergebnissen einer unabhängigen Untersuchung ab." Denemenin ardından otomatik bir karar değil, bir değerlendirme geliyor.',
      },
    },
  ],
};
