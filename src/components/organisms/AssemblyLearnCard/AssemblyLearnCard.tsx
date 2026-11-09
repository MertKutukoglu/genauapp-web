"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { AssemblyArea } from "@/components/molecules/AssemblyArea/AssemblyArea";
import { SampleSentence } from "@/components/molecules/SampleSentence/SampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import type { ArticleColor } from "@/components/molecules/WordSection/WordSection";

/**
 * AssemblyLearnCard — the shared frame for the two assembly-puzzle
 * Learn variants (`scrambled` = letters, `chunkCompose` = syllable
 * chunks). Only difference between the two modes is what the tiles
 * are; the UX, layout, success criterion, and the Repeat/I-know
 * footer all match.
 *
 * Layout (top → bottom, per spec §12 where variants were sketched):
 *   1. CardToolbar (speaker + counter)
 *   2. Topic eyebrow
 *   3. English hint + optional article prefix ("das ___" so the user
 *      knows which article the assembled word belongs to)
 *   4. AssemblyArea (slots + tile pool + clear)
 *   5. Sample (optional)
 *   6. Rule (optional)
 *   7. LearnActions — Repeat always available; I-know disabled until
 *      the assembled sequence matches the target, so the user has to
 *      actually finish the puzzle before advancing
 *
 * This mirrors the iOS variants' core beat: look at the translation,
 * assemble the German from pieces, read the rule + sample once it
 * clicks.
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
  example?: string;
  rule?: string;
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function AssemblyLearnCard({
  mode,
  topic,
  word,
  english,
  article,
  chunks,
  example,
  rule,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: AssemblyLearnCardProps) {
  const pieces = React.useMemo(
    () =>
      mode === "chunkCompose" && chunks && chunks.length > 0
        ? chunks
        : // Scrambled: split on characters. Keep spaces out of the puzzle
          // so a word like "sich freuen" assembles as one tile row. If
          // we ever need spaced targets we can revisit — for the A1 deck
          // every word is a single token.
          word.replace(/\s/g, "").split(""),
    [mode, chunks, word],
  );

  const [isCorrect, setIsCorrect] = React.useState(false);

  // Seed each mount with the word id so the scramble is stable within
  // a session but different between words.
  const seed = `${mode}:${word}`;
  const speakText = article ? `${article} ${word}` : word;

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-5",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-5",
        className,
      )}
    >
      <CardToolbar speakText={speakText} current={current} total={total} />

      {topic ? (
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-fg-faint -mt-1">
          {topic}
        </div>
      ) : null}

      {/* English hint. Article is shown separately so the user has
          grammatical context without the target being given away. */}
      <div className="flex flex-col gap-1 items-center text-center py-1">
        <div className="font-sans text-sm text-fg-muted leading-tight uppercase tracking-wider">
          {mode === "scrambled" ? "Build the word" : "Build the word from chunks"}
        </div>
        <div className="font-sans text-base font-semibold text-fg leading-relaxed">
          {english}
          {article ? (
            <span className="text-fg-muted font-normal"> · {article}</span>
          ) : null}
        </div>
      </div>

      <AssemblyArea
        pieces={pieces}
        article={article}
        seed={seed}
        onChange={(s) => setIsCorrect(s.isCorrect)}
      />

      {example ? <SampleSentence sentence={example} /> : null}
      {rule ? <RuleCard article={article} body={rule} /> : null}

      <LearnActions
        onRepeat={onRepeat}
        onIKnow={onIKnow}
        iKnowDisabled={!isCorrect}
      />
    </div>
  );
}
