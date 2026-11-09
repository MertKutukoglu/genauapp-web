import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * SampleSentence — the sunk-gray "Sample Sentence" block.
 *
 * Spec §6.2:
 *   - Container: var(--surface-sunk) bg, 16 padding, 16 radius
 *   - Eyebrow: "Sample Sentence", Open Sans regular 14, fg-faint
 *   - Body: Open Sans semi-bold 16, var(--fg)
 *
 * No article coloring on the sample — the sentence reads as prose
 * context, not a drill. Shared across Words / Sentence / Reading.
 */

export interface SampleSentenceProps {
  sentence: string;
  /** Optional override for the eyebrow label (default "Sample Sentence"). */
  label?: string;
  className?: string;
}

export function SampleSentence({
  sentence,
  label = "Sample Sentence",
  className,
}: SampleSentenceProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1.5 bg-surface-sunk rounded-2xl p-4",
        className,
      )}
    >
      <div className="font-sans font-normal text-sm text-fg-faint leading-tight">
        {label}
      </div>
      <div className="font-sans font-semibold text-base text-fg leading-relaxed">
        {sentence}
      </div>
    </div>
  );
}
