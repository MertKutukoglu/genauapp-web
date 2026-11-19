"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import type {
  ArticleColor,
  DictionaryEntry,
  DictLocale,
} from "./types";
import { useTranslationLang } from "./TranslationLangContext";
import { Icon } from "@/components/atoms/Icon/Icon";

/**
 * Landing pieces for the dictionary empty state, composed by
 * /dictionary and /tr/sozluk under the search bar:
 *
 *   <DictionaryStats />    compact word / sentence / rule chip row
 *   <WordOfTheDay />       mini WordCard for the day's deterministic
 *                          pick, headline + translation + rule + sample
 *   <PopularList />        6 entries in a less compact column layout
 *   <ComingSoonBanner />   soft iOS banner that links to the waitlist
 *
 * ArticleTiles and LevelStrip are retired from the landing (per
 * product review) but kept exported from BrowseSurface in case a
 * hub page wants them later.
 */

const ARTICLE_COLOR: Record<ArticleColor, string> = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
};

const STR = {
  statWords:    { en: "words",    tr: "kelime" },
  statExamples: { en: "sentences", tr: "cümle" },
  statRules:    { en: "rules",    tr: "kural" },
  statsCaption: {
    en: "Every entry carries an article, its grammar, a rule when one applies, and A1 to B2 example sentences in English and Turkish.",
    tr: "Her girdide artikel, gramer bilgisi, varsa kural, ve A1 ile B2 arası İngilizce + Türkçe örnek cümleler bulunur.",
  },
  wotdEyebrow:  { en: "Word of the day", tr: "Günün kelimesi" },
  popularEyebrow: {
    en: "Most common",
    tr: "Yaygın kelimeler",
  },
  bannerTitle: {
    en: "GenauApp lands on iOS soon.",
    tr: "GenauApp iOS'ta yakında.",
  },
  bannerBody: {
    en: "The full learning experience: workouts, skill rings, daily plan. Get notified when it drops.",
    tr: "Tam öğrenme deneyimi: workout'lar, skill ring'leri, günlük plan. Çıktığında haber verelim.",
  },
  bannerCta: {
    en: "Join the waitlist",
    tr: "Bekleme listesine katıl",
  },
  rule: { en: "Rule", tr: "Kural" },
  sampleEyebrow: { en: "Example", tr: "Örnek" },
} as const;

function pick<T extends Record<DictLocale, unknown>>(
  s: T,
  l: DictLocale,
): T[DictLocale] {
  return s[l];
}

/* ================================================================ *
 *  DictionaryStats                                                 *
 * ================================================================ */

export interface DictionaryStatsProps {
  wordCount: number;
  exampleCount: number;
  ruleCount: number;
  locale: DictLocale;
  className?: string;
}

/** A thin, compact row of three stat chips. Numbers use locale
 *  grouping (2,952 vs 2.952), so a German speaker on EN still
 *  reads them cleanly. */
export function DictionaryStats({
  wordCount,
  exampleCount,
  ruleCount,
  locale,
  className,
}: DictionaryStatsProps) {
  const fmt = (n: number) =>
    n.toLocaleString(locale === "tr" ? "tr-TR" : "en-US");
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <div
        role="list"
        aria-label={pick(STR.statsCaption, locale)}
        className="flex flex-wrap items-center gap-2"
      >
        <Chip number={fmt(wordCount)} label={pick(STR.statWords, locale)} />
        <Chip number={fmt(exampleCount)} label={pick(STR.statExamples, locale)} />
        <Chip number={fmt(ruleCount)} label={pick(STR.statRules, locale)} />
      </div>
      <p className="font-sans text-[12px] text-fg-muted m-0 leading-snug">
        {pick(STR.statsCaption, locale)}
      </p>
    </div>
  );
}

function Chip({ number, label }: { number: string; label: string }) {
  // Non-interactive span (no cursor pointer, no hover state) so the
  // stat row doesn't read as clickable. These are information, not
  // navigation.
  return (
    <span
      role="listitem"
      className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-full select-none"
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      <span className="font-sans font-bold text-[14px] text-fg leading-none">
        {number}
      </span>
      <span className="font-sans text-[12px] text-fg-muted leading-none">
        {label}
      </span>
    </span>
  );
}

/* ================================================================ *
 *  WordOfTheDay                                                    *
 * ================================================================ */

export interface WordOfTheDayProps {
  entry: DictionaryEntry;
  locale: DictLocale;
  hrefPrefix: string;
  className?: string;
}

