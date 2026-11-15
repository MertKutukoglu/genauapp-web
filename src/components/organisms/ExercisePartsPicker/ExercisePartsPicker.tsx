"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * ExercisePartsPicker, breaks a long Exercise deck into a small set
 * of parts so the learner doesn't face a 40-item wall in one sitting.
 *
 * Shown only when the authored deck is big enough that one sitting
 * would be daunting (the chip decides the threshold, currently >30).
 * At typical sizes, the picker renders three parts of 15/15/10 for
 * B1 Grammar; smaller decks skip the picker entirely and keep the
 * old single-deck behaviour.
 *
 * Each part card shows:
 *   - "Part N of X · Y questions" eyebrow (localized)
 *   - A 1-line topic preview, distinct topics in authored order,
 *     joined by ·. Capped at 3 topics; the rest collapse into "…".
 *
 * Presentational: parent owns `parts` and `onSelect`. The actual
 * slicing lives at the chip level so skill-sheet, completion and
 * deck wiring see real GrammarQuestion arrays, not virtual ones.
 */

export interface ExercisePartsPickerPart {
  /** Distinct topics this part covers, in first-appearance order. */
  topics: string[];
  /** Question count in this part. */
  count: number;
}

export interface ExercisePartsPickerProps {
  parts: ExercisePartsPickerPart[];
  /** Indices of parts the learner has already finished. Rendered as
   *  a small "✓ done" badge so the picker reads as a running tally
   *  toward the full workout. */
  completed?: Set<number>;
  onSelect: (partIdx: number) => void;
  className?: string;
}

export function ExercisePartsPicker({
  parts,
  completed,
  onSelect,
  className,
}: ExercisePartsPickerProps) {
  const { strings, locale } = useLocale();
  const totalParts = parts.length;
  const title =
    locale === "tr" ? "Hangi bölümden başlayalım?" : "Pick a part to start";
  const subtitle =
    locale === "tr"
      ? "Egzersiz uzun, küçük parçalara böldük. Hepsi bitince Grammer tamamlanmış sayılır."
      : "The exercise is long, we broke it into smaller parts. Grammar counts as done when every part is finished.";
  const questionsLabel = locale === "tr" ? "soru" : "questions";
  const partLabel = locale === "tr" ? "Bölüm" : "Part";
  const doneBadge = locale === "tr" ? "✓ tamam" : "✓ done";

  return (
    <div
      className={clsx(
        tryCardSurface,
        "rounded-3xl p-5",
        "flex flex-col gap-5",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-bold text-[28px] text-fg leading-tight">
          {title}
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {subtitle}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {parts.map((part, idx) => {
          const topicPreview = formatTopicPreview(part.topics, 3);
          const eyebrow = `${partLabel} ${idx + 1} / ${totalParts} · ${part.count} ${questionsLabel}`;
          const isDone = completed?.has(idx) ?? false;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              aria-label={`${eyebrow}. ${topicPreview}${isDone ? `. ${doneBadge}` : ""}`}
              className={clsx(
                "text-left rounded-2xl p-4 flex items-center gap-3",
                "transition-[background-color,transform] duration-150",
                "active:scale-[0.98] hover:bg-[color-mix(in_srgb,var(--chip-grammar-color)_6%,var(--surface-sunk))]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)]",
              )}
              style={{
                background: "var(--surface-sunk)",
                border: isDone
                  ? "1px solid color-mix(in srgb, var(--chip-grammar-color) 55%, transparent)"
                  : "1px solid color-mix(in srgb, var(--chip-grammar-color) 20%, transparent)",
              }}
            >
              {/* Leading icon: numbered circle in chip-grammar colour,
                  or a checkmark circle when the part is already done.
                  Carries the "which part is this?" signal visually so
                  the card doesn't lead with pure text. */}
              <div
                className={clsx(
                  "flex items-center justify-center shrink-0",
                  "w-10 h-10 rounded-full",
                  "font-sans font-bold text-[16px]",
                )}
                style={{
                  background: isDone
                    ? "var(--chip-grammar-color)"
                    : "color-mix(in srgb, var(--chip-grammar-color) 14%, transparent)",
                  color: isDone ? "white" : "var(--chip-grammar-color)",
                }}
                aria-hidden
              >
                {isDone ? <CheckIcon /> : idx + 1}
              </div>

              {/* Middle block: eyebrow + topic preview. flex-1 so the
                  trailing chevron pins to the right edge regardless
                  of content width. */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <div
                    className="font-sans font-semibold text-[12px] uppercase tracking-wide"
                    style={{
                      color: "var(--chip-grammar-color)",
                      letterSpacing: "0.4px",
                    }}
                  >
                    {eyebrow}
                  </div>
                  {isDone ? (
                    <div
                      className="font-sans font-semibold text-[11px] uppercase tracking-wide"
                      style={{
                        color: "var(--chip-grammar-color)",
                        letterSpacing: "0.4px",
                      }}
                    >
                      {doneBadge}
                    </div>
                  ) : null}
                </div>
                <div className="font-sans font-semibold text-[15px] text-fg leading-snug">
                  {topicPreview}
                </div>
              </div>

              {/* Trailing chevron: pure affordance signal, says
                  "this whole row is a button, tap to enter". */}
              <div
                className="shrink-0 flex items-center justify-center w-6 h-6 text-fg-faint"
                aria-hidden
              >
                <ChevronRightIcon />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Compact "Topic · Topic · Topic" preview, capped with …. Stable
 *  across parts, distinct topics in first-appearance order. */
function formatTopicPreview(topics: string[], max: number): string {
  if (topics.length === 0) return "";
  if (topics.length <= max) return topics.join(" · ");
  return topics.slice(0, max).join(" · ") + " · …";
}

/** Right-pointing chevron, used as the row's "tap to enter" affordance.
 *  Inline SVG so no icon dependency and the stroke colour inherits
 *  from currentColor. */
function ChevronRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2.5L9.5 7L5 11.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Check mark, used inside the numbered circle on completed part
 *  rows. Same SVG family as the chevron. */
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8L6.5 11L12.5 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
