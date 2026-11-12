import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { ROLE_COLORS } from "@/lib/sentence/roleColors";
import type { ConnectorCard } from "@/content/grammar-a1";

/**
 * GrammarConnectorCarouselCard — the B1 `connectorCarousel`
 * layout. Direct sibling of the Modalverben / Konjunktiv II /
 * Trennbare Verben carousels: chevron through the family, one
 * connector at a time, with ← → keyboard support and a progress
 * dot strip under the paradigm.
 *
 * What's different from the other carousels: this card borrows
 * the Sentence chip's formula-strip language (role-coloured
 * tokens separated by a thin divider) to teach the Nebensatz
 * word order on *every* card. The strip shape never changes
 * across connectors — that IS the lesson ("all of these push
 * the finite verb to the end"), and seeing it repeat with each
 * chevron tap makes the pattern land without a paragraph
 * explaining it.
 *
 *   Hauptsatz  ,  [connector]  Subjekt  ...  Verb am Ende
 *      ↑              ↑           ↑              ↑
 *   neutral         verb       subject         verb
 *                                            (cherry on both)
 *
 * The example underneath highlights the connector AND the
 * subclause-final verb, so the formula strip's "ends with the
 * verb" promise gets confirmed in the real sentence.
 *
 * The per-connector rule in the purple RuleCard carries the
 * meaning (although / purpose / after / since / …) — short, one
 * line, so the user leaves each card with: "I know what this
 * word means, I've seen the structure, I've seen an example."
 */

