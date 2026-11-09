"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { SpeakerButton } from "@/components/atoms/SpeakerButton/SpeakerButton";
import { AssemblyArea } from "@/components/molecules/AssemblyArea/AssemblyArea";
import type { ArticleColor } from "@/components/molecules/WordSection/WordSection";

/**
 * AssemblyLearnCard — the shared frame for the two assembly-puzzle
 * Learn variants (`scrambled` = letters, `chunkCompose` = syllable
 * chunks). Only difference between modes is what the tiles are;
 * everything else — toolbar, English hero, slots, tile pool, auto-
 * advance on completion — matches.
 *
 * Shape, per the iOS reference Mert shared:
 *   1. CardToolbar (speaker + counter). No bookmark, no grade pill.
 *   2. Topic eyebrow + mode-specific prompt line
 *   3. Big bold English hero with inline speaker (hears the German)
 *   4. AssemblyArea — thin-dash slots + tile pool + backspace
 *
 * No sample. No rule. No Repeat / I know buttons. This variant exists
 * to test recall mechanically — the completion is the signal. When
 * the user assembles the target, the card auto-advances via onIKnow
 * after a short beat so they see the finished word first.
 */

export type AssemblyMode = "scrambled" | "chunkCompose";

export interface AssemblyLearnCardProps {
  mode: AssemblyMode;
  topic?: string;
  /** Target German (no article). */
  word: string;
  english: string;
  article?: ArticleColor;
  /** Only used in chunkCompose mode. */
  chunks?: string[];
  current: number;
  total: number;
  /**
   * Fired after a short pause once the puzzle is solved. The parent
   * advances the deck exactly as it would for the normal card's
   * I-know button, so the mechanic plugs into the existing counter
   * + deck flow without the parent caring which variant ran.
   */
  onIKnow?: () => void;
  /** Delay before auto-advance, in ms. Defaults to 900ms. */
  advanceDelay?: number;
  className?: string;
}

const EYEBROW_PROMPT: Record<AssemblyMode, string> = {
  scrambled: "Type the correct translation",
  chunkCompose: "Compose the correct word",
};

export function AssemblyLearnCard({
  mode,
  topic,
  word,
  english,
  article,
  chunks,
  current,
  total,
  onIKnow,
  advanceDelay = 900,
  className,
}: AssemblyLearnCardProps) {
  const pieces = React.useMemo(
    () =>
      mode === "chunkCompose" && chunks && chunks.length > 0
        ? chunks
        : word.replace(/\s/g, "").split(""),
    [mode, chunks, word],
  );

  const [isCorrect, setIsCorrect] = React.useState(false);
  const speakText = article ? `${article} ${word}` : word;

  // Auto-advance: once the user assembles correctly, give them a beat
  // to see the complete word, then fire onIKnow so the parent advances.
  React.useEffect(() => {
    if (!isCorrect) return;
    const t = window.setTimeout(() => {
      onIKnow?.();
    }, advanceDelay);
    return () => window.clearTimeout(t);
  }, [isCorrect, onIKnow, advanceDelay]);

  // Seed each mount with the word id so the scramble is stable within
  // a session but different between words.
  const seed = `${mode}:${word}`;

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

      <div className="flex flex-col gap-1 items-center text-center -mt-1">
        {topic ? (
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-fg-faint">
            {topic}
          </div>
        ) : null}
        <div className="font-sans text-[15px] text-fg-muted leading-tight">
          {EYEBROW_PROMPT[mode]}
        </div>
      </div>

      {/* English hero. Inline speaker speaks the German so the user
          can hear the answer while assembling. */}
      <div className="flex items-center justify-center gap-2.5 text-center">
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {english}
        </div>
        <SpeakerButton text={speakText} />
      </div>

      <AssemblyArea
        pieces={pieces}
        seed={seed}
        onChange={(s) => setIsCorrect(s.isCorrect)}
      />
    </div>
  );
}
