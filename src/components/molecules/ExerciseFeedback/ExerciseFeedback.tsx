"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * ExerciseFeedback — correct/incorrect result card for every Exercise
 * variant (articlePicker / translationMC / typing).
 *
 * Sits at the TOP of the card (above the prompt) per the iOS
 * reference, with an outlined [Next →] button the user taps to
 * advance. Unlike the Learn-mode AnswerFeedback, Exercise feedback is
 * explicit — the user commits, sees the verdict with an explanation,
 * then taps Next themselves (no auto-advance — scoring hinges on
 * conscious close of the loop).
 *
 * Two state shapes, same chrome:
 *   - Correct → green (--ok) tint, ✓ icon, "Correct", short note
 *   - Incorrect → red (--accent) tint, ✕ icon, "Incorrect", explanation
 *
 * Both share the Next button so the parent only wires one handler.
 */

export interface ExerciseFeedbackProps {
  state: "correct" | "incorrect";
  /** Short note underneath the verdict. For incorrect: why / reveal. */
  explanation?: React.ReactNode;
  onNext?: () => void;
  nextLabel?: React.ReactNode;
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="16 9 10.5 15 8 12.5" />
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
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export function ExerciseFeedback({
  state,
  explanation,
  onNext,
  nextLabel = "Next →",
  className,
}: ExerciseFeedbackProps) {
  const isCorrect = state === "correct";
  const toneVar = isCorrect ? "var(--ok)" : "var(--accent)";

  return (
    <div
      role={isCorrect ? "status" : "alert"}
      aria-live="polite"
      className={clsx(
        "flex flex-col items-center gap-2.5",
        "rounded-2xl px-4 py-3.5",
        className,
      )}
      style={{
        background: `color-mix(in srgb, ${toneVar} 10%, transparent)`,
      }}
    >
      <div
        className="flex items-center justify-center gap-2 font-sans font-bold text-[16px]"
        style={{ color: toneVar }}
      >
        {isCorrect ? CORRECT_ICON : INCORRECT_ICON}
        <span>{isCorrect ? "Correct" : "Incorrect"}</span>
      </div>

      {explanation ? (
        <p className="m-0 text-center font-sans text-[13.5px] leading-snug text-fg-muted max-w-[460px]">
          {explanation}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onNext}
        autoFocus
        className={clsx(
          "mt-1 w-full inline-flex items-center justify-center gap-2",
          "h-[42px] rounded-xl",
          "font-sans font-bold text-[14px]",
          "border transition hover:brightness-110 active:translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
        style={{
          color: toneVar,
          borderColor: `color-mix(in srgb, ${toneVar} 55%, transparent)`,
          background: "transparent",
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
}
