import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { RolePill } from "@/components/molecules/RolePill/RolePill";
import { RoleSegment } from "@/components/molecules/RoleSegment/RoleSegment";
import { parseBold } from "@/lib/sentence/parseBold";
import type { FormulaExample, FormulaPart } from "@/content/sentence-a1";

/**
 * SentenceFormulaCard — the one Learn-card layout for the Sentence
 * chip. All 6 anchors use it.
 *
 * Shape, top to bottom (brief §4.2):
 *   1. CardToolbar
 *   2. Centered headline (German, bold 32 → 26 if long) + English
 *      subtitle
 *   3. Parts strip — 3–4 role-colored RolePills in a flex row
 *   4. Example sentences — inline RoleSegments (semi-bold 17) with a
 *      space between each, EN gloss below in muted regular 14
 *   5. Body prose — regular 14, supports `**bold**` via parseBold
 *   6. LearnActions (Repeat / I know), bottom-pinned so successive
 *      cards don't jump when a formula has 3 vs 4 parts
 *
 * No sunk container around the pill strip or the examples — the
 * examples live directly on the card surface, matching the "examples,
 * not rules" design principle: the pattern becomes visible through
 * two colored sentences before any prose.
 *
 * Speaker on the toolbar reads the first example's German sentence
 * (joined by spaces) — nothing useful to pronounce on a paradigm
 * headline, but the sample sentence itself is a sensible TTS target.
 */

export interface SentenceFormulaCardProps {
  headline: string;
  english: string;
  parts: FormulaPart[];
  examples: FormulaExample[];
  body: string;
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function SentenceFormulaCard({
  headline,
  english,
  parts,
  examples,
  body,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: SentenceFormulaCardProps) {
  // TTS target: the first example's German sentence (joined). Falls
  // back to the headline when a card happens to carry no examples.
  const speakText = React.useMemo(() => {
    const first = examples[0];
    if (!first) return headline;
    return first.segments.map((s) => s.text).join(" ");
  }, [examples, headline]);

  return (
    <div
      className={clsx(
        tryCardSurface,
        "rounded-3xl p-5",
        "flex flex-col gap-5",
        className,
      )}
    >
      <CardToolbar speakText={speakText} current={current} total={total} />

      {/* Headline + subtitle. Headline drops from 32 to 26 past 15
          characters so long German words like "Possessivartikel"
          don't overflow the card on narrow viewports. */}
      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div
          className={clsx(
            "font-sans font-bold text-fg leading-tight",
            headline.length > 15 ? "text-[26px]" : "text-[32px]",
          )}
        >
          {headline}
        </div>
        <div className="font-sans font-normal text-[15px] text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      {/* Parts strip — 3–4 equal-flex role pills. Wraps only on very
          narrow viewports; the min-width on each pill keeps the
          layout from collapsing to single-column. */}
      <div className="flex flex-wrap gap-2.5">
        {parts.map((p, i) => (
          <RolePill
            key={`${p.text}-${i}`}
            text={p.text}
            translation={p.translation}
            caption={p.caption}
            role={p.role}
          />
        ))}
      </div>

      {/* Examples — role-colored inline segments with a space
          between each. Multiple examples stack with a 10px vertical
          gap (gap-2.5). No sunk container; the examples live directly
          on the card surface as prose. */}
      <div className="flex flex-col gap-2.5">
        {examples.map((ex, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <div className="flex flex-wrap items-baseline gap-x-1.5 leading-snug">
              {ex.segments.map((seg, j) => (
                <RoleSegment
                  key={`${i}-${j}`}
                  text={seg.text}
                  role={seg.role}
                />
              ))}
            </div>
            <div className="font-sans font-normal text-sm text-fg-muted leading-snug">
              {ex.en}
            </div>
          </div>
        ))}
      </div>

      {/* Body prose — supports **bold** inline. Line-height loose
          enough that the bold spans don't crowd their neighbors. */}
      <p className="font-sans font-normal text-sm text-fg leading-relaxed m-0">
        {parseBold(body)}
      </p>

      <LearnActions
        onRepeat={onRepeat}
        onIKnow={onIKnow}
        className="mt-auto"
      />
    </div>
  );
}
