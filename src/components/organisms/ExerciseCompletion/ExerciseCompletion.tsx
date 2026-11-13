"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SkillBadgeArt } from "@/components/atoms/SkillRing/SkillBadgeArt";
import type { Skill } from "@/components/atoms/SkillRing/SkillRing";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { Strings } from "@/lib/i18n/strings";
import type { ChipKey, SkillKey, SkillDeltas } from "@/lib/skills/map";

/**
 * ExerciseCompletion — end-of-round summary for the Exercise deck.
 *
 * Shape follows Mert's iOS reference:
 *   - Chip + DONE eyebrow
 *   - Big score "N / total" (correct in accent, total in fg)
 *   - Italic contextual subtitle ("Half there.", "Clean sweep.", …)
 *   - Short instruction pointing the user at the collect badges
 *   - "YOU FED" divider + per-skill badges (icon + name + delta%)
 *
 * The screen has no action buttons by design — the user's next move
 * is already on the LeftCard: tap the ↗ badges to collect, or click
 * a different chip to start a new workout. The ModeToggle above the
 * card still lets them flip back to Learn if they want to re-run.
 *
 * Fed-skill badges are derived from `deltas` directly: any skill
 * with a positive delta renders, ordered primary → fed[0] → fed[1]
 * for a stable left-to-right read.
 */

const SKILL_COLOR_VAR: Record<SkillKey, string> = {
  vocab: "var(--color-skill-vocab)",
  grammar: "var(--color-skill-grammar)",
  writing: "var(--color-skill-writing)",
  reading: "var(--color-skill-reading)",
};

/**
 * Pick the subtitle band key from the score. Caller resolves the
 * actual copy from the current locale's dict so bands read
 * idiomatically in each language.
 */
type SubtitleBand = keyof Strings["try"]["exerciseCompletion"]["subtitles"];

function subtitleBandFor(correct: number, total: number): SubtitleBand {
  if (total === 0) return "empty";
  if (correct === total) return "cleanSweep";
  if (correct === 0) return "nothing";
  const ratio = correct / total;
  if (ratio >= 0.9) return "almostClean";
  if (ratio >= 0.75) return "strongRun";
  if (ratio > 0.5) return "overTheHump";
  if (ratio === 0.5) return "halfThere";
  if (ratio >= 0.3) return "gettingThere";
  return "justStarted";
}

/** Order skills by role so the primary (biggest delta) reads first. */
function orderSkills(deltas: SkillDeltas): SkillKey[] {
  const entries = (Object.entries(deltas) as [SkillKey, number][])
    .filter(([, v]) => typeof v === "number" && v > 0)
    .sort(([, a], [, b]) => b - a);
  return entries.map(([k]) => k);
}

/** Format a delta as "+N%" with integer rounding — matches iOS reference. */
function formatDelta(n: number): string {
  return `+${Math.round(n * 100)}%`;
}

export interface ExerciseCompletionProps {
  /** Which chip the round belongs to — drives the eyebrow label. */
  chip: ChipKey;
  correct: number;
  total: number;
  /** Per-skill deltas staged by the parent via computeSkillDeltas. */
  deltas: SkillDeltas;
  /**
   * Optional "Continue with {workout} →" CTA at the bottom. The
   * parent computes the next workout from the chipStore (first
   * non-done chip after the current one) and wires onContinue to
   * closeChip + openChip. Omit to hide the CTA entirely — the user
   * then returns via the LeftCard chip picker.
   */
  nextWorkout?: {
    label: string;
    onContinue: () => void;
  };
  /**
   * Alternate CTA shown INSTEAD OF `nextWorkout` — used when the
   * whole workout cycle is done (all 4 chips completed) and the next
   * step is the demo-complete summary flow rather than another chip.
   * Takes precedence over `nextWorkout` when present.
   */
  summaryCta?: {
    label: string;
    onContinue: () => void;
  };
  className?: string;
}

export function ExerciseCompletion({
  chip,
  correct,
  total,
  deltas,
  nextWorkout,
  summaryCta,
  className,
}: ExerciseCompletionProps) {
  const { strings } = useLocale();
  const t = strings.try.exerciseCompletion;
  const chipLabel = strings.try.leftCard.chips[chip].title;
  const subtitle = t.subtitles[subtitleBandFor(correct, total)];
  const skills = orderSkills(deltas);

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl px-6 py-10",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col items-center gap-7 text-center",
        className,
      )}
    >
      <div className="font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-fg-faint">
        {chipLabel} · {t.doneSuffix}
      </div>

      {/* Score — correct in accent, slash + total in fg. Serif
          display so it reads as a tally, not a counter. */}
      <div className="flex items-baseline justify-center gap-1 font-display font-semibold leading-none">
        <span className="text-[56px] text-accent font-bold">{correct}</span>
        <span className="text-[44px] text-fg-muted">/</span>
        <span className="text-[56px] text-fg">{total}</span>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <h2 className="font-display font-semibold text-2xl text-fg m-0 leading-tight">
          {subtitle}
        </h2>
        <p className="font-sans text-[14px] text-fg-muted m-0 leading-relaxed max-w-[360px]">
          {t.instruction}
        </p>
      </div>

      {skills.length > 0 ? (
        <div className="w-full flex flex-col items-center gap-5 mt-2">
          {/* YOU FED divider — hairline with centered label */}
          <div className="w-full flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-fg-faint">
              {t.youFed}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex items-start justify-center gap-6">
            {skills.map((s) => (
              <FedSkillBadge
                key={s}
                skill={s}
                label={t.skillLabels[s]}
                delta={deltas[s] ?? 0}
              />
            ))}
          </div>
        </div>
      ) : null}

      {summaryCta ? (
        <button
          type="button"
          onClick={summaryCta.onContinue}
          className={clsx(
            "mt-2 inline-flex items-center justify-center gap-2",
            "h-[52px] px-8 rounded-2xl",
            "bg-accent text-white font-sans font-bold text-base",
            "transition hover:brightness-110 active:translate-y-px",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          )}
        >
          {summaryCta.label}
        </button>
      ) : nextWorkout ? (
        <button
          type="button"
          onClick={nextWorkout.onContinue}
          className={clsx(
            "mt-2 inline-flex items-center justify-center gap-2",
            "h-[52px] px-8 rounded-2xl",
            "bg-accent text-white font-sans font-bold text-base",
            "transition hover:brightness-110 active:translate-y-px",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          )}
        >
          {t.continueWith.replace("{label}", nextWorkout.label)}
        </button>
      ) : null}
    </div>
  );
}

interface FedSkillBadgeProps {
  skill: SkillKey;
  label: string;
  delta: number;
}

function FedSkillBadge({ skill, label, delta }: FedSkillBadgeProps) {
  const color = SKILL_COLOR_VAR[skill];
  // SkillBadgeArt lives in the SkillRing module; its `Skill` type
  // includes "listening" which isn't a SkillKey here. Our 4 keys are
  // all valid Skills, so this coerce is safe.
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative inline-flex items-center justify-center rounded-full"
        style={{
          width: 56,
          height: 56,
          background: `color-mix(in srgb, ${color} 16%, transparent)`,
        }}
      >
        <svg
          viewBox="0 0 86 86"
          width={56}
          height={56}
          aria-hidden
          className="block"
        >
          <SkillBadgeArt skill={skill as Skill} />
        </svg>
      </div>
      <div className="font-sans text-[13px] font-semibold text-fg leading-none">
        {label}
      </div>
      <div
        className="font-sans text-[14px] font-bold leading-none"
        style={{ color }}
      >
        {formatDelta(delta)}
      </div>
    </div>
  );
}
