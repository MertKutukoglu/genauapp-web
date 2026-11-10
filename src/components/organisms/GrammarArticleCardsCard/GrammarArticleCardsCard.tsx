import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import type { ArticleCardSpec } from "@/content/grammar-a1";

/**
 * GrammarArticleCardsCard — the Grammar chip's `articleCards` Learn
 * layout. Drives the single Articles (der/die/das) anchor.
 *
 * Shape: toolbar → centered headline (bold 24) + subtitle → three
 * side-by-side article cards tinted with the article colors (not
 * grammar purple — this is the one Learn layout where der/die/das
 * reclaim their own colors) → sample sentence with the article at
 * sentence start highlighted purple → Repeat / I know bottom-pinned.
 *
 * Three equal columns on desktop, stacked vertically on narrow
 * viewports so the role labels and examples stay readable. Each
 * sub-card is a sunk surface with an 8%-tinted background in the
 * article's hue + 20%-tinted border; the article token itself is
 * bold 28 in the article color.
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

      {/* Article cards. Stacks vertically on sm-, 3-column on sm+. */}
      <div className="flex flex-col sm:flex-row gap-3">
        {articles.map((card) => {
          const color = ARTICLE_COLORS[card.article];
          return (
            <div
              key={card.article}
              className="flex-1 flex flex-col items-center justify-center gap-2 rounded-2xl p-4 min-h-[140px]"
              style={{
                background: `color-mix(in srgb, ${color} 8%, var(--surface-sunk))`,
                border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
              }}
            >
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
              <div className="flex flex-col items-center gap-0.5 mt-2">
                <div
                  className="font-sans font-semibold text-[15px] text-center"
                  style={{ color }}
                >
                  {card.example.de}
                </div>
                <div className="font-sans font-normal text-[13px] text-fg-muted text-center leading-tight">
                  {card.example.en}
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
