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
  packs: {
    dailyLife: "Daily life",
    burgeramt: "Bürgeramt",
    hairdresser: "Hairdresser",
    shopping: "Shopping",
    foodDrink: "Food & drink",
    health: "Health",
  },
  waitlist: {
    heading: "Join the GenauApp beta",
    button: "Join waitlist",
    loading: "Joining…",
    success: "Thanks! We'll be in touch.",
    error: "Something went wrong. Try again?",
    emailPlaceholder: "you@example.com",
  },
  footer: {
    tagline: "Made in Berlin with care",
    impressum: "Impressum",
    datenschutz: "Privacy",
    cookies: "Cookie policy",
  },
};

/** The TR dictionary — must satisfy the EN shape. */
const tr: typeof en = {
  nav: {
    origins: "Kökenler",
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
    dailyLife: "Günlük hayat",
    burgeramt: "Bürgeramt",
    hairdresser: "Berber",
    shopping: "Alışveriş",
    foodDrink: "Yeme-içme",
    health: "Sağlık",
  },
  waitlist: {
    heading: "GenauApp beta'ya katıl",
    button: "Listeye katıl",
    loading: "Katılıyor…",
    success: "Teşekkürler! Yakında haber vereceğiz.",
    error: "Bir sorun oldu. Tekrar dener misin?",
    emailPlaceholder: "sen@ornek.com",
  },
  footer: {
    tagline: "Berlin'de özenle yapıldı",
    impressum: "Künye",
    datenschutz: "Gizlilik",
    cookies: "Çerezler",
  },
};

export type Strings = typeof en;

const DICT: Record<Locale, Strings> = { en, tr };

/** Resolve the string dictionary for a given locale. */
export function getStrings(locale: Locale): Strings {
  return DICT[locale];
}
