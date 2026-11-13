/**
 * i18n — string dictionaries for landing + blog + legal + nav.
 *
 * Shape conventions:
 *   - Keys are nested by surface (nav, hero, slides, footer, …) for
 *     discoverability.
 *   - Headlines with an italic emphasis span are split into `before`,
 *     `emphasis`, `after` so the markup can wrap the emphasis in a
 *     `<span>` without the dictionary knowing about React.
 *
 * `strings` is strongly typed on EN. TR must satisfy the same type, so
 * missing keys fail typecheck — which is the point: a TR lookup can't
 * silently fall through to a placeholder English fragment in prod.
 *
 * Content in this file is sourced from:
 *   - `claude/GenauApp_Brand_Voice.md` (tone rules + hero candidates)
 *   - `claude/GenauApp_Web_Landing_RightCard.md` (slide copy)
 *   - `claude/GenauApp_Web_TR_Localization_Draft.md` (TR picks)
 */

import type { Locale } from "./config";

/** The EN dictionary — treated as the schema; TR must match its shape. */
const en = {
  nav: {
    origins: "Read our story",
    storyBanner: "Our story: how Genau started",
  },
  // (`as const` is deliberately NOT used on `en`: it would narrow each
  // value to its literal string type and make the TR dict uninhabitable
  // — "Günlük hayat" doesn't extend "Daily life". The loose-string
  // shape still gives us structural key-level completeness via
  // `typeof en` below.)
  languagePicker: {
    ariaLabel: "Change language",
  },
  hero: {
    h1Before: "You keep learning German.",
    h1Emphasis: "We keep it from fading.",
    sub: "A sharp, honest companion for active learners.",
  },
  tryDemoCard: {
    heading: "Not sure yet? Try it first.",
    body: "Five minutes in your browser. Four workouts, zero signup.",
    cta: "Try it in your browser",
  },
  slides: {
    workout: {
      eyebrow: "Workout",
      h2Before: "Built from your ",
      h2Emphasis: "last performance",
      h2After: ".",
      sub: "Yesterday's misses come back today. Today's wins get a rest. The workout is yours, not a template.",
    },
    practice: {
      eyebrow: "Practice",
      h2Before: "The same word, ",
      h2Emphasis: "in every room you enter",
      h2After: ".",
      sub: "Pick it up in Words, meet it again in a Reading passage, hear it in a Story, build a sentence with it. Each time it sticks a little deeper.",
    },
    progress: {
      eyebrow: "Your progress",
      h2Before: "You see where you stand. ",
      h2Emphasis: "Honestly",
      h2After: ".",
      sub: "A real score per skill. Up when you earn it. Down when you miss it. Every time, we tell you what moved.",
    },
    packs: {
      eyebrow: "Real life events",
      h2Before: "Packs for the moments ",
      h2Emphasis: "you'll actually live",
      h2After: ".",
      sub: "Haircut, Bürgeramt, pharmacy, groceries. Each pack holds the words that moment needs, grouped the way German life groups them.",
    },
  },
  // Keys match the pack slugs used by the PacksSlide. Labels mirror
  // the current EN landing; TR follows the localization draft.
  packs: {
    dailyLife: "Daily Life",
    burgeramt: "Bürgeramt",
    hairdresser: "Hairdresser",
    shopping: "Shopping",
    foodDrink: "Food & Drink",
    pharmacyDoctor: "Pharmacy & Doctor",
  },
  waitlist: {
    heading: "Join the GenauApp beta",
    button: "Join waitlist",
    loading: "Joining…",
    successHeading: "You're on the list.",
    duplicateHeading: "You're already on the list.",
    successBody: "We'll mail you the moment the iOS beta drops.",
    error: "Something went wrong. Try again?",
    reassurance: "One email when the iOS beta drops. No spam, ever.",
    emailPlaceholder: "your@email.com",
  },
  footer: {
    tagline: "Made in Berlin",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    cookies: "Cookie Policy",
  },
  blogCta: {
    heading: "Dein Deutsch, dein Workout.",
    body: "Join the waitlist. We will let you know when GenauApp launches.",
    emailPlaceholder: "you@example.com",
    submit: "Join",
    loading: "…",
    successAlready: "You're already on the list. We'll let you know.",
    successNew: "You are in. We will let you know.",
    error: "Something went wrong. Try again?",
    backToLanding: "Back to GenauApp →",
  },
  try: {
    levelPicker: {
      eyebrow: "Try it in your browser",
      heading: "Where are you with German?",
      sub: "Pick your level. The five-minute demo tunes itself to where you actually are.",
      cards: {
        A1: {
          tagline: "Starting out.",
          description:
            "Basic verbs, articles, days and meals. If you can say your name in German, this is for you.",
        },
        A2: {
          tagline: "Building routines.",
          description:
            "Past tense, weil/dass, reflexive verbs. You can describe your week, read a short note.",
        },
        B1: {
          tagline: "Holding your own.",
          description:
            "Opinions, hypotheticals, longer stories. You can argue, explain, read articles.",
        },
        B2: {
          tagline: "Getting fluent.",
          description:
            "Idioms, nuance, abstract topics. You could run a meeting in German if you had to.",
        },
      },
    },
    skillsCard: {
      title: "Skills",
    },
    leftCard: {
      title: "Your workout",
      subtitle: "Tap any to begin your workout.",
      chips: {
        words:    { title: "Words",    meta: "20 words · ~5 min" },
        grammar:  { title: "Grammar",  meta: "20 questions · ~5 min" },
        sentence: { title: "Sentence", meta: "12 sentences · ~4 min" },
        reading:  { title: "Reading",  meta: "1 passage · 5 questions" },
      },
    },
    mode: {
      learn: "Learn",
      exercise: "Exercise",
    },
    rightPlaceholder: {
      idleHeading: "Pick a workout to begin.",
      idleBody:
        "Each chip opens a quick workout in this card. Four skills, five minutes.",
      stubHeading: "{chip} is being wired up.",
      stubBody: "This workout lands in the next update. Try Words for now.",
      stubCta: "Back to Words",
    },
    skillSheet: {
      close: "Close",
      vocab: {
        title: "Vocabulary",
        tiers: {
          starting: "Starting",
          building: "Building",
          growing: "Growing",
          strong: "Strong",
          mastery: "Mastery",
        },
        masteryLabel: "Word mastery",
        masteryMeta: "{count} total",
        masteryStrong: "Strong",
        masteryAverage: "Average",
        masteryWeak: "Weak",
        view: "View",
        articleLabel: "Article performance",
        teaserLabel: "More in the app",
        teaserHeader: "More in the app",
        mockPill: "App only",
        mockWeakTitle: "Weak words",
        mockBookmarksTitle: "Bookmarks",
        mockHistoryTitle: "Today",
        mockPacksTitle: "Packs",
        teaserCta: "Try the app →",
        emptyBody:
          "Complete your first Words workout to see your progress here.",
        emptyCta: "Start Words →",
      },
      grammar: {
        title: "Grammar",
        tiers: {
          starting: "Starting",
          building: "Building",
          growing: "Growing",
          strong: "Strong",
          mastery: "Mastery",
        },
        topicsLabel: "Grammar topics",
        topicsMeta: "{count} practiced",
        focusLabel: "Focus · {topic}",
        practice: "Practice {topic}",
        lowDataHint: "A few more attempts before trends appear.",
        legendCorrect: "correct",
        legendWrong: "wrong",
        legendNoData: "no data",
        teaserLabel: "More in the app",
        mockPill: "App only",
        mockWeakTitle: "Weak topics queue",
        mockMasteryTitle: "Mastery tree",
        mockPackTitle: "Per-pack grammar",
        mockWritingTitle: "Writing vs MC",
        teaserCta: "Try the app →",
        emptyBody:
          "Complete your first Grammar workout to see your progress here.",
        emptyCta: "Start Grammar →",
      },
    },
    learnCard: {
      topicEyebrow: "", // reserved
      actions: {
        repeat: "Repeat",
        iKnow: "I know",
      },
      sampleLabel: "Example",
      ruleLabel: "Rule",
    },
    assemblyLearnCard: {
      promptScrambled: "Type the correct translation",
      promptChunkCompose: "Compose the correct word",
    },
    assemblyArea: {
      keyboardHint: "Type on your keyboard · Backspace to undo",
      removeLast: "Remove last letter",
    },
    answerFeedback: {
      correct: "Correct",
      incorrect: "Not quite.",
      answerLabel: "Answer",
      continueLabel: "Continue →",
    },
    exerciseFeedback: {
      correct: "Correct",
      incorrect: "Incorrect",
      nextLabel: "Next →",
    },
    articlePicker: {
      // No prompt line — the noun + English hint carry the question.
    },
    translationMC: {
      // No prompt line — the German word carries the question.
    },
    typing: {
      eyebrow: "Translate to German",
      placeholder: "Type in German…",
      checkCta: "Check",
    },
    learnCompletion: {
      heading: "You walked the deck.",
      sub: "Learn shows you the pattern. Exercise is where it sticks — and where your skill rings fill up.",
      startOver: "Start over",
      switchToExercise: "Lock it in with Exercise →",
    },
    exerciseCompletion: {
      doneSuffix: "Done",
      // Subtitle bands keyed by the ratio band — matches subtitleFor().
      subtitles: {
        empty: "Deck empty.",
        nothing: "Nothing landed yet.",
        justStarted: "Just started.",
        gettingThere: "Getting there.",
        halfThere: "Half there.",
        overTheHump: "Over the hump.",
        strongRun: "Strong run.",
        almostClean: "Almost clean.",
        cleanSweep: "Clean sweep.",
      },
      instruction:
        "Tap the arrows to collect your skill gains, then pick another workout.",
      youFed: "You fed",
      skillLabels: {
        vocab: "Vocab",
        grammar: "Grammar",
        writing: "Writing",
        reading: "Reading",
      },
      continueWith: "Continue with {label} →",
    },
  },
};

