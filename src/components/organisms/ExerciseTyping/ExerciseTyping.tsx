"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { ExerciseFeedback } from "@/components/molecules/ExerciseFeedback/ExerciseFeedback";

/**
 * ExerciseTyping — type the German word for the English prompt.
 *
 * Layout per iOS reference:
 *   1. CardToolbar (speaker + counter)
 *   2. Feedback card at top once the user commits (Check or Enter)
 *   3. "Translate to German" eyebrow + big English hero
 *   4. Rounded text input with placeholder "Type in German…"
 *   5. Full-width Check button underneath
 *
 * Enter in the input also fires Check — the keyboard flow matches
 * what a typist expects from a single-field form.
 *
 * Tolerant comparison: case-insensitive; umlaut-tolerant (ü↔ue,
 * ö↔oe, ä↔oe, ß↔ss); whitespace trimmed. The source of truth for
 * the correct spelling stays what the content supplied — tolerance
 * only applies to the user's input.
 */

/** Lowercases, trims, and folds German umlauts + ß to their ASCII pairs. */
function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

export interface ExerciseTypingProps {
  /** English prompt the user is translating from. */
  prompt: string;
  /** Correct German answer. */
  answer: string;
  /** Shown inside the input before typing (defaults to "Type in German…"). */
  placeholder?: string;
  /** TTS target — defaults to `answer` (the German word). */
  speakText?: string;
  /** Shown in ExerciseFeedback on commit. */
  explanation?: React.ReactNode;
  current: number;
  total: number;
  onNext?: (result: { correct: boolean }) => void;
  className?: string;
}

export function ExerciseTyping({
  prompt,
  answer,
  placeholder = "Type in German…",
  speakText,
  explanation,
  current,
  total,
  onNext,
  className,
}: ExerciseTypingProps) {
  const [value, setValue] = React.useState("");
  const [commit, setCommit] = React.useState<null | { correct: boolean }>(null);

  // Reset when the word changes.
  React.useEffect(() => {
    // Intentional state sync on word change — reset the input + any
    // committed verdict so the next card starts fresh.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue("");
    setCommit(null);
  }, [prompt, answer]);

  const normalizedAnswer = React.useMemo(
    () => normalizeAnswer(answer),
    [answer],
  );

  const check = React.useCallback(() => {
    if (commit !== null) return;
    if (value.trim().length === 0) return;
    const ok = normalizeAnswer(value) === normalizedAnswer;
    setCommit({ correct: ok });
  }, [value, normalizedAnswer, commit]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      check();
    }
  };

  const committed = commit !== null;
  const isCorrect = !!commit?.correct;

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-5",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-5",
        className,
      )}
    >
      <CardToolbar
        speakText={speakText ?? answer}
        current={current}
        total={total}
      />

      {committed ? (
        <ExerciseFeedback
          state={isCorrect ? "correct" : "incorrect"}
          explanation={
            explanation ??
            (isCorrect
              ? `"${answer}" — right.`
              : `The correct answer is "${answer}".`)
          }
          onNext={() => onNext?.({ correct: isCorrect })}
        />
      ) : null}

      <div className="flex flex-col items-center gap-1 text-center -mt-1">
        <div className="font-sans text-[15px] text-fg-muted leading-tight">
          Translate to German
        </div>
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {prompt}
        </div>
      </div>

      {/* Input — tinted sunken surface with a visible caret color
          driven by --accent so it reads as a focused field. */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        disabled={committed}
        aria-label="German translation"
        className={clsx(
          "w-full h-[56px] rounded-2xl px-5",
          "bg-surface-sunk text-fg placeholder:text-fg-faint",
          "font-sans font-semibold text-[17px]",
          "border border-transparent",
          "outline-none transition",
          "focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_16%,transparent)]",
          "disabled:opacity-80 disabled:cursor-default",
          committed && !isCorrect && "border-accent",
          committed && isCorrect && "border-[color:var(--ok)]",
        )}
        style={{ caretColor: "var(--accent)" }}
      />

      <button
        type="button"
        onClick={check}
        disabled={committed || value.trim().length === 0}
        className={clsx(
          "w-full h-[56px] rounded-2xl",
          "font-sans font-bold text-[17px]",
          "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
          "text-fg-muted",
          "transition-colors duration-150",
          "enabled:hover:bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)] enabled:hover:text-fg",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        Check
      </button>
    </div>
  );
}
