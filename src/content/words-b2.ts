/**
 * Words — B2 deck (20 items). Verbatim port of
 * claude/GenauApp_Web_Try_Words_Content_B2.md §3.
 *
 * Same shape as WORDS_A2 / WORDS_B1 (WordItem, WordsLearnBlock,
 * TR overlay). B2 levels up on six axes:
 *
 *   - Society-and-argument nouns: Gesellschaft, Nachhaltigkeit,
 *     Maßnahme, Voraussetzung, Zusammenhang, Widerspruch —
 *     the vocab of news and essays, not personal position.
 *   - New gender rules in the canon: -keit/-heit → die, -schaft
 *     → die, -tum → das (with named exceptions der Irrtum /
 *     der Reichtum), -ment → das (French loans), and the most
 *     useful rule at B2: **compound nouns take the gender of
 *     the LAST part** (das Sein → das Bewusstsein).
 *   - Prepositional verbs + their wo-/da- compounds (Womit?
 *     Damit. Darauf. Davon.) — asking and referring back.
 *   - Variable-prefix verbs: same spelling, two verbs with
 *     different meanings, aux and stress (umgehen mit = deal
 *     with, aux sein; umgehen = bypass, aux haben).
 *   - Nomen-Verb-Verbindungen (NVV): formal light-verb +
 *     meaning-carrying-noun pairs (in Betracht ziehen,
 *     zur Verfügung stellen).
 *   - Sample sentences lean into B2 grammar: Vorgangspassiv
 *     (present too), Konjunktiv I in reported speech, genitive
 *     prepositions (trotz, wegen), wo-/da- compounds, real
 *     collocations.
 *
 * One false friend ships as a translationMC distractor:
 * das Engagement does NOT mean engagement-to-marry (that's
 * die Verlobung), it means commitment / active involvement.
 *
 * Normalizer: reflexive pronoun strip from A2 already covers
 * both reflexive B2 typing items (sich beschäftigen, sich
 * verlassen). No change needed in ExerciseTyping.
 *
 * New grammarTags introduced at B2:
 *   - "prep-mit-dat"      — sich beschäftigen, umgehen
 *   - "prep-von-dat"      — abhängen
 *   - "variable-prefix"   — umgehen
 *   - "nvv"               — in Betracht ziehen, zur Verfügung
 *                            stellen
 *
 * Deck composition: 10 articlePicker + 5 typing + 5 translationMC
 * (same ratio as A1/A2/B1). Noun article balance 4·5·4 across 13
 * nouns. ChunkCompose eligible: 20 / 20.
 */

import type { GrammarTag } from "@/components/molecules/GrammarTagPills/GrammarTagPills";
import type { WordItem } from "@/content/words-a1";

