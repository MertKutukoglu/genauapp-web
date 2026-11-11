import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { SeparablePrefix } from "@/content/grammar-a1";

/**
 * GrammarVerbCardsCard — the A2 `verbCards` layout, rendered as a
 * prefix carousel: one separable prefix per step, chevrons flanking
 * the hero, cycles through all twelve (ab-, an-, auf-, aus-, bei-,
 * ein-, los-, mit-, nach-, vor-, weg-, zu-) with ← → support.
 *
 * Shape (per prefix):
 *   toolbar (reads the hero prefix)
 *   → big prefix hero (bold 56, fg) flanked by ‹ › chevrons
 *   → "Sample Words" sunk tile listing 3-5 verbs (bullet-separated)
 *   → shared "Rules" purple RuleCard with the prefix's rule
 *   → tiny 12-dot progress strip
 *   → Repeat / I know (bottom-pinned)
 *
 * Interaction mirrors GrammarVerbParadigmCard's modal carousel:
 * chevron buttons + global ArrowLeft / ArrowRight (skipped when an
 * input/textarea/contentEditable has focus). The toolbar speaker
 * reads the active prefix, so TTS lands on what you see.
 */

export interface GrammarVerbCardsCardProps {
  headline: string;
  english: string;
  prefixes: SeparablePrefix[];
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarVerbCardsCard({
  headline,
  english,
  prefixes,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarVerbCardsCardProps) {
  const { strings, locale } = useLocale();
  const [idx, setIdx] = React.useState(0);

  // Reset to index 0 when the deck swaps the anchor underneath.
  React.useEffect(() => {
    setIdx(0);
  }, [prefixes.length, prefixes[0]?.prefix]);

  const active = prefixes[idx];

  const prev = React.useCallback(() => {
    setIdx((i) => (i - 1 + prefixes.length) % prefixes.length);
  }, [prefixes.length]);
  const next = React.useCallback(() => {
    setIdx((i) => (i + 1) % prefixes.length);
  }, [prefixes.length]);

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
  const sampleWordsLabel = locale === "tr" ? "Örnek kelimeler" : "Sample Words";

  if (!active) return null;

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
      <CardToolbar
        speakText={active.prefix.replace(/-$/, "")}
        current={current}
        total={total}
      />

      {/* Headline block: small title + big prefix hero flanked by
          chevrons, matching the Modalverben carousel shape. */}
      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-normal text-[15px] text-fg-muted leading-snug">
          {headline}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label={prevLabel}
            className={clsx(
              "flex items-center justify-center",
              "w-9 h-9 rounded-full",
              "text-fg-muted hover:text-fg",
              "transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)]",
            )}
            style={{
              background:
                "color-mix(in srgb, var(--chip-grammar-color) 8%, transparent)",
            }}
          >
            <ChevronLeftIcon />
          </button>
          <div
            key={active.prefix}
            className="font-sans font-bold text-[56px] text-fg leading-none"
          >
            {active.prefix}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label={nextLabel}
            className={clsx(
              "flex items-center justify-center",
              "w-9 h-9 rounded-full",
              "text-fg-muted hover:text-fg",
              "transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)]",
            )}
            style={{
              background:
                "color-mix(in srgb, var(--chip-grammar-color) 8%, transparent)",
            }}
          >
            <ChevronRightIcon />
          </button>
        </div>
        <div className="font-sans font-normal text-[14px] text-fg-muted mt-1">
          {english}
        </div>
      </div>

      {/* Sample Words sunk tile — bullet-separated verbs. Wraps on
          narrow widths via flex-wrap. */}
      <div
        className="rounded-2xl p-4 flex flex-col gap-1.5"
        style={{ background: "var(--surface-sunk)" }}
      >
        <div
          className="font-sans font-normal text-sm leading-tight"
          style={{ color: "var(--fg-muted)" }}
        >
          {sampleWordsLabel}
        </div>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {active.samples.map((w, i) => (
            <React.Fragment key={w}>
              <span className="font-sans font-bold text-[18px] text-fg leading-tight">
                {w}
              </span>
              {i < active.samples.length - 1 ? (
                <span
                  className="font-sans text-fg-muted leading-none"
                  aria-hidden
                >
                  •
                </span>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>

      <RuleCard
        tint="var(--chip-grammar-color)"
        body={active.rule}
        label={strings.try.learnCard.ruleLabel}
      />

      {/* Progress dots: 12 ticks, active one widens + darkens. */}
      <div
        className="flex items-center justify-center gap-1.5 -mt-1"
        aria-hidden
      >
        {prefixes.map((_, i) => (
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

      <GrammarSampleSentence
        sentence={active.sample.de}
        highlight={active.sample.highlight}
        translation={active.sample.en}
      />

      <LearnActions
        onRepeat={onRepeat}
        onIKnow={onIKnow}
        className="mt-auto"
      />
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
      className="w-5 h-5"
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
      className="w-5 h-5"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
