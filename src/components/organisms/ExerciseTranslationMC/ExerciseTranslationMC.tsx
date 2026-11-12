"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
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

/** A-S-D-F home row for options 0-3. */
const OPTION_KEYS = ["A", "S", "D", "F"] as const;

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

  const handlePick = React.useCallback(
    (i: number) => {
      if (committed) return;
      setPickedIdx(i);
    },
    [committed],
  );

  // Desktop keyboard shortcuts: A/S/D/F → options 0..3. Mirrors the
  // ArticlePicker's home-row pattern — fast flow for keyboard users.
  // Only live until commit; Next button takes over on Enter via its
  // autoFocus thereafter.
  React.useEffect(() => {
    if (committed) return;
    if (typeof window === "undefined") return;

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const idx = OPTION_KEYS.findIndex((k) => k.toLowerCase() === e.key.toLowerCase());
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

          const shortcut = i < OPTION_KEYS.length ? OPTION_KEYS[i] : null;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handlePick(i)}
              disabled={committed}
              aria-pressed={isPicked}
              aria-keyshortcuts={shortcut ?? undefined}
              className={clsx(
                "w-full h-[56px] rounded-2xl",
                "flex items-center justify-center gap-3",
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
              {/* Inline kbd hint on the left — hidden on touch-only
                  widths, kept quiet with fg-faint so it never fights
                  the option label for attention. */}
              {shortcut ? (
                <kbd
                  aria-hidden
                  className={clsx(
                    "hidden sm:inline-flex items-center justify-center",
                    "min-w-[22px] h-[20px] px-1.5 rounded-md",
                    "font-mono text-[11px] font-semibold leading-none",
                    "text-fg-faint",
                    "border border-border-strong bg-[color:color-mix(in_srgb,var(--fg)_4%,transparent)]",
                  )}
                >
                  {shortcut}
                </kbd>
              ) : null}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
