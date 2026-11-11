import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { ParadigmGrid } from "@/components/molecules/ParadigmGrid/ParadigmGrid";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ParadigmForm, VerbParadigmVariant } from "@/content/grammar-a1";

/**
 * GrammarVerbParadigmCard — the Grammar chip's `verbParadigm` Learn
 * layout. Drives the A1 sein/haben anchors (single-paradigm shape)
 * AND the A2 Modalverben anchor (carousel shape).
 *
 * Shape:
 *   toolbar
 *   → centered verb (bold 32) + English gloss (regular 16 muted)
 *     with optional chevrons flanking the verb (carousel mode)
 *   → 6-row ParadigmGrid
 *   → optional note (purple RuleCard — A2 Modalverben ships one)
 *   → sample sentence with highlight
 *   → Repeat / I know (bottom-pinned)
 *
 * Carousel mode kicks in when `variants.length > 1`. Chevrons tap
 * through müssen → können → möchten → wollen → dürfen → sollen
 * (with wraparound); ArrowLeft / ArrowRight do the same from the
 * keyboard when the card is focused. A set of tiny dots under the
 * sample marks the current index so the learner knows they're in
 * a multi-step card — three successive clicks without a visual cue
 * read as "it's broken".
 *
 * The toolbar's speaker reads the active variant's verb so the
 * learner hears the one they're looking at. Single-paradigm mode
 * reads the top-level `verb`.
 */

export interface GrammarVerbParadigmCardProps {
  verb: string;
  english: string;
  forms: ParadigmForm[];
  sample: { de: string; en: string; highlight: string };
  /** A2 carousel: when set with 2+ entries, chevron cycling kicks
   *  in and the top-level verb/english/forms/sample are ignored. */
  variants?: VerbParadigmVariant[];
  /** Shared note rendered in a purple RuleCard below the paradigm.
   *  A2 Modalverben uses it for the "other modals" sentence. */
  note?: string;
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarVerbParadigmCard({
  verb,
  english,
  forms,
  sample,
  variants,
  note,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarVerbParadigmCardProps) {
  const { strings, locale } = useLocale();
  const hasCarousel = !!variants && variants.length > 1;
  const [variantIdx, setVariantIdx] = React.useState(0);

  // Reset to the first variant whenever the card itself changes
  // (new anchor in the deck). Without this, I-know → Repeat can
  // leave the carousel on a later index.
  React.useEffect(() => {
    setVariantIdx(0);
  }, [variants?.length, variants?.[0]?.verb]);

  const active: VerbParadigmVariant | null = hasCarousel
    ? variants![variantIdx]!
    : null;

  const displayVerb = active ? active.verb : verb;
  const displayEnglish = active ? active.english : english;
  const displayForms = active ? active.forms : forms;
  const displaySample = active ? active.sample : sample;

  const prev = React.useCallback(() => {
    if (!hasCarousel) return;
    setVariantIdx((i) => (i - 1 + variants!.length) % variants!.length);
  }, [hasCarousel, variants]);

  const next = React.useCallback(() => {
    if (!hasCarousel) return;
    setVariantIdx((i) => (i + 1) % variants!.length);
  }, [hasCarousel, variants]);

  // Keyboard: Left / Right arrows cycle variants. Scoped to the card
  // via a ref + focus state so it doesn't steal arrow keys from
  // inputs or other interactive controls on the page.
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!hasCarousel) return;
    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          (active as HTMLElement).isContentEditable)
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
  }, [hasCarousel, prev, next]);

  const prevLabel = locale === "tr" ? "Önceki" : "Previous";
  const nextLabel = locale === "tr" ? "Sonraki" : "Next";

  return (
    <div
      ref={rootRef}
      className={clsx(
        "bg-surface-card rounded-3xl p-5",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-5",
        className,
      )}
    >
      <CardToolbar
        speakText={displayVerb}
        current={current}
        total={total}
      />

      {/* Headline block — verb flanked by chevrons in carousel mode. */}
      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="flex items-center justify-center gap-3">
          {hasCarousel ? (
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
          ) : null}
          <div
            key={displayVerb}
            className="font-sans font-bold text-[32px] text-fg leading-tight"
          >
            {displayVerb}
          </div>
          {hasCarousel ? (
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
          ) : null}
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {displayEnglish}
        </div>
      </div>

      <ParadigmGrid
        rows={displayForms.map((row) => ({
          pronoun: row.pronoun,
          form: row.form,
        }))}
      />

      {hasCarousel ? (
        <div
          className="flex items-center justify-center gap-1.5 -mt-1"
          aria-hidden
        >
          {variants!.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === variantIdx ? 18 : 6,
                height: 6,
                background:
                  i === variantIdx
                    ? "var(--chip-grammar-color)"
                    : "color-mix(in srgb, var(--chip-grammar-color) 25%, transparent)",
              }}
            />
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
        sentence={displaySample.de}
        highlight={displaySample.highlight}
        translation={displaySample.en}
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
