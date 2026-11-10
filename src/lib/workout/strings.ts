import type { Locale } from "@/lib/i18n/config";

/**
 * Copy for the Workout-Complete flow (Summary → Feedback → Done).
 *
 * Kept in its own file so we don't deepen the already-large
 * `strings.ts` dictionary and so the three organisms can read a flat
 * record. Numbers quoted in the summary come from Mert's content
 * table (2026-11-10): A1-only figures — the honest "what you'd
 * actually get if you signed up now" — plus a short note about the
 * higher levels waiting beyond that.
 *
 * TR copy picked to match the brand's continuity voice already used
 * in the landing hero ("Sen Almanca öğreniyorsun. Biz paslanmasına
 * izin vermiyoruz.") — the Summary tease talks about momentum, not
 * features.
 */

export interface WorkoutCopy {
  /** Label on the ExerciseCompletion CTA that opens the summary. */
  openSummaryCta: string;
  summary: {
    heading: string;
    sub: string;
    statsLabel: string;
    contentHeading: string;
    contentBullets: string[];
    contentFootnote: string;
    emailHeading: string;
    emailBody: string;
    emailPlaceholder: string;
    submitCta: string;
    submittingCta: string;
    dismissLink: string;
  };
  feedback: {
    heading: string;
    sub: string;
    textareaPlaceholder: string;
    submitCta: string;
    skipLink: string;
  };
  done: {
    heading: string;
    sub: string;
    blogCta: string;
    homeLink: string;
  };
  errors: {
    invalidEmail: string;
    submit: string;
  };
}

const EN: WorkoutCopy = {
  openSummaryCta: "See workout summary →",
  summary: {
    heading: "You completed your first workout.",
    sub: "That's the taste. The full app keeps you going.",
    statsLabel: "First-try correct",
    contentHeading: "What A1 holds in the full app",
    contentBullets: [
      "300 words across 12 themed packs",
      "19 grammar topics · 85 learn cards · 280 drills",
      "36 reading stories · 180 comprehension questions",
      "180 sentence-builder items",
    ],
    contentFootnote: "A2, B1, B2 wait on the other side.",
    emailHeading: "Want it to stick?",
    emailBody:
      "Leave your email and we'll let you know when the app goes live — a new pack a week, from your phone, before the routine fades.",
    emailPlaceholder: "you@example.com",
    submitCta: "Join the waitlist",
    submittingCta: "Submitting…",
    dismissLink: "Not now",
  },
  feedback: {
    heading: "One sec before you go.",
    sub: "What's missing for you?",
    textareaPlaceholder:
      "One sentence is enough — we read every one.",
    submitCta: "Send",
    skipLink: "Skip",
  },
  done: {
    heading: "Thanks — you're on the list.",
    sub: "We'll reach out when the app is ready.",
    blogCta: "Take a look at the blog →",
    homeLink: "Back to home",
  },
  errors: {
    invalidEmail: "That email doesn't look right.",
    submit: "Something went wrong. Try again?",
  },
};

const TR: WorkoutCopy = {
  openSummaryCta: "Workout özetin →",
  summary: {
    heading: "İlk workout'unu bitirdin.",
    sub: "Tadı buydu. Uygulama ritmi bozmadan devam ettiriyor.",
    statsLabel: "İlk denemede doğru",
    contentHeading: "Tam uygulamada A1'de seni ne bekliyor",
    contentBullets: [
      "12 temalı pakette 300 kelime",
      "19 gramer konusu · 85 öğrenme kartı · 280 alıştırma",
      "36 okuma hikayesi · 180 anlama sorusu",
      "180 cümle kurma egzersizi",
    ],
    contentFootnote: "Ötesinde A2, B1, B2 seni bekliyor.",
    emailHeading: "Paslanmasın mı istiyorsun?",
    emailBody:
      "E-postanı bırak; uygulama yayına girdiğinde haber verelim — her hafta yeni bir paket, telefonundan, ritmin sönmeden.",
    emailPlaceholder: "sen@example.com",
    submitCta: "Bekleme listesine katıl",
    submittingCta: "Gönderiliyor…",
    dismissLink: "Şimdi değil",
  },
  feedback: {
    heading: "Çıkmadan önce bir saniye.",
    sub: "Neyin eksik kaldı?",
    textareaPlaceholder:
      "Bir cümle yeter — hepsini okuyoruz.",
    submitCta: "Gönder",
    skipLink: "Geç",
  },
  done: {
    heading: "Teşekkürler — listedeyiz.",
    sub: "Uygulama hazır olunca sana haber veririz.",
    blogCta: "Blog'a göz at →",
    homeLink: "Ana sayfaya dön",
  },
  errors: {
    invalidEmail: "Bu e-posta doğru görünmüyor.",
    submit: "Bir şeyler ters gitti. Tekrar denemek ister misin?",
  },
};

export function workoutCopy(locale: Locale): WorkoutCopy {
  return locale === "tr" ? TR : EN;
}
