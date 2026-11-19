/**
 * i18n, locale configuration.
 *
 * The site ships English at the root (`/`) and Turkish under a `/tr/`
 * prefix. English stays at the root (not `/en/`) because it's the
 * default and Google's x-default maps there; moving it under `/en/`
 * would break every existing inbound link and force a redirect layer
 * for no SEO gain.
 *
 * Locale resolution per request (handled by `getLocaleFromPath` below):
 *   - path starts with `/tr`  → "tr"
 *   - anything else           → "en"
 *
 * There is no `[locale]` dynamic segment. Each TR page is a sibling
 * file at `app/tr/.../page.tsx`, mirroring the EN route tree. Keeps
 * existing EN routes untouched and lets us ship TR page-by-page.
 */

export const LOCALES = ["en", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Human labels for the language picker UI. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
};

/** The cookie key where the user's explicit choice is persisted. */
export const LOCALE_COOKIE = "genauapp_lang";
/** One year, in seconds. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Tell which locale a given pathname belongs to.
 *
 * `/tr`        → "tr"
 * `/tr/blog`   → "tr"
 * `/blog`      → "en"
 * `/`          → "en"
 *
 * Only checks the leading segment; deeper matches fall back to the
 * default. Keeps the function trivially tree-shakable and O(1).
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  if (pathname === "/tr" || pathname.startsWith("/tr/")) return "tr";
  return DEFAULT_LOCALE;
}

/**
 * Pair every EN path with its TR counterpart. The LanguagePicker uses
 * this so clicking "TR" on `/blog/origins-of-genau` lands on
 * `/tr/blog/kokenler`, not the TR homepage.
 *
 * Any path not listed falls back to the opposite locale's root
 * (`/` ↔ `/tr`), which is a safe default while the TR tree is still
 * being populated. Entries are added here as each TR page lands.
 *
 * Keys are the EN path (no trailing slash except for root).
 * Values are the TR path.
 */
export const EN_TO_TR_PATH: Record<string, string> = {
  "/": "/tr",
  "/blog": "/tr/blog",
  "/blog/origins-of-genau": "/tr/blog/kokenler",
  "/blog/how-skills-work": "/tr/blog/skill-nedir",
  "/blog/how-it-works": "/tr/blog/nasil-calisir",
  "/blog/visual-german-articles": "/tr/blog/gorsel-almanca-artikel",
  "/blog/spaced-repetition-done-honestly": "/tr/blog/aralikli-tekrar",
  "/dictionary": "/tr/sozluk",
  "/impressum": "/tr/kunye",
  "/datenschutz": "/tr/gizlilik",
  "/cookie-policy": "/tr/cerezler",
  "/try": "/tr/try",
};

/** Inverse lookup, derived once. */
export const TR_TO_EN_PATH: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_TR_PATH).map(([en, tr]) => [tr, en]),
);

/**
 * Prefix-level swaps for routes with a shared slug tail (dictionary
 * word pages, blog posts that mirror each other, etc.). Without these
 * every slug would need its own EN_TO_TR_PATH row.
 *
 * Order matters: longest prefix first, so `/dictionary/foo` matches
 * `/dictionary/` before any shorter prefix. The function below walks
 * this list in order and returns the first hit.
 */
const PREFIX_SWAPS: Array<{ en: string; tr: string }> = [
  { en: "/dictionary/", tr: "/tr/sozluk/" },
];

/**
 * Given a path on one locale, return the equivalent path on the other.
 * First consults the exact-path map, then prefix swaps for routes
 * whose slug tail is shared across locales; falls back to that
 * locale's root when nothing matches.
 */
export function getEquivalentPath(pathname: string, target: Locale): string {
  const current = getLocaleFromPath(pathname);
  if (current === target) return pathname;

  if (target === "tr") {
    const exact = EN_TO_TR_PATH[pathname];
    if (exact) return exact;
    for (const p of PREFIX_SWAPS) {
      if (pathname.startsWith(p.en)) {
        return p.tr + pathname.slice(p.en.length);
      }
    }
    return "/tr";
  }
  const exact = TR_TO_EN_PATH[pathname];
  if (exact) return exact;
  for (const p of PREFIX_SWAPS) {
    if (pathname.startsWith(p.tr)) {
      return p.en + pathname.slice(p.tr.length);
    }
  }
  return "/";
}
