import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SpeakerButton } from "@/components/atoms/SpeakerButton/SpeakerButton";
import { CounterPill } from "@/components/atoms/CounterPill/CounterPill";

/**
 * CardToolbar, the top row of every chip card (Learn + Exercise,
 * Words + Grammar + Sentence + Reading).
 *
 * Shape: speaker left, counter pill right. Spec §4 of the Learn-card
 * brief originally included a bookmark button between them; Mert
 * dropped bookmark from the card (no auth flow in the demo, nothing
 * meaningful behind the tap), so the toolbar is just the audio cue +
 * the deck position.
 *
 * Presentational, the parent card drives the speaker's text and the
 * counter's numbers.
 */

export interface CardToolbarProps {
  /** Passed to SpeakerButton as the TTS source. Ignored when
   *  `chipLabel` is set (chip label replaces the speaker on the
   *  left). */
  speakText?: string;
  /** When set, the left slot shows a small chip-identity label
   *  (e.g. "Gramer · Grammar") instead of the speaker button. Used
   *  across all Grammar cards so the learner always sees which chip
   *  they're on, including inside chevron carousels. */
  chipLabel?: string;
  /**
   * Deck-position pair. Omit both (or set either to undefined) to
   * hide the counter pill, Reading's Read mode uses this when
   * there's no "card N of total" concept to show.
   */
  current?: number;
  total?: number;
  className?: string;
}

export function CardToolbar({
  speakText,
  chipLabel,
  current,
  total,
  className,
}: CardToolbarProps) {
  const showCounter =
    typeof current === "number" && typeof total === "number";
  return (
    <div className={clsx("flex items-center justify-between gap-3", className)}>
      {chipLabel ? (
        <div
          className="font-sans font-semibold text-[11px] uppercase tracking-wide text-fg-faint"
          style={{ letterSpacing: "0.4px" }}
        >
          {chipLabel}
        </div>
      ) : (
        <SpeakerButton text={speakText} />
      )}
      {showCounter ? <CounterPill current={current} total={total} /> : null}
    </div>
  );
}
