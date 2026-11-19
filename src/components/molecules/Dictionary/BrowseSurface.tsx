import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import type {
  ArticleColor,
  DictionaryEntry,
  DictLocale,
} from "./types";

/**
 * BrowseSurface, the "browse without typing" block that sits under
 * the search bar on the dictionary landing pages. Not opinionated
 * about layout; exposes three visual sections the page composes
 * into the empty state:
 *
 *   - <ArticleTiles />, 3 big colored tiles for der / die / das
 *     that anchor the page's visual identity in the article color
 *     system, each linking to a canonical word of that gender.
 *   - <PopularGrid />, a card grid of representative entries.
 *     Each card uses article color on background + border, so the
 *     grid itself colors-codes the article system.
 *   - <LevelStrip />, a quiet level pill row (A1 / A2 / B1 ...) at
 *     the foot, non-clickable for now; becomes a filter when hubs
 *     ship.
 */

const ARTICLE_COLOR: Record<ArticleColor, string> = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
};

const ARTICLE_SUBLABEL: Record<ArticleColor, Record<DictLocale, string>> = {
  der: { en: "Masculine", tr: "Eril" },
  die: { en: "Feminine", tr: "Dişil" },
  das: { en: "Neuter", tr: "Nötr" },
};

const SECTION = {
  browseByArticle: {
    en: "Browse by article",
    tr: "Artikel üstünden gez",
  },
  popular: {
    en: "Popular",
    tr: "Sık aranan",
  },
  byLevel: {
    en: "By level",
    tr: "Seviyeye göre",
  },
  nouns: {
    en: "nouns",
    tr: "isim",
  },
} as const;

/* ================================================================ *
 *  ArticleTiles                                                    *
 * ================================================================ */

export interface ArticleTilesProps {
  entries: DictionaryEntry[];
  locale: DictLocale;
  hrefPrefix: string;
  className?: string;
}

