import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
/**
 * GrammarActivePassiveCard — the B1 `activePassiveComparison`
 * layout, generalised at B2 to also drive the `styleComparison`
 * layout (Verbalstil ↔ Nominalstil). Three pairs rendered side by
 * side so the learner sees the transformation line by line:
 *
 *   Aktiv                            Passiv
 *   Der Lehrer korrigiert ...   →    Die Tests werden korrigiert.
 *   Das Team hat das Haus ...   →    Das Haus wurde gebaut.
 *
 * Pedagogical signal: the RIGHT column's header tints purple
 * (chip-grammar-color) because that's where the pattern lives —
 * werden + Partizip II in Aktiv↔Passiv, the Genitiv noun phrase
 * in Verbal↔Nominal. The left column stays fg-muted so the eye
 * pulls to the right.
 *
 * Column labels come from `labels` when given (`["Verbalstil",
 * "Nominalstil"]`), else fall back to `["Aktiv", "Passiv"]`. The
 * `pairs` prop is a flat `{ left, right }` shape — the B1 content
 * (with `aktiv`/`passiv` keys) gets normalised in the GrammarChip
 * router, so this card doesn't need to know about the two shapes.
 */

export interface GrammarComparisonPair {
  left: string;
  right: string;
}

export interface GrammarActivePassiveCardProps {
  headline: string;
  english: string;
  note?: string;
  pairs: GrammarComparisonPair[];
  labels?: [string, string];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarActivePassiveCard({
  headline,
  english,
  note,
  pairs,
  labels,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarActivePassiveCardProps) {
  const { strings } = useLocale();
  const [leftLabel, rightLabel] = labels ?? ["Aktiv", "Passiv"];

  return (
    <div
      className={clsx(
        tryCardSurface,
        "rounded-3xl p-5",
        "flex flex-col gap-5",
        className,
      )}
    >
      <CardToolbar chipLabel={headline} current={current} total={total} />

      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {headline}
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      <div
        className="rounded-2xl p-4 flex flex-col gap-3"
        style={{ background: "var(--surface-sunk)" }}
      >
        {/* Column headers */}
        <div
          className="grid items-baseline gap-3"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          <div className="font-sans font-normal text-[12px] text-fg-faint uppercase tracking-wide">
            {leftLabel}
          </div>
          <div className="w-4" aria-hidden />
          <div
            className="font-sans font-semibold text-[12px] uppercase tracking-wide"
            style={{ color: "var(--chip-grammar-color)" }}
          >
            {rightLabel}
          </div>
        </div>
        {pairs.map((p, i) => (
          <React.Fragment key={i}>
            {i > 0 ? (
              <div
                className="h-px w-full"
                style={{
                  background:
                    "color-mix(in srgb, var(--fg) 10%, transparent)",
                }}
                aria-hidden
              />
            ) : null}
            <div
              className="grid items-center gap-3"
              style={{ gridTemplateColumns: "1fr auto 1fr" }}
            >
              <div className="font-sans font-semibold text-[15px] text-fg leading-snug">
                {p.left}
              </div>
              <div
                className="font-sans text-fg-faint leading-none select-none"
                aria-hidden
              >
                →
              </div>
              <div className="font-sans font-semibold text-[15px] text-fg leading-snug">
                {p.right}
              </div>
            </div>
          </React.Fragment>
        ))}
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
