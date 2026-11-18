import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import type { Locale } from "@/lib/i18n/config";

/**
 * BlogIndexCard, one row on the `/blog` and `/tr/blog` hub pages.
 *
 * Shape: full-width clickable card with a muted date eyebrow, bold
 * title, and a 1-2 sentence description. Hairline border and a light
 * hover tint keep it text-forward: no hero image dependency so a
 * post without one still looks finished.
 *
 * Presentational: the index page passes locale so the date renders
 * in the reader's language. Posts come from the registry
 * (`src/content/blog/posts.ts`); this card knows nothing about who
 * assembles them.
 */

export interface BlogIndexCardProps {
  href: string;
  title: string;
  description: string;
  publishedAt: string;
  /** Author-supplied reading time in whole minutes, from the blog
   *  registry. Rendered next to the date in the eyebrow. */
  readingTimeMinutes: number;
  /** Localized "min read" / "dk okuma" label. Passed in so the
   *  card can stay a pure presentational component. */
  readingTimeLabel: string;
  locale: Locale;
  ariaLabel: string;
  className?: string;
}

export function BlogIndexCard({
  href,
  title,
  description,
  publishedAt,
  readingTimeMinutes,
  readingTimeLabel,
  locale,
  ariaLabel,
  className,
}: BlogIndexCardProps) {
  const formattedDate = formatPublishedAt(publishedAt, locale);
  return (
    <Link
      href={href}
      aria-label={`${ariaLabel}: ${title}`}
      className={clsx(
        "group block w-full",
        "rounded-2xl p-5 md:p-6",
        "transition-[background-color,transform] duration-150",
        "hover:bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface-card))]",
        "active:scale-[0.995]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className={clsx(
          "flex items-center gap-2 mb-2",
          "font-sans font-semibold text-[11px] uppercase text-fg-faint",
        )}
        style={{ letterSpacing: "0.4px" }}
      >
        <time dateTime={publishedAt}>{formattedDate}</time>
        <span aria-hidden>·</span>
        <span>
          {readingTimeMinutes} {readingTimeLabel}
        </span>
      </div>
      <h2
        className={clsx(
          "font-display font-bold leading-tight text-fg m-0 mb-2",
          "text-[22px] md:text-[26px]",
          "group-hover:text-[var(--accent)] transition-colors duration-150",
        )}
      >
        {title}
      </h2>
      <p
        className={clsx(
          "font-sans font-normal text-fg-muted leading-relaxed m-0",
          "text-[15px] md:text-[16px]",
        )}
      >
        {description}
      </p>
    </Link>
  );
}

/** ISO date to locale-friendly month + day + year. Deterministic,
 *  server-safe (no `toLocaleDateString` in modules that might hydrate
 *  before client-locale is settled). */
function formatPublishedAt(iso: string, locale: Locale): string {
  const [yearStr, monthStr, dayStr] = iso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!year || !month || !day) return iso;
  const monthNames: Record<Locale, string[]> = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    tr: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],
  };
  const monthName = monthNames[locale][month - 1] ?? monthStr;
  if (locale === "tr") {
    return `${day} ${monthName} ${year}`;
  }
  return `${monthName} ${day}, ${year}`;
}
