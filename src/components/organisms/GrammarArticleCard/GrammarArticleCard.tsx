import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ArticleSuffixPattern } from "@/content/grammar-a1";

/**
 * GrammarArticleCard — the Grammar chip's `articleSingle` Learn
 * layout. Each of the three definite articles gets its own card in
 * the Learn deck (der → die → das in authored order), replacing the
 * earlier side-by-side three-column layout.
 *
 * Why per-article cards:
 *   - Three-column layout read as a reference chart; learners
 *     skimmed it and left without internalizing the suffix → gender
 *     patterns.
 *   - A single article per card lets the article be the hero
 *     (large, in its own color) and the pattern list breathe —
 *     3-4 rows instead of 3 cramped columns.
 *   - The chip's purple accent gets replaced by the article color
 *     on this card type, matching the article-color contract the
 *     rest of the app uses (Words article pills, article-colored
 *     highlights in explanations). The whole card reads as "about
 *     this one article" — not a navy visit to the grammar chip.
 *
 * Shape:
 *   toolbar
 *   → BIG article word in article color + role subtitle
 *   → sunk pattern panel: rows of `suffix → example`, suffix in
 *     article color, example in `--fg`
 *   → optional caveat (muted, article-tinted dot)
 *   → sample sentence with article highlighted in its color
 *   → Repeat / I know (bottom-pinned)
 */

const ARTICLE_COLORS: Record<ArticleSingleCardProps["article"], string> = {
  der: "var(--color-article-der)",
  die: "var(--color-article-die)",
  das: "var(--color-article-das)",
};

type ArticleSingleCardProps = {
  article: "der" | "die" | "das";
  role: string;
  patterns: ArticleSuffixPattern[];
  caveat?: string;
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
};

export type GrammarArticleCardProps = ArticleSingleCardProps;

export function GrammarArticleCard({
  article,
  role,
  patterns,
  caveat,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarArticleCardProps) {
  const color = ARTICLE_COLORS[article];

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

      {/* Hero — article word as the subject of the card, big enough
          to carry the whole frame; role below as a muted subtitle. */}
      <div className="flex flex-col items-center gap-1 text-center py-2">
        <div
          className="font-sans font-bold text-[56px] leading-none"
          style={{ color }}
        >
          {article}
        </div>
        <div
          className="font-sans font-normal text-[15px] text-fg-muted uppercase"
          style={{ letterSpacing: "0.8px" }}
        >
          {role}
        </div>
      </div>

      {/* Pattern panel — sunk container, article-tinted background
          so the whole surface reads as the article's territory.
          Rows: `suffix → example` center-aligned, suffix bold in
          article color, example in --fg. */}
      <div
        className="rounded-2xl px-5 py-4"
        style={{
          background: `color-mix(in srgb, ${color} 7%, var(--surface-sunk))`,
          border: `1px solid color-mix(in srgb, ${color} 18%, transparent)`,
        }}
      >
        <div className="flex flex-col gap-2.5">
          {patterns.map((p) => (
            <div
              key={p.suffix}
              className="flex items-baseline justify-center gap-2 font-sans text-[15px] leading-tight"
            >
              <span
                className="font-semibold min-w-[56px] text-right"
                style={{ color }}
              >
                {p.suffix}
              </span>
              <span className="text-fg-faint" aria-hidden>
                →
              </span>
              <span className="font-normal text-fg min-w-[96px] text-left">
                {p.example}
              </span>
            </div>
          ))}
        </div>
      </div>

      {caveat ? <CaveatNote body={caveat} /> : null}

      <GrammarSampleSentence
        sentence={sample.de}
        highlight={sample.highlight}
        highlightColor={color}
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
 * CaveatNote — muted "watch-out" row under the pattern panel.
 * Kept muted on purpose; the hero + patterns above already carry
 * the article-color weight of the card, and a second colored block
 * would make the surface read as busy.
 */
function CaveatNote({ body }: { body: string }) {
  const { strings } = useLocale();
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