export interface GrammarConnectorCarouselCardProps {
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
 * Inline substring highlighter. Wraps the first occurrence of
 * each `target` in the text with a bold purple strong span. The
 * targets are applied left-to-right in the given order, so
 * overlapping matches resolve in a stable way (connector first,
 * verb-final second).
 */
function renderWithHighlights(
  text: string,
  targets: string[],
): React.ReactNode {
  type Hit = { start: number; end: number };
  const hits: Hit[] = [];
  let cursor = 0;
  for (const t of targets) {
    if (!t) continue;
    const idx = text.indexOf(t, cursor);
    if (idx < 0) continue;
    hits.push({ start: idx, end: idx + t.length });
    cursor = idx + t.length;
  }
  if (hits.length === 0) return text;
  hits.sort((a, b) => a.start - b.start);

  const out: React.ReactNode[] = [];
  let pos = 0;
  hits.forEach((h, i) => {
    if (h.start > pos) out.push(text.slice(pos, h.start));
    out.push(
      <strong
        key={i}
        className="font-bold"
        style={{ color: "var(--chip-grammar-color)" }}
      >
        {text.slice(h.start, h.end)}
      </strong>,
    );
    pos = h.end;
  });
  if (pos < text.length) out.push(text.slice(pos));
  return <>{out}</>;
}

/**
 * Compact role-colored formula strip. Borrows the Sentence chip's
 * palette (ROLE_COLORS) and renders tokens inline separated by a
 * muted `·` so the strip reads as one sentence, not a stack.
 */
function FormulaStrip({
  parts,
}: {
  parts: Array<{ text: string; role: keyof typeof ROLE_COLORS }>;
}) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center"
      aria-hidden
    >
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span
            className="font-sans font-semibold text-[13px]"
            style={{ color: ROLE_COLORS[p.role] }}
          >
            {p.text}
          </span>
          {i < parts.length - 1 ? (
            <span
              className="font-sans text-fg-faint text-[13px] leading-none"
              aria-hidden
            >
              ·
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function GrammarConnectorCarouselCard({
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
}: GrammarConnectorCarouselCardProps) {
  const { strings, locale } = useLocale();
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    setIdx(0);
  }, [connectors.length, connectors[0]?.word]);

  const active = connectors[idx];

  const prev = React.useCallback(() => {
    setIdx((i) => (i - 1 + connectors.length) % connectors.length);
  }, [connectors.length]);
  const next = React.useCallback(() => {
    setIdx((i) => (i + 1) % connectors.length);
  }, [connectors.length]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          (el as HTMLElement).isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const prevLabel = locale === "tr" ? "Önceki" : "Previous";
  const nextLabel = locale === "tr" ? "Sonraki" : "Next";

  if (!active) return null;

  // Formula strip tokens — identical across every connector step.
  // The active connector drops into the Konnektor slot verbatim.
  const formulaParts: Array<{
    text: string;
    role: keyof typeof ROLE_COLORS;
  }> = [
    { text: "Hauptsatz", role: "neutral" },
    { text: active.word, role: "verb" },
    { text: "Subjekt", role: "subject" },
    { text: "…", role: "neutral" },
    { text: "Verb am Ende", role: "verb" },
  ];

  const highlights = [active.highlight ?? active.word];
  if (active.verbFinal) highlights.push(active.verbFinal);

  return (
    <div
      className={clsx(
        tryCardSurface,
        "rounded-3xl p-5",
        "flex flex-col gap-5",
        className,
      )}
    >
      <CardToolbar speakText={active.example} current={current} total={total} />

      {/* Headline block: big connector hero flanked by chevrons +
          English gloss underneath. Matches the Konjunktiv II /
          Modalverben headline pattern verbatim (32px bold hero,
          w-7 chevrons, base muted gloss). */}
      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label={prevLabel}
            className={clsx(
              "flex items-center justify-center",
              "w-7 h-7 rounded-full",
              "text-fg-muted hover:text-fg",
              "bg-[color-mix(in_srgb,var(--chip-grammar-color)_8%,transparent)]",
              "hover:bg-[color-mix(in_srgb,var(--chip-grammar-color)_18%,transparent)]",
              "active:scale-95",
              "transition-[background-color,color,transform] duration-150",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)]",
            )}
          >
            <ChevronLeftIcon />
          </button>
          <div
            key={active.word}
            className="font-sans font-bold text-[32px] leading-tight"
            style={{ color: "var(--chip-grammar-color)" }}
          >
            {active.word}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label={nextLabel}
            className={clsx(
              "flex items-center justify-center",
              "w-7 h-7 rounded-full",
              "text-fg-muted hover:text-fg",
              "bg-[color-mix(in_srgb,var(--chip-grammar-color)_8%,transparent)]",
              "hover:bg-[color-mix(in_srgb,var(--chip-grammar-color)_18%,transparent)]",
              "active:scale-95",
              "transition-[background-color,color,transform] duration-150",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)]",
            )}
          >
            <ChevronRightIcon />
          </button>
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {active.english}
        </div>
      </div>

      {/* Example sentence first — connector + verb-final both
          bold-purple so the pattern lands in a real sentence
          before the formula strip abstracts it. */}
      <div className="font-sans font-semibold text-[17px] text-fg text-center leading-snug">
        {renderWithHighlights(active.example, highlights)}
      </div>

      {/* Formula strip under the example — no sunk background,
          just the role-coloured pills in-flow so it reads as
          "here's what you just saw, abstracted". Same shape for
          every connector; THAT is the lesson. Role colours lifted
          from the Sentence chip so the two chips speak one
          dialect for Nebensatz word-order. */}
      <FormulaStrip parts={formulaParts} />

      {/* Per-connector rule beats the shared note, same policy as
          the Konjunktiv II card. Falls back to the anchor note
          when the connector doesn't carry its own line. */}
      {active.rule ? (
        <RuleCard
          tint="var(--chip-grammar-color)"
          body={active.rule}
          label={strings.try.learnCard.ruleLabel}
        />
      ) : note ? (
        <RuleCard
          tint="var(--chip-grammar-color)"
          body={note}
          label={strings.try.learnCard.ruleLabel}
        />
      ) : null}

      {/* Progress dots. */}
      <div
        className="flex items-center justify-center gap-1.5 -mt-1"
        aria-hidden
      >
        {connectors.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all"
            style={{
              width: i === idx ? 18 : 6,
              height: 6,
              background:
                i === idx
                  ? "var(--chip-grammar-color)"
                  : "color-mix(in srgb, var(--chip-grammar-color) 25%, transparent)",
            }}
          />
        ))}
      </div>

      {/* Anchor-level sample sentence as a secondary example line,
          same component the rest of the Grammar deck uses, so the
          card ends on the familiar highlighted-sample pattern. */}
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
