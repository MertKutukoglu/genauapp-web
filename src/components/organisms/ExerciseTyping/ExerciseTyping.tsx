"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { ExerciseFeedback } from "@/components/molecules/ExerciseFeedback/ExerciseFeedback";
import { useLocale } from "@/lib/i18n/LocaleContext";

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

/**
 * Lowercases, trims, umlaut-folds, ß→ss, AND strips a leading
 * reflexive pronoun (sich / mich / dich / uns / euch) AND an
 * optional trailing fixed preposition.
 *
 * Reflexive strip (A2+): the canonical lexical form of a reflexive
 * verb carries "sich" in front (`sich beeilen`), but learners who
 * type just the infinitive ("beeilen") are grammatically right too
 * — the pronoun conjugates with the subject at usage time, it's
 * not part of the stem. Accepting both sides ships the right
 * grammar without wrong-flagging the shorter form the way the iOS
 * app once did (see softlaunch backlog 2026-11-10).
 *
 * Trailing-prep strip (B1+): a fixed reflexive-prepositional verb
 * like `sich bewerben um` is a lexical unit — our own Learn copy
 * teaches it that way. A learner who types "sich bewerben um"
 * against a stored "sich bewerben" is RIGHT, not wrong, so strip
 * a trailing single-word preposition before comparing. The small
 * German-prep allow-list keeps this from false-positiving on
 * ordinary words that happen to end in a short token.
 */
const TRAILING_PREP_RE =
  /\s+(an|auf|aus|bei|durch|fuer|gegen|in|mit|nach|ueber|um|unter|von|vor|zu)$/;

function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/^(sich|mich|dich|uns|euch)\s+/, "")
    .replace(TRAILING_PREP_RE, "");
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
  placeholder,
  speakText,
  explanation,
  current,
  total,
  onNext,
  className,
}: ExerciseTypingProps) {
  const { strings } = useLocale();
  const t = strings.try.typing;
  const resolvedPlaceholder = placeholder ?? t.placeholder;
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
        tryCardSurface,
        "rounded-3xl p-5",
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
          // Correct → no body text; the input border is already lit
          // --ok green and the typed word is visible.
          explanation={
            isCorrect
              ? undefined
              : (explanation ?? `The correct answer is "${answer}".`)
          }
          onNext={() => onNext?.({ correct: isCorrect })}
        />
      ) : null}

      <div className="flex flex-col items-center gap-1 text-center -mt-1">
        <div className="font-sans text-[15px] text-fg-muted leading-tight">
          {t.eyebrow}
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
        placeholder={resolvedPlaceholder}
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
        {t.checkCta}
      </button>
    </div>
  );
}
