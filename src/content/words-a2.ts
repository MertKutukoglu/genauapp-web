/**
 * Words — A2 deck (20 items). Verbatim port of
 * claude/GenauApp_Web_Try_Words_Content_A2.md §3.
 *
 * Same shape as WORDS_A1: each item carries its Learn block, its
 * exercise fields (articlePicker / translationMC / typing), its
 * syllable chunks, optional verb grammar tags, and a full TR
 * overlay mirroring the English-side learner copy.
 *
 * A2 brings three new verb-kind grammar tags:
 *   - "regular"      — weak verb, no stem change (sich beeilen, sich erinnern)
 *   - "separable"    — prefix splits off (aufstehen, einkaufen, anrufen, einladen)
 *   - "prep-an-akk"  — fixed "an + Akkusativ" preposition (sich erinnern)
 *
 * Reflexive verbs ship with their canonical "sich +" form in
 * `learn.word` / `answer`. The ExerciseTyping normalizer strips a
 * leading reflexive pronoun before comparison, so both "sich beeilen"
 * and "beeilen" count as correct.
 *
 * Rule field policy (unchanged from A1):
 *   - Only when a real general pattern predicts the article:
 *     -ung → die (Wohnung, Erkältung), abstract -e → die (Freude),
 *     Ge- prefix → das (Gespräch).
 *   - Convention-only nouns (Nachbar, Arbeit, Termin, Glück, Film,
 *     Arzt, Wochenende, Angst) carry no `rule`.
 */

import type { GrammarTag } from "@/components/molecules/GrammarTagPills/GrammarTagPills";
import type { WordItem } from "@/content/words-a1";

