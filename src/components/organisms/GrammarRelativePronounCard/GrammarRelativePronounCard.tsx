import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type {
  RelativePronounRow,
  RelativePronounExample,
} from "@/content/grammar-a1";

/**
 * GrammarRelativePronounCard — the B1 `relativePronounGrid` layout.
 *
 * Shape:
 *   toolbar
 *   → centered headline (bold 32) + english gloss (muted base)
 *   → 4×3 grid: gender rows × case cols (Nom / Akk / Dat).
 *     Anomalous forms the learner trips on get a subtle purple
 *     tint — `der` (fem Dat), `dem` (masc & neut Dat) and `denen`
 *     (plural Dat).
 *   → 2 inline-coloured example sentences under the grid, each
 *     highlighting the relative pronoun of a different case so
 *     the pattern lands in action.
 *   → purple RuleCard for the gender-matches-noun / case-matches-
 *     role rule.
 *   → sample sentence + Repeat/I know, bottom-pinned.
 */

/** Which cells the renderer tints purple as "watch this form"
 *  cues. Masculine Akk (`den`) is already covered by the A2
 *  Akkusativ anchor; here we lean into the Dativ surprises. */
function shouldHighlight(
  row: RelativePronounRow,
  col: "nom" | "akk" | "dat",
): boolean {
  if (col !== "dat") return false;
  // Every Dativ pronoun is pedagogically new at B1, so tint them
  // all — the plural `denen` is the one that most reliably trips
  // learners, but masc/neut `dem` and fem `der` also need the
  // signal.
  return (
    row.gender === "masc" ||
    row.gender === "fem" ||
    row.gender === "neut" ||
    row.gender === "plural"
  );
}

export interface GrammarRelativePronounCardProps {
  headline: string;
  english: string;
  note?: string;
  columns: string[];
  rows: RelativePronounRow[];
  examples?: RelativePronounExample[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

/**
 * Minimal single-token highlighter — wraps the first occurrence of
 * `highlight` in the text with a purple strong span. Keeps the
 * example sentences inline (no ReactNode arrays in content).
 */
function renderHighlighted(text: string, highlight: string): React.ReactNode {
  const idx = text.indexOf(highlight);
  if (idx < 0) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);
  return (
    <>
      {before}
      <strong
        className="font-bold"
        style={{ color: "var(--chip-grammar-color)" }}
      >
        {highlight}
      </strong>
      {after}
    </>
  );
}

export function GrammarRelativePronounCard({
  headline,
  english,
  note,
  columns,
  rows,
  examples,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarRelativePronounCardProps) {
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

      {/* 4-col grid: gender label + 3 case cols */}
      <div className="flex justify-center">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "auto auto auto auto",
            columnGap: "16px",
            rowGap: "10px",
          }}
        >
          {/* Top row: empty cell + column headers */}
          <div aria-hidden />
          {columns.slice(0, 3).map((c) => (
            <div
              key={c}
              className="font-sans font-normal text-[12px] text-fg-faint leading-tight"
              style={{ letterSpacing: "0.3px" }}
            >
              {c}
            </div>
          ))}
          {rows.map((row) => (
            <React.Fragment key={row.gender}>
              <div className="font-sans font-normal text-[13px] text-fg-muted leading-tight pr-2">
                {row.label}
              </div>
              {(["nom", "akk", "dat"] as const).map((col) => {
                const tinted = shouldHighlight(row, col);
                return (
                  <div
                    key={col}
                    className="font-sans font-semibold text-[17px] leading-tight"
                    style={{
                      color: tinted
                        ? "var(--chip-grammar-color)"
                        : "var(--fg)",
                    }}
                  >
                    {row.forms[col]}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Inline example sentences — 2 of them, each with its
          relative pronoun bold-purple and a small muted role
          caption underneath. */}
      {examples && examples.length > 0 ? (
        <div className="flex flex-col gap-2">
          {examples.map((ex, i) => (
            <div key={i} className="flex flex-col gap-0.5 text-center">
              <div className="font-sans font-semibold text-[16px] text-fg leading-snug">
                {renderHighlighted(ex.de, ex.highlight)}
              </div>
              <div className="font-sans font-normal text-[12px] text-fg-faint leading-snug">
                {ex.role} · {ex.en}
              </div>
            </div>
          ))}
        </div>
      ) : null}

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
