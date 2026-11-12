import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { ParadigmGrid } from "@/components/molecules/ParadigmGrid/ParadigmGrid";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ConjugationForm } from "@/content/grammar-a1";

/**
 * GrammarVerbConjugationCard — the Grammar chip's `verbConjugation`
 * Learn layout. Drives the single Regular verbs anchor (gehen).
 *
 * Shape: toolbar → centered verb (bold 32) + English gloss → 6-row
 * ParadigmGrid where the right column composes `stem · ending` with
 * the stem in muted regular 17 and the ending in bold 17 grammar
 * purple → optional note paragraph in the shared RuleCard style but
 * tinted purple → sample sentence with the full verb form highlighted
 * → Repeat / I know bottom-pinned.
 *
 * The pedagogical point of the "stem fixed, ending varies" typography
 * is encoded in weight + color. If the stem gets tinted too, the
 * pattern disappears into decoration. Keep the stem muted.
 */

export interface GrammarVerbConjugationCardProps {
  verb: string;
  english: string;
  note?: string;
  forms: ConjugationForm[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarVerbConjugationCard({
  verb,
  english,
  note,
  forms,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarVerbConjugationCardProps) {
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
      <CardToolbar speakText={verb} current={current} total={total} />

      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {verb}
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      <ParadigmGrid
        rows={forms.map((row) => ({
          pronoun: row.pronoun,
          form: (
            <span className="inline-flex items-baseline gap-1.5">
              <span className="font-sans font-normal text-[17px] text-fg-muted">
                {row.stem}
              </span>
              <span
                className="font-sans text-fg-faint text-[15px]"
                aria-hidden
              >
                ·
              </span>
              <span
                className="font-sans font-bold text-[17px]"
                style={{ color: "var(--chip-grammar-color)" }}
              >
                {row.ending}
              </span>
            </span>
          ),
        }))}
      />

      {note ? (
        <RuleCard
          body={note}
          tint="var(--chip-grammar-color)"
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

