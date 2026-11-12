import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ConnectorCard } from "@/content/grammar-a1";

/**
 * GrammarConnectorCardsCard — the B1 `connectorCards` layout.
 * Shows 3–4 side-by-side cards in a responsive grid; each card
 * holds a big word (connector or verb-with-prep infinitive), an
 * English gloss, and one example sentence with the connector /
 * preposition substring highlighted purple.
 *
 * Reused for two B1 anchors:
 *   - Verben mit festen Präpositionen (sich bewerben um, teilnehmen
 *     an, warten auf, sich freuen auf)
 *   - Konnektoren extended (obwohl, damit, nachdem, seit)
 *
 * Mobile (≤ 640px): stacks vertically, one card per row.
 */

export interface GrammarConnectorCardsCardProps {
  headline: string;
  english: string;
  note?: string;
  connectors: ConnectorCard[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

/**
 * Inline substring highlight for the example sentence. Wraps the
 * first occurrence of `highlight` in a purple strong span. The
 * default highlight is the first token of `word`, which handles
 * both "obwohl" (single-word connector) and "sich bewerben um"
 * (multi-token verb-with-prep, where we highlight just the prep)
 * gracefully when the caller sets it explicitly.
 */
function renderWithHighlight(
  text: string,
  highlight: string,
): React.ReactNode {
  if (!highlight) return text;
  const idx = text.indexOf(highlight);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong
        className="font-bold"
        style={{ color: "var(--chip-grammar-color)" }}
      >
        {highlight}
      </strong>
      {text.slice(idx + highlight.length)}
    </>
  );
}

export function GrammarConnectorCardsCard({
  headline,
  english,
  note,
  connectors,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarConnectorCardsCardProps) {
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

      <div
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
          connectors.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {connectors.map((c) => {
          // Default highlight: the connector's own word (good for
          // single-token connectors like "obwohl"). Verbs-with-prep
          // override with an explicit highlight (the preposition).
          const highlight = c.highlight ?? c.word;
          return (
            <div
              key={c.word}
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
                {c.word}
              </div>
              <div
                className="font-sans font-normal text-[12px] text-fg-muted text-center"
                style={{ letterSpacing: "0.3px" }}
              >
                {c.english}
              </div>
              <div className="font-sans font-semibold text-[14px] text-fg text-center leading-snug mt-1">
                {renderWithHighlight(c.example, highlight)}
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
