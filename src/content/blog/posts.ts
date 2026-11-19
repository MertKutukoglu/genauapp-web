/**
 * Blog post registry.
 *
 * Central metadata source for every blog post on the site. Each
 * entry carries both locale variants so the `/blog` and `/tr/blog`
 * index pages render from one list instead of two and the EN/TR
 * sibling posts stay in lock-step.
 *
 * Adding a new post:
 *   1. Create the EN page at `src/app/blog/<slug>/page.tsx`.
 *   2. Create the TR sibling at `src/app/tr/blog/<tr-slug>/page.tsx`
 *      (TR slug can differ; it's stored on the entry).
 *   3. Register the EN→TR path in `src/lib/i18n/config.ts`
 *      (EN_TO_TR_PATH) so the Language picker can hop between them.
 *   4. Append an entry below with title, description, href and
 *      publishedAt in both locales.
 *
 * The index pages derive everything (title, description, date,
 * sort order) from here. No page hardcodes its own index card;
 * the registry is the single source of truth.
 */

import type { Locale } from "@/lib/i18n/config";

/**
 * One locale's view of a blog post. Learner-facing surfaces
 * (title, description, publishedAt) swap per locale; the slug
 * is a stable id shared across locales.
 */
export interface BlogPostLocale {
  /** Page title. Also used as the index card heading. */
  title: string;
  /** One or two sentences shown on the index card and as the
   *  Open Graph description. Keep under ~180 characters so it
   *  fits Google's SERP window. */
  description: string;
  /** Absolute path (`/blog/...` or `/tr/blog/...`). */
  href: string;
  /** ISO date string (YYYY-MM-DD). Rendered as a localized
   *  date on the index card; also drives the default sort. */
  publishedAt: string;
  /** Rough reading time in whole minutes, author-supplied so a
   *  TR version can land at a different number from the EN one
   *  without us word-counting JSX bodies. Shown on the index
   *  card eyebrow and under the post byline. */
  readingTimeMinutes: number;
}

export interface BlogPost {
  /** Stable id, used as React key and analytics tag. Never
   *  translated; keep it in kebab-case and tied to the EN slug. */
  slug: string;
  en: BlogPostLocale;
  tr: BlogPostLocale;
  /** Optional flag to hide a post from the index without
   *  removing the route (e.g. draft, outdated). Defaults to false. */
  hidden?: boolean;
}

/**
 * All blog posts, newest-first-sorted at read time by the helpers
 * below. Ordering in this array is just the author's convenience;
 * `publishedAt` is what the index uses.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "spaced-repetition-done-honestly",
    en: {
      title: "Spaced repetition done honestly",
      description:
        "Classic SRS asks you to grade your own paper. GenauApp measures instead: the answer you tap is the data, the arrow next to the ring is the direction, and the box is not opaque.",
      href: "/blog/spaced-repetition-done-honestly",
      publishedAt: "2026-11-19",
      readingTimeMinutes: 5,
    },
    tr: {
      title: "Aralıklı tekrar, ama dürüstçe",
      description:
        "Klasik SRS senden kendi kağıdını not vermeni ister. GenauApp ölçer: dokunduğun cevap data'dır, ring'in yanındaki ok yönünü söyler, ve kutu kapalı değildir.",
      href: "/tr/blog/aralikli-tekrar",
      publishedAt: "2026-11-19",
      readingTimeMinutes: 5,
    },
  },
  {
    slug: "visual-german-articles",
    en: {
      title: "Visual German articles, the color-coded method",
      description:
        "Memorizing der / die / das one word at a time is slow. German articles follow patterns you can see at a glance once the UI gives you a color for each gender. Here is how we teach them.",
      href: "/blog/visual-german-articles",
      publishedAt: "2026-11-19",
      readingTimeMinutes: 6,
    },
    tr: {
      title: "Görsel Almanca artikel, renk kodlu yöntem",
      description:
        "der / die / das'ı kelime kelime ezberlemek yavaş. Almanca artikeller, UI her cinse bir renk verdiğinde göze çarpan kalıplara uyar. İşte nasıl öğrettiğimiz.",
      href: "/tr/blog/gorsel-almanca-artikel",
      publishedAt: "2026-11-19",
      readingTimeMinutes: 6,
    },
  },
  {
    slug: "how-it-works",
    en: {
      title: "How GenauApp works, the 4 chips",
      description:
        "Every session is built from four chips: Words, Grammar, Sentence, Reading. Here is what each chip does, how it teaches, and why they add up to a workout you can actually finish.",
      href: "/blog/how-it-works",
      publishedAt: "2026-11-19",
      readingTimeMinutes: 4,
    },
    tr: {
      title: "GenauApp nasıl çalışır, 4 chip",
      description:
        "Her session dört chip'ten kuruludur: Words, Grammar, Sentence, Reading. Her chip ne yapar, nasıl öğretir, ve bu dördü nasıl bir arada bir workout'a dönüşür, hepsi burada.",
      href: "/tr/blog/nasil-calisir",
      publishedAt: "2026-11-19",
      readingTimeMinutes: 4,
    },
  },
  {
    slug: "how-skills-work",
    en: {
      title: "What skills are in GenauApp (and why they can go down)",
      description:
        "Every workout feeds three of your four skills, not one. The ring moves both ways because wrong answers cost you points, and the arrow next to it tells the truth about your direction. Here is how it works.",
      href: "/blog/how-skills-work",
      publishedAt: "2026-11-18",
      readingTimeMinutes: 6,
    },
    tr: {
      title: "GenauApp'te skill nedir? (Ve neden aşağı da iner)",
      description:
        "Her workout dört skill'inin üçünü birden besler, birini değil. Ring iki yönlü hareket eder çünkü yanlış cevaplar sana puan kaybettirir, ve yanındaki ok sana yönünün gerçeğini söyler. İşte nasıl çalışıyor.",
      href: "/tr/blog/skill-nedir",
      publishedAt: "2026-11-18",
      readingTimeMinutes: 6,
    },
  },
  {
    slug: "origins-of-genau",
    en: {
      title: "Origins of Genau",
      description:
        "I rewrote my German flashcards in color, then built an app around it. For adults who need German to live in Germany, not to pass an exam in ten years.",
      href: "/blog/origins-of-genau",
      publishedAt: "2026-10-27",
      readingTimeMinutes: 7,
    },
    tr: {
      title: "Genau'nun kökenleri",
      description:
        "Kendi Almanca flashcard'larımı renkli yazdım, sonra etrafında bir uygulama kurdum. Almanya'da yaşamak için Almanca'ya ihtiyacı olan yetişkinler için.",
      href: "/tr/blog/kokenler",
      publishedAt: "2026-10-27",
      readingTimeMinutes: 7,
    },
  },
];

/**
 * Posts for the given locale, newest-first, with hidden entries
 * filtered out. Index pages render whatever this returns, in order.
 */
export function getBlogPostsForLocale(
  locale: Locale,
): Array<{ slug: string } & BlogPostLocale> {
  return BLOG_POSTS.filter((p) => !p.hidden)
    .map((p) => ({
      slug: p.slug,
      ...p[locale],
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
