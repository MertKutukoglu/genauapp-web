"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import type { DictionaryEntry, DictLocale } from "./types";
import { STR, TYPE_LABEL, pick } from "./strings";
import { useTranslationLang } from "./TranslationLangContext";

/**
 * WordCard, the lean primary card of a dictionary page.
 *
 * Mirrors the iOS SearchWordDetailView: article + word in one
 * article-colored unit for nouns, neutral for other types, a small
 * translation line, an optional rule pill (web addition), the
 * sample sentence block, and a toolbar row with speaker + bookmark
 * icons that open an "in the app" affordance (we do not play audio
 * on the web).
 *
 * The brief's extras (plural suffix, tag pills, collocations) do
 * not live here. They live in GrammarInfoModule below. This card
 * is the "quick answer" surface; the module is the "everything
 * else."
 */

const ARTICLE_COLOR = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
} as const;

export interface WordCardProps {
  entry: DictionaryEntry;
  locale: DictLocale;
  className?: string;
}

export function WordCard({ entry, locale, className }: WordCardProps) {
  const isNoun = entry.type === "noun" && !!entry.noun;
  const articleColor = isNoun
    ? ARTICLE_COLOR[entry.noun!.article]
    : undefined;
  const heroColor = articleColor ?? "var(--fg)";
  // Translation shown uses the user's chosen translation language
  // (the dictionary toggle), falling back to the other translation
  // if the chosen one is missing.
  const tLang = useTranslationLang();
  const translation =
    tLang === "tr"
      ? entry.translations.turkish ?? entry.translations.english
      : entry.translations.english ?? entry.translations.turkish;
  const ruleText =
    locale === "tr"
      ? entry.rule?.turkish ?? entry.rule?.english
      : entry.rule?.english ?? entry.rule?.turkish;

  // Primary leveled example for the card (lowest level first so a
  // new learner lands on the easiest one).
  const primaryExample = [...entry.leveledExamples].sort((a, b) =>
    a.level.localeCompare(b.level),
  )[0];

  // Verb's grammar tag on the main card (iOS pattern: Regular /
  // Separable / Irregular shows prominently next to the headword).
  const verbSurfaceTag =
    entry.type === "verb" && entry.tags[0] ? entry.tags[0] : null;

  return (
    <article
      className={clsx(
        "rounded-[24px] flex flex-col gap-5",
        "p-5 sm:p-6",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 12px color-mix(in srgb, var(--fg) 4%, transparent)",
      }}
    >
      {/* Toolbar: speaker + bookmark. Both are stubs that open the
          in-app CTA popover (not wired here; the hooks point at the
          parent page via data-dict-action). */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          data-dict-action="speak"
          aria-label={pick(STR.listenInApp, locale)}
          title={pick(STR.listenInApp, locale)}
          className="inline-flex items-center justify-center text-fg-faint hover:text-fg transition-colors"
          style={{ width: 28, height: 28 }}
        >
          <Icon name="speaker" className="w-6 h-6" />
        </button>
        <button
          type="button"
          data-dict-action="bookmark"
          aria-label={pick(STR.saveInApp, locale)}
          title={pick(STR.saveInApp, locale)}
          className="inline-flex items-center justify-center text-fg-faint hover:text-fg transition-colors"
          style={{ width: 28, height: 28 }}
        >
          <Icon name="bookmark-plus" className="w-6 h-6" />
        </button>
      </div>

      {/* Hero block: article + word (whole unit tinted for nouns),
          translation line under, optional rule pill. Centered like
          the app. */}
      <div className="flex flex-col items-center gap-3 py-6 sm:py-8">
        {isNoun ? (
          <h1
            className="font-sans font-bold leading-[1.05] text-[36px] sm:text-[48px] text-center m-0"
            style={{ color: heroColor }}
          >
            <span>{entry.noun!.article}</span>{" "}
            <span>{entry.german}</span>
          </h1>
        ) : (
          <h1
            className="font-sans font-bold leading-[1.05] text-[36px] sm:text-[48px] text-center text-fg m-0"
          >
            {entry.german}
          </h1>
        )}

        {translation ? (
          <p className="font-sans text-[16px] sm:text-[18px] text-fg-muted text-center m-0">
            {translation}
          </p>
        ) : null}

        {verbSurfaceTag ? (
          <GrammarTagPill tag={verbSurfaceTag} />
        ) : null}

        {ruleText ? (
          <div
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mt-1"
            style={{
              color: heroColor,
              background: `color-mix(in srgb, ${heroColor} 10%, transparent)`,
              border: `1px solid color-mix(in srgb, ${heroColor} 30%, transparent)`,
            }}
          >
            <span
              className="font-sans font-semibold text-[11px] uppercase"
              style={{
                color: `color-mix(in srgb, ${heroColor} 70%, var(--fg-muted))`,
                letterSpacing: "0.4px",
              }}
            >
              {pick(STR.rule, locale)}
            </span>
            <span className="font-sans font-semibold text-[14px]">
              {ruleText}
            </span>
          </div>
        ) : null}
      </div>

      {/* Sample sentence block. Just one on the card; the rest live
          in GrammarInfoModule. */}
      {primaryExample ? (
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--surface-sunk)" }}
        >
          <div
            className="font-sans text-[12px] uppercase text-fg-faint mb-2"
            style={{ letterSpacing: "0.4px" }}
          >
            {pick(STR.sampleSentence, locale)} · {primaryExample.level}
          </div>
          <p className="font-sans font-semibold text-[16px] text-fg m-0 leading-snug">
            {primaryExample.de}
          </p>
          {primaryExample[locale] || primaryExample.en ? (
            <p className="font-sans text-[14px] text-fg-muted mt-1 m-0 leading-snug">
              {primaryExample[locale] ?? primaryExample.en}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Type eyebrow at the foot. Small, muted, ending the card. */}
      <div
        className="font-sans text-[11px] uppercase text-fg-faint text-center"
        style={{ letterSpacing: "0.4px" }}
      >
        {pick(TYPE_LABEL[entry.type], locale)} · {entry.level}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 *  GrammarTagPill, exported here so WordCard + GrammarInfoModule     *
 *  share the same pill shape.                                        *
 * ------------------------------------------------------------------ */

const TAG_COLOR: Record<string, string> = {
  ok: "var(--ok, #22C55E)",
  warn: "#E8A838",
  danger: "var(--accent)",
  info: "#7C3AED",
  neutral: "var(--fg-muted)",
};

export function GrammarTagPill({ tag }: { tag: { label: string; tone: keyof typeof TAG_COLOR } }) {
  const color = TAG_COLOR[tag.tone] ?? TAG_COLOR.neutral;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-sans font-semibold text-[12px]"
      style={{
        color,
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
      }}
    >
      <span
        aria-hidden
        className="inline-block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
        }}
      />
      {tag.label}
    </span>
  );
}
