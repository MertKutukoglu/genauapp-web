import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { ParadigmGrid } from "@/components/molecules/ParadigmGrid/ParadigmGrid";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import type { PronounForm } from "@/content/grammar-a1";

/**
 * GrammarPronounChartCard — the Grammar chip's `pronounChart` Learn
 * layout. Drives the single Pronouns anchor.
 *
 * Shape: toolbar → centered headline (bold 26 — smaller than
 * verbParadigm because "Personal pronouns" is a longer string) +
 * subtitle (regular 15 muted) → 8-row ParadigmGrid with the German
 * pronoun on the left and the English/Turkish gloss on the right →
 * sample sentence with the pronoun highlighted → Repeat / I know
 * bottom-pinned.
 *
 * Speaker on the toolbar reads the sample sentence rather than a
 * single pronoun — reading one pronoun out of context isn't useful,
 * and the sample carries the pedagogical payoff for this card.
 */

export interface GrammarPronounChartCardProps {
  headline: string;
  english: string;
  forms: PronounForm[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarPronounChartCard({
  headline,
  english,
  forms,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarPronounChartCardProps) {
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
      <CardToolbar speakText={sample.de} current={current} total={total} />

      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-bold text-[26px] text-fg leading-tight">
          {headline}
        </div>
        <div className="font-sans font-normal text-[15px] text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      <ParadigmGrid
        rows={forms.map((row) => ({ pronoun: row.german, form: row.english }))}
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
