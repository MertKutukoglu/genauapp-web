import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog/posts";
import { getAllSlugs } from "@/lib/dictionary/data";

/**
 * sitemap.xml, the public surface we want indexed.
 *
 * Static pages (landing, try, legal, blog hub) live in a hardcoded
 * list below; blog posts auto-expand from the BLOG_POSTS registry
 * so publishing a new post never requires editing this file.
 *
 * Every entry carries `alternates.languages` pointing at its EN/TR
 * sibling so Google reads the two-locale pairing straight from the
 * sitemap, not only from each page's <link rel="alternate">. The
 * domain here MUST match the canonical origin in app/layout.tsx
 * (both resolve to www.genauapp.io) or Google treats the bare and
 * www-prefixed variants as separate sites and splits authority.
 */

const BASE = "https://www.genauapp.io";

interface StaticPair {
  en: string;
  tr: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  /** YYYY-MM-DD, author-maintained review date. Omit for today. */
  lastReviewed?: string;
}

/** Non-blog surfaces. Each row groups the EN URL and its TR
 *  counterpart so we emit one sitemap entry per locale with the
 *  other side as an alternate, matching the pattern every post
 *  page's `alternates.languages` already declares. */
const STATIC_PAIRS: StaticPair[] = [
  { en: "/", tr: "/tr", changeFrequency: "weekly", priority: 1.0 },
  { en: "/try", tr: "/tr/try", changeFrequency: "monthly", priority: 0.8 },
  { en: "/blog", tr: "/tr/blog", changeFrequency: "weekly", priority: 0.9 },
  { en: "/dictionary", tr: "/tr/sozluk", changeFrequency: "weekly", priority: 0.9 },
  {
    en: "/impressum",
    tr: "/tr/kunye",
    changeFrequency: "yearly",
    priority: 0.2,
    lastReviewed: "2026-11-10",
  },
  {
    en: "/datenschutz",
    tr: "/tr/gizlilik",
    changeFrequency: "yearly",
    priority: 0.2,
    lastReviewed: "2026-11-10",
  },
  {
    en: "/cookie-policy",
    tr: "/tr/cerezler",
    changeFrequency: "yearly",
    priority: 0.2,
    lastReviewed: "2026-11-10",
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static pages: one entry per locale, each carrying the alternates
  // map so Google sees both sides of the EN/TR pair.
  for (const pair of STATIC_PAIRS) {
    const lastModified = pair.lastReviewed
      ? new Date(pair.lastReviewed)
      : now;
    const alternates = {
      languages: {
        en: `${BASE}${pair.en}`,
        tr: `${BASE}${pair.tr}`,
        "x-default": `${BASE}${pair.en}`,
      },
    };
    entries.push({
      url: `${BASE}${pair.en}`,
      lastModified,
      changeFrequency: pair.changeFrequency,
      priority: pair.priority,
      alternates,
    });
    entries.push({
      url: `${BASE}${pair.tr}`,
      lastModified,
      changeFrequency: pair.changeFrequency,
      priority: pair.priority * 0.95,
      alternates,
    });
  }

  // Blog posts: auto-expanded from the central registry so new posts
  // appear in the sitemap the moment their entry lands in
  // src/content/blog/posts.ts. publishedAt doubles as lastModified
  // until a post is edited; bump the registry when that changes.
  for (const post of BLOG_POSTS) {
    if (post.hidden) continue;
    const lastModified = new Date(post.en.publishedAt);
    const alternates = {
      languages: {
        en: `${BASE}${post.en.href}`,
        tr: `${BASE}${post.tr.href}`,
        "x-default": `${BASE}${post.en.href}`,
      },
    };
    entries.push({
      url: `${BASE}${post.en.href}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates,
    });
    entries.push({
      url: `${BASE}${post.tr.href}`,
      lastModified: new Date(post.tr.publishedAt),
      changeFrequency: "monthly",
      priority: 0.65,
      alternates,
    });
  }

  // Dictionary entries: one per locale per published slug pulled
  // from public.dict_entries. Shared slug across locales keeps the
  // alternates clean.
  const dictSlugs = await getAllSlugs();
  for (const slug of dictSlugs) {
    const alternates = {
      languages: {
        en: `${BASE}/dictionary/${slug}`,
        tr: `${BASE}/tr/sozluk/${slug}`,
        "x-default": `${BASE}/dictionary/${slug}`,
      },
    };
    entries.push({
      url: `${BASE}/dictionary/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates,
    });
    entries.push({
      url: `${BASE}/tr/sozluk/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
      alternates,
    });
  }

  return entries;
}
