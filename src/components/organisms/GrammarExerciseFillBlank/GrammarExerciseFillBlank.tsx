"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { ExerciseFeedback } from "@/components/molecules/ExerciseFeedback/ExerciseFeedback";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { normalizeDE } from "@/content/grammar-a1";
import { highlightArticles } from "@/lib/grammar/highlightArticles";

/**
 * GrammarExerciseFillBlank — the Grammar chip's typed-answer
 * exercise card.
 *
 * Layout per brief §4.2:
 *   - CardToolbar (counter only; no speaker on a sentence stem)
 *   - ExerciseFeedback at the top on commit
 *   - Topic eyebrow (always visible, uppercased)
 *   - Prompt with literal `___` (center, bold 24 — drops to 20 on
 *     long strings)
 *   - Hint under the prompt, always visible (per brief: not
 *     tap-to-reveal)
 *   - Centered text input, 52 tall, rounded 16, soft fg-6% bg
 *   - Cherry Check button underneath, flips to Next on commit
 *
 * Submission:
 *   - Enter submits (same keyboard flow as Words' ExerciseTyping)
 *   - `normalizeDE` from the content module compares case-
 *     insensitively with umlaut-folding so "wir" and "Wir" both
 *     match the stored "Wir" without touching the canonical form.
 *   - Correct → auto-advance in 1.4s; Incorrect → Next waits on
 *     the user (same contract as GrammarExerciseMC).
 */

export interface GrammarExerciseFillBlankProps {
  topic: string;
  prompt: string;
  hint: string;
  /** Canonical German answer (any capitalization; compared folded). */
  answer: string;
  explanation?: string;
  current: number;
  total: number;
  onNext?: (result: { correct: boolean }) => void;
  className?: string;
}

const CORRECT_ADVANCE_MS = 1400;

export function GrammarExerciseFillBlank({
  topic,
  prompt,
  hint,
  answer,
  explanation,
  current,
  total,
  onNext,
  className,
}: GrammarExerciseFillBlankProps) {
  const { strings } = useLocale();
  const t = strings.try.typing;
  const [value, setValue] = React.useState("");
  const [commit, setCommit] = React.useState<null | { correct: boolean }>(
    null,
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Reset when the item changes (keyed by prompt + answer so both
  // axes cover a fresh item).
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue("");
    setCommit(null);
    // Focus the input on the first mount of each new item.
    inputRef.current?.focus();
  }, [prompt, answer]);

  const handleCheck = React.useCallback(() => {
    if (commit !== null || value.trim().length === 0) return;
    // Canonical shape match: case-insensitive + umlaut-folded.
    const shapeMatch = normalizeDE(value) === normalizeDE(answer);
    // Sentence-initial capitalization check: when the canonical
    // answer starts with an uppercase letter (sentence-initial
    // articles like "Der", "Die", "Das", and the capitalized pronoun
    // "Wir" that begins its sentence), require the user's input to
    // also start with uppercase. Mid-sentence answers (bist, habt,
    // hörst, gehen) start with lowercase in the canonical form and
    // don't trigger the check — those stay fully case-insensitive.
    const expectUpper = /^[A-ZÄÖÜ]/.test(answer);
    const trimmed = value.trim();
    const startsUpper = /^[A-ZÄÖÜ]/.test(trimmed);
    const casingOK = !expectUpper || startsUpper;
    setCommit({ correct: shapeMatch && casingOK });
  }, [commit, value, answer]);

  const handleNext = React.useCallback(() => {
    if (commit === null) return;
    onNext?.({ correct: commit.correct });
  }, [commit, onNext]);

  // Auto-advance on correct.
  React.useEffect(() => {
    if (!commit?.correct) return;
    const timer = window.setTimeout(() => {
      onNext?.({ correct: true });
    }, CORRECT_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [commit, onNext]);

  const checkDisabled = value.trim().length === 0 || commit !== null;

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

      {commit ? (
        <ExerciseFeedback
          state={commit.correct ? "correct" : "incorrect"}
          explanation={
            !commit.correct && explanation
              ? highlightArticles(explanation)
              : undefined
          }
          onNext={!commit.correct ? handleNext : undefined}
        />
      ) : null}

      <div
        className="font-sans font-normal text-[13px] text-fg-muted uppercase"
        style={{ letterSpacing: "0.3px" }}
      >
        {topic}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-1">
        <div
          className={clsx(
            "font-sans font-bold text-fg leading-snug",
            prompt.length > 30 ? "text-[20px]" : "text-[24px]",
          )}
        >
          {prompt}
        </div>
        <div className="font-sans font-normal text-[15px] text-fg-muted leading-snug">
          {hint}
        </div>
      </div>

      {/* Input + Check/Next. Stacks on mobile, side by side on lg+ so
          the wide desktop card doesn't leave a long empty input on
          its own line above an equally-long CTA. */}
      <div className="flex flex-col lg:flex-row gap-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (commit === null) handleCheck();
              else handleNext();
            }
          }}
          disabled={commit !== null}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={t.placeholder}
          className={clsx(
            "h-[52px] rounded-2xl px-4 w-full lg:flex-1",
            "font-sans font-semibold text-[18px] text-fg text-center",
            "placeholder:font-normal placeholder:text-fg-faint",
            "outline-none focus:ring-2 focus:ring-accent/40",
          )}
          style={{
            background: "color-mix(in srgb, var(--fg) 6%, transparent)",
          }}
        />
        <button
          type="button"
          onClick={commit === null ? handleCheck : handleNext}
          disabled={checkDisabled && commit === null}
          className={clsx(
            "h-[52px] rounded-2xl w-full lg:w-[160px] lg:shrink-0",
            "font-sans font-bold text-base text-white",
            "transition-colors",
            checkDisabled && commit === null
              ? "cursor-not-allowed"
              : "cursor-pointer hover:brightness-105",
          )}
          style={{
            background:
              checkDisabled && commit === null
                ? "color-mix(in srgb, var(--fg) 30%, transparent)"
                : "var(--accent)",
          }}
        >
          {commit === null ? t.checkCta : strings.try.exerciseFeedback.nextLabel}
        </button>
      </div>
    </div>
  );
}
