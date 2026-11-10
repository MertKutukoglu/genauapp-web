"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { ExerciseFeedback } from "@/components/molecules/ExerciseFeedback/ExerciseFeedback";
import { highlightArticles } from "@/lib/grammar/highlightArticles";

/**
 * GrammarExerciseMC — the Grammar chip's multiple-choice exercise
 * card. Parallel of Words' ExerciseTranslationMC but tuned for the
 * cloze shape Grammar uses:
 *
 *   - Topic eyebrow at the top ("Verb sein", "Articles (der)" etc.)
 *     so the learner always knows which pattern the drill belongs
 *     to, even without having read the Learn card first.
 *   - Prompt renders the sentence with its literal `___` triple
 *     underscore intact (per brief §4 / content rule).
 *   - Hint (English or Turkish gloss) is always shown under the
 *     prompt — not tap-to-reveal. It's the one thing that tells the
 *     user what sentence they're completing.
 *   - 3 or 4 options in a vertical stack, A/S/D/F keyboard shortcuts.
 *   - On commit: ExerciseFeedback at the top with explanation;
 *     correct → auto-advance in 1.4s, incorrect → wait for Next.
 *   - Explanations substring-wrap der/die/das in their article
 *     colors (shared helper), so "Frau is feminine → die." shows
 *     die in red inside the feedback card.
 *
 * No speaker on the toolbar — the card teaches a paradigm/choice,
 * nothing short to pronounce.
 */

export interface GrammarExerciseMCProps {
  /** Topic eyebrow (e.g. "Verb sein", "Articles (der)"). */
  topic: string;
  /** Cloze prompt with literal `___` where the blank is. */
  prompt: string;
  /** Always-visible gloss under the prompt. */
  hint: string;
  options: string[];
  correctIndex: number;
  /** Shown in the ExerciseFeedback body on commit. */
  explanation?: string;
  current: number;
  total: number;
  onNext?: (result: { correct: boolean }) => void;
  className?: string;
}

/** A/S/D/F home row for options 0..3. */
const OPTION_KEYS = ["A", "S", "D", "F"] as const;

/** Auto-advance window on correct, matching the Grammar brief. */
const CORRECT_ADVANCE_MS = 1400;

export function GrammarExerciseMC({
  topic,
  prompt,
  hint,
  options,
  correctIndex,
  explanation,
  current,
  total,
  onNext,
  className,
}: GrammarExerciseMCProps) {
  const [pickedIdx, setPickedIdx] = React.useState<number | null>(null);

  // Reset the picked state when the item changes (keyed by prompt).
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPickedIdx(null);
  }, [prompt]);

  const committed = pickedIdx !== null;
  const isCorrect = pickedIdx === correctIndex;

  const handlePick = React.useCallback(
    (i: number) => {
      if (committed) return;
      setPickedIdx(i);
    },
    [committed],
  );

  // Auto-advance on correct. Incorrect waits for an explicit Next
  // click so the user has time to read the explanation.
  React.useEffect(() => {
    if (!committed || !isCorrect) return;
    const t = window.setTimeout(() => {
      onNext?.({ correct: true });
    }, CORRECT_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [committed, isCorrect, onNext]);

  // Keyboard shortcuts: A/S/D/F → options 0..N. Only live until
  // commit; once committed, the ExerciseFeedback's Next autoFocus
  // takes over Enter.
  React.useEffect(() => {
    if (committed) return;
    if (typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      const key = e.key.toUpperCase();
      const idx = OPTION_KEYS.indexOf(key as (typeof OPTION_KEYS)[number]);
      if (idx >= 0 && idx < options.length) {
        e.preventDefault();
        handlePick(idx);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [committed, options.length, handlePick]);

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-5",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-5",
        "min-h-[400px]",
        className,
      )}
    >
      <CardToolbar current={current} total={total} />

      {committed ? (
        <ExerciseFeedback
          state={isCorrect ? "correct" : "incorrect"}
          explanation={
            !isCorrect && explanation ? highlightArticles(explanation) : undefined
          }
          onNext={!isCorrect ? () => onNext?.({ correct: false }) : undefined}
        />
      ) : null}

      {/* Topic eyebrow */}
      <div
        className="font-sans font-normal text-[13px] text-fg-muted uppercase"
        style={{ letterSpacing: "0.3px" }}
      >
        {topic}
      </div>

      {/* Prompt + hint, center-stacked with a flex spacer so the two
          sit visually in the card's middle regardless of the option
          count below. */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-1">
        <div
          className={clsx(
            "font-sans font-bold text-fg leading-snug",
            // Brief §4.1: drop from 24 to 20 if the prompt is long.
            prompt.length > 30 ? "text-[20px]" : "text-[24px]",
          )}
        >
          {prompt}
        </div>
        <div className="font-sans font-normal text-[15px] text-fg-muted leading-snug">
          {hint}
        </div>
      </div>

      {/* Options — vertical stack, state-driven colors. */}
      <div className="flex flex-col gap-2.5">
        {options.map((opt, i) => {
          const picked = pickedIdx === i;
          const isThisCorrect = i === correctIndex;
          const reveal = committed && isThisCorrect; // show correct on wrong pick

          const state = !committed
            ? ("idle" as const)
            : picked && isThisCorrect
              ? ("picked-correct" as const)
              : picked && !isThisCorrect
                ? ("picked-wrong" as const)
                : reveal
                  ? ("reveal-correct" as const)
                  : ("other" as const);

          const style =
            state === "picked-correct" || state === "reveal-correct"
              ? {
                  background: "color-mix(in srgb, var(--ok) 10%, transparent)",
                  border: "1.5px solid color-mix(in srgb, var(--ok) 40%, transparent)",
                  color: "var(--ok)",
                }
              : state === "picked-wrong"
                ? {
                    background: "color-mix(in srgb, #EA3C3C 10%, transparent)",
                    border: "1.5px solid color-mix(in srgb, #EA3C3C 40%, transparent)",
                    color: "#EA3C3C",
                  }
                : {
                    background: "transparent",
                    border: "1.5px solid var(--border-strong)",
                    color: "var(--fg)",
                  };

          return (
            <button
              key={`${opt}-${i}`}
              type="button"
              onClick={() => handlePick(i)}
              disabled={committed}
              className={clsx(
                "relative h-[52px] rounded-2xl font-sans font-semibold text-base",
                "transition-colors",
                committed ? "cursor-default" : "cursor-pointer hover:brightness-105",
              )}
              style={style}
            >
              {/* kbd hint pinned to the left on sm+; the center of
                  the button still reads as the label. */}
              <span
                aria-hidden
                className="hidden sm:inline absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-fg-faint border border-border-strong rounded px-1.5 py-0.5 leading-none"
              >
                {OPTION_KEYS[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
