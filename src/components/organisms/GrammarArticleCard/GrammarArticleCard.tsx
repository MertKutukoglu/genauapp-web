import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
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
  /**
   * Shared RuleCard body — the "by meaning" categories that also
   * take this article, so the learner leaves the card knowing both
   * suffix signals AND semantic categories (Days/months → der,
   * Trees/flowers → die, Diminutives → das, etc.).
   */
  rule?: string;
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
  rule,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarArticleCardProps) {
  const color = ARTICLE_COLORS[article];
  const { locale, strings } = useLocale();

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

      {/* Pattern grid — no tinted sunk container around it any more;
          the article hero + RuleCard beneath already carry the
          article's color weight, and a third tinted surface in
          between made the card read as busy. Grid is center-pinned
          in the card; `w-max` keeps it only as wide as its longest
          row so suffixes right-align against the examples without
          stretching across the surface.
          Three columns: suffix (right-aligned) · arrow · example +
          italic gloss (left-aligned). Grid instead of flex so every
          row lines up vertically regardless of word length — Honig
          and Schmetterling share the same left edge. */}
      <div className="flex justify-center">
        <div
          className="grid gap-x-3 gap-y-2.5"
          style={{ gridTemplateColumns: "auto auto 1fr" }}
        >
          {patterns.map((p) => (
            <React.Fragment key={p.suffix}>
              <span
                className="font-sans font-semibold text-[15px] text-right leading-tight"
                style={{ color }}
              >
                {p.suffix}
              </span>
              <span
                className="font-sans text-fg-faint text-[15px] leading-tight"
                aria-hidden
              >
                →
              </span>
              <span className="font-sans text-[15px] leading-tight">
                <span className="font-normal text-fg">{p.example}</span>{" "}
                <span className="italic text-fg-muted">
                  {locale === "tr" ? p.gloss.tr : p.gloss.en}
                </span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {rule ? (
        <RuleCard
          article={article}
          body={rule}
          label={strings.try.learnCard.ruleLabel}
        />
      ) : null}

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

