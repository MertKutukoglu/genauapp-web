/**
 * Words — B1 deck (20 items). Verbatim port of
 * claude/GenauApp_Web_Try_Words_Content_B1.md §3.
 *
 * Same shape as WORDS_A2 (WordItem, WordsLearnBlock, TR overlay).
 *
 * B1 brings:
 *   - Abstract compound nouns: Entscheidung, Verantwortung, Erfahrung,
 *     Unterschied, Vorurteil, Ergebnis — the "ideas" vocab.
 *   - New real rule: **-nis → das** (Ergebnis). Alongside A2's
 *     -ung → die, abstract -e → die, Ge- → das.
 *   - Fixed reflexive-preposition combos as lexical units with an
 *     explicit case in the rule: sich bewerben um + Akk,
 *     sich kümmern um + Akk, teilnehmen an + Dat, sich freuen auf + Akk.
 *   - Inseparable prefix verbs: überlegen (über- stays attached in
 *     every form).
 *   - Sample sentences that lean into Konjunktiv II, Präteritum of
 *     lexical verbs, generic man-pronoun, and real collocations
 *     (Erfahrung sammeln, Verantwortung tragen, Vorurteile vermeiden).
 *
 * Normalizer: reflexive pronoun strip (`sich|mich|dich|uns|euch`)
 * already lives in ExerciseTyping from A2. Three B1 typing items
 * ship with reflexive answers (sich bewerben, sich kümmern) and the
 * strip handles bare/reflexive input symmetrically.
 *
 * New grammarTags introduced at B1:
 *   - "prep-um-akk"  — um + Akkusativ (sich bewerben, sich kümmern)
 *   - "prep-an-dat"  — an + Dativ (teilnehmen)
 *   - "prep-auf-akk" — auf + Akkusativ (sich freuen auf)
 *   - "inseparable"  — prefix never splits (überlegen)
 *
 * Deck composition: 10 articlePicker + 5 typing + 5 translationMC
 * (same ratio as A1/A2). Noun article balance 4·5·4 across 13
 * nouns, with abstract -ung feminines dominating the die column as
 * they do in real B1 vocab.
 */

import type { GrammarTag } from "@/components/molecules/GrammarTagPills/GrammarTagPills";
import type { WordItem } from "@/content/words-a1";

