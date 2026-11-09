"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * LearnCompletion — the "that's the deck" moment shown after the user
 * has I-known every card in the Learn deck.
 *
 * Spec §9:
 *   - Centered 24px bold headline + 15px muted sub
 *   - Primary cherry CTA "Switch to Exercise →" (no auto-flip; user
 *     chooses when to start testing)
 *
 * Replaces the current card inside the WordsChip when
 * `learnRemaining.length === 0`. The CTA flips `mode = 'exercise'`
 * in the parent.
 */

export interface LearnCompletionProps {
  onSwitchToExercise?: () => void;
  className?: string;
}

export function LearnCompletion({
  onSwitchToExercise,
  className,
}: LearnCompletionProps) {
  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl px-6 py-10",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col items-center gap-6 text-center",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-display italic font-semibold text-2xl text-fg m-0 leading-tight">
          That&apos;s the Learn deck.
        </h2>
        <p className="font-sans text-[15px] text-fg-muted m-0 leading-relaxed">
          Try the Exercise now.
        </p>
      </div>
      <button
        type="button"
        onClick={onSwitchToExercise}
        className={clsx(
          "inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-2xl",
          "bg-accent text-white font-sans font-bold text-base",
          "transition hover:brightness-110",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        Switch to Exercise →
      </button>
    </div>
  );
}
