import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SpeakerButton } from "@/components/atoms/SpeakerButton/SpeakerButton";
import { CounterPill } from "@/components/atoms/CounterPill/CounterPill";

/**
 * CardToolbar — the top row of every chip card (Learn + Exercise,
 * Words + Grammar + Sentence + Reading).
 *
 * Shape: speaker left, counter pill right. Spec §4 of the Learn-card
 * brief originally included a bookmark button between them; Mert
 * dropped bookmark from the card (no auth flow in the demo, nothing
 * meaningful behind the tap), so the toolbar is just the audio cue +
 * the deck position.
 *
 * Presentational — the parent card drives the speaker's text and the
 * counter's numbers.
 */

export interface CardToolbarProps {
  /** Passed to SpeakerButton as the TTS source. */
  speakText?: string;
  current: number;
  total: number;
  className?: string;
}

export function CardToolbar({
  speakText,
  current,
  total,
  className,
}: CardToolbarProps) {
  return (
    <div className={clsx("flex items-center justify-between gap-3", className)}>
      <SpeakerButton text={speakText} />
      <CounterPill current={current} total={total} />
    </div>
  );
}
