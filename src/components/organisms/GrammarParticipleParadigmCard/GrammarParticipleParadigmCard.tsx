import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ParticipleForm } from "@/content/grammar-a1";

/**
 * GrammarParticipleParadigmCard — the A2 `participleParadigm`
 * layout. A 3-column lookup table showing a verb's Perfekt form:
 * infinitive · aux · Partizip II. Drives the Perfekt anchor.
 *
 * Pedagogical signal: the aux column is **purple** (chip-grammar-
 * color) because the aux (haben vs sein) is the variable part the
 * learner picks per verb. The infinitive is muted (the given) and
 * the participle is bold-fg (the thing to memorize).
 *
 * The RuleCard below carries the one-line "sein vs haben" rule
 * (motion/state-change → sein; everything else → haben) in the
 * current locale.
 */

export interface GrammarParticipleParadigmCardProps {
  headline: string;
  english: string;
  note?: string;
  forms: ParticipleForm[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarParticipleParadigmCard({
  headline,
  english,
  note,
  forms,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarParticipleParadigmCardProps) {
  const { strings } = useLocale();

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
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {headline}
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      {/* 3-col grid, center-pinned so the widest row defines the
          column widths without stretching across the full card. */}
      <div className="flex justify-center">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "auto auto 1fr",
            columnGap: "20px",
            rowGap: "10px",
          }}
        >
          {forms.map((row) => (
            <React.Fragment key={row.infinitive}>
              <div className="font-sans font-normal text-[15px] text-fg-muted text-right leading-tight">
                {row.infinitive}
              </div>
              <div
                className="font-sans font-bold text-[16px] leading-tight"
                style={{ color: "var(--chip-grammar-color)" }}
              >
                {row.aux}
              </div>
              <div className="font-sans font-semibold text-[17px] text-fg text-left leading-tight">
                {row.partizip}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {note ? (
        <RuleCard
          tint="var(--chip-grammar-color)"
          body={note}
          label={strings.try.learnCard.ruleLabel}
        />
      ) : null}

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
