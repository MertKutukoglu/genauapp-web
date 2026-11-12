import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { ParadigmGrid } from "@/components/molecules/ParadigmGrid/ParadigmGrid";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { PronounForm, PronounCaseForm } from "@/content/grammar-a1";

/**
 * GrammarPronounChartCard — the Grammar chip's `pronounChart` Learn
 * layout. Dispatches on the shape of `forms`:
 *
 * - A1 (PronounForm[]): 2-column pronoun → English gloss via
 *   ParadigmGrid. Drives the A1 Pronouns anchor.
 * - A2 (PronounCaseForm[] + `columns`): 3-column case table
 *   Nominativ · Akkusativ · Dativ. Nom column stays muted (the
 *   "given" from A1); Akk + Dat are full-weight fg (the pedagogical
 *   focus). An optional `note` renders a purple RuleCard below.
 *
 * Shape is detected by presence of `columns`. The A1 call site
 * passes PronounForm[] and no columns and keeps working.
 */

type ChartForms = PronounForm[] | PronounCaseForm[];

export interface GrammarPronounChartCardProps {
  headline: string;
  english: string;
  forms: ChartForms;
  /** A2-only: when set, triggers the 3-col case table. */
  columns?: string[];
  /** A2-only: optional note rendered in a purple RuleCard. */
  note?: string;
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

function isCaseForms(
  forms: ChartForms,
  hasColumns: boolean,
): forms is PronounCaseForm[] {
  if (!hasColumns || forms.length === 0) return false;
  return "akk" in forms[0] && "dat" in forms[0];
}

export function GrammarPronounChartCard({
  headline,
  english,
  forms,
  columns,
  note,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarPronounChartCardProps) {
  const { strings } = useLocale();
  const hasColumns = !!columns && columns.length >= 3;

  return (
    <div
      className={clsx(
        tryCardSurface,
        "rounded-3xl p-5",
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

      {isCaseForms(forms, hasColumns) ? (
        <div className="flex justify-center">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "auto auto auto",
              columnGap: "24px",
              rowGap: "10px",
            }}
          >
            {/* Column headers */}
            {columns!.slice(0, 3).map((c) => (
              <div
                key={c}
                className="font-sans font-normal text-[12px] text-fg-faint leading-tight"
                style={{ letterSpacing: "0.3px" }}
              >
                {c}
              </div>
            ))}
            {forms.map((row, i) => (
              <React.Fragment key={`${row.german}-${i}`}>
                <div className="font-sans font-semibold text-[15px] text-fg-muted leading-tight">
                  {row.german}
                </div>
                <div className="font-sans font-semibold text-[15px] text-fg leading-tight">
                  {row.akk}
                </div>
                <div className="font-sans font-semibold text-[15px] text-fg leading-tight">
                  {row.dat}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <ParadigmGrid
          rows={(forms as PronounForm[]).map((row) => ({
            pronoun: row.german,
            form: row.english,
          }))}
        />
      )}

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