/** Mini WordCard: article + word in its gender colour, translation,
 *  optional rule pill, one sample sentence. Entire card is a link
 *  to the full word page. Compact (not full WordCard size) so the
 *  landing doesn't feel like one of the word pages. */
export function WordOfTheDay({
  entry,
  locale,
  hrefPrefix,
  className,
}: WordOfTheDayProps) {
  const tLang = useTranslationLang();
  const isNoun = entry.type === "noun" && !!entry.noun;
  const articleColor = isNoun
    ? ARTICLE_COLOR[entry.noun!.article]
    : undefined;
  const heroColor = articleColor ?? "var(--fg)";
  const translation =
    tLang === "tr"
      ? entry.translations.turkish ?? entry.translations.english
      : entry.translations.english ?? entry.translations.turkish;
  const ruleText =
    locale === "tr"
      ? entry.rule?.turkish ?? entry.rule?.english
      : entry.rule?.english ?? entry.rule?.turkish;
  const primaryExample = [...entry.leveledExamples].sort((a, b) =>
    a.level.localeCompare(b.level),
  )[0];
  const exTranslation = primaryExample
    ? tLang === "tr"
      ? primaryExample.tr ?? primaryExample.en
      : primaryExample.en ?? primaryExample.tr
    : undefined;

  return (
    <section className={clsx("flex flex-col gap-3", className)}>
      <div
        className="font-sans text-[11px] uppercase text-fg-faint"
        style={{ letterSpacing: "0.5px" }}
      >
        {pick(STR.wotdEyebrow, locale)}
      </div>

      <Link
        href={`${hrefPrefix}/${entry.slug}`}
        className="dict-card-hover group flex flex-col gap-4 rounded-[20px] p-5 no-underline"
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          boxShadow:
            "0 2px 10px color-mix(in srgb, var(--fg) 4%, transparent)",
        }}
      >
        <div className="flex flex-col items-center gap-2 py-2">
          {isNoun ? (
            <div
              className="font-sans font-bold leading-[1.05] text-[28px] sm:text-[32px] text-center"
              style={{ color: heroColor }}
            >
              <span>{entry.noun!.article}</span>{" "}
              <span>{entry.german}</span>
            </div>
          ) : (
            <div className="font-sans font-bold leading-[1.05] text-[28px] sm:text-[32px] text-center text-fg">
              {entry.german}
            </div>
          )}
          {translation ? (
            <div className="font-sans text-[18px] sm:text-[20px] text-fg-muted text-center">
              {translation}
            </div>
          ) : null}
          {ruleText ? (
            <div
              className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full"
              style={{
                color: heroColor,
                background: `color-mix(in srgb, ${heroColor} 10%, transparent)`,
                border: `1px solid color-mix(in srgb, ${heroColor} 30%, transparent)`,
              }}
            >
              <span
                className="font-sans font-semibold text-[10px] uppercase"
                style={{ letterSpacing: "0.4px", opacity: 0.8 }}
              >
                {pick(STR.rule, locale)}
              </span>
              <span className="font-sans font-semibold text-[12px]">
                {ruleText}
              </span>
            </div>
          ) : null}
        </div>

        {primaryExample ? (
          <div
            className="rounded-xl p-3"
            style={{ background: "var(--surface-sunk)" }}
          >
            <p className="font-sans font-semibold text-[14px] text-fg m-0 leading-snug">
              {primaryExample.de}
            </p>
            {exTranslation ? (
              <p className="font-sans text-[12px] text-fg-muted mt-1 m-0 leading-snug">
                {exTranslation}
              </p>
            ) : null}
          </div>
        ) : null}
      </Link>
    </section>
  );
}

/* ================================================================ *
 *  PopularList                                                     *
 *  Less compact than the earlier PopularGrid. Each card shows a    *
 *  sample sentence under the headword so the strip reads as real   *
 *  content, not just a chip wall.                                  *
 * ================================================================ */

export interface PopularListProps {
  entries: DictionaryEntry[];
  locale: DictLocale;
  hrefPrefix: string;
  limit?: number;
  className?: string;
}

