"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * LearnCompletion — the "that's the deck" moment, shown inside the
 * WordsChip when every card has left the Learn deck.
 *
 * Shape per Mert's spec:
 *   - Title + short subtitle
 *   - Compact stats row: words practiced + repeats taken (so a Repeat
 *     doesn't vanish from the summary; the deck mechanic keeps that
 *     word in play, and the count here reflects total attempts)
 *   - Two actions: ghost [Start over] + primary [Switch to Exercise →]
 *     The Exercise button stays visually dominant — the honest next
 *     step after Learn — while Start Over sits as a secondary option.
 */

export interface LearnCompletionProps {
  /** Total unique words in the deck. */
  total: number;
  /**
   * How many Repeat actions were taken over the session. Includes
   * both Normal-card Repeat clicks and AnswerFeedback → Continue
   * calls from incorrect Scrambled / ChunkCompose attempts.
   */
  repeats?: number;
  onStartOver?: () => void;
  onSwitchToExercise?: () => void;
  className?: string;
}

export function LearnCompletion({
  total,
  repeats = 0,
  onStartOver,
  onSwitchToExercise,
  className,
}: LearnCompletionProps) {
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
          Deck complete.
        </h2>
        <p className="font-sans text-[15px] text-fg-muted m-0 leading-relaxed">
          You walked the full Learn deck. Try the Exercise, or start over.
        </p>
      </div>

      {/* Stats row — total words + repeats. Minimal, no bars / charts;
          the summary is for pacing, not a dashboard. */}
      <dl
        className="grid grid-cols-2 gap-8 text-center"
        aria-label="Session summary"
      >
        <div className="flex flex-col gap-1">
          <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
            Words
          </dt>
          <dd className="font-display font-semibold text-[32px] text-fg leading-none m-0">
            {total}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
            Repeats
          </dt>
          <dd className="font-display font-semibold text-[32px] text-fg leading-none m-0">
            {repeats}
          </dd>
        </div>
      </dl>

      {/* Actions — Start Over sits as a ghost tag so Exercise stays
          the visually dominant next step. Stack on narrow widths. */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={onStartOver}
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
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[18px] h-[18px]"
            aria-hidden
          >
            <path d="M3 12a9 9 0 1 0 2.5-6.3" />
            <path d="M3 4v4h4" />
          </svg>
          Start over
        </button>

        <button
          type="button"
          onClick={onSwitchToExercise}
          className={clsx(
            "order-1 sm:order-2 w-full sm:w-auto",
            "inline-flex items-center justify-center gap-2",
            "h-[52px] px-8 rounded-2xl",
            "bg-accent text-white font-sans font-bold text-base",
            "transition hover:brightness-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          )}
        >
          Switch to Exercise →
        </button>
      </div>
    </div>
  );
}