export const WORDS_B1: WordItem[] = [
  // 1
  {
    topic: "Decision-making",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Entscheidung",
      english: "decision",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Ich hätte eine andere Entscheidung getroffen.",
        en: "I would have made a different decision.",
      },
    },
    prompt: "Entscheidung",
    hint: "decision",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: "Nouns ending in -ung are feminine → die.",
    noun: "Entscheidung",
    chunks: ["Ent", "schei", "dung"],
    tr: {
      topic: "Karar verme",
      learn: {
        english: "karar",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: { en: "Başka bir karar verirdim." },
      },
      hint: "karar",
      explanation: "-ung ile biten isimler dişildir → die.",
    },
  },

  // 2
  {
    topic: "Experience",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Erfahrung",
      english: "experience",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Durch viele Reisen hat sie viel Erfahrung gesammelt.",
        en: "Through many trips she has gathered a lot of experience.",
      },
    },
    prompt: "Erfahrung",
    hint: "experience",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation:
      "Another -ung noun → die. Collocation: Erfahrung sammeln (to gather experience).",
    noun: "Erfahrung",
    chunks: ["Er", "fah", "rung"],
    tr: {
      topic: "Deneyim",
      learn: {
        english: "deneyim",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: { en: "Çok seyahat ederek bolca deneyim kazandı." },
      },
      hint: "deneyim",
      explanation:
        "Bir başka -ung ismi → die. Kalıp: Erfahrung sammeln (deneyim kazanmak).",
    },
  },

  // 3
  {
    topic: "Responsibility",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Verantwortung",
      english: "responsibility",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Als Lehrer trägt man viel Verantwortung.",
        en: "As a teacher, one carries a lot of responsibility.",
      },
    },
    prompt: "Verantwortung",
    hint: "responsibility",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation:
      "Another -ung noun → die. Collocation: Verantwortung tragen.",
    noun: "Verantwortung",
    chunks: ["Ver", "ant", "wor", "tung"],
    tr: {
      topic: "Sorumluluk",
      learn: {
        english: "sorumluluk",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: { en: "Öğretmen olarak insan büyük sorumluluk taşır." },
      },
      hint: "sorumluluk",
      explanation:
        "Bir başka -ung ismi → die. Kalıp: Verantwortung tragen (sorumluluk taşımak).",
    },
  },

  // 4
  {
    topic: "Job applications",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "sich bewerben",
      english: "to apply for",
      rule:
        "Reflexive strong verb with 'um + Akkusativ': ich bewerbe mich um die Stelle. du bewirbst dich, er bewirbt sich. Aux = haben.",
      sample: {
        de: "Ich habe mich um eine neue Stelle beworben.",
        en: "I applied for a new position.",
      },
    },
    prompt: "to apply for",
    hint: "Type the German verb.",
    answer: "sich bewerben",
    explanation:
      '"sich bewerben um + Akk" is a fixed reflexive-prepositional combination. The preposition and case are part of the lexical entry.',
    chunks: ["sich", "be", "wer", "ben"],
    grammarTags: ["reflexive", "irregular", "prep-um-akk"] as GrammarTag[],
    tr: {
      topic: "İş başvuruları",
      learn: {
        english: "başvurmak (-e)",
        rule:
          "Düzensiz dönüşlü fiil, 'um + Akkusativ' ile: ich bewerbe mich um die Stelle. du bewirbst dich, er bewirbt sich. Yardımcı = haben.",
        sample: { en: "Yeni bir pozisyona başvurdum." },
      },
      prompt: "başvurmak",
      hint: "Almancasını yaz.",
      explanation:
        '"sich bewerben um + Akk" sabit dönüşlü-edatlı kalıptır. Edat ve hâl kelimenin ayrılmaz parçası.',
    },
  },

  // 5
  {
    topic: "Advantages",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Vorteil",
      english: "advantage",
      sample: {
        de: "Der größte Vorteil ist die Flexibilität.",
        en: "The biggest advantage is the flexibility.",
      },
    },
    prompt: "Vorteil",
    hint: "advantage",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation:
      '"Vorteil" is masculine → der. Opposite: der Nachteil (same gender).',
    noun: "Vorteil",
    chunks: ["Vor", "teil"],
    tr: {
      topic: "Avantajlar",
      learn: {
        english: "avantaj",
        sample: { en: "En büyük avantaj esneklik." },
      },
      hint: "avantaj",
      explanation: '"Vorteil" eril → der. Zıttı: der Nachteil (aynı cins).',
    },
  },

  // 6
  {
    topic: "Participation",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "teilnehmen",
      english: "to participate",
      rule:
        "Separable strong verb with 'an + Dativ': ich nehme teil, du nimmst teil, er nimmt teil. Aux = haben. Fixed combination: teilnehmen an + Dat.",
      sample: {
        de: "Viele Studenten nehmen an dem Kurs teil.",
        en: "Many students take part in the course.",
      },
    },
    prompt: "to participate",
    hint: "Type the German verb.",
    answer: "teilnehmen",
    explanation:
      '"teilnehmen an + Dat" — separable (teil at end), strong (nimmst/nimmt), with fixed \'an + Dativ\'.',
    chunks: ["teil", "neh", "men"],
    grammarTags: ["separable", "irregular", "prep-an-dat"] as GrammarTag[],
    tr: {
      topic: "Katılım",
      learn: {
        english: "katılmak (-e)",
        rule:
          "Ayrılabilir düzensiz fiil, 'an + Dativ' ile: ich nehme teil, du nimmst teil, er nimmt teil. Yardımcı = haben. Sabit kalıp: teilnehmen an + Dat.",
        sample: { en: "Birçok öğrenci kursa katılıyor." },
      },
      prompt: "katılmak",
      hint: "Almancasını yaz.",
      explanation:
        '"teilnehmen an + Dat" — ayrılabilir (teil sonda), düzensiz (nimmst/nimmt), sabit \'an + Dativ\' ile.',
    },
  },

  // 7
  {
    topic: "Disadvantages",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Nachteil",
      english: "disadvantage",
      sample: {
        de: "Ein Nachteil ist die hohe Miete.",
        en: "A disadvantage is the high rent.",
      },
    },
    prompt: "Nachteil",
    hint: "disadvantage",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Nachteil" is masculine → der. Pairs with der Vorteil.',
    noun: "Nachteil",
    chunks: ["Nach", "teil"],
    tr: {
      topic: "Dezavantajlar",
      learn: {
        english: "dezavantaj",
        sample: { en: "Bir dezavantaj yüksek kira." },
      },
      hint: "dezavantaj",
      explanation: '"Nachteil" eril → der. der Vorteil ile çiftleşir.',
    },
  },

  // 8
  {
    topic: "Comparison",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Unterschied",
      english: "difference",
      sample: {
        de: "Es gibt einen großen Unterschied zwischen beiden.",
        en: "There is a big difference between the two.",
      },
    },
    prompt: "Unterschied",
    hint: "difference",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation:
      '"Unterschied" is masculine → der. Collocation: einen Unterschied machen.',
    noun: "Unterschied",
    chunks: ["Un", "ter", "schied"],
    tr: {
      topic: "Karşılaştırma",
      learn: {
        english: "fark",
        sample: { en: "İkisi arasında büyük bir fark var." },
      },
      hint: "fark",
      explanation:
        '"Unterschied" eril → der. Kalıp: einen Unterschied machen (fark yaratmak).',
    },
  },

  // 9
  {
    topic: "Caregiving",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "sich kümmern",
      english: "to take care of",
      rule:
        "Reflexive regular verb with 'um + Akkusativ': ich kümmere mich um dich. Aux = haben.",
      sample: {
        de: "Sie kümmert sich um ihre alte Mutter.",
        en: "She takes care of her old mother.",
      },
    },
    prompt: "to take care of",
    hint: "Type the German verb.",
    answer: "sich kümmern",
    explanation:
      '"sich kümmern um + Akk" — reflexive, regular, with fixed \'um + Akkusativ\'.',
    chunks: ["sich", "küm", "mern"],
    grammarTags: ["reflexive", "regular", "prep-um-akk"] as GrammarTag[],
    tr: {
      topic: "Bakım, ilgilenme",
      learn: {
        english: "ilgilenmek (ile)",
        rule:
          "Düzenli dönüşlü fiil, 'um + Akkusativ' ile: ich kümmere mich um dich. Yardımcı = haben.",
        sample: { en: "Yaşlı annesiyle ilgileniyor." },
      },
      prompt: "ilgilenmek",
      hint: "Almancasını yaz.",
      explanation:
        '"sich kümmern um + Akk" — dönüşlü, düzenli, sabit \'um + Akkusativ\' ile.',
    },
  },

  // 10
  {
    topic: "Purpose",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Zweck",
      english: "purpose",
      sample: {
        de: "Was ist der Zweck dieses Treffens?",
        en: "What is the purpose of this meeting?",
      },
    },
    prompt: "Zweck",
    hint: "purpose",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation:
      '"Zweck" is masculine → der. Idiom: zu diesem Zweck (for this purpose).',
    noun: "Zweck",
    chunks: ["Zweck"],
    tr: {
      topic: "Amaç",
      learn: {
        english: "amaç",
        sample: { en: "Bu toplantının amacı ne?" },
      },
      hint: "amaç",
      explanation: '"Zweck" eril → der. Deyim: zu diesem Zweck (bu amaçla).',
    },
  },

  // 11
  {
    topic: "Deliberation",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "überlegen",
      english: "to think over",
      rule:
        "Inseparable verb: the 'über-' prefix stays attached in ALL forms. ich überlege, du überlegst, er überlegt. Aux = haben.",
      sample: {
        de: "Ich muss noch gut überlegen.",
        en: "I still need to think it over carefully.",
      },
    },
    prompt: "to think over",
    hint: "Type the German verb.",
    answer: "überlegen",
    explanation:
      '"überlegen" is INSEPARABLE: the prefix \'über-\' never splits off. Compare to separable verbs like \'aufstehen\'.',
    chunks: ["über", "le", "gen"],
    grammarTags: ["inseparable", "regular", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "Enine boyuna düşünmek",
      learn: {
        english: "düşünüp taşınmak",
        rule:
          "Ayrılmayan fiil: 'über-' ön eki TÜM çekimlerde birleşik kalır. ich überlege, du überlegst, er überlegt. Yardımcı = haben.",
        sample: { en: "Daha iyi düşünmem lazım." },
      },
      prompt: "düşünüp taşınmak",
      hint: "Almancasını yaz.",
      explanation:
        '"überlegen" AYRILMAZ: \'über-\' ön eki hiç ayrılmaz. Ayrılabilir fiillerle karşılaştır (aufstehen gibi).',
    },
  },

  // 12
  {
    topic: "Examples",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Beispiel",
      english: "example",
      sample: {
        de: "Kannst du mir ein Beispiel geben?",
        en: "Can you give me an example?",
      },
    },
    prompt: "Beispiel",
    hint: "example",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation:
      '"Beispiel" is neuter → das. Idiom: zum Beispiel (for example, z. B.).',
    noun: "Beispiel",
    chunks: ["Bei", "spiel"],
    tr: {
      topic: "Örnekler",
      learn: {
        english: "örnek",
        sample: { en: "Bana bir örnek verebilir misin?" },
      },
      hint: "örnek",
      explanation:
        '"Beispiel" nötr → das. Deyim: zum Beispiel (örneğin, z. B.).',
    },
  },

  // 13
  {
    topic: "Prejudice",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Vorurteil",
      english: "prejudice",
      sample: {
        de: "Man sollte Vorurteile vermeiden.",
        en: "One should avoid prejudices.",
      },
    },
    prompt: "Vorurteil",
    hint: "prejudice",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation:
      '"Vorurteil" is neuter → das. Compound: Vor- (before) + Urteil (judgment, neuter).',
    noun: "Vorurteil",
    chunks: ["Vor", "ur", "teil"],
    tr: {
      topic: "Önyargı",
      learn: {
        english: "önyargı",
        sample: { en: "Önyargılardan kaçınmak gerek." },
      },
      hint: "önyargı",
      explanation:
        '"Vorurteil" nötr → das. Bileşik: Vor- (önce) + Urteil (yargı, nötr).',
    },
  },

  // 14
  {
    topic: "Decisions",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "entscheiden",
      english: "to decide",
      rule:
        "Strong verb: ich entscheide, du entscheidest, er entscheidet. Partizip II: entschieden. Aux = haben. Reflexive form: sich entscheiden für + Akk (to decide on something).",
      sample: {
        de: "Wir haben uns für diese Lösung entschieden.",
        en: "We decided on this solution.",
      },
    },
    prompt: "to decide",
    hint: "Type the German verb.",
    answer: "entscheiden",
    explanation:
      '"entscheiden" is strong (ei → ie in Partizip: entschieden). The reflexive form \'sich entscheiden für + Akk\' is common.',
    chunks: ["ent", "schei", "den"],
    grammarTags: ["irregular", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "Kararlar",
      learn: {
        english: "karar vermek",
        rule:
          "Düzensiz fiil: ich entscheide, du entscheidest, er entscheidet. Partizip II: entschieden. Yardımcı = haben. Dönüşlü hâl: sich entscheiden für + Akk (bir şey lehine karar vermek).",
        sample: { en: "Bu çözüm için karar verdik." },
      },
      prompt: "karar vermek",
      hint: "Almancasını yaz.",
      explanation:
        '"entscheiden" düzensiz (ei → ie, Partizip: entschieden). Dönüşlü hâli \'sich entscheiden für + Akk\' sık kullanılır.',
    },
  },

  // 15
  {
    topic: "Results",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Ergebnis",
      english: "result",
      rule:
        "Nouns ending in -nis are usually neuter → das (Ergebnis, Gedächtnis, Ereignis, Zeugnis).",
      sample: {
        de: "Das Ergebnis der Prüfung war überraschend.",
        en: "The result of the exam was surprising.",
      },
    },
    prompt: "Ergebnis",
    hint: "result",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: "Nouns ending in -nis are neuter → das. New B1 pattern.",
    noun: "Ergebnis",
    chunks: ["Er", "geb", "nis"],
    tr: {
      topic: "Sonuçlar",
      learn: {
        english: "sonuç",
        rule:
          "-nis ile biten isimler genelde nötrdür → das (Ergebnis, Gedächtnis, Ereignis, Zeugnis).",
        sample: { en: "Sınav sonucu şaşırtıcıydı." },
      },
      hint: "sonuç",
      explanation: "-nis ile biten isimler nötrdür → das. Yeni B1 pattern'i.",
    },
  },

  // 16
  {
    topic: "Anticipation",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "sich freuen auf",
      english: "to look forward to",
      rule:
        "Reflexive with 'auf + Akkusativ' for FUTURE anticipation. Compare: 'sich freuen über + Akk' for PAST/PRESENT joy. Aux = haben.",
      sample: {
        de: "Ich freue mich auf das Wochenende.",
        en: "I'm looking forward to the weekend.",
      },
    },
    prompt: "sich freuen auf",
    options: [
      "to look forward to",
      "to be happy about",
      "to feel sad about",
      "to worry",
    ],
    correctIndex: 0,
    explanation:
      '"sich freuen auf + Akk" is for future expectation. The \'auf\' is the time-marker: future. For past/present joy use \'sich freuen über + Akk\'.',
    chunks: ["sich", "freu", "en"],
    grammarTags: ["reflexive", "regular", "prep-auf-akk"] as GrammarTag[],
    tr: {
      topic: "Sabırsızlıkla bekleme",
      learn: {
        english: "iple çekmek, sabırsızlıkla beklemek",
        rule:
          "Gelecek bekleyiş için 'auf + Akkusativ' ile dönüşlü. Karşılaştır: geçmiş/şimdiki sevinç için 'sich freuen über + Akk'. Yardımcı = haben.",
        sample: { en: "Hafta sonunu iple çekiyorum." },
      },
      options: ["iple çekmek", "mutlu olmak", "üzülmek", "endişelenmek"],
      explanation:
        '"sich freuen auf + Akk" gelecek bekleyiş için. \'auf\' zaman belirleyici: gelecek. Geçmiş/şimdiki sevinç için \'sich freuen über + Akk\'.',
    },
  },

  // 17
  {
    topic: "Expression",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "ausdrücken",
      english: "to express",
      rule:
        "Separable regular verb. Can be reflexive: sich ausdrücken = to express oneself. Aux = haben.",
      sample: {
        de: "Er kann seine Meinung gut ausdrücken.",
        en: "He can express his opinion well.",
      },
    },
    prompt: "ausdrücken",
    options: ["to express", "to press down", "to pull out", "to turn off"],
    correctIndex: 0,
    explanation:
      '"ausdrücken" = aus + drücken. Separable; the \'aus\' prefix at end in main clauses.',
    chunks: ["aus", "drü", "cken"],
    grammarTags: ["separable", "regular", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "İfade etme",
      learn: {
        english: "ifade etmek",
        rule:
          "Ayrılabilir düzenli fiil. Dönüşlü de olabilir: sich ausdrücken = kendini ifade etmek. Yardımcı = haben.",
        sample: { en: "Fikrini iyi ifade edebiliyor." },
      },
      options: ["ifade etmek", "aşağı bastırmak", "çekip çıkarmak", "kapatmak"],
      explanation:
        '"ausdrücken" = aus + drücken. Ayrılabilir; ana cümlede \'aus\' sonda.',
    },
  },

  // 18
  {
    topic: "Problem-solving",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Lösung",
      english: "solution",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Jedes Problem hat eine Lösung.",
        en: "Every problem has a solution.",
      },
    },
    prompt: "die Lösung",
    options: ["solution", "problem", "question", "answer"],
    correctIndex: 0,
    explanation:
      '"die Lösung" — feminine -ung noun. From the verb lösen (to solve).',
    chunks: ["Lö", "sung"],
    tr: {
      topic: "Problem çözme",
      learn: {
        english: "çözüm",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: { en: "Her problemin bir çözümü vardır." },
      },
      options: ["çözüm", "problem", "soru", "cevap"],
      explanation:
        '"die Lösung" — dişil -ung ismi. lösen (çözmek) fiilinden.',
    },
  },

  // 19
  {
    topic: "Opinions",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Meinung",
      english: "opinion",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Was ist deine Meinung zu diesem Thema?",
        en: "What is your opinion on this topic?",
      },
    },
    prompt: "die Meinung",
    options: ["opinion", "fact", "guess", "memory"],
    correctIndex: 0,
    explanation:
      '"die Meinung" — feminine -ung noun. Collocation: seine Meinung sagen / ausdrücken.',
    chunks: ["Mei", "nung"],
    tr: {
      topic: "Görüşler",
      learn: {
        english: "görüş, fikir",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: { en: "Bu konudaki fikrin ne?" },
      },
      options: ["görüş", "gerçek", "tahmin", "hatıra"],
      explanation:
        '"die Meinung" — dişil -ung ismi. Kalıp: seine Meinung sagen / ausdrücken (fikrini söylemek / ifade etmek).',
    },
  },

  // 20
  {
    topic: "Feelings",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Gefühl",
      english: "feeling",
      sample: {
        de: "Ich habe ein gutes Gefühl bei dieser Entscheidung.",
        en: "I have a good feeling about this decision.",
      },
    },
    prompt: "das Gefühl",
    options: ["feeling", "thought", "memory", "sense"],
    correctIndex: 0,
    explanation:
      '"das Gefühl" is neuter. Ge- prefix hints at neuter (though not strictly a rule here — Gefühl is conventionally das).',
    chunks: ["Ge", "fühl"],
    tr: {
      topic: "Duygular",
      learn: {
        english: "duygu, his",
        sample: { en: "Bu kararla ilgili iyi bir duygum var." },
      },
      options: ["duygu", "düşünce", "hatıra", "his"],
      explanation:
        '"das Gefühl" nötr. Ge- ön eki nötr\'e işaret eder (burada tam bir kural değil ama geleneksel olarak das).',
    },
  },
];
