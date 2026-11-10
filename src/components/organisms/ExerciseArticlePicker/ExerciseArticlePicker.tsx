"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { ExerciseFeedback } from "@/components/molecules/ExerciseFeedback/ExerciseFeedback";

/**
 * ExerciseArticlePicker — der / die / das round of the Exercise mode.
 *
 * Shape (per Mert's iOS reference):
 *   1. CardToolbar (speaker + counter). No bookmark on web.
 *   2. Optional top-aligned ExerciseFeedback card once the user
 *      commits (correct → tap Der/Die/Das → tap Next). While idle,
 *      this slot is empty so the hero sits nicely vertically.
 *   3. Hero: dash placeholder left of the noun (fills with the
 *      article once revealed) + English translation underneath.
 *   4. Row of 3 pill buttons: Der (blue), Die (red), Das (green),
 *      using the article color tokens. Idle = soft tint. On commit:
 *      wrong pick becomes solid red, correct answer becomes solid
 *      green. All three lock after commit.
 *
 * Correctness: the parent passes `correctArticle` straight — we
 * don't infer it from a text match. Variant is strictly 3-way
 * (der/die/das); no other options are supported.
 */

export type ArticleOption = "der" | "die" | "das";

const ARTICLE_LABEL: Record<ArticleOption, string> = {
  der: "Der",
  die: "Die",
  das: "Das",
};

/** Theme tokens for each article's tint. Kept in sync with `.color-der/die/das`. */
const ARTICLE_COLOR: Record<ArticleOption, string> = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
};

const ARTICLES: ArticleOption[] = ["der", "die", "das"];

/** Desktop keyboard shortcut for each article button. */
const ARTICLE_KEY: Record<ArticleOption, string> = {
  der: "A",
  die: "S",
  das: "D",
};

export interface ExerciseArticlePickerProps {
  /** The noun being asked about, without article. */
  noun: string;
  /** English translation shown under the hero. */
  english: string;
  /** Required for TTS + revealed display. */
  correctArticle: ArticleOption;
  /** Shown in the ExerciseFeedback explanation slot. */
  explanation?: React.ReactNode;
  current: number;
  total: number;
  /**
   * Fires when the user taps Next on the feedback card. `correct`
   * tells the parent which deck mechanic to invoke (advance vs
   * requeue).
   */
  onNext?: (result: { correct: boolean }) => void;
  className?: string;
}

export function ExerciseArticlePicker({
  noun,
  english,
  correctArticle,
  explanation,
  current,
  total,
  onNext,
  className,
}: ExerciseArticlePickerProps) {
  const [picked, setPicked] = React.useState<ArticleOption | null>(null);
  // Reset on word change.
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPicked(null);
  }, [noun]);

  const committed = picked !== null;
  const isCorrect = picked === correctArticle;

  const speakText = `${correctArticle} ${noun}`;

  const handlePick = React.useCallback(
    (opt: ArticleOption) => {
      if (committed) return;
      setPicked(opt);
    },
    [committed],
  );

  // Desktop keyboard shortcuts: A/S/D → der/die/das. Only active
  // while the user hasn't committed — once a button is picked, the
  // Next button takes over and fires on Enter via autoFocus.
  React.useEffect(() => {
    if (committed) return;
    if (typeof window === "undefined") return;

    const onKey = (e: KeyboardEvent) => {
      // Don't steal keystrokes from text fields.
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const k = e.key.toLowerCase();
      if (k === "a") {
        e.preventDefault();
        handlePick("der");
      } else if (k === "s") {
        e.preventDefault();
        handlePick("die");
      } else if (k === "d") {
        e.preventDefault();
        handlePick("das");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [committed, handlePick]);

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
      <CardToolbar speakText={speakText} current={current} total={total} />

      {committed ? (
        <ExerciseFeedback
          state={isCorrect ? "correct" : "incorrect"}
          // Correct → just the verdict label; the hero already shows
          // "der Noun" in full form, extra prose is noise per Mert's
          // review. Incorrect → explanation stays so the user sees
          // the rule.
          explanation={
            isCorrect
              ? undefined
              : (explanation ?? `The correct article is "${correctArticle}".`)
          }
          onNext={() => onNext?.({ correct: isCorrect })}
        />
      ) : null}

      {/* Hero stack — dash + noun (with article inline once revealed)
          sits center, with the English translation tucked right
          underneath. `flex-1` lets the group grow so the buttons sit
          at the bottom of the card while the hero vertically centers. */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3 py-4">
        <div className="flex items-center justify-center gap-3">
          {/* Article slot — dash placeholder while idle; the correct
              article drops in on commit (regardless of right/wrong
              pick) so the user always walks away seeing the full
              "der Noun" form. The dash disappears once filled so the
              two don't sit side by side. */}
          {committed ? (
            <span
              className="font-sans font-bold text-[32px] leading-none"
              style={{ color: ARTICLE_COLOR[correctArticle] }}
            >
              {correctArticle}
            </span>
          ) : (
            <span
              aria-hidden
              className="inline-block h-[3px] w-10 rounded-full bg-[color:color-mix(in_srgb,var(--fg)_22%,transparent)]"
            />
          )}
          <span className="font-sans font-bold text-[32px] text-fg leading-none">
            {noun}
          </span>
        </div>
        <div className="font-sans text-[15px] text-fg-muted leading-none">
          {english}
        </div>
      </div>

      {/* Article buttons — bottom-aligned by the flex-1 group above.
          Soft tint idle; on commit wrong pick fills solid red,
          correct option fills solid green. Small kbd hint underneath
          each on sm+ screens for desktop keyboard flow. */}
      <div className="grid grid-cols-3 gap-2.5">
        {ARTICLES.map((a) => {
          const color = ARTICLE_COLOR[a];
          const isPicked = picked === a;
          const isCorrectOption = a === correctArticle;
          const wrongPicked = committed && isPicked && !isCorrect;
          const showAsCorrect = committed && isCorrectOption;

          let bg: string;
          let fg: string;
          if (wrongPicked) {
            bg = "var(--accent)";
            fg = "#ffffff";
          } else if (showAsCorrect) {
            bg = "var(--ok)";
            fg = "#ffffff";
          } else {
            bg = `color-mix(in srgb, ${color} 14%, transparent)`;
            fg = color;
          }

          return (
            <div key={a} className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => handlePick(a)}
                disabled={committed}
                aria-pressed={isPicked}
                aria-keyshortcuts={ARTICLE_KEY[a]}
                className={clsx(
                  "w-full h-[64px] rounded-2xl",
                  "font-sans font-bold text-[22px] leading-none",
                  "transition-[background,color,transform] duration-150",
                  !committed && "hover:-translate-y-0.5",
                  committed && "cursor-default",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                )}
                style={{
                  background: bg,
                  color: fg,
                }}
              >
                {ARTICLE_LABEL[a]}
              </button>
              {/* Keyboard hint — hidden on touch-only widths. Monospace
                  single-letter kbd pill so it reads as a shortcut, not
                  decoration. Uses the fg-faint token so it stays
                  quiet. */}
              <kbd
                aria-hidden
                className={clsx(
                  "hidden sm:inline-flex items-center justify-center",
                  "min-w-[22px] h-[18px] px-1.5 rounded-md",
                  "font-mono text-[11px] font-semibold leading-none",
                  "text-fg-faint",
                  "border border-border-strong bg-[color:color-mix(in_srgb,var(--fg)_4%,transparent)]",
                )}
              >
                {ARTICLE_KEY[a]}
              </kbd>
            </div>
          );
        })}
      </div>
    </div>
  );
}
