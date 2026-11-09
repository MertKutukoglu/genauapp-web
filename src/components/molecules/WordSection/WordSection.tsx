import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * WordSection — the hero of the Learn card: the big German word, with
 * its English translation on the line below.
 *
 * Per spec §5:
 *   - German line: Open Sans bold 32px (24px if > 15 chars). Article
 *     color for nouns, var(--fg) for verbs/adj/adv.
 *   - English line: Open Sans regular 16px (14px if > 25 chars),
 *     var(--fg) always.
 *   - Centered, max 2 lines on the German.
 *
 * Shared across Words / Sentence / Grammar / Reading cards because
 * every chip at some point shows a German hero word.
 */

export type ArticleColor = "der" | "die" | "das" | null;

const ARTICLE_TOKEN: Record<Exclude<ArticleColor, null>, string> = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
};

export interface WordSectionProps {
  /** Base German form. For nouns don't include the article here — pass it separately. */
  german: string;
  english: string;
  /** Article drives tint + display prefix. Null = verb/adj/adv. */
  article?: ArticleColor;
  className?: string;
}

export function WordSection({
  german,
  english,
  article,
  className,
}: WordSectionProps) {
  const color = article ? ARTICLE_TOKEN[article] : "var(--fg)";
  const deSize = german.length > 15 ? 24 : 32;
  const enSize = english.length > 25 ? 14 : 16;
  const display = article ? `${article} ${german}` : german;

  return (
    <div
      className={clsx(
        "flex flex-col gap-1 items-center text-center py-2",
        className,
      )}
    >
      <div
        className="font-sans font-bold leading-[1.15]"
        style={{ color, fontSize: deSize }}
      >
        {display}
      </div>
      <div
        className="font-sans font-normal text-fg leading-tight"
        style={{ fontSize: enSize }}
      >
        {english}
      </div>
    </div>
  );
}
