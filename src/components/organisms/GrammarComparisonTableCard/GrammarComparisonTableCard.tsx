import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ComparisonForm } from "@/content/grammar-a1";

/**
 * GrammarComparisonTableCard — the B1 `comparisonTable` layout.
 *
 * Direct sibling of GrammarParticipleParadigmCard: a 3-column
 * lookup table where the middle column carries the pedagogical
 * signal. For adjective degrees that reads naturally:
 *
 *   Positiv        Komparativ        Superlativ
 *   ─────────────────────────────────────────────
 *   schnell        schneller         am schnellsten
 *   klein          kleiner           am kleinsten
 *   jung           jünger ★          am jüngsten ★   (umlaut)
 *   gut            besser ★          am besten ★     (irregular)
 *
 * The Positiv column is `fg-muted` — the thing the learner
 * already knows. The Komparativ column is **chip-grammar purple
 * + bold** — the first transformation and the primary lesson.
 * The Superlativ column is **fg + semi-bold 17** — the destination
 * form. Irregular rows ship a small ★ next to the transformed
 * forms so the eye catches them while scanning.
 *
 * Column headers sit above the grid (small, muted, letter-spaced)
 * so the three columns read as named buckets, not three naked
 * cells. Below the grid, a purple RuleCard carries the formation
 * rule: "adjective + -er / am + -sten; one-syllable a/o/u often
 * take umlaut; gut / viel / gern are the three irregulars to
 * memorise."
 */

export interface GrammarComparisonTableCardProps {
  headline: string;
  english: string;
  note?: string;
  comparisons: ComparisonForm[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarComparisonTableCard({
  headline,
  english,
  note,
  comparisons,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarComparisonTableCardProps) {
  const { strings } = useLocale();

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
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {headline}
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      {/* 3-col grid, center-pinned so the longest row defines the
          column widths (identical mechanic to ParticipleParadigm).
          Column headers sit on top, the rows flow below. */}
      <div className="flex justify-center">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "auto auto 1fr",
            columnGap: "20px",
            rowGap: "10px",
          }}
        >
          {/* Column headers */}
          <div
            className="font-sans font-normal text-[12px] text-fg-faint text-right leading-tight"
            style={{ letterSpacing: "0.3px" }}
          >
            Positiv
          </div>
          <div
            className="font-sans font-normal text-[12px] leading-tight"
            style={{
              color: "var(--chip-grammar-color)",
              letterSpacing: "0.3px",
            }}
          >
            Komparativ
          </div>
          <div
            className="font-sans font-normal text-[12px] text-fg-faint text-left leading-tight"
            style={{ letterSpacing: "0.3px" }}
          >
            Superlativ
          </div>
          {comparisons.map((row) => (
            <React.Fragment key={row.positive}>
              <div className="font-sans font-normal text-[15px] text-fg-muted text-right leading-tight">
                {row.positive}
              </div>
              <div
                className="font-sans font-bold text-[16px] leading-tight"
                style={{ color: "var(--chip-grammar-color)" }}
              >
                {row.komparativ}
                {row.irregular ? (
                  <span
                    className="ml-1 text-[11px] align-middle"
                    aria-hidden
                  >
                    ★
                  </span>
                ) : null}
              </div>
              <div className="font-sans font-semibold text-[17px] text-fg text-left leading-tight">
                {row.superlativ}
                {row.irregular ? (
                  <span
                    className="ml-1 text-[11px] align-middle text-fg-muted"
                    aria-hidden
                  >
                    ★
                  </span>
                ) : null}
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
