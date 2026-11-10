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

  const handlePick = (opt: ArticleOption) => {
    if (committed) return;
    setPicked(opt);
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
      <CardToolbar speakText={speakText} current={current} total={total} />

      {committed ? (
        <ExerciseFeedback
          state={isCorrect ? "correct" : "incorrect"}
          explanation={
            isCorrect
              ? `"${speakText}". Nice.`
              : (explanation ?? `The correct article is "${correctArticle}".`)
          }
          onNext={() => onNext?.({ correct: isCorrect })}
        />
      ) : null}

      {/* Hero — dash placeholder + noun. On commit (correct or not)
          the dash fills with the correct article so the user walks
          away seeing the full form. Dash sits left of the noun. */}
      <div className="flex-1 flex items-center justify-center gap-3 py-6">
        <span
          aria-hidden
          className={clsx(
            "inline-block h-[3px] w-10 rounded-full transition-colors duration-200",
          )}
          style={{
            background: committed
              ? ARTICLE_COLOR[correctArticle]
              : "color-mix(in srgb, var(--fg) 22%, transparent)",
          }}
        />
        {committed ? (
          <span
            className="font-sans font-bold text-[32px] leading-none"
            style={{ color: ARTICLE_COLOR[correctArticle] }}
          >
            {correctArticle}
          </span>
        ) : null}
        <span className="font-sans font-bold text-[32px] text-fg leading-none">
          {noun}
        </span>
      </div>
      <div className="-mt-4 text-center font-sans text-[15px] text-fg-muted">
        {english}
      </div>

      {/* Article buttons. Soft tint idle; on commit wrong pick fills
          solid red, correct option fills solid green. */}
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
            <button
              key={a}
              type="button"
              onClick={() => handlePick(a)}
              disabled={committed}
              aria-pressed={isPicked}
              className={clsx(
                "h-[64px] rounded-2xl",
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
          );
        })}
      </div>
    </div>
  );
}