export function ArticleTiles({
  entries,
  locale,
  hrefPrefix,
  className,
}: ArticleTilesProps) {
  // Pick a canonical entry for each article: lowest-level noun of
  // that gender in the current set. If we have none for a gender,
  // the tile stays as a non-link visual.
  const bestFor = (article: ArticleColor): DictionaryEntry | undefined => {
    const matches = entries
      .filter((e) => e.type === "noun" && e.noun?.article === article)
      .sort((a, b) => a.level.localeCompare(b.level));
    return matches[0];
  };

  const articles: ArticleColor[] = ["der", "die", "das"];

  return (
    <section
      aria-label={SECTION.browseByArticle[locale]}
      className={clsx("flex flex-col gap-3", className)}
    >
      <SectionEyebrow>{SECTION.browseByArticle[locale]}</SectionEyebrow>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {articles.map((a) => {
          const color = ARTICLE_COLOR[a];
          const entry = bestFor(a);
          const subLabel = ARTICLE_SUBLABEL[a][locale];
          const count = entries.filter(
            (e) => e.type === "noun" && e.noun?.article === a,
          ).length;

          const inner = (
            <div
              className="relative flex flex-col items-start justify-between rounded-2xl overflow-hidden p-4 sm:p-5"
              style={{
                aspectRatio: "1 / 1.15",
                background: `color-mix(in srgb, ${color} 14%, transparent)`,
                border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
              }}
            >
              <div
                className="font-sans font-bold leading-none text-[40px] sm:text-[52px]"
                style={{ color }}
              >
                {a}
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-sans font-semibold text-[13px] sm:text-[14px]"
                  style={{ color }}
                >
                  {subLabel}
                </span>
                <span className="font-sans text-[11px] text-fg-muted">
                  {count} {SECTION.nouns[locale]}
                </span>
              </div>
            </div>
          );

          if (!entry) return <div key={a}>{inner}</div>;
          return (
            <Link
              key={a}
              href={`${hrefPrefix}/${entry.slug}`}
              aria-label={`${a} ${entry.german}`}
              className="no-underline hover:opacity-90 transition-opacity"
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================ *
 *  PopularGrid                                                     *
 * ================================================================ */

export interface PopularGridProps {
  entries: DictionaryEntry[];
  locale: DictLocale;
  hrefPrefix: string;
  /** How many cards to show. Defaults to 6. */
  limit?: number;
  className?: string;
}

export function PopularGrid({
  entries,
  locale,
  hrefPrefix,
  limit = 6,
  className,
}: PopularGridProps) {
  const picks = entries.slice(0, limit);
  return (
    <section
      aria-label={SECTION.popular[locale]}
      className={clsx("flex flex-col gap-3", className)}
    >
      <SectionEyebrow>{SECTION.popular[locale]}</SectionEyebrow>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {picks.map((e) => (
          <PopularCard
            key={e.slug}
            entry={e}
            locale={locale}
            hrefPrefix={hrefPrefix}
          />
        ))}
      </div>
    </section>
  );
}

function PopularCard({
  entry,
  locale,
  hrefPrefix,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
  hrefPrefix: string;
}) {
  const isNoun = entry.type === "noun" && !!entry.noun;
  const color = isNoun ? ARTICLE_COLOR[entry.noun!.article] : "var(--accent)";
  const translation =
    locale === "tr"
      ? entry.translations.turkish ?? entry.translations.english
      : entry.translations.english ?? entry.translations.turkish;
  return (
    <Link
      href={`${hrefPrefix}/${entry.slug}`}
      className="group relative flex flex-col gap-1 rounded-2xl p-4 no-underline"
      style={{
        background: isNoun
          ? `color-mix(in srgb, ${color} 7%, var(--surface-card))`
          : "var(--surface-card)",
        border: `1px solid color-mix(in srgb, ${color} ${isNoun ? "25%" : "18%"}, var(--border))`,
      }}
    >
      <div className="flex items-baseline gap-1.5 min-w-0">
        {isNoun ? (
          <span
            className="font-sans font-bold text-[18px] leading-none shrink-0"
            style={{ color }}
          >
            {entry.noun!.article}
          </span>
        ) : null}
        <span
          className="font-sans font-bold text-[18px] leading-none truncate"
          style={{ color: isNoun ? color : "var(--fg)" }}
        >
          {entry.german}
        </span>
      </div>
      {translation ? (
        <div className="font-sans text-[13px] text-fg-muted truncate">
          {translation}
        </div>
      ) : null}
      <div
        className="font-sans text-[10px] uppercase text-fg-faint mt-1"
        style={{ letterSpacing: "0.4px" }}
      >
        {entry.type} · {entry.level}
      </div>
    </Link>
  );
}

/* ================================================================ *
 *  LevelStrip                                                      *
 * ================================================================ */

export interface LevelStripProps {
  entries: DictionaryEntry[];
  locale: DictLocale;
  className?: string;
}

export function LevelStrip({
  entries,
  locale,
  className,
}: LevelStripProps) {
  const levels = ["A1", "A2", "B1", "B2"] as const;
  return (
    <section
      aria-label={SECTION.byLevel[locale]}
      className={clsx("flex flex-col gap-3", className)}
    >
      <SectionEyebrow>{SECTION.byLevel[locale]}</SectionEyebrow>
      <div className="flex flex-wrap gap-2">
        {levels.map((l) => {
          const count = entries.filter((e) => e.level === l).length;
          const dim = count === 0;
          return (
            <div
              key={l}
              className="inline-flex items-baseline gap-2 rounded-full px-3 py-1.5"
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border)",
                opacity: dim ? 0.5 : 1,
              }}
            >
              <span className="font-sans font-bold text-[14px] text-fg">
                {l}
              </span>
              <span className="font-sans text-[12px] text-fg-muted">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================ *
 *  Shared                                                          *
 * ================================================================ */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-sans text-[11px] uppercase text-fg-faint"
      style={{ letterSpacing: "0.5px" }}
    >
      {children}
    </div>
  );
}
