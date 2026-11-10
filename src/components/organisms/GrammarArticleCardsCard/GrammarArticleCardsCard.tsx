import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ArticleCardSpec } from "@/content/grammar-a1";

/**
 * GrammarArticleCardsCard — the Grammar chip's `articleCards` Learn
 * layout. Drives the single Articles (der/die/das) anchor.
 *
 * Earlier shape showed one memorized noun per article (der Tisch,
 * die Lampe, das Buch) — visually clean but pedagogically a
 * reference card. The learner left with three remembered pairs and
 * no transfer: a new noun still needed a dictionary lookup to
 * resolve its gender.
 *
 * Current shape teaches **suffix → gender patterns.** Each column
 * lists 2–4 high-reliability A1 noun suffixes with one example per
 * row (`-ung → Zeitung`, `-chen → Mädchen`, …) so the learner walks
 * away with a decision rule, not three facts. The one Grammar layout
 * where the article colors reclaim the surface instead of the chip's
 * purple — that's the whole point of this card.
 *
 * A caveat note under the three columns acknowledges that the
 * patterns aren't absolute (kinship and some high-frequency words
 * are exceptions). Without it the lesson reads as "learn the rules
 * and you'll never be wrong", which is not true.
 *
 * Stacks vertically on narrow viewports; equal-height columns via
 * flex-1 so differences in row counts don't make the cards jagged.
 */

const ARTICLE_COLORS: Record<ArticleCardSpec["article"], string> = {
  der: "var(--color-article-der)",
  die: "var(--color-article-die)",
  das: "var(--color-article-das)",
};

export interface GrammarArticleCardsCardProps {
  headline: string;
  english: string;
  articles: ArticleCardSpec[];
  /**
   * Optional caveat paragraph shown below the three columns.
   * Localized string passed in by the parent (GrammarChip).
   */
  caveat?: string;
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarArticleCardsCard({
  headline,
  english,
  articles,
  caveat,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarArticleCardsCardProps) {
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
        <div className="font-sans font-bold text-[24px] text-fg leading-tight">
          {headline}
        </div>
        <div className="font-sans font-normal text-[15px] text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      {/* Suffix columns. items-stretch so the three columns align at
          their bottoms regardless of pattern-count differences
          (feminine naturally carries one more pattern than the
          others at A1 — -e, -ung, -ion, -in). */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {articles.map((card) => {
          const color = ARTICLE_COLORS[card.article];
          return (
            <div
              key={card.article}
              className="flex-1 flex flex-col items-center gap-3 rounded-2xl p-4"
              style={{
                background: `color-mix(in srgb, ${color} 8%, var(--surface-sunk))`,
                border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
              }}
            >
              {/* Header — article + role */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="font-sans font-bold text-[28px] leading-none"
                  style={{ color }}
                >
                  {card.article}
                </div>
                <div
                  className="font-sans font-normal text-xs text-fg-muted"
                  style={{ letterSpacing: "0.5px" }}
                >
                  {card.role}
                </div>
              </div>

              {/* Divider — hairline in the article color, keeps the
                  header visually separate from the pattern list
                  without borrowing a full border. */}
              <div
                className="w-8 h-px"
                style={{
                  background: `color-mix(in srgb, ${color} 30%, transparent)`,
                }}
                aria-hidden
              />

              {/* Pattern rows — suffix in article color, example in
                  `--fg`. Arrow is a subtle `fg-faint` glyph so the
                  eye tracks suffix → example as one unit. */}
              <div className="flex flex-col gap-1.5 w-full">
                {card.patterns.map((p) => (
                  <div
                    key={p.suffix}
                    className="flex items-baseline justify-center gap-1.5 font-sans text-[13px] leading-tight"
                  >
                    <span className="font-semibold" style={{ color }}>
                      {p.suffix}
                    </span>
                    <span className="text-fg-faint" aria-hidden>
                      →
                    </span>
                    <span className="font-normal text-fg">{p.example}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {caveat ? <CaveatNote body={caveat} /> : null}

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

/**
 * CaveatNote — a shorter, softer variant of the verbConjugation
 * PurpleNoteCard. Articles don't have one teachable "rule" the way
 * regular-verb endings do; the caveat here is about limits, so the
 * label is "Note" (localized by the parent) and the tone is
 * explicitly non-prescriptive.
 *
 * Uses a muted-fg tint rather than the grammar-purple surface,
 * because the color-coded suffix rows above already carry the purple
 * weight of the card.
 */
function CaveatNote({ body }: { body: string }) {
  const { strings } = useLocale();
  // Reuse the Words learn card's rule label as the eyebrow — the
  // Grammar brief already names the same label for the purple note
  // card; a caveat is still a rule-adjacent block.
  const label = strings.try.learnCard.ruleLabel;
  return (
    <div
      className="rounded-2xl p-3 flex gap-2.5 items-start"
      style={{
        background: "color-mix(in srgb, var(--fg) 4%, transparent)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 mt-0.5 text-fg-muted"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
      <div className="flex flex-col gap-0.5">
        <div className="font-sans font-normal text-xs text-fg-faint leading-tight">
          {label}
        </div>
        <div className="font-sans font-normal text-[13px] text-fg-muted leading-snug">
          {body}
        </div>
      </div>
    </div>
  );
}
