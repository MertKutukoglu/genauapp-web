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
    slug: "how-skills-work",
    en: {
      title: "What skills are in GenauApp (and why they can go down)",
      description:
        "Every workout feeds three of your four skills, not one. The ring only climbs, but the arrow next to it tells the truth about your direction. Here is how it works.",
      href: "/blog/how-skills-work",
      publishedAt: "2026-11-18",
    },
    tr: {
      title: "GenauApp'te skill nedir? (Ve neden aşağı da iner)",
      description:
        "Her workout dört skill'inin üçünü birden besler, birini değil. Ring hep yükselir, ama yanındaki ok sana yönünün gerçeğini söyler. İşte nasıl çalışıyor.",
      href: "/tr/blog/skill-nedir",
      publishedAt: "2026-11-18",
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
    },
    tr: {
      title: "Genau'nun kökenleri",
      description:
        "Kendi Almanca flashcard'larımı renkli yazdım, sonra etrafında bir uygulama kurdum. Almanya'da yaşamak için Almanca'ya ihtiyacı olan yetişkinler için.",
      href: "/tr/blog/kokenler",
      publishedAt: "2026-10-27",
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
