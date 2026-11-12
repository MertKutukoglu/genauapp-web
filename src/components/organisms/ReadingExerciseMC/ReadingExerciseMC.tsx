"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { ExerciseFeedback } from "@/components/molecules/ExerciseFeedback/ExerciseFeedback";

/**
 * ReadingExerciseMC — the Reading chip's multiple-choice exercise
 * card. Looks like Grammar's MC card at a glance, with three tunings
 * for Reading comprehension:
 *
 *   1. The prompt is a complete German question (not a cloze); drops
 *      from 22 → 18 past 50 chars instead of 24 → 20.
 *   2. Options are full sentences (Grammar's were tokens). Height is
 *      auto with a 52 minimum; padding 14 vertical so wrapped lines
 *      breathe; font is semi-bold 15 (one step smaller than Grammar's
 *      16) so two-line options stay readable inside the card.
 *   3. No article-color highlighting on explanations — Reading
 *      doesn't lean on der/die/das in its explanations, so the
 *      explanation renders as plain text (double-quoted passage
 *      excerpts are preserved as-is).
 *
 * Topic eyebrow is plain text ("Main idea", "Detail", …) — the brief
 * explicitly rejects a badged pill here (brief §8). The `qType`
 * routing/analytics value is passed separately so the parent can
 * emit it in the PostHog payload without surfacing it on-card.
 */

export interface ReadingExerciseMCProps {
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  /** Analytics qType — not rendered; passed through to onNext. */
  qType?: string;
  current: number;
  total: number;
  onNext?: (result: { correct: boolean; qType?: string }) => void;
  className?: string;
}

const OPTION_KEYS = ["A", "S", "D", "F"] as const;
const CORRECT_ADVANCE_MS = 1400;

export function ReadingExerciseMC({
  topic,
  prompt,
  options,
  correctIndex,
  explanation,
  qType,
  current,
  total,
  onNext,
  className,
}: ReadingExerciseMCProps) {
  const [pickedIdx, setPickedIdx] = React.useState<number | null>(null);

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

  React.useEffect(() => {
    if (!committed || !isCorrect) return;
    const t = window.setTimeout(() => {
      onNext?.({ correct: true, qType });
    }, CORRECT_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [committed, isCorrect, onNext, qType]);

  // Keyboard shortcuts — same A/S/D/F home row as Grammar MC. Long
  // sentence options still get the same shortcut; the kbd pin sits
  // on the left and leaves the center for the label.
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
        tryCardSurface,
        "rounded-3xl p-5",
        "flex flex-col gap-5",
        "min-h-[400px]",
        className,
      )}
    >
      <CardToolbar current={current} total={total} />

      {committed ? (
        <ExerciseFeedback
          state={isCorrect ? "correct" : "incorrect"}
          explanation={!isCorrect && explanation ? explanation : undefined}
          onNext={
            !isCorrect ? () => onNext?.({ correct: false, qType }) : undefined
          }
        />
      ) : null}

      {/* Topic eyebrow — plain text, no badge. */}
      <div
        className="font-sans font-normal text-[13px] text-fg-muted uppercase"
        style={{ letterSpacing: "0.3px" }}
      >
        {topic}
      </div>

      {/* Prompt — centered, flex-1 spacer so the options sit toward
          the bottom and the prompt stays visually in the card's
          middle. */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-1">
        <div
          className={clsx(
            "font-sans font-bold text-fg leading-snug",
            prompt.length > 50 ? "text-[18px]" : "text-[22px]",
          )}
        >
          {prompt}
        </div>
      </div>

      {/* Options — vertical stack, auto-height min 52, wrap-friendly. */}
      <div className="flex flex-col gap-2.5">
        {options.map((opt, i) => {
          const picked = pickedIdx === i;
          const isThisCorrect = i === correctIndex;
          const reveal = committed && isThisCorrect;

          const state = !committed
            ? "idle"
            : picked && isThisCorrect
              ? "picked-correct"
              : picked && !isThisCorrect
                ? "picked-wrong"
                : reveal
                  ? "reveal-correct"
                  : "other";

          const style =
            state === "picked-correct" || state === "reveal-correct"
              ? {
                  background: "color-mix(in srgb, var(--ok) 10%, transparent)",
                  border:
                    "1.5px solid color-mix(in srgb, var(--ok) 40%, transparent)",
                  color: "var(--ok)",
                }
              : state === "picked-wrong"
                ? {
                    background:
                      "color-mix(in srgb, #EA3C3C 10%, transparent)",
                    border:
                      "1.5px solid color-mix(in srgb, #EA3C3C 40%, transparent)",
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
                "relative min-h-[52px] rounded-2xl py-3.5 px-5",
                "font-sans font-semibold text-[15px] text-center leading-snug",
                "transition-colors",
                committed
                  ? "cursor-default"
                  : "cursor-pointer hover:brightness-105",
              )}
              style={style}
            >
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