export function PopularList({
  entries,
  locale,
  hrefPrefix,
  limit = 6,
  className,
}: PopularListProps) {
  const picks = entries.slice(0, limit);
  return (
    <section className={clsx("flex flex-col gap-3", className)}>
      <div
        className="font-sans text-[11px] uppercase text-fg-faint"
        style={{ letterSpacing: "0.5px" }}
      >
        {pick(STR.popularEyebrow, locale)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
  const tLang = useTranslationLang();
  const isNoun = entry.type === "noun" && !!entry.noun;
  const color = isNoun
    ? ARTICLE_COLOR[entry.noun!.article]
    : "var(--accent)";
  const translation =
    tLang === "tr"
      ? entry.translations.turkish ?? entry.translations.english
      : entry.translations.english ?? entry.translations.turkish;
  const primaryExample = [...entry.leveledExamples].sort((a, b) =>
    a.level.localeCompare(b.level),
  )[0];
  return (
    <Link
      href={`${hrefPrefix}/${entry.slug}`}
      className="dict-card-hover group flex flex-col gap-3 rounded-2xl p-4 no-underline"
      style={{
        background: isNoun
          ? `color-mix(in srgb, ${color} 6%, var(--surface-card))`
          : "var(--surface-card)",
        border: `1px solid color-mix(in srgb, ${color} ${isNoun ? "22%" : "18%"}, var(--border))`,
      }}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-baseline gap-1.5 min-w-0">
          {isNoun ? (
            <span
              className="font-sans font-bold text-[20px] leading-none shrink-0"
              style={{ color }}
            >
              {entry.noun!.article}
            </span>
          ) : null}
          <span
            className="font-sans font-bold text-[20px] leading-none truncate"
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
      </div>
      {primaryExample ? (
        (() => {
          const gloss =
            tLang === "tr"
              ? primaryExample.tr ?? primaryExample.en
              : primaryExample.en ?? primaryExample.tr;
          return (
            <div
              className="rounded-lg p-2.5 mt-auto flex flex-col gap-0.5"
              style={{ background: "var(--surface-sunk)" }}
            >
              <p className="font-sans font-semibold text-[12px] text-fg m-0 leading-snug line-clamp-2">
                {primaryExample.de}
              </p>
              {gloss ? (
                <p className="font-sans text-[11px] text-fg-muted m-0 leading-snug line-clamp-2">
                  {gloss}
                </p>
              ) : null}
            </div>
          );
        })()
      ) : null}
      <div
        className="font-sans text-[10px] uppercase text-fg-faint"
        style={{ letterSpacing: "0.4px" }}
      >
        {entry.type} · {entry.level}
      </div>
    </Link>
  );
}

/* ================================================================ *
 *  ComingSoonBanner                                                *
 * ================================================================ */

export interface ComingSoonBannerProps {
  locale: DictLocale;
  className?: string;
}

/** Soft coming-soon strip at the foot of the empty state. Not
 *  pushy: a short line of copy + a "join the waitlist" link that
 *  hops to /#waitlist (the existing landing waitlist anchor). No
 *  inline email form here; the landing already has the trusted
 *  Supabase-backed one. */
export function ComingSoonBanner({
  locale,
  className,
}: ComingSoonBannerProps) {
  const waitlistHref = locale === "tr" ? "/tr#waitlist" : "/#waitlist";
  return (
    <section
      className={clsx(
        "flex flex-col sm:flex-row items-start sm:items-center gap-4",
        "rounded-2xl p-5",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, var(--surface-card)) 0%, var(--surface-card) 70%)",
        border: "1px solid color-mix(in srgb, var(--accent) 20%, var(--border))",
      }}
    >
      <span
        className="inline-flex items-center justify-center shrink-0 rounded-xl"
        style={{
          width: 44,
          height: 44,
          background: "color-mix(in srgb, var(--accent) 12%, transparent)",
          color: "var(--accent)",
        }}
        aria-hidden
      >
        <Icon name="apple" className="w-6 h-6" />
      </span>
      <div className="flex flex-col min-w-0 flex-1">
        <h2 className="font-sans font-bold text-[16px] text-fg m-0 leading-snug">
          {pick(STR.bannerTitle, locale)}
        </h2>
        <p className="font-sans text-[13px] text-fg-muted m-0 leading-snug mt-1">
          {pick(STR.bannerBody, locale)}
        </p>
      </div>
      <Link
        href={waitlistHref}
        className="inline-flex items-center gap-1.5 shrink-0 px-4 py-2.5 rounded-full font-sans font-semibold text-[13px] no-underline"
        style={{
          background: "var(--accent)",
          color: "white",
        }}
      >
        {pick(STR.bannerCta, locale)}
        <Icon name="arrow-right" className="w-4 h-4" />
      </Link>
    </section>
  );
}
