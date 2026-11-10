/**
 * i18n — locale configuration.
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
  // Phase 1 adds the mappings below as each page lands:
  // "/blog/origins-of-genau": "/tr/blog/kokenler",
  // "/impressum":             "/tr/kunye",
  // "/datenschutz":           "/tr/gizlilik",
  // "/cookie-policy":         "/tr/cerezler",
};

/** Inverse lookup, derived once. */
export const TR_TO_EN_PATH: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_TR_PATH).map(([en, tr]) => [tr, en]),
);

/**
 * Given a path on one locale, return the equivalent path on the other.
 * If no mapping is registered yet, fall back to that locale's root.
 */
export function getEquivalentPath(pathname: string, target: Locale): string {
  const current = getLocaleFromPath(pathname);
  if (current === target) return pathname;

  if (target === "tr") {
    return EN_TO_TR_PATH[pathname] ?? "/tr";
  }
  return TR_TO_EN_PATH[pathname] ?? "/";
}
