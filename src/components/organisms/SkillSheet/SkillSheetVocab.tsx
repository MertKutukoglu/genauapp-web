"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { useRouter, usePathname } from "next/navigation";
import {
  useWordAnswersStore,
  computeWordStats,
  tier,
  articleStats,
  tierLabel,
  type MasteryTier,
  type WordStat,
} from "@/stores/wordAnswersStore";
import { useSkillStore } from "@/stores/skillStore";
import { useChipStore } from "@/stores/chipStore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { SkillSheet, SkillSheetSection } from "./SkillSheet";

/**
 * SkillSheetVocab — Vocabulary (pink) skill sheet.
 *
 * Reads live from the wordAnswers log + skillStore every time it
 * opens (no incremental caching — the log is small and the
 * derivations are O(n)). Renders four sections:
 *
 *   1. Empty state       — shown when the log is empty; replaces
 *                          the mastery and article grids with a
 *                          single "Complete your first Words
 *                          workout" prompt.
 *   2. Word Mastery grid — Strong / Average / Weak tiles with the
 *                          counts + a "View →" link. View → on the
 *                          Weak tile scrolls to the app-only
 *                          teaser; on Strong + Average it scrolls
 *                          to the Article Performance section.
 *   3. Article Performance — der / die / das accuracy tiles. Only
 *                          articlePicker answers feed these;
 *                          attempts = 0 shows `—` to avoid a
 *                          punishing fake 0%.
 *   4. App-only teaser   — dashed cherry border + 4 bullets + a
 *                          "Try the app →" CTA that scrolls the
 *                          landing waitlist into view.
 *
 * Shell (header, footer, animations) lives in SkillSheet.tsx.
 */

const TONE_COLORS: Record<MasteryTier, string> = {
  strong: "#10B981",
  average: "#F59E0B",
  weak: "#EF4444",
};

const ARTICLE_COLORS = {
  der: "var(--color-article-der-light)",
  die: "var(--color-article-die-light)",
  das: "var(--color-article-das-light)",
} as const;

export interface SkillSheetVocabProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillSheetVocab({ open, onOpenChange }: SkillSheetVocabProps) {
  const { strings } = useLocale();
  const t = strings.try.skillSheet.vocab;
  const closeLabel = strings.try.skillSheet.close;
  const answers = useWordAnswersStore((s) => s.answers);
  const progress = useSkillStore((s) => s.progress.vocab ?? 0);
  const openChip = useChipStore((s) => s.openChip);
  const router = useRouter();
  const pathname = usePathname() ?? "/try";

  const articleSectionRef = React.useRef<HTMLDivElement | null>(null);
  const teaserSectionRef = React.useRef<HTMLDivElement | null>(null);

  // Collapse the log to one row per unique wordId, then bucket by
  // mastery tier. Both runs are O(n) so no memo guarding needed.
  const wordStats: WordStat[] = React.useMemo(
    () => computeWordStats(answers),
    [answers],
  );
  const byTier: Record<MasteryTier, number> = React.useMemo(() => {
    const out: Record<MasteryTier, number> = { strong: 0, average: 0, weak: 0 };
    for (const s of wordStats) out[tier(s)] += 1;
    return out;
  }, [wordStats]);
  const totalWords = wordStats.length;

  const artStats = React.useMemo(() => articleStats(answers), [answers]);

