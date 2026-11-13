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

      {/* Section 3 — App-only teaser: four mini-feature mock cards
          showing what Vocabulary looks like in the full iOS app,
          each dressed with real-looking demo data and a small
          "App only" pill in the top-right. More compelling than a
          bullet list — eyes scan the mock, not a sentence. */}
      <div ref={teaserSectionRef}>
        <SkillSheetSection
          label={t.teaserLabel}
          meta={<LockIcon className="w-4 h-4 text-accent" />}
        >
          <div
            className="rounded-2xl p-4 flex flex-col gap-3"
            style={{
              background:
                "color-mix(in srgb, var(--accent) 5%, var(--surface-card))",
              border:
                "1px dashed color-mix(in srgb, var(--accent) 24%, transparent)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <MockWeakWords label={t.mockWeakTitle} pill={t.mockPill} />
              <MockBookmarks label={t.mockBookmarksTitle} pill={t.mockPill} />
              <MockRecentHistory label={t.mockHistoryTitle} pill={t.mockPill} />
              <MockPackMastery label={t.mockPacksTitle} pill={t.mockPill} />
            </div>
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
  body,
  cta,
  onCta,
}: {
  body: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <div
      className="mt-5 rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
      style={{ background: "var(--surface-sunk)" }}
    >
      {/* Compact ring mark in muted pink — the Vocabulary ring the
          user just tapped, downshifted to signal "no data yet". */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background:
            "color-mix(in srgb, var(--color-skill-vocab) 12%, transparent)",
          border:
            "1.5px solid color-mix(in srgb, var(--color-skill-vocab) 28%, transparent)",
        }}
        aria-hidden
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background:
              "color-mix(in srgb, var(--color-skill-vocab) 55%, transparent)",
          }}
        />
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

/* ---------- App-only mini-mock cards ------------------------------
   Each card is a scaled-down visual of a real Vocabulary feature
   that lives only in the iOS app. Shared chrome: white-ish tile,
   small eyebrow icon + title, a corner "App only" pill in cherry,
   then 2-3 rows of real-looking demo data. No overlay darkens the
   content — the pill + dashed teaser border carry the "elsewhere"
   signal; a dim layer would just hide the thing we're trying to
   showcase. */

function MockCardFrame({
  title,
  icon,
  pill,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  pill: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-xl p-3 flex flex-col gap-2 overflow-hidden"
      style={{
        background: "var(--surface-card)",
        border:
          "1px solid color-mix(in srgb, var(--fg) 8%, transparent)",
      }}
    >
      {/* Eyebrow: icon + title */}
      <div className="flex items-center gap-1.5 min-w-0 pr-16">
        <span className="text-fg-muted shrink-0">{icon}</span>
        <span className="font-sans font-semibold text-[12px] text-fg-muted uppercase tracking-wide truncate">
          {title}
        </span>
      </div>
      {/* App-only pill, top-right */}
      <div
        className="absolute top-2.5 right-2.5 font-sans font-bold text-[10px] uppercase px-1.5 py-0.5 rounded-full"
        style={{
          letterSpacing: "0.4px",
          background:
            "color-mix(in srgb, var(--accent) 14%, transparent)",
          color: "var(--accent)",
        }}
      >
        {pill}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function MockWeakWords({ label, pill }: { label: string; pill: string }) {
  const rows: Array<[string, string]> = [
    ["das Problem", "0 / 3"],
    ["der Nachteil", "1 / 4"],
    ["sich kümmern", "2 / 5"],
  ];
  return (
    <MockCardFrame
      title={label}
      pill={pill}
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
          aria-hidden
        >
          <path d="M21 12a9 9 0 11-3-6.7" />
          <path d="M21 4v5h-5" />
        </svg>
      }
    >
      {rows.map(([w, n]) => (
        <div
          key={w}
          className="flex items-center justify-between gap-2 text-[13px]"
        >
          <span className="font-sans font-semibold text-fg truncate">{w}</span>
          <span className="font-sans font-normal text-[#EF4444] shrink-0">
            {n}
          </span>
        </div>
      ))}
    </MockCardFrame>
  );
}

function MockBookmarks({ label, pill }: { label: string; pill: string }) {
  const rows = ["die Verantwortung", "entscheiden", "die Erfahrung"];
  return (
    <MockCardFrame
      title={label}
      pill={pill}
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
          aria-hidden
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      }
    >
      {rows.map((w) => (
        <div key={w} className="flex items-center gap-2 text-[13px]">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 shrink-0"
            style={{ color: "#F59E0B" }}
            aria-hidden
          >
            <path d="M12 2l2.5 7h7l-5.5 4.5 2 7L12 16.5 5.5 20.5l2-7L2 9h7z" />
          </svg>
          <span className="font-sans font-semibold text-fg truncate">{w}</span>
        </div>
      ))}
    </MockCardFrame>
  );
}

function MockRecentHistory({
  label,
  pill,
}: {
  label: string;
  pill: string;
}) {
  const rows: Array<[string, string]> = [
    ["5 min", "20 Words"],
    ["3 min", "12 Grammar"],
    ["7 min", "1 Story"],
  ];
  return (
    <MockCardFrame
      title={label}
      pill={pill}
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      }
    >
      {rows.map(([time, what]) => (
        <div
          key={what}
          className="flex items-center justify-between gap-2 text-[13px]"
        >
          <span className="font-sans font-semibold text-fg">{time}</span>
          <span className="font-sans font-normal text-fg-muted truncate">
            {what}
          </span>
        </div>
      ))}
    </MockCardFrame>
  );
}

function MockPackMastery({
  label,
  pill,
}: {
  label: string;
  pill: string;
}) {
  const rows: Array<[string, number]> = [
    ["Travel", 0.8],
    ["Work", 0.6],
    ["Weekend", 0.4],
  ];
  return (
    <MockCardFrame
      title={label}
      pill={pill}
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
          aria-hidden
        >
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <path d="M3.3 7L12 12l8.7-5" />
          <path d="M12 22V12" />
        </svg>
      }
    >
      {rows.map(([pack, p]) => (
        <div key={pack} className="flex items-center gap-2 text-[12px]">
          <span className="font-sans font-semibold text-fg min-w-[56px]">
            {pack}
          </span>
          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{
              background: "color-mix(in srgb, var(--fg) 10%, transparent)",
            }}
            aria-hidden
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round(p * 100)}%`,
                background: "var(--color-skill-vocab)",
              }}
            />
          </div>
          <span className="font-sans font-normal text-fg-muted shrink-0 w-7 text-right">
            {Math.round(p * 100)}%
          </span>
        </div>
      ))}
    </MockCardFrame>
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
