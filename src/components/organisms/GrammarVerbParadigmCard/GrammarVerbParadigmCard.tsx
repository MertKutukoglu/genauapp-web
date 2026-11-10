import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { ParadigmGrid } from "@/components/molecules/ParadigmGrid/ParadigmGrid";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import type { ParadigmForm } from "@/content/grammar-a1";

/**
 * GrammarVerbParadigmCard — the Grammar chip's `verbParadigm` Learn
 * layout. Drives the Verb sein and Verb haben anchors.
 *
 * Shape: toolbar → centered verb (bold 32) + English gloss (regular
 * 16 muted) → 6-row 2-col ParadigmGrid → sample sentence with the
 * row materialized inside the sentence (purple bold) → Repeat / I
 * know, bottom-pinned so successive cards don't jump.
 *
 * The speaker on the toolbar reads the verb infinitive. Sample-line
 * TTS is covered by the GrammarSampleSentence block itself (there's
 * no dedicated speaker there in v1 — Grammar Learn is a paradigm, not
 * a vocabulary drill).
 */

export interface GrammarVerbParadigmCardProps {
  verb: string;
  english: string;
  forms: ParadigmForm[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarVerbParadigmCard({
  verb,
  english,
  forms,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarVerbParadigmCardProps) {
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
      <CardToolbar speakText={verb} current={current} total={total} />

      {/* Headline block */}
      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {verb}
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      <ParadigmGrid
        rows={forms.map((row) => ({ pronoun: row.pronoun, form: row.form }))}
      />

      <GrammarSampleSentence
        sentence={sample.de}
        highlight={sample.highlight}
        translation={sample.en}
      />

      <LearnActions
        onRepeat={onRepeat}
        onIKnow={onIKnow}
        className="mt-auto"
      />
    </div>
  );
}
