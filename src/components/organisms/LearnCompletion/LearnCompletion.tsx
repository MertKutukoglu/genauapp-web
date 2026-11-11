"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * LearnCompletion — the "that's the deck" transition, shown after
 * every card has left a chip's Learn deck.
 *
 * The earlier version carried a two-stat grid (Words · Repeats) that
 * read as a scoreboard. Problem: Learn doesn't score — no deltas, no
 * skill ring movement — and the "20 / 0" tile was convincing enough
 * that users were taking it as the end-of-session summary, closing
 * the tab, and never seeing Exercise (where the real retention
 * happens). A user feedback round made the cost of that framing
 * explicit.
 *
 * The new shape is a bridge, not a scorecard:
 *   - Heading tells the user they walked the pattern
 *   - Sub says plainly that Exercise is where it sticks and where
 *     the skill rings on the left card actually move
 *   - Primary CTA is Exercise, visually dominant (52 tall, accent
 *     bg). Start Over sits as a ghost beside it.
 *
 * Both chips (Words, Grammar, Sentence) use this same shell — the
 * copy is generic enough to hold across all three.
 */

export interface LearnCompletionProps {
  onStartOver?: () => void;
  onSwitchToExercise?: () => void;
  className?: string;
}

export function LearnCompletion({
  onStartOver,
  onSwitchToExercise,
  className,
}: LearnCompletionProps) {
  const { strings } = useLocale();
  const t = strings.try.learnCompletion;
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
      <div className="flex flex-col gap-2 max-w-md">
        <h2 className="font-display italic font-semibold text-2xl text-fg m-0 leading-tight">
          {t.heading}
        </h2>
        <p className="font-sans text-[15px] text-fg-muted m-0 leading-relaxed">
          {t.sub}
        </p>
      </div>

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
          {t.startOver}
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
          {t.switchToExercise}
        </button>
      </div>
    </div>
  );
}