export const WORDS_A2: WordItem[] = [
  // 1
  {
    topic: "Wohnen",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Wohnung",
      english: "apartment",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Meine Wohnung ist im dritten Stock.",
        en: "My apartment is on the third floor.",
      },
    },
    prompt: "Wohnung",
    hint: "apartment",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: "Nouns ending in -ung are feminine → die.",
    noun: "Wohnung",
    chunks: ["Woh", "nung"],
    tr: {
      topic: "Ev / Daire",
      learn: {
        english: "daire",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: { en: "Dairem üçüncü katta." },
      },
      hint: "daire",
      explanation: "-ung ile biten isimler dişildir → die.",
    },
  },
  // 2
  {
    topic: "People",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Nachbar",
      english: "neighbor",
      sample: {
        de: "Mein Nachbar hört gern Musik.",
        en: "My neighbor likes listening to music.",
      },
    },
    prompt: "Nachbar",
    hint: "neighbor",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Nachbar" is masculine → der.',
    noun: "Nachbar",
    chunks: ["Nach", "bar"],
    tr: {
      topic: "İnsanlar",
      learn: {
        english: "komşu",
        sample: { en: "Komşum müzik dinlemeyi sever." },
      },
      hint: "komşu",
      explanation: '"Nachbar" eril → der.',
    },
  },
  // 3
  {
    topic: "Daily routines",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "sich beeilen",
      english: "to hurry",
      rule: "Reflexive verb, ich beeile mich, du beeilst dich, er beeilt sich.",
      sample: {
        de: "Ich muss mich beeilen, der Bus kommt gleich.",
        en: "I have to hurry, the bus is coming soon.",
      },
    },
    prompt: "to hurry",
    hint: "Type the German verb.",
    answer: "sich beeilen",
    explanation:
      '"sich beeilen" is reflexive; the pronoun (mich/dich/sich) changes with the subject.',
    chunks: ["sich", "be", "ei", "len"],
    grammarTags: ["reflexive", "regular"] as GrammarTag[],
    tr: {
      topic: "Günlük rutinler",
      learn: {
        english: "acele etmek",
        rule: "Dönüşlü fiil: ich beeile mich, du beeilst dich, er beeilt sich.",
        sample: { en: "Acele etmem lazım, otobüs birazdan gelecek." },
      },
      prompt: "acele etmek",
      hint: "Almancasını yaz.",
      explanation:
        '"sich beeilen" dönüşlü fiildir; özne değişince dönüşlü zamir de (mich/dich/sich) değişir.',
    },
  },
  // 4
  {
    topic: "Daily routines",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "aufstehen",
      english: "to get up",
      rule: "Separable verb, aux = sein. Present: ich stehe auf, du stehst auf, er steht auf.",
      sample: {
        de: "Ich stehe jeden Morgen um sieben auf.",
        en: "I get up at seven every morning.",
      },
    },
    prompt: "to get up",
    hint: "Type the German verb.",
    answer: "aufstehen",
    explanation:
      '"aufstehen" is separable; prefix moves to the end in main clauses (Ich stehe auf).',
    chunks: ["auf", "ste", "hen"],
    grammarTags: ["separable", "irregular", "aux-sein"] as GrammarTag[],
    tr: {
      topic: "Günlük rutinler",
      learn: {
        english: "kalkmak (yataktan)",
        rule: "Ayrılabilir fiil, yardımcı = sein. Şimdiki zaman: ich stehe auf, du stehst auf, er steht auf.",
        sample: { en: "Her sabah yedide kalkarım." },
      },
      prompt: "kalkmak (yataktan)",
      hint: "Almancasını yaz.",
      explanation:
        '"aufstehen" ayrılabilir fiildir; ana cümlede ön ek sona gider (Ich stehe auf).',
    },
  },
  // 5
  {
    topic: "Work",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Arbeit",
      english: "work",
      sample: {
        de: "Die Arbeit beginnt um neun Uhr.",
        en: "Work starts at nine.",
      },
    },
    prompt: "Arbeit",
    hint: "work",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: '"Arbeit" is feminine → die.',
    noun: "Arbeit",
    chunks: ["Ar", "beit"],
    tr: {
      topic: "İş",
      learn: {
        english: "iş",
        sample: { en: "İş dokuzda başlar." },
      },
      hint: "iş",
      explanation: '"Arbeit" dişil → die.',
    },
  },
  // 6
  {
    topic: "Work",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Termin",
      english: "appointment",
      sample: {
        de: "Ich habe morgen einen Termin beim Arzt.",
        en: "I have a doctor's appointment tomorrow.",
      },
    },
    prompt: "Termin",
    hint: "appointment",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Termin" is masculine → der.',
    noun: "Termin",
    chunks: ["Ter", "min"],
    tr: {
      topic: "İş",
      learn: {
        english: "randevu",
        sample: { en: "Yarın doktor randevum var." },
      },
      hint: "randevu",
      explanation: '"Termin" eril → der.',
    },
  },
  // 7
  {
    topic: "Daily life",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "einkaufen",
      english: "to shop",
      rule: "Separable verb, aux = haben. Present: ich kaufe ein, du kaufst ein, er kauft ein.",
      sample: {
        de: "Am Samstag kaufe ich im Supermarkt ein.",
        en: "On Saturdays I shop at the supermarket.",
      },
    },
    prompt: "to shop",
    hint: "Type the German verb.",
    answer: "einkaufen",
    explanation:
      '"einkaufen" is separable; the prefix \'ein\' moves to the end in main clauses.',
    chunks: ["ein", "kau", "fen"],
    grammarTags: ["separable", "regular", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "Günlük hayat",
      learn: {
        english: "alışveriş yapmak",
        rule: "Ayrılabilir fiil, yardımcı = haben. Şimdiki zaman: ich kaufe ein, du kaufst ein, er kauft ein.",
        sample: { en: "Cumartesileri süpermarkette alışveriş yaparım." },
      },
      prompt: "alışveriş yapmak",
      hint: "Almancasını yaz.",
      explanation:
        '"einkaufen" ayrılabilir fiildir; ana cümlede \'ein\' ön eki sona gider.',
    },
  },
  // 8
  {
    topic: "Health",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Erkältung",
      english: "cold / flu",
      rule: "Nouns ending in -ung are feminine → die.",
      sample: {
        de: "Ich habe eine Erkältung und bleibe zu Hause.",
        en: "I have a cold and I'm staying home.",
      },
    },
    prompt: "Erkältung",
    hint: "cold / flu",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: "Another -ung noun → die.",
    noun: "Erkältung",
    chunks: ["Er", "käl", "tung"],
    tr: {
      topic: "Sağlık",
      learn: {
        english: "soğuk algınlığı",
        rule: "-ung ile biten isimler dişildir → die.",
        sample: { en: "Soğuk algınlığım var, evde kalıyorum." },
      },
      hint: "soğuk algınlığı",
      explanation: "Bir başka -ung ismi → die.",
    },
  },
  // 9
  {
    topic: "Feelings",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Glück",
      english: "luck / happiness",
      sample: {
        de: "Zum Glück habe ich den Zug noch erreicht.",
        en: "Luckily I still caught the train.",
      },
    },
    prompt: "Glück",
    hint: "luck / happiness",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: '"Glück" is neuter → das.',
    noun: "Glück",
    chunks: ["Glück"],
    tr: {
      topic: "Duygular",
      learn: {
        english: "şans / mutluluk",
        sample: { en: "Neyse ki treni hâlâ yakalayabildim." },
      },
      hint: "şans / mutluluk",
      explanation: '"Glück" nötr → das.',
    },
  },
  // 10
  {
    topic: "Work",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Kollege",
      english: "colleague",
      sample: {
        de: "Mein Kollege arbeitet seit zehn Jahren hier.",
        en: "My colleague has been working here for ten years.",
      },
    },
    prompt: "der Kollege",
    options: ["colleague", "boss", "client", "friend"],
    correctIndex: 0,
    explanation: '"der Kollege" is masculine. Feminine form: die Kollegin.',
    chunks: ["Kol", "le", "ge"],
    tr: {
      topic: "İş",
      learn: {
        english: "meslektaş",
        sample: { en: "Meslektaşım on yıldır burada çalışıyor." },
      },
      options: ["meslektaş", "patron", "müşteri", "arkadaş"],
      explanation: '"der Kollege" eril. Dişil hâli: die Kollegin.',
    },
  },
  // 11
  {
    topic: "Feelings",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Freude",
      english: "joy",
      rule: "Abstract nouns ending in -e are typically feminine → die.",
      sample: {
        de: "Die Freude über das Geschenk war groß.",
        en: "The joy about the gift was great.",
      },
    },
    prompt: "Freude",
    hint: "joy",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: "Abstract -e nouns are feminine → die.",
    noun: "Freude",
    chunks: ["Freu", "de"],
    tr: {
      topic: "Duygular",
      learn: {
        english: "sevinç",
        rule: "Soyut -e eki ile biten isimler genelde dişildir → die.",
        sample: { en: "Hediyeye duyulan sevinç büyüktü." },
      },
      hint: "sevinç",
      explanation: "Soyut -e eki ile biten isimler dişildir → die.",
    },
  },
  // 12
  {
    topic: "Memory verbs",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "vergessen",
      english: "to forget",
      rule: "Strong verb, stem change e → i in du/er: du vergisst, er vergisst. Aux = haben.",
      sample: {
        de: "Ich habe meinen Schlüssel vergessen.",
        en: "I forgot my key.",
      },
    },
    prompt: "to forget",
    hint: "Type the German verb.",
    answer: "vergessen",
    explanation:
      '"vergessen" is a strong verb; stem vowel e → i in du/er forms.',
    chunks: ["ver", "ges", "sen"],
    grammarTags: ["irregular", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "Hafıza fiilleri",
      learn: {
        english: "unutmak",
        rule: "Düzensiz fiil, du/er'de kök sesli e → i: du vergisst, er vergisst. Yardımcı = haben.",
        sample: { en: "Anahtarımı unuttum." },
      },
      prompt: "unutmak",
      hint: "Almancasını yaz.",
      explanation:
        '"vergessen" düzensiz fiil; du/er formlarında kök sesli e → i olur.',
    },
  },
  // 13
  {
    topic: "Leisure",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Film",
      english: "movie / film",
      sample: {
        de: "Der Film beginnt um acht Uhr.",
        en: "The movie starts at eight.",
      },
    },
    prompt: "Film",
    hint: "movie / film",
    options: ["der", "die", "das"],
    correctIndex: 0,
    explanation: '"Film" is masculine → der.',
    noun: "Film",
    chunks: ["Film"],
    tr: {
      topic: "Boş zaman",
      learn: {
        english: "film",
        sample: { en: "Film sekizde başlıyor." },
      },
      hint: "film",
      explanation: '"Film" eril → der.',
    },
  },
  // 14
  {
    topic: "Communication",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Gespräch",
      english: "conversation",
      rule: "Many nouns with the Ge- prefix are neuter → das (Gespräch, Geschenk, Geschäft).",
      sample: {
        de: "Wir hatten ein langes Gespräch über die Arbeit.",
        en: "We had a long conversation about work.",
      },
    },
    prompt: "Gespräch",
    hint: "conversation",
    options: ["der", "die", "das"],
    correctIndex: 2,
    explanation: "Ge- prefix nouns are often neuter → das.",
    noun: "Gespräch",
    chunks: ["Ge", "spräch"],
    tr: {
      topic: "İletişim",
      learn: {
        english: "sohbet / konuşma",
        rule: "Ge- ön ekiyle başlayan isimler genelde nötrdür → das (Gespräch, Geschenk, Geschäft).",
        sample: { en: "İş hakkında uzun bir sohbetimiz oldu." },
      },
      hint: "sohbet",
      explanation: "Ge- ön ekli isimler genelde nötrdür → das.",
    },
  },
  // 15
  {
    topic: "Communication",
    exerciseType: "typing",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "anrufen",
      english: "to call",
      rule: "Separable strong verb, aux = haben. Present: ich rufe an, du rufst an, er ruft an.",
      sample: {
        de: "Ich rufe dich morgen Abend an.",
        en: "I'll call you tomorrow evening.",
      },
    },
    prompt: "to call (on the phone)",
    hint: "Type the German verb.",
    answer: "anrufen",
    explanation:
      '"anrufen" is separable; the prefix \'an\' moves to the end in main clauses.',
    chunks: ["an", "ru", "fen"],
    grammarTags: ["separable", "irregular", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "İletişim",
      learn: {
        english: "aramak (telefonla)",
        rule: "Ayrılabilir düzensiz fiil, yardımcı = haben. Şimdiki zaman: ich rufe an, du rufst an, er ruft an.",
        sample: { en: "Yarın akşam seni ararım." },
      },
      prompt: "aramak (telefonla)",
      hint: "Almancasını yaz.",
      explanation:
        '"anrufen" ayrılabilir fiildir; ana cümlede \'an\' ön eki sona gider.',
    },
  },
  // 16
  {
    topic: "Health",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "der",
      word: "Arzt",
      english: "doctor",
      sample: {
        de: "Der Arzt hat heute keine Zeit.",
        en: "The doctor has no time today.",
      },
    },
    prompt: "der Arzt",
    options: ["doctor", "teacher", "nurse", "patient"],
    correctIndex: 0,
    explanation: '"der Arzt" is masculine. Feminine: die Ärztin.',
    chunks: ["Arzt"],
    tr: {
      topic: "Sağlık",
      learn: {
        english: "doktor",
        sample: { en: "Doktorun bugün vakti yok." },
      },
      options: ["doktor", "öğretmen", "hemşire", "hasta"],
      explanation: '"der Arzt" eril. Dişil hâli: die Ärztin.',
    },
  },
  // 17
  {
    topic: "Social",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "einladen",
      english: "to invite",
      rule: "Separable strong verb, stem change a → ä in du/er: du lädst ein, er lädt ein. Aux = haben.",
      sample: {
        de: "Wir laden unsere Freunde zum Essen ein.",
        en: "We invite our friends for dinner.",
      },
    },
    prompt: "einladen",
    options: ["to invite", "to visit", "to call", "to leave"],
    correctIndex: 0,
    explanation:
      '"einladen" means to invite; separable, strong with a → ä stem change.',
    chunks: ["ein", "la", "den"],
    grammarTags: ["separable", "irregular", "akkusativ"] as GrammarTag[],
    tr: {
      topic: "Sosyal",
      learn: {
        english: "davet etmek",
        rule: "Ayrılabilir düzensiz fiil, du/er'de kök sesli a → ä: du lädst ein, er lädt ein. Yardımcı = haben.",
        sample: { en: "Arkadaşlarımızı yemeğe davet ediyoruz." },
      },
      options: ["davet etmek", "ziyaret etmek", "aramak", "ayrılmak"],
      explanation:
        '"einladen" davet etmek demektir; ayrılabilir, du/er\'de a → ä kök sesli değişir.',
    },
  },
  // 18
  {
    topic: "Memory",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: null,
      wordKind: "verb",
      word: "sich erinnern",
      english: "to remember",
      rule: "Reflexive verb with 'an + Akkusativ': ich erinnere mich an dich. Aux = haben.",
      sample: {
        de: "Ich erinnere mich an meinen ersten Schultag.",
        en: "I remember my first day at school.",
      },
    },
    prompt: "sich erinnern",
    options: ["to remember", "to forget", "to think", "to wait"],
    correctIndex: 0,
    explanation:
      '"sich erinnern an + Akk" is a fixed reflexive-prepositional construction.',
    chunks: ["sich", "er", "in", "nern"],
    grammarTags: ["reflexive", "regular", "prep-an-akk"] as GrammarTag[],
    tr: {
      topic: "Hafıza",
      learn: {
        english: "hatırlamak",
        rule: "Dönüşlü fiil, 'an + Akkusativ' ile kullanılır: ich erinnere mich an dich. Yardımcı = haben.",
        sample: { en: "İlk okul günümü hatırlıyorum." },
      },
      options: ["hatırlamak", "unutmak", "düşünmek", "beklemek"],
      explanation:
        '"sich erinnern an + Akk" sabit dönüşlü-edatlı yapıdır.',
    },
  },
  // 19
  {
    topic: "Time",
    exerciseType: "translationMC",
    learn: {
      layout: "wordCard",
      article: "das",
      word: "Wochenende",
      english: "weekend",
      sample: {
        de: "Am Wochenende bleibe ich oft zu Hause.",
        en: "On the weekend I often stay home.",
      },
    },
    prompt: "das Wochenende",
    options: ["weekend", "week", "year", "day"],
    correctIndex: 0,
    explanation:
      '"das Wochenende" is neuter. Compound: Woche (week) + Ende (end).',
    chunks: ["Wo", "chen", "en", "de"],
    tr: {
      topic: "Zaman",
      learn: {
        english: "hafta sonu",
        sample: { en: "Hafta sonları genelde evde kalırım." },
      },
      options: ["hafta sonu", "hafta", "yıl", "gün"],
      explanation: '"das Wochenende" nötr. Bileşik: Woche (hafta) + Ende (son).',
    },
  },
  // 20
  {
    topic: "Feelings",
    exerciseType: "articlePicker",
    learn: {
      layout: "wordCard",
      article: "die",
      word: "Angst",
      english: "fear",
      sample: {
        de: "Er hat Angst vor dem Termin.",
        en: "He's afraid of the appointment.",
      },
    },
    prompt: "Angst",
    hint: "fear",
    options: ["der", "die", "das"],
    correctIndex: 1,
    explanation: '"Angst" is feminine → die. Fixed phrase: Angst vor + Dativ.',
    noun: "Angst",
    chunks: ["Angst"],
    tr: {
      topic: "Duygular",
      learn: {
        english: "korku",
        sample: { en: "Randevudan korkuyor." },
      },
      hint: "korku",
      explanation: '"Angst" dişil → die. Sabit kalıp: Angst vor + Dativ.',
    },
  },
];
