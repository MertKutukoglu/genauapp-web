"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { AssemblyArea } from "@/components/molecules/AssemblyArea/AssemblyArea";
import { AnswerFeedback } from "@/components/molecules/AnswerFeedback/AnswerFeedback";
import { useLocale } from "@/lib/i18n/LocaleContext";
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
 * No sample. No rule. No user-driven Repeat / I know buttons — the
 * attempt itself is the signal:
 *   • Correct attempt → brief green "Correct" flash → auto-advance
 *     via onIKnow after `advanceDelay` so the deck shrinks.
 *   • Incorrect attempt (every slot filled but doesn't match) → red
 *     AnswerFeedback with the correct word revealed + speaker + a
 *     Continue button that fires onRepeat, so the card goes back
 *     into the deck for a later retry. Tiles lock while feedback
 *     is up so backspace can't partially unwind the attempt.
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
  /**
   * Fired when the user commits an incorrect attempt and hits
   * Continue on the AnswerFeedback card. Maps to the Normal card's
   * Repeat action: the word stays in the deck for a later retry.
   */
  onRepeat?: () => void;
  /** Delay before auto-advance, in ms. Defaults to 900ms. */
  advanceDelay?: number;
  className?: string;
}

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
  onRepeat,
  advanceDelay = 900,
  className,
}: AssemblyLearnCardProps) {
  const { strings } = useLocale();
  const assemblyCopy = strings.try.assemblyLearnCard;
  const eyebrowPrompt =
    mode === "scrambled"
      ? assemblyCopy.promptScrambled
      : assemblyCopy.promptChunkCompose;

  // Pieces + display target. When the word carries an article, the
  // article becomes part of the puzzle — scrambled treats each of
  // its letters as a tile; chunkCompose treats the article as its
  // own leading chunk. The space between article and word is
  // non-pickable — it comes from `displayTarget` and reads as a gap
  // in the slot row.
  const { pieces, displayTarget } = React.useMemo(() => {
    const bareWord = word.replace(/\s/g, "");

    if (mode === "chunkCompose" && chunks && chunks.length > 0) {
      const ps = article ? [article, ...chunks] : chunks;
      const dt = article ? `${article} ${bareWord}` : bareWord;
      return { pieces: ps, displayTarget: dt };
    }

    // scrambled
    const ps = article
      ? [...article.split(""), ...bareWord.split("")]
      : bareWord.split("");
    const dt = article ? `${article} ${bareWord}` : bareWord;
    return { pieces: ps, displayTarget: dt };
  }, [mode, chunks, word, article]);

  // One state flips between "none", "correct" (brief flash), and
  // "incorrect" (persistent reveal). The transition from the
  // AssemblyArea's isFull signal decides which branch to take.
  const [feedback, setFeedback] = React.useState<"correct" | "incorrect" | null>(
    null,
  );
  const speakText = article ? `${article} ${word}` : word;
  const displayAnswer = article ? `${article} ${word}` : word;

  const onAreaChange = React.useCallback(
    (s: { assembled: string; isCorrect: boolean; isFull: boolean }) => {
      if (feedback !== null) return; // already committed, ignore late noise
      if (!s.isFull) return; // still mid-assembly
      setFeedback(s.isCorrect ? "correct" : "incorrect");
    },
    [feedback],
  );

  // Correct path: auto-advance after a short beat so the user sees
  // the finished word in situ.
  React.useEffect(() => {
    if (feedback !== "correct") return;
    const t = window.setTimeout(() => {
      onIKnow?.();
    }, advanceDelay);
    return () => window.clearTimeout(t);
  }, [feedback, onIKnow, advanceDelay]);

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
          {eyebrowPrompt}
        </div>
      </div>

      {/* English hero. No inline speaker here — the CardToolbar's
          speaker at the top-left of the card already covers audio for
          this view, and doubling up read as clutter per Mert's
          feedback. */}
      <div className="flex items-center justify-center text-center">
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {english}
        </div>
      </div>

      <AssemblyArea
        pieces={pieces}
        displayTarget={displayTarget}
        seed={seed}
        keyboardEnabled={mode === "scrambled"}
        locked={feedback !== null}
        onChange={onAreaChange}
      />

      {feedback ? (
        <AnswerFeedback
          state={feedback}
          correctAnswer={feedback === "incorrect" ? displayAnswer : undefined}
          speakText={speakText}
          onContinue={feedback === "incorrect" ? onRepeat : undefined}
        />
      ) : null}
    </div>
  );
}