/** The TR dictionary — must satisfy the EN shape. */
const tr: typeof en = {
  nav: {
    origins: "Kökenler",
    storyBanner: "Hikayemiz: Genau nasıl başladı",
  },
  languagePicker: {
    ariaLabel: "Dili değiştir",
  },
  hero: {
    // Final pick (approved by Mert) — blends options B + C: the "sen
    // Almancayı öğreniyorsun" active-subject rhythm from C paired with
    // the "paslanmasına" metaphor from B (Turkish's standard figure for
    // a skill going stale, stronger than "solmasına").
    h1Before: "Sen Almanca öğreniyorsun.",
    h1Emphasis: "Biz paslanmasına izin vermiyoruz.",
    sub: "Aktif öğrenenler için keskin ve dürüst bir workout partneri.",
  },
  tryDemoCard: {
    heading: "Henüz emin değil misin? Önce bir bak.",
    body: "Beş dakika, tarayıcında. Dört workout, kayıt yok.",
    cta: "Tarayıcında dene",
  },
  slides: {
    workout: {
      eyebrow: "Workout",
      h2Before: "",
      h2Emphasis: "Dünkü performansından",
      h2After: " kuruluyor.",
      sub: "Dün kaçırdıkların bugün karşına çıkıyor. Bugün çözdüklerin dinleniyor. Workout seni tanıyor, şablon değil.",
    },
    practice: {
      eyebrow: "Pratik",
      h2Before: "Aynı kelime, ",
      h2Emphasis: "girdiğin her odada",
      h2After: ".",
      sub: "Words'te tanış, Reading'te yeniden karşılaş, Story'de duy, Sentence'ta kur. Her seferinde bir tık daha oturuyor.",
    },
    progress: {
      eyebrow: "İlerlemen",
      h2Before: "Nerede durduğunu görüyorsun. ",
      h2Emphasis: "Dürüstçe",
      h2After: ".",
      sub: "Her skill için gerçek bir puan. Hak ettiğinde yükseliyor, kaçırdığında iniyor. Her seferinde neyin değiştiğini söylüyoruz.",
    },
    packs: {
      eyebrow: "Gerçek hayat anları",
      h2Before: "",
      h2Emphasis: "Gerçekten yaşayacağın",
      h2After: " anlar için pack'ler.",
      sub: "Berberde, Bürgeramt'ta, eczanede, markette. Her pack o anın kelimelerini taşır — Almanların hayatı gruplandırdığı gibi.",
    },
  },
  packs: {
    dailyLife: "Günlük Hayat",
    burgeramt: "Bürgeramt",
    hairdresser: "Berber",
    shopping: "Alışveriş",
    foodDrink: "Yeme-İçme",
    pharmacyDoctor: "Eczane & Doktor",
  },
  waitlist: {
    heading: "GenauApp beta'ya katıl",
    button: "Listeye katıl",
    loading: "Katılıyor…",
    successHeading: "Listedesin.",
    duplicateHeading: "Zaten listedesin.",
    successBody: "iOS beta çıkar çıkmaz sana mail atacağız.",
    error: "Bir sorun oldu. Tekrar dener misin?",
    reassurance: "iOS beta çıkınca bir mail. Spam yok, hiç.",
    emailPlaceholder: "sen@ornek.com",
  },
  footer: {
    tagline: "Berlin'den",
    impressum: "Künye",
    datenschutz: "Gizlilik",
    cookies: "Çerezler",
  },
  blogCta: {
    // Tagline stays in German — it's brand (same note as in the
    // Brand Voice doc). Everything around it is TR.
    heading: "Dein Deutsch, dein Workout.",
    body: "Listeye katıl. GenauApp çıkınca sana haber vereceğiz.",
    emailPlaceholder: "sen@ornek.com",
    submit: "Katıl",
    loading: "…",
    successAlready: "Zaten listedesin. Çıkınca haber vereceğiz.",
    successNew: "İçerdesin. Çıkınca haber vereceğiz.",
    error: "Bir sorun oldu. Tekrar dener misin?",
    backToLanding: "GenauApp'e dön →",
  },
  try: {
    levelPicker: {
      eyebrow: "Tarayıcında dene",
      heading: "Almancanla nerede duruyorsun?",
      sub: "Seviyeni seç. Beş dakikalık demo tam olduğun yere göre akıyor.",
      cards: {
        A1: {
          tagline: "Yeni başlıyorsun.",
          description:
            "Temel fiiller, artikeller, günler ve yemekler. Adını Almanca söyleyebiliyorsan burası sana uygun.",
        },
        A2: {
          tagline: "Oturtuyorsun.",
          description:
            "Geçmiş zaman, weil/dass, dönüşlü fiiller. Haftanı anlatabilir, kısa bir not okuyabilirsin.",
        },
        B1: {
          tagline: "Kendi başına dönüyorsun.",
          description:
            "Fikirler, varsayımlar, uzun hikayeler. Tartışabilir, açıklayabilir, makale okuyabilirsin.",
        },
        B2: {
          tagline: "Akıcılığa yakınsın.",
          description:
            "Deyimler, nüanslar, soyut konular. Gerekse Almanca bir toplantıyı yürütebilirsin.",
        },
      },
    },
    skillsCard: {
      title: "Beceriler",
    },
    leftCard: {
      title: "Antrenmanın",
      subtitle: "Birine dokun, antrenmanına başla.",
      chips: {
        words:    { title: "Kelimeler", meta: "20 kelime · ~5 dk" },
        grammar:  { title: "Gramer",    meta: "20 soru · ~5 dk" },
        sentence: { title: "Cümle",     meta: "12 cümle · ~4 dk" },
        reading:  { title: "Okuma",     meta: "1 metin · 5 soru" },
      },
    },
    mode: {
      learn: "Öğren",
      exercise: "Egzersiz",
    },
    skillSheet: {
      close: "Kapat",
      vocab: {
        title: "Kelime",
        tiers: {
          starting: "Başlangıç",
          building: "Gelişiyor",
          growing: "Büyüyor",
          strong: "Güçlü",
          mastery: "Ustalık",
        },
        masteryLabel: "Kelime ustalığı",
        masteryMeta: "{count} toplam",
        masteryStrong: "Güçlü",
        masteryAverage: "Orta",
        masteryWeak: "Zayıf",
        view: "Göster",
        articleLabel: "Artikel performansı",
        teaserLabel: "Uygulamada daha fazlası",
        teaserHeader: "Uygulamada daha fazlası",
        mockPill: "Uygulamada",
        mockWeakTitle: "Zayıf kelimeler",
        mockBookmarksTitle: "Yer imleri",
        mockHistoryTitle: "Bugün",
        mockPacksTitle: "Paketler",
        teaserCta: "Uygulamayı dene →",
        emptyBody:
          "İlk Kelime antrenmanını bitir, ilerlemeni burada göresin.",
        emptyCta: "Kelimeye başla →",
      },
      grammar: {
        title: "Gramer",
        tiers: {
          starting: "Başlangıç",
          building: "Gelişiyor",
          growing: "Büyüyor",
          strong: "Güçlü",
          mastery: "Ustalık",
        },
        topicsLabel: "Gramer konuları",
        topicsMeta: "{count} çalışıldı",
        focusLabel: "Odak · {topic}",
        practice: "{topic} çalış",
        lowDataHint: "Birkaç deneme daha, trend belirsin.",
        legendCorrect: "doğru",
        legendWrong: "yanlış",
        legendNoData: "veri yok",
        teaserLabel: "Uygulamada daha fazlası",
        mockPill: "Uygulamada",
        mockWeakTitle: "Zayıf konular sırası",
        mockMasteryTitle: "Ustalık ağacı",
        mockPackTitle: "Pack bazlı gramer",
        mockWritingTitle: "Yazma vs Çoktan seçmeli",
        teaserCta: "Uygulamayı dene →",
        emptyBody:
          "İlk Gramer antrenmanını bitir, ilerlemeni burada göresin.",
        emptyCta: "Gramere başla →",
      },
    },
    rightPlaceholder: {
      idleHeading: "Başlamak için bir antrenman seç.",
      idleBody:
        "Her çip bu kartta hızlı bir antrenman açar. Dört skill, beş dakika.",
      stubHeading: "{chip} henüz hazır değil.",
      stubBody:
        "Bu antrenman sonraki güncellemede geliyor. Şimdilik Kelimeler'i dene.",
      stubCta: "Kelimeler'e dön",
    },
    learnCard: {
      topicEyebrow: "",
      actions: {
        repeat: "Tekrar",
        iKnow: "Biliyorum",
      },
      sampleLabel: "Örnek",
      ruleLabel: "Kural",
    },
    assemblyLearnCard: {
      promptScrambled: "Doğru çeviriyi yaz",
      promptChunkCompose: "Doğru kelimeyi oluştur",
    },
    assemblyArea: {
      keyboardHint: "Klavyeden yaz · Geri almak için Backspace",
      removeLast: "Son harfi sil",
    },
    answerFeedback: {
      correct: "Doğru",
      incorrect: "Yaklaştın.",
      answerLabel: "Cevap",
      continueLabel: "Devam et →",
    },
    exerciseFeedback: {
      correct: "Doğru",
      incorrect: "Yanlış",
      nextLabel: "Sonraki →",
    },
    articlePicker: {},
    translationMC: {},
    typing: {
      eyebrow: "Almancaya çevir",
      placeholder: "Almanca yaz…",
      checkCta: "Kontrol et",
    },
    learnCompletion: {
      heading: "Desteyi gezdin.",
      sub: "Öğren kalıbı gösterir. Egzersiz onları pekiştirir — skill halkaların burada dolar.",
      startOver: "Baştan başla",
      switchToExercise: "Egzersizle pekiştir →",
    },
    exerciseCompletion: {
      doneSuffix: "Bitti",
      subtitles: {
        empty: "Deste boş.",
        nothing: "Hiçbiri tutmadı.",
        justStarted: "Daha yeni başladın.",
        gettingThere: "Yaklaşıyorsun.",
        halfThere: "Yarıdasın.",
        overTheHump: "Yarıyı geçtin.",
        strongRun: "İyi gitti.",
        almostClean: "Neredeyse tam.",
        cleanSweep: "Tam gaz.",
      },
      instruction:
        "Oklara dokun, skill kazanımlarını topla, sonra başka bir antrenman seç.",
      youFed: "Beslediklerin",
      skillLabels: {
        vocab: "Kelime",
        grammar: "Gramer",
        writing: "Yazma",
        reading: "Okuma",
      },
      continueWith: "{label} ile devam et →",
    },
  },
};

export type Strings = typeof en;

const DICT: Record<Locale, Strings> = { en, tr };

/** Resolve the string dictionary for a given locale. */
export function getStrings(locale: Locale): Strings {
  return DICT[locale];
}