  const scrollToArticle = () => {
    articleSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const scrollToTeaser = () => {
    teaserSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleStartWords = () => {
    onOpenChange(false);
    openChip("words");
  };

  const handleTryApp = () => {
    onOpenChange(false);
    // The /try/ demo lives alongside the landing page; scroll the
    // waitlist section into view on the root. Works from /tr/try
    // too by detecting the locale from pathname.
    const prefix = pathname.startsWith("/tr") ? "/tr" : "";
    router.push(`${prefix}/#waitlist`);
  };

  const isEmpty = answers.length === 0;
  const tierKey = tierLabel(progress).toLowerCase() as keyof typeof t.tiers;

  return (
    <SkillSheet
      open={open}
      onOpenChange={onOpenChange}
      skill="vocab"
      title={t.title}
      tier={t.tiers[tierKey]}
      progress={progress}
      closeLabel={closeLabel}
    >
      {isEmpty ? (
        <EmptyState
          emoji="📚"
          body={t.emptyBody}
          cta={t.emptyCta}
          onCta={handleStartWords}
        />
      ) : (
        <>
          {/* Section 1 — Word Mastery */}
          <SkillSheetSection
            label={t.masteryLabel}
            meta={t.masteryMeta.replace("{count}", String(totalWords))}
          >
            <div className="grid grid-cols-3 gap-2.5">
              <MasteryTile
                tone="strong"
                label={t.masteryStrong}
                count={byTier.strong}
                viewLabel={t.view}
                onView={scrollToArticle}
              />
              <MasteryTile
                tone="average"
                label={t.masteryAverage}
                count={byTier.average}
                viewLabel={t.view}
                onView={scrollToArticle}
              />
              <MasteryTile
                tone="weak"
                label={t.masteryWeak}
                count={byTier.weak}
                viewLabel={t.view}
                onView={scrollToTeaser}
              />
            </div>
          </SkillSheetSection>

          {/* Section 2 — Article Performance */}
          <div ref={articleSectionRef}>
            <SkillSheetSection label={t.articleLabel}>
              <div className="grid grid-cols-3 gap-2.5">
                {(["der", "die", "das"] as const).map((a) => (
                  <ArticleTile
                    key={a}
                    article={a}
                    attempts={artStats[a].attempts}
                    correct={artStats[a].correct}
                  />
                ))}
              </div>
            </SkillSheetSection>
          </div>
        </>
      )}

      {/* Section 3 — App-only teaser (always rendered, even in
          empty state, since it's part conversion play). */}
      <div ref={teaserSectionRef}>
        <SkillSheetSection
          label={t.teaserLabel}
          meta={<LockIcon className="w-4 h-4 text-accent" />}
        >
          <div
            className="rounded-2xl p-4 flex flex-col gap-3"
            style={{
              background:
                "color-mix(in srgb, var(--accent) 6%, var(--surface-card))",
              border:
                "1px dashed color-mix(in srgb, var(--accent) 24%, transparent)",
            }}
          >
            <div className="flex items-start gap-2">
              <LockIcon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div className="font-sans font-semibold text-[15px] text-fg">
                {t.teaserHeader}
              </div>
            </div>
            <p className="font-sans text-[14px] text-fg-muted m-0 leading-snug">
              {t.teaserIntro}
            </p>
            <ul className="flex flex-col gap-1.5 m-0 pl-0 list-none">
              {t.teaserBullets.map((b: string) => (
                <li
                  key={b}
                  className="font-sans text-[14px] text-fg leading-snug flex items-start gap-2"
                >
                  <span className="text-accent leading-none mt-1" aria-hidden>
                    •
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleTryApp}
              className={clsx(
                "mt-1 h-11 rounded-xl",
                "font-sans font-bold text-[14px] text-white",
                "bg-accent hover:brightness-110 active:scale-[0.99]",
                "transition-[filter,transform] duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              )}
            >
              {t.teaserCta}
            </button>
          </div>
        </SkillSheetSection>
      </div>
    </SkillSheet>
  );
}

function MasteryTile({
  tone,
  label,
  count,
  viewLabel,
  onView,
}: {
  tone: MasteryTier;
  label: string;
  count: number;
  viewLabel: string;
  onView: () => void;
}) {
  const color = TONE_COLORS[tone];
  return (
    <div
      className="flex flex-col gap-1 rounded-2xl p-4"
      style={{
        background: `color-mix(in srgb, ${color} 14%, var(--surface-card))`,
        border: `1px solid color-mix(in srgb, ${color} 24%, transparent)`,
      }}
    >
      <TierIcon tier={tone} color={color} />
      <div
        className="font-sans font-normal text-[13px] leading-tight mt-1"
        style={{ color, letterSpacing: "0.3px" }}
      >
        {label}
      </div>
      <div className="font-sans font-bold text-[28px] text-fg leading-none mt-1">
        {count}
      </div>
      <button
        type="button"
        onClick={onView}
        className="font-sans font-semibold text-[12px] leading-tight mt-2 text-left bg-transparent border-0 p-0 cursor-pointer hover:underline"
        style={{ color, letterSpacing: "0.3px" }}
      >
        {viewLabel} →
      </button>
    </div>
  );
}

function ArticleTile({
  article,
  attempts,
  correct,
}: {
  article: "der" | "die" | "das";
  attempts: number;
  correct: number;
}) {
  const color = ARTICLE_COLORS[article];
  const pct = attempts === 0 ? null : Math.round((correct / attempts) * 100);
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-2xl p-4"
      style={{
        background: `color-mix(in srgb, ${color} 10%, var(--surface-card))`,
        border: `1px solid color-mix(in srgb, ${color} 24%, transparent)`,
      }}
    >
      <div
        className="font-sans font-bold text-[20px] leading-none"
        style={{ color }}
      >
        {article}
      </div>
      <div className="font-sans font-bold text-[24px] text-fg leading-tight mt-2">
        {pct === null ? "—" : `${pct}%`}
      </div>
      <div className="font-sans text-[12px] text-fg-muted leading-tight">
        {pct === null ? "—" : `${correct} / ${attempts}`}
      </div>
    </div>
  );
}

function EmptyState({
  emoji,
  body,
  cta,
  onCta,
}: {
  emoji: string;
  body: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <div
      className="mt-5 rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
      style={{ background: "var(--surface-sunk)" }}
    >
      <div className="text-[48px] leading-none" aria-hidden>
        {emoji}
      </div>
      <p className="font-sans text-[15px] text-fg-muted m-0 leading-snug max-w-[280px]">
        {body}
      </p>
      <button
        type="button"
        onClick={onCta}
        className={clsx(
          "h-11 px-6 rounded-xl",
          "font-sans font-bold text-[14px] text-white",
          "bg-accent hover:brightness-110 active:scale-[0.99]",
          "transition-[filter,transform] duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        {cta}
      </button>
    </div>
  );
}

function TierIcon({ tier, color }: { tier: MasteryTier; color: string }) {
  if (tier === "strong") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }
  if (tier === "average") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4" />
        <circle cx="12" cy="16" r="0.5" fill={color} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden
    >
      <path d="M21 12a9 9 0 11-3-6.7" />
      <path d="M21 4v5h-5" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 118 0v4" />
    </svg>
  );
}
