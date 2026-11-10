"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { ExerciseFeedback } from "@/components/molecules/ExerciseFeedback/ExerciseFeedback";

/**
 * ExerciseTranslationMC — pick-the-right-English round. German word
 * at the top, 4 outlined option buttons stacked vertically.
 *
 * On commit:
 *   - Correct → that option's border/bg lights up green
 *   - Incorrect → picked option fills red, correct option's border
 *     turns green so the user can see the right answer in-situ
 *   - All options lock
 *   - ExerciseFeedback card appears above the hero with the
 *     explanation and Next → button
 */

export interface ExerciseTranslationMCProps {
  /** German prompt word / phrase at the hero. */
  prompt: string;
  /** TTS target — defaults to `prompt`. */
  speakText?: string;
  /** English option labels (usually 4). Order is preserved. */
  options: string[];
  /** Index into `options` of the correct answer. */
  correctIndex: number;
  /** Shown in the ExerciseFeedback explanation slot. */
  explanation?: React.ReactNode;
  current: number;
  total: number;
  onNext?: (result: { correct: boolean }) => void;
  className?: string;
}

export function ExerciseTranslationMC({
  prompt,
  speakText,
  options,
  correctIndex,
  explanation,
  current,
  total,
  onNext,
  className,
}: ExerciseTranslationMCProps) {
  const [pickedIdx, setPickedIdx] = React.useState<number | null>(null);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPickedIdx(null);
  }, [prompt]);

  const committed = pickedIdx !== null;
  const isCorrect = pickedIdx === correctIndex;

  const handlePick = (i: number) => {
    if (committed) return;
    setPickedIdx(i);
  };

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-5",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-6",
        className,
      )}
    >
      <CardToolbar
        speakText={speakText ?? prompt}
        current={current}
        total={total}
      />

      {committed ? (
        <ExerciseFeedback
          state={isCorrect ? "correct" : "incorrect"}
          // Correct → no body text; the picked option is already
          // outlined green so the user sees the mapping. Incorrect
          // keeps the explanation (reveals the right option).
          explanation={
            isCorrect
              ? undefined
              : (explanation ??
                `The correct translation is "${options[correctIndex]}".`)
          }
          onNext={() => onNext?.({ correct: isCorrect })}
        />
      ) : null}

      <div className="flex items-center justify-center py-2">
        <div className="font-sans font-bold text-[32px] text-fg leading-tight text-center">
          {prompt}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {options.map((opt, i) => {
          const isPicked = pickedIdx === i;
          const isCorrectOption = i === correctIndex;
          const wrongPicked = committed && isPicked && !isCorrect;
          const showAsCorrect = committed && isCorrectOption;

          let borderCls = "border-border-strong";
          let bgStyle: React.CSSProperties = {};
          let color = "var(--fg)";

          if (wrongPicked) {
            bgStyle = { background: "var(--accent)" };
            color = "#ffffff";
            borderCls = "border-transparent";
          } else if (showAsCorrect) {
            bgStyle = {
              background: "color-mix(in srgb, var(--ok) 14%, transparent)",
              borderColor: "var(--ok)",
            };
            color = "var(--ok)";
            borderCls = "border-2";
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => handlePick(i)}
              disabled={committed}
              aria-pressed={isPicked}
              className={clsx(
                "w-full h-[56px] rounded-2xl",
                "font-sans font-semibold text-[16px] leading-none",
                "border transition-[background,color,transform,border-color] duration-150",
                !committed && "hover:-translate-y-0.5",
                committed && "cursor-default",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                borderCls,
              )}
              style={{ ...bgStyle, color }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