export const WORDS_B2: WordItem[] = [
  // 1
  {
    topic: "Sustainability",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Nachhaltigkeit",
      english: "sustainability",
      rule: "Nouns ending in -keit or -heit are feminine → die.",
      sample: {
        de: "In vielen Firmen wird inzwischen viel Wert auf Nachhaltigkeit gelegt.",
        en: "In many companies, great importance is now placed on sustainability.",
      },
    },
    prompt: "Nachhaltigkeit",
    hint: "sustainability",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation:
      "Nouns ending in -keit are feminine → die. Same for -heit: die Freiheit, die Gesundheit.",
    noun: "Nachhaltigkeit",
    chunks: ["Nach", "hal", "tig", "keit"],
    tr: {
      topic: "Sürdürülebilirlik",
      learn: {
        english: "sürdürülebilirlik",
        rule: "-keit veya -heit ile biten isimler dişildir → die.",
        sample: {
          en: "Birçok şirkette artık sürdürülebilirliğe büyük önem veriliyor.",
        },
      },
      hint: "sürdürülebilirlik",
      explanation:
        "-keit ile biten isimler dişildir → die. -heit için de aynı: die Freiheit, die Gesundheit.",
    },
  },

  // 2
  {
    topic: "Society",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Gesellschaft",
      english: "society",
      rule: "Nouns ending in -schaft are feminine → die.",
      sample: {
        de: "Die Rolle der Frau in der Gesellschaft hat sich stark verändert.",
        en: "The role of women in society has changed a lot.",
      },
    },
    prompt: "Gesellschaft",
    hint: "society",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation:
      "Nouns ending in -schaft are feminine → die. Also: die Wissenschaft, die Freundschaft, die Mannschaft.",
    noun: "Gesellschaft",
    chunks: ["Ge", "sell", "schaft"],
    tr: {
      topic: "Toplum",
      learn: {
        english: "toplum",
        rule: "-schaft ile biten isimler dişildir → die.",
        sample: { en: "Kadının toplumdaki rolü çok değişti." },
      },
      hint: "toplum",
      explanation:
        "-schaft ile biten isimler dişildir → die. Diğer örnekler: die Wissenschaft, die Freundschaft, die Mannschaft.",
    },
  },

  // 3
  {
    topic: "Requirements",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Voraussetzung",
      english: "prerequisite, requirement",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Gute Deutschkenntnisse sind eine wichtige Voraussetzung für diese Stelle.",
        en: "Good German skills are an important requirement for this position.",
      },
    },
    prompt: "Voraussetzung",
    hint: "prerequisite",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation:
      "Another -ung noun → die. Collocations: Voraussetzung für + Akk, unter der Voraussetzung, dass ... (on the condition that ...).",
    noun: "Voraussetzung",
    chunks: ["Vor", "aus", "set", "zung"],
    tr: {
      topic: "Ön koşullar",
      learn: {
        english: "ön koşul, şart",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: {
          en: "İyi Almanca bilgisi bu pozisyon için önemli bir ön koşul.",
        },
      },
      hint: "ön koşul",
      explanation:
        "Bir başka -ung ismi → die. Kalıplar: Voraussetzung für + Akk, unter der Voraussetzung, dass ... (... şartıyla).",
    },
  },

  // 4
  {
    topic: "Connections",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Zusammenhang",
      english: "connection, context",
      sample: {
        de: "Es besteht ein enger Zusammenhang zwischen Bildung und Einkommen.",
        en: "There is a close connection between education and income.",
      },
    },
    prompt: "Zusammenhang",
    hint: "connection",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation:
      '"Zusammenhang" is masculine → der. Collocation: im Zusammenhang mit + Dat (in connection with).',
    noun: "Zusammenhang",
    chunks: ["Zu", "sam", "men", "hang"],
    tr: {
      topic: "Bağlantılar",
      learn: {
        english: "bağlantı, bağlam",
        sample: { en: "Eğitim ile gelir arasında sıkı bir bağlantı var." },
      },
      hint: "bağlantı",
      explanation:
        '"Zusammenhang" eril → der. Kalıp: im Zusammenhang mit + Dat (... ile bağlantılı olarak).',
    },
  },

  // 5
  {
    topic: "Dealing with things",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "sich beschäftigen",
      english: "to deal with, to be busy with",
      rule: "Reflexive regular verb with 'mit + Dativ': ich beschäftige mich mit dem Thema. Aux = haben. Question form: Womit? Answer form: Damit.",
      sample: {
        de: "Womit beschäftigst du dich in deiner Freizeit?",
        en: "What do you occupy yourself with in your free time?",
      },
    },
    prompt: "to deal with, to be busy with",
    hint: "Type the German verb.",
    answer: "sich beschäftigen",
    explanation:
      '"sich beschäftigen mit + Dat" is a fixed combination. Ask with wo(r) + preposition (Womit?), refer back with da(r) + preposition (Damit).',
    chunks: ["sich", "be", "schäf", "ti", "gen"],
    grammarTags: ["reflexive", "regular", "prep-mit-dat"] as GrammarTag[],
    tr: {
      topic: "Bir şeyle uğraşmak",
      learn: {
        english: "uğraşmak, ilgilenmek (ile)",
        rule: "Düzenli dönüşlü fiil, 'mit + Dativ' ile: ich beschäftige mich mit dem Thema. Yardımcı = haben. Soru hâli: Womit? Cevap hâli: Damit.",
        sample: { en: "Boş zamanında neyle uğraşıyorsun?" },
      },
      prompt: "uğraşmak, ilgilenmek",
      hint: "Almancasını yaz.",
      explanation:
        '"sich beschäftigen mit + Dat" sabit bir kalıptır. Soruda wo(r) + edat (Womit?), cevapta da(r) + edat (Damit) kullanılır.',
    },
  },

  // 6
  {
    topic: "Property",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Eigentum",
      english: "property, ownership",
      rule: "Nouns ending in -tum are usually neuter → das (Eigentum, Wachstum). Exceptions: der Irrtum, der Reichtum.",
      sample: {
        de: "Die Wohnung gehört ihnen nicht, sie ist Eigentum der Stadt.",
        en: "The apartment doesn't belong to them, it is the property of the city.",
      },
    },
    prompt: "Eigentum",
    hint: "property",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation:
      "Nouns ending in -tum are usually neuter → das. New B2 pattern. Watch the two exceptions: der Irrtum (mistake), der Reichtum (wealth).",
    noun: "Eigentum",
    chunks: ["Ei", "gen", "tum"],
    tr: {
      topic: "Mülkiyet",
      learn: {
        english: "mülk, mülkiyet",
        rule: "-tum ile biten isimler genelde nötrdür → das (Eigentum, Wachstum). İstisnalar: der Irrtum, der Reichtum.",
        sample: { en: "Daire onlara ait değil, belediyenin mülkü." },
      },
      hint: "mülk",
      explanation:
        "-tum ile biten isimler genelde nötrdür → das. Yeni B2 pattern'i. İki istisnaya dikkat: der Irrtum (yanılgı), der Reichtum (zenginlik).",
    },
  },

  // 7
  {
    topic: "Effort",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Aufwand",
      english: "effort, expense",
      sample: {
        de: "Trotz des großen Aufwands hat sich das Projekt gelohnt.",
        en: "Despite the great effort, the project was worth it.",
      },
    },
    prompt: "Aufwand",
    hint: "effort",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation:
      '"Aufwand" is masculine → der. Genitive after trotz: trotz des Aufwands. Collocation: mit großem Aufwand (with great effort).',
    noun: "Aufwand",
    chunks: ["Auf", "wand"],
    tr: {
      topic: "Emek",
      learn: {
        english: "emek, zahmet, masraf",
        sample: { en: "Büyük emeğe rağmen proje buna değdi." },
      },
      hint: "emek",
      explanation:
        '"Aufwand" eril → der. trotz\'dan sonra Genitiv: trotz des Aufwands. Kalıp: mit großem Aufwand (büyük emekle).',
    },
  },

  // 8
  {
    topic: "Trust",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "sich verlassen",
      english: "to rely on",
      rule: "Reflexive strong verb with 'auf + Akkusativ': ich verlasse mich, du verlässt dich, er verlässt sich. Präteritum: verließ. Partizip II: verlassen. Aux = haben. Without 'sich', verlassen means 'to leave' (a place or a person).",
      sample: {
        de: "Auf ihn kann man sich immer verlassen.",
        en: "You can always rely on him.",
      },
    },
    prompt: "to rely on",
    hint: "Type the German verb.",
    answer: "sich verlassen",
    explanation:
      '"sich verlassen auf + Akk" means to rely on. Without the reflexive pronoun it means to leave: Er verlässt das Haus. Refer back with darauf: Darauf kannst du dich verlassen.',
    chunks: ["sich", "ver", "las", "sen"],
    grammarTags: ["reflexive", "irregular", "prep-auf-akk"] as GrammarTag[],
    tr: {
      topic: "Güven",
      learn: {
        english: "güvenmek (-e)",
        rule: "Düzensiz dönüşlü fiil, 'auf + Akkusativ' ile: ich verlasse mich, du verlässt dich, er verlässt sich. Präteritum: verließ. Partizip II: verlassen. Yardımcı = haben. 'sich' olmadan verlassen 'terk etmek, ayrılmak' demektir.",
        sample: { en: "Ona her zaman güvenilir." },
      },
      prompt: "güvenmek",
      hint: "Almancasını yaz.",
      explanation:
        '"sich verlassen auf + Akk" güvenmek demektir. Dönüşlü zamir olmadan anlam \'ayrılmak\' olur: Er verlässt das Haus. Geriye gönderme darauf ile: Darauf kannst du dich verlassen.',
    },
  },

  // 9
  {
    topic: "Relationships",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Verhältnis",
      english: "relationship, ratio",
      rule: "Nouns ending in -nis are usually neuter → das.",
      sample: {
        de: "Sie hat ein gutes Verhältnis zu ihren Kollegen.",
        en: "She has a good relationship with her colleagues.",
      },
    },
    prompt: "Verhältnis",
    hint: "relationship",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation:
      "-nis → das (B1 rule, recalled). Two meanings: Verhältnis zu + Dat (relationship with someone), im Verhältnis zu (relative to, in proportion to).",
    noun: "Verhältnis",
    chunks: ["Ver", "hält", "nis"],
    tr: {
      topic: "İlişkiler",
      learn: {
        english: "ilişki; oran",
        rule: "-nis ile biten isimler genelde nötrdür → das.",
        sample: { en: "İş arkadaşlarıyla arası iyi." },
      },
      hint: "ilişki",
      explanation:
        "-nis → das (B1 kuralı, tekrar). İki anlamı var: Verhältnis zu + Dat (biriyle ilişki), im Verhältnis zu (... ile orantılı, ... göre).",
    },
  },

  // 10
  {
    topic: "Compromise",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Kompromiss",
      english: "compromise",
      sample: {
        de: "Nach langen Verhandlungen haben beide Seiten einen Kompromiss geschlossen.",
        en: "After long negotiations, both sides reached a compromise.",
      },
    },
    prompt: "Kompromiss",
    hint: "compromise",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation:
      "\"Kompromiss\" is masculine → der. The verb is the trap: einen Kompromiss schließen or eingehen, never 'machen'.",
    noun: "Kompromiss",
    chunks: ["Kom", "pro", "miss"],
    tr: {
      topic: "Uzlaşma",
      learn: {
        english: "uzlaşma, orta yol",
        sample: { en: "Uzun müzakerelerden sonra iki taraf da uzlaştı." },
      },
      hint: "uzlaşma",
      explanation:
        "\"Kompromiss\" eril → der. Asıl tuzak fiilde: einen Kompromiss schließen veya eingehen denir, 'machen' denmez.",
    },
  },

  // 11
  {
    topic: "Dependence",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "abhängen",
      english: "to depend on",
      rule: "Separable strong verb with 'von + Dativ': es hängt ab, hing ab, hat abgehangen. Aux = haben. Fixed phrase: Das hängt davon ab.",
      sample: {
        de: "Ob wir morgen fahren, hängt vom Wetter ab.",
        en: "Whether we go tomorrow depends on the weather.",
      },
    },
    prompt: "to depend on",
    hint: "Type the German verb.",
    answer: "abhängen",
    explanation:
      "\"abhängen von + Dat\" is separable: 'ab' goes to the end in main clauses. The most common B2 use is the reply: Das hängt davon ab (It depends).",
    chunks: ["ab", "hän", "gen"],
    grammarTags: ["separable", "irregular", "prep-von-dat"] as GrammarTag[],
    tr: {
      topic: "Bağlılık",
      learn: {
        english: "bağlı olmak (-e)",
        rule: "Ayrılabilir düzensiz fiil, 'von + Dativ' ile: es hängt ab, hing ab, hat abgehangen. Yardımcı = haben. Sabit ifade: Das hängt davon ab.",
        sample: { en: "Yarın gidip gitmememiz havaya bağlı." },
      },
      prompt: "bağlı olmak",
      hint: "Almancasını yaz.",
      explanation:
        "\"abhängen von + Dat\" ayrılabilir: ana cümlede 'ab' sona gider. B2'de en sık kullanımı kısa cevap: Das hängt davon ab (Duruma göre değişir).",
    },
  },

  // 12
  {
    topic: "Awareness",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Bewusstsein",
      english: "awareness, consciousness",
      rule: "Compound nouns take the gender of their last part: das Sein → das Bewusstsein.",
      sample: {
        de: "Das Bewusstsein für den Klimawandel ist in den letzten Jahren gewachsen.",
        en: "Awareness of climate change has grown in recent years.",
      },
    },
    prompt: "Bewusstsein",
    hint: "awareness",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation:
      'Compound rule: the last part decides. "Sein" is a nominalized infinitive, and those are always neuter → das. Collocation: Bewusstsein für + Akk.',
    noun: "Bewusstsein",
    chunks: ["Be", "wusst", "sein"],
    tr: {
      topic: "Farkındalık",
      learn: {
        english: "farkındalık, bilinç",
        rule: "Bileşik isimler son parçanın cinsini alır: das Sein → das Bewusstsein.",
        sample: {
          en: "İklim değişikliğine dair farkındalık son yıllarda arttı.",
        },
      },
      hint: "farkındalık",
      explanation:
        'Bileşik kuralı: son parça belirler. "Sein" isimleşmiş bir mastardır ve bunlar her zaman nötrdür → das. Kalıp: Bewusstsein für + Akk.',
    },
  },

  // 13
  {
    topic: "Contradictions",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Widerspruch",
      english: "contradiction, objection",
      sample: {
        de: "Seine Aussage steht im Widerspruch zu den Fakten.",
        en: "His statement contradicts the facts.",
      },
    },
    prompt: "Widerspruch",
    hint: "contradiction",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation:
      '"Widerspruch" is masculine → der (like der Spruch). Collocation: im Widerspruch stehen zu + Dat. In official letters: Widerspruch einlegen (to file an objection).',
    noun: "Widerspruch",
    chunks: ["Wi", "der", "spruch"],
    tr: {
      topic: "Çelişkiler",
      learn: {
        english: "çelişki; itiraz",
        sample: { en: "Söyledikleri gerçeklerle çelişiyor." },
      },
      hint: "çelişki",
      explanation:
        '"Widerspruch" eril → der (der Spruch gibi). Kalıp: im Widerspruch stehen zu + Dat. Resmi yazışmalarda: Widerspruch einlegen (itiraz etmek).',
    },
  },

  // 14
  {
    topic: "Giving things up",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "verzichten",
      english: "to do without, to give up",
      rule: "Regular verb with 'auf + Akkusativ': ich verzichte, du verzichtest, er verzichtet. Partizip II: verzichtet. Aux = haben. Inseparable prefix ver-.",
      sample: {
        de: "Sie sagte, sie verzichte seit einem Jahr auf Fleisch.",
        en: "She said she had been doing without meat for a year.",
      },
    },
    prompt: "to do without, to give up",
    hint: "Type the German verb.",
    answer: "verzichten",
    explanation:
      "\"verzichten auf + Akk\" takes 'auf', not 'von'. The sample uses Konjunktiv I (sie verzichte) for reported speech, typical of B2 news German.",
    chunks: ["ver", "zich", "ten"],
    grammarTags: ["regular", "inseparable", "prep-auf-akk"] as GrammarTag[],
    tr: {
      topic: "Vazgeçmek",
      learn: {
        english: "vazgeçmek (-den), ... olmadan yapmak",
        rule: "Düzenli fiil, 'auf + Akkusativ' ile: ich verzichte, du verzichtest, er verzichtet. Partizip II: verzichtet. Yardımcı = haben. ver- ön eki ayrılmaz.",
        sample: { en: "Bir yıldır etten uzak durduğunu söyledi." },
      },
      prompt: "vazgeçmek",
      hint: "Almancasını yaz.",
      explanation:
        "\"verzichten auf + Akk\" 'von' değil 'auf' alır. Örnek cümlede aktarılan söz için Konjunktiv I var (sie verzichte), B2 haber Almancasında çok tipik.",
    },
  },

  // 15
  {
    topic: "Coping",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "umgehen",
      english: "to deal with, to handle",
      rule: "Variable prefix. Separable 'umgehen mit + Dativ' = to deal with: ich gehe damit um, ging um, ist umgegangen (aux = sein). Inseparable 'umgehen' = to bypass, avoid: er umgeht das Problem, hat umgangen (aux = haben).",
      sample: {
        de: "Sie geht sehr professionell mit Kritik um.",
        en: "She handles criticism very professionally.",
      },
    },
    prompt: "to deal with, to handle",
    hint: "Type the German verb.",
    answer: "umgehen",
    explanation:
      "Same spelling, two verbs. Stress on UM = separable, 'deal with', aux sein. Stress on GEH = inseparable, 'bypass', aux haben. This deck drills the separable one.",
    chunks: ["um", "ge", "hen"],
    grammarTags: [
      "separable",
      "irregular",
      "prep-mit-dat",
      "variable-prefix",
    ] as GrammarTag[],
    tr: {
      topic: "Başa çıkmak",
      learn: {
        english: "başa çıkmak, idare etmek (ile)",
        rule: "Değişken ön ek. Ayrılabilir 'umgehen mit + Dativ' = başa çıkmak: ich gehe damit um, ging um, ist umgegangen (yardımcı = sein). Ayrılmaz 'umgehen' = etrafından dolaşmak, kaçınmak: er umgeht das Problem, hat umgangen (yardımcı = haben).",
        sample: { en: "Eleştiriyle çok profesyonelce başa çıkıyor." },
      },
      prompt: "başa çıkmak",
      hint: "Almancasını yaz.",
      explanation:
        "Aynı yazım, iki ayrı fiil. Vurgu UM'da = ayrılabilir, 'başa çıkmak', yardımcı sein. Vurgu GEH'te = ayrılmaz, 'etrafından dolaşmak', yardımcı haben. Bu destede ayrılabilir olanı çalışıyoruz.",
    },
  },

  // 16
  {
    topic: "Considering options",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "in Betracht ziehen",
      english: "to consider, to take into account",
      rule: "Nomen-Verb-Verbindung: the noun (Betracht) carries the meaning, the verb (ziehen) is 'light'. Formal synonym of berücksichtigen. ziehen is strong: zog, hat gezogen.",
      sample: {
        de: "Wir sollten auch andere Möglichkeiten in Betracht ziehen.",
        en: "We should also consider other options.",
      },
    },
    prompt: "in Betracht ziehen",
    options: [
      "to consider",
      "to attract attention",
      "to withdraw",
      "to observe closely",
    ],
    correctIndex: 0,
    explanation:
      "\"in Betracht ziehen\" is a fixed noun-verb phrase meaning to consider. Don't translate it word by word: 'ziehen' here has nothing to do with pulling.",
    chunks: ["in", "Be", "tracht", "zie", "hen"],
    grammarTags: ["nvv", "irregular", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "Seçenekleri değerlendirmek",
      learn: {
        english: "göz önünde bulundurmak, hesaba katmak",
        rule: "Nomen-Verb-Verbindung: anlamı isim (Betracht) taşır, fiil (ziehen) 'hafif' kalır. berücksichtigen'in resmi eş anlamlısı. ziehen düzensiz: zog, hat gezogen.",
        sample: { en: "Başka olasılıkları da göz önünde bulundurmalıyız." },
      },
      options: [
        "göz önünde bulundurmak",
        "dikkat çekmek",
        "geri çekilmek",
        "yakından izlemek",
      ],
      explanation:
        "\"in Betracht ziehen\" sabit bir isim-fiil kalıbıdır ve göz önünde bulundurmak demektir. Kelime kelime çevirme: buradaki 'ziehen'in çekmekle ilgisi yok.",
    },
  },

  // 17
  {
    topic: "Challenges",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Herausforderung",
      english: "challenge",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Der Umzug in ein neues Land war eine große Herausforderung.",
        en: "Moving to a new country was a big challenge.",
      },
    },
    prompt: "die Herausforderung",
    options: ["challenge", "request", "achievement", "departure"],
    correctIndex: 0,
    explanation:
      '"die Herausforderung" is a feminine -ung noun, from herausfordern (to challenge). Collocation: eine Herausforderung annehmen (to take on a challenge).',
    chunks: ["Her", "aus", "for", "de", "rung"],
    tr: {
      topic: "Zorluklar",
      learn: {
        english: "zorluk, meydan okuma",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: { en: "Yeni bir ülkeye taşınmak büyük bir zorluktu." },
      },
      options: ["zorluk", "talep", "başarı", "ayrılış"],
      explanation:
        '"die Herausforderung" dişil bir -ung ismi, herausfordern (meydan okumak) fiilinden. Kalıp: eine Herausforderung annehmen (bir zorluğu üstlenmek).',
    },
  },

  // 18
  {
    topic: "Measures",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Maßnahme",
      english: "measure, step (action)",
      rule: "Abstract nouns ending in -e are usually feminine → die.",
      sample: {
        de: "Die Regierung hat neue Maßnahmen gegen die Wohnungsnot ergriffen.",
        en: "The government has taken new measures against the housing shortage.",
      },
    },
    prompt: "die Maßnahme",
    options: ["measure", "dimension", "decision", "rule"],
    correctIndex: 0,
    explanation:
      '"die Maßnahme" is a measure in the sense of an action taken, not a measurement (that\'s das Maß). Collocation: Maßnahmen ergreifen (to take measures).',
    chunks: ["Maß", "nah", "me"],
    tr: {
      topic: "Önlemler",
      learn: {
        english: "önlem, tedbir",
        rule: "-e ile biten soyut isimler genelde dişildir → die.",
        sample: {
          en: "Hükümet konut sıkıntısına karşı yeni önlemler aldı.",
        },
      },
      options: ["önlem", "boyut", "karar", "kural"],
      explanation:
        '"die Maßnahme" alınan bir önlem anlamındadır, ölçü değil (ölçü das Maß). Kalıp: Maßnahmen ergreifen (önlem almak).',
    },
  },

  // 19
  {
    topic: "Providing",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "zur Verfügung stellen",
      english: "to provide, to make available",
      rule: "Nomen-Verb-Verbindung, formal synonym of bereitstellen. Takes Dativ (person) + Akkusativ (thing): Wir stellen Ihnen die Daten zur Verfügung. Partner phrase: zur Verfügung stehen (to be available).",
      sample: {
        de: "Die Unterlagen werden Ihnen per E-Mail zur Verfügung gestellt.",
        en: "The documents will be provided to you by email.",
      },
    },
    prompt: "zur Verfügung stellen",
    options: [
      "to provide",
      "to put in order",
      "to place an order",
      "to call into question",
    ],
    correctIndex: 0,
    explanation:
      '"zur Verfügung stellen" = to provide. You\'ll see it in almost every official email. Its partner: zur Verfügung stehen = to be available (Ich stehe Ihnen gern zur Verfügung).',
    chunks: ["zur", "Ver", "fü", "gung", "stel", "len"],
    grammarTags: ["nvv", "regular", "dativ", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "Sağlamak",
      learn: {
        english: "sağlamak, hizmetine sunmak",
        rule: "Nomen-Verb-Verbindung, bereitstellen'in resmi eş anlamlısı. Dativ (kişi) + Akkusativ (şey) alır: Wir stellen Ihnen die Daten zur Verfügung. Eşi: zur Verfügung stehen (hazır, mevcut olmak).",
        sample: { en: "Belgeler size e-postayla iletilecek." },
      },
      options: [
        "sağlamak",
        "düzene sokmak",
        "sipariş vermek",
        "sorgulamak",
      ],
      explanation:
        '"zur Verfügung stellen" = sağlamak. Neredeyse her resmi e-postada karşına çıkar. Eşi: zur Verfügung stehen = hazır olmak (Ich stehe Ihnen gern zur Verfügung).',
    },
  },

  // 20
  {
    topic: "Commitment",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Engagement",
      english: "commitment, active involvement",
      rule: "French loans ending in -ment are neuter → das (Engagement, Argument, Dokument).",
      sample: {
        de: "Ihr Engagement für die Umwelt wird von allen geschätzt.",
        en: "Her commitment to the environment is appreciated by everyone.",
      },
    },
    prompt: "das Engagement",
    options: [
      "commitment",
      "engagement (to marry)",
      "employment",
      "appointment",
    ],
    correctIndex: 0,
    explanation:
      'False friend! German "Engagement" means commitment or involvement. Engaged to marry is verlobt, the engagement is die Verlobung. Pronounced the French way: an-ga-zhe-MAHN.',
    chunks: ["En", "ga", "ge", "ment"],
    tr: {
      topic: "Bağlılık",
      learn: {
        english: "bağlılık, aktif katılım, gönüllü çaba",
        rule: "-ment ile biten Fransızca kökenli isimler nötrdür → das (Engagement, Argument, Dokument).",
        sample: {
          en: "Çevre için gösterdiği çaba herkes tarafından takdir ediliyor.",
        },
      },
      options: ["bağlılık, aktif çaba", "nişan", "işe alım", "randevu"],
      explanation:
        'Yanıltıcı kelime! Almanca "Engagement" bağlılık, aktif katılım demektir. Nişan ise die Verlobung, nişanlı verlobt. Fransızca okunur: an-ga-je-MAN.',
    },
  },
];
