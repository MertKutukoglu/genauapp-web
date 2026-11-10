/**
 * /tr/try — Turkish entrypoint for the same interactive demo as /try.
 *
 * Re-exports the EN /try/page's default export so the UI is identical
 * — the i18n layer flips automatically because every /try/* component
 * reads its copy via `useLocale`, which derives the locale from the
 * current pathname (`/tr/*` → "tr", else → "en"). The ?reset / ?level
 * query handler there uses `usePathname()` instead of a hardcoded
 * `/try` so it rewrites correctly on this route too.
 */

export { default } from "@/app/try/page";
