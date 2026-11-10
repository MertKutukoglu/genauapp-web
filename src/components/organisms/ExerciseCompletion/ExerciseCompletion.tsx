"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * ExerciseCompletion — "you walked the Exercise deck" moment.
 *
 * Mirrors LearnCompletion's rhythm but with the deck-run stats you
 * only have after exercise (correct / incorrect totals). Score +
 * skill rollups will layer on top of this later; for now the stats
 * row carries the two raw counts, and the Finish CTA closes the
 * chip (marks it done in the chip store).
 *
 * Two actions:
 *   - [Review mistakes] — ghost; only enabled when there were any,
 *     passes mistakes back to the parent so it can set up a replay
 *     deck. Hidden when onReviewMistakes isn't wired.
 *   - [Back to Learn] — primary, flips mode back to Learn.
 */

export interface ExerciseCompletionProps {
  /** How many items were answered correctly on the first try. */
  correct: number;
  /** How many items were sent back to the deck via incorrect. */
  incorrect: number;
  /** Total unique items in the deck. */
  total: number;
  onReviewMistakes?: () => void;
  onBackToLearn?: () => void;
  onFinish?: () => void;
  className?: string;
}

export function ExerciseCompletion({
  correct,
  incorrect,
  total,
  onReviewMistakes,
  onBackToLearn,
  onFinish,
  className,
}: ExerciseCompletionProps) {
  const hasMistakes = incorrect > 0;

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
      <div className="flex flex-col gap-2">
        <h2 className="font-display italic font-semibold text-2xl text-fg m-0 leading-tight">
          Exercise complete.
        </h2>
        <p className="font-sans text-[15px] text-fg-muted m-0 leading-relaxed">
          That&apos;s the round. Score + skill summary lands in a later pass.
        </p>
      </div>

      <dl
        className="grid grid-cols-3 gap-6 text-center"
        aria-label="Session summary"
      >
        <div className="flex flex-col gap-1">
          <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
            Correct
          </dt>
          <dd
            className="font-display font-semibold text-[32px] leading-none m-0"
            style={{ color: "var(--ok)" }}
          >
            {correct}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
            Missed
          </dt>
          <dd
            className="font-display font-semibold text-[32px] leading-none m-0 text-accent"
          >
            {incorrect}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
            Items
          </dt>
          <dd className="font-display font-semibold text-[32px] text-fg leading-none m-0">
            {total}
          </dd>
        </div>
      </dl>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {hasMistakes && onReviewMistakes ? (
          <button
            type="button"
            onClick={onReviewMistakes}
            className={clsx(
              "order-2 sm:order-1 w-full sm:w-auto",
              "inline-flex items-center justify-center gap-2",
              "h-[48px] px-5 rounded-2xl",
              "font-sans font-semibold text-[15px] text-fg",
              "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
              "transition hover:bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            Review mistakes ({incorrect})
          </button>
        ) : null}

        {onBackToLearn ? (
          <button
            type="button"
            onClick={onBackToLearn}
            className={clsx(
              "order-3 sm:order-2 w-full sm:w-auto",
              "inline-flex items-center justify-center gap-2",
              "h-[48px] px-5 rounded-2xl",
              "font-sans font-semibold text-[15px] text-fg",
              "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
              "transition hover:bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            ← Back to Learn
          </button>
        ) : null}

        <button
          type="button"
          onClick={onFinish}
          className={clsx(
            "order-1 sm:order-3 w-full sm:w-auto",
            "inline-flex items-center justify-center gap-2",
            "h-[52px] px-8 rounded-2xl",
            "bg-accent text-white font-sans font-bold text-base",
            "transition hover:brightness-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          )}
        >
          Finish →
        </button>
      </div>
    </div>
  );
}
