"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SpeakerButton } from "@/components/atoms/SpeakerButton/SpeakerButton";

/**
 * AnswerFeedback — the generic correct/incorrect result banner that
 * appears beneath an answer surface (scrambled tiles, chunk tiles,
 * typing) once the user has committed an attempt.
 *
 * Two states, same chrome shape so the vertical rhythm doesn't jump:
 *
 *   • Correct — green-tinted card, ✓ + "Correct". Auto-dismisses
 *     (parent decides when to call onContinue / auto-advance).
 *
 *   • Incorrect — red-tinted card, ✗ + "Not quite.", reveals the
 *     target word with a speaker icon so the user can both see and
 *     hear it. Pinned [Continue →] button fires `onContinue`, which
 *     typically routes to the deck's Repeat action — the card goes
 *     back into the queue for a later retry.
 *
 * Presentational — the parent decides when to mount this and which
 * state to show. No internal timers.
 */

export interface AnswerFeedbackProps {
  state: "correct" | "incorrect";
  /**
   * Required when state === "incorrect": the full correct word to
   * reveal. Rendered big + bold with an inline speaker. Ignored on
   * "correct" (the user already assembled the word themselves).
   */
  correctAnswer?: string;
  /**
   * Optional speak target. Lets the caller pass "der Tisch" so the
   * speaker reads the article too; falls back to `correctAnswer` when
   * omitted.
   */
  speakText?: string;
  /**
   * Fires when the user hits Continue on the incorrect card. On
   * correct, the parent calls its own advance timer and never shows
   * a button; the prop is still accepted so callers can wire the
   * same handler if they want.
   */
  onContinue?: () => void;
  /** Override the default "Continue →" label. */
  continueLabel?: React.ReactNode;
  className?: string;
}

const CORRECT_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const INCORRECT_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function AnswerFeedback({
  state,
  correctAnswer,
  speakText,
  onContinue,
  continueLabel = "Continue →",
  className,
}: AnswerFeedbackProps) {
  if (state === "correct") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={clsx(
          "flex items-center justify-center gap-2.5",
          "rounded-2xl px-5 py-4",
          "bg-[color:color-mix(in_srgb,var(--ok)_12%,transparent)]",
          "text-[color:var(--ok)]",
          "font-sans font-bold text-[16px]",
          className,
        )}
      >
        {CORRECT_ICON}
        <span>Correct</span>
      </div>
    );
  }

  const spokenText = speakText ?? correctAnswer;

  return (
    <div
      role="alert"
      className={clsx(
        "flex flex-col gap-4",
        "rounded-2xl px-5 py-4",
        "bg-[color:color-mix(in_srgb,var(--accent)_10%,transparent)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 text-accent font-sans font-bold text-[16px]">
        {INCORRECT_ICON}
        <span>Not quite.</span>
      </div>

      {correctAnswer ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="font-sans text-[11px] text-fg-muted uppercase tracking-[0.1em] font-semibold">
            Answer
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <div className="font-sans font-bold text-[24px] text-fg leading-tight">
              {correctAnswer}
            </div>
            {spokenText ? <SpeakerButton text={spokenText} /> : null}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onContinue}
        className={clsx(
          "self-center inline-flex items-center justify-center",
          "h-11 px-6 rounded-full",
          "bg-accent text-white font-sans font-bold text-[14px]",
          "transition hover:brightness-110 active:translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        {continueLabel}
      </button>
    </div>
  );
}
