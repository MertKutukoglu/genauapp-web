import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { SeparableVerb } from "@/content/grammar-a1";

/**
 * GrammarVerbCardsCard — the A2 `verbCards` layout. Shows 3–4
 * separable verbs side by side, each in a tinted purple sub-card
 * with: infinitive (bold purple), English gloss (muted), example
 * sentence with the prefix substring colored purple.
 *
 * Drives the Trennbare Verben anchor.
 *
 * Mobile (≤ 640px): stacks vertically.
 */

export interface GrammarVerbCardsCardProps {
  headline: string;
  english: string;
  note?: string;
  verbs: SeparableVerb[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

/**
 * Extract the separable prefix from an example like "Ich stehe auf."
 * by matching the last word (stripping the trailing period). The
 * content doc keeps the prefix as the final token in every example.
 * If no match, returns null and the example renders without a color
 * highlight.
 */
function extractPrefix(example: string): string | null {
  const m = example.match(/\s(\w+)\.\s*$/);
  return m ? m[1] : null;
}

export function GrammarVerbCardsCard({
  headline,
  english,
  note,
  verbs,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarVerbCardsCardProps) {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {verbs.map((v) => {
          const prefix = extractPrefix(v.example);
          return (
            <div
              key={v.infinitive}
              className="flex flex-col items-center gap-1.5 rounded-2xl p-3"
              style={{
                background: "var(--surface-sunk)",
                border:
                  "1px solid color-mix(in srgb, var(--chip-grammar-color) 20%, transparent)",
              }}
            >
              <div
                className="font-sans font-bold text-[18px] leading-tight text-center"
                style={{ color: "var(--chip-grammar-color)" }}
              >
                {v.infinitive}
              </div>
              <div
                className="font-sans font-normal text-[12px] text-fg-muted text-center"
                style={{ letterSpacing: "0.3px" }}
              >
                {v.english}
              </div>
              <div className="font-sans font-semibold text-[14px] text-fg text-center leading-snug mt-1">
                {prefix ? (
                  <>
                    {v.example.slice(0, -1 - prefix.length)}
                    <span style={{ color: "var(--chip-grammar-color)" }}>
                      {prefix}
                    </span>
                    .
                  </>
                ) : (
                  v.example
                )}
              </div>
            </div>
          );
        })}
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
