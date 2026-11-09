import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import type { ArticleColor } from "@/components/molecules/WordSection/WordSection";

/**
 * RuleCard — the article-tinted explanation block with the lightbulb
 * icon. Shared across Words / Sentence / Grammar chips (every chip
 * that teaches a rule drops one of these in).
 *
 * Spec §6.3 of the Learn-card brief:
 *   - 16 padding, 16 radius, article-color @ 6% background
 *   - Left column: "Rules" eyebrow (article color @ 50% opacity) +
 *     rule body (article color @ 100%)
 *   - Right: 24×24 lightbulb SVG, currentColor = article color
 *   - For verbs/adj/adv (no article), everything tints var(--accent)
 *     cherry instead
 *
 * The entire element lives in article color — the rule's identity
 * stays linked to the word's grammatical identity. Don't break this.
 */

const ARTICLE_TOKEN: Record<Exclude<ArticleColor, null>, string> = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
};

export interface RuleCardProps {
  /** Article drives tint. Null falls back to accent (cherry) for non-nouns. */
  article?: ArticleColor;
  /** The rule body. One sentence, no em-dashes (brand rule). */
  body: string;
  className?: string;
}

export function RuleCard({ article, body, className }: RuleCardProps) {
  const tint = article ? ARTICLE_TOKEN[article] : "var(--accent)";

  return (
    <div
      className={clsx(
        "flex items-start gap-3 rounded-2xl p-4",
        className,
      )}
      style={{
        background: `color-mix(in srgb, ${tint} 6%, transparent)`,
        color: tint,
      }}
    >
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div
          className="font-sans font-normal text-sm leading-tight"
          style={{ opacity: 0.5 }}
        >
          Rules
        </div>
        <div className="font-sans font-normal text-[15px] leading-relaxed">
          {body}
        </div>
      </div>
      {/* Lightbulb — stroke uses currentColor so the icon tints with the
          parent text color automatically. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 shrink-0"
        aria-hidden
      >
        <path d="M9.988 16.582C7.644 15.593 6 13.272 6 10.561C6 6.484 9.722 3.284 13.943 4.139C16.443 4.651 18.465 6.661 18.986 9.161C19.664 12.427 17.887 15.437 15.154 16.592L15.151 17.88C15.149 18.708 14.478 19.378 13.65 19.378H11.486C10.655 19.378 9.982 18.703 9.984 17.873L9.988 16.582Z" />
        <path d="M11.283 21.137H13.859" />
        <path d="M15.711 15.731H12.711" />
      </svg>
    </div>
  );
}
