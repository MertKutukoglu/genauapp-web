import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * GrammarSampleSentence — the Grammar chip's sunk "Sample Sentence"
 * block, with an in-sentence highlight substring.
 *
 * Mirrors the Words brief's SampleSentence shape (sunk container, 16
 * padding, 16 radius, "Sample Sentence" eyebrow, German bold 16 line,
 * optional translation beneath in muted regular 14) but adds a
 * pedagogical trick: inside the German line, the string passed as
 * `highlight` is rendered bold + grammar-purple
 * (`var(--chip-grammar-color)`). This is where the abstract paradigm
 * on the card materializes inside real syntax — the whole point of
 * the "sample with highlight" pattern in the brief.
 *
 * Matching is a plain `indexOf` on the German line. If the highlight
 * substring does not appear in `sentence`, the component falls back
 * to rendering the plain sentence without a highlight rather than
 * throwing — a content typo degrades the lesson gracefully instead
 * of crashing the card.
 *
 * `translation` is optional and, when present, lives one typographic
 * step down (14/regular/fg-muted), matching the pattern we use on
 * the Words Learn card.
 */

export interface GrammarSampleSentenceProps {
  /** The German sample sentence. */
  sentence: string;
  /** Substring of `sentence` to render bold + grammar-purple. */
  highlight?: string;
  /**
   * Optional translation in the UI locale (English on /try, Turkish
   * on /tr/try). Rendered muted under the German line.
   */
  translation?: string;
  /** Eyebrow label (default "Sample Sentence"). */
  label?: string;
  className?: string;
}

export function GrammarSampleSentence({
  sentence,
  highlight,
  translation,
  label = "Sample Sentence",
  className,
}: GrammarSampleSentenceProps) {
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
        {renderSentence(sentence, highlight)}
      </div>
      {translation ? (
        <div className="font-sans font-normal text-sm text-fg-muted leading-snug">
          {translation}
        </div>
      ) : null}
    </div>
  );
}

function renderSentence(
  sentence: string,
  highlight: string | undefined,
): React.ReactNode {
  if (!highlight) return sentence;
  const idx = sentence.indexOf(highlight);
  if (idx < 0) return sentence;
  return (
    <>
      {sentence.slice(0, idx)}
      <strong
        className="font-sans font-bold"
        style={{ color: "var(--chip-grammar-color)" }}
      >
        {highlight}
      </strong>
      {sentence.slice(idx + highlight.length)}
    </>
  );
}
