import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * BlogAppSnippets, small inline UI mockups for blog posts.
 *
 * Why these exist as their own molecule rather than importing the
 * real NormalLearnCard / ExerciseArticlePicker: the live cards are
 * sized for the full chip pane (sticky toolbar + counter pill +
 * LearnActions at the bottom). Dropped into a blog article column,
 * they fight the typography and dwarf the paragraphs around them.
 *
 * These snippets carry the app's visual DNA (article colors,
 * Nunito, surface tokens, pill shapes) without the chrome. They
 * read as "this is how the app looks" without stealing the page.
 *
 * Exports:
 *   - <BlogWordCard />         single word card, article + noun + translation + rule pill
 *   - <BlogArticlePicker />    der / die / das pill row under a noun
 *   - <BlogFormulaPill />      "-ung → die" compact formula pill
 *   - <BlogWordGallery />      grid of 2-6 BlogWordCards showing a pattern
 */

const ARTICLE_COLOR: Record<ArticleColor, string> = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
};

export type ArticleColor = "der" | "die" | "das";

export interface BlogWordCardProps {
  article: ArticleColor;
  noun: string;
  translation: string;
  rule?: string;
  className?: string;
}

/** Compact mock of the Words Learn card. Article in its own colour,
 *  noun bold next to it, translation muted below, optional rule
 *  rendered as a pill in the article's colour so the "pattern"
 *  signal lands with the card. */
export function BlogWordCard({
  article,
  noun,
  translation,
  rule,
  className,
}: BlogWordCardProps) {
  const color = ARTICLE_COLOR[article];
  return (
    <div
      className={clsx(
        "rounded-2xl p-5 flex flex-col gap-2",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Article + noun both render in the gender colour, matching
          WordSection in the live Learn card ("Article color for
          nouns"). The whole word reads as one tinted unit, not an
          article plus a black noun. */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span
          className="font-sans font-bold leading-none text-[30px]"
          style={{ color }}
        >
          {article}
        </span>
        <span
          className="font-sans font-bold leading-none text-[30px]"
          style={{ color }}
        >
          {noun}
        </span>
      </div>
      <div className="font-sans font-normal text-[15px] text-fg-muted">
        {translation}
      </div>
      {rule ? (
        <div
          className="inline-flex self-start items-center mt-1 px-2.5 py-1 rounded-full font-sans font-semibold text-[11px] uppercase"
          style={{
            letterSpacing: "0.4px",
            color,
            background: `color-mix(in srgb, ${color} 10%, transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
          }}
        >
          {rule}
        </div>
      ) : null}
    </div>
  );
}

export interface BlogArticlePickerProps {
  /** Noun shown without its article, under which the three pills
   *  sit. Matches the live ArticlePicker shape. */
  noun: string;
  translation: string;
  /** Correct article for this noun, used by the "answered"
   *  variants to tint the hero + mark the correct pill. */
  correctArticle?: ArticleColor;
  /** Which pill, if any, renders in a "correct" solid state. Omit
   *  for the idle look. Mutually exclusive with `wrongPick`. */
  answered?: ArticleColor;
  /** When the learner picked the wrong article, this is the one
   *  they tapped (solid cherry error state). The correct answer
   *  drops into the hero in its own gender colour, and the rule
   *  banner shows the pattern so the mistake becomes a lesson.
   *  Mutually exclusive with `answered`. */
  wrongPick?: ArticleColor;
  /** One-line rule shown below the pills in the wrong-answer
   *  state. Mirrors the explanation slot in ExerciseFeedback. */
  rule?: string;
  className?: string;
}

/** Mock of the Exercise Article Picker (der / die / das). Idle,
 *  correct-pick, and wrong-pick states. In the wrong-pick variant
 *  the picked pill renders solid error-red, the correct pill
 *  renders in its own solid gender colour (so the learner sees
 *  what the right answer was), and a rule banner slides in under
 *  the pills with the pattern that explains it. */
export function BlogArticlePicker({
  noun,
  translation,
  correctArticle,
  answered,
  wrongPick,
  rule,
  className,
}: BlogArticlePickerProps) {
  // Which article drops into the hero. Correct pick shows itself;
  // wrong pick reveals the correct article alongside the mistake.
  const heroArticle = answered ?? correctArticle ?? null;
  const heroColor = heroArticle ? ARTICLE_COLOR[heroArticle] : undefined;
  return (
    <div
      className={clsx(
        "rounded-2xl p-5 flex flex-col items-center gap-5",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-baseline gap-2">
          {heroArticle ? (
            <>
              <span
                className="font-sans font-bold leading-none text-[30px]"
                style={{ color: heroColor }}
              >
                {heroArticle}
              </span>
              <span
                className="font-sans font-bold leading-none text-[30px]"
                style={{ color: heroColor }}
              >
                {noun}
              </span>
            </>
          ) : (
            <>
              <span className="font-sans font-bold leading-none text-[30px] text-fg-faint">
                ___
              </span>
              <span className="font-sans font-bold leading-none text-[30px] text-fg">
                {noun}
              </span>
            </>
          )}
        </div>
        <div className="font-sans font-normal text-[14px] text-fg-muted">
          {translation}
        </div>
      </div>
      <div className="flex gap-2 w-full justify-center">
        {(["der", "die", "das"] as const).map((a) => {
          const isCorrectPick = answered === a;
          const isWrongPick = wrongPick === a;
          const isCorrectRevealed =
            !!wrongPick && correctArticle === a;
          const color = ARTICLE_COLOR[a];
          // Dim rule: in a correct-pick state the two unchosen pills
          // dim; in a wrong-pick state only the pills that are
          // neither the wrong pick nor the correct reveal dim.
          const dim =
            (answered && !isCorrectPick) ||
            (wrongPick && !isWrongPick && !isCorrectRevealed);
          // Wrong pick renders solid cherry (error signal) regardless
          // of which article it is. Correct reveal (in wrong state)
          // renders solid in its own gender colour. Correct pick in
          // the happy path renders solid in its own colour.
          let background = `color-mix(in srgb, ${color} 10%, transparent)`;
          let textColor = color;
          let borderColor = `color-mix(in srgb, ${color} 30%, transparent)`;
          if (isCorrectPick || isCorrectRevealed) {
            background = color;
            textColor = "white";
            borderColor = color;
          } else if (isWrongPick) {
            background = "var(--accent)";
            textColor = "white";
            borderColor = "var(--accent)";
          }
          return (
            <div
              key={a}
              className={clsx(
                "inline-flex items-center justify-center",
                "px-5 py-2 rounded-full",
                "font-sans font-bold text-[16px]",
              )}
              style={{
                color: textColor,
                background,
                border: `1px solid ${borderColor}`,
                opacity: dim ? 0.35 : 1,
              }}
            >
              {a}
            </div>
          );
        })}
      </div>
      {rule ? (
        <div
          className="w-full mt-1 rounded-xl px-4 py-3 flex items-start gap-2"
          style={{
            background: "var(--surface-sunk)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="font-sans font-semibold text-[11px] uppercase mt-0.5 shrink-0"
            style={{
              color: "var(--fg-faint)",
              letterSpacing: "0.4px",
            }}
          >
            Rule
          </span>
          <span className="font-sans font-normal text-[14px] text-fg leading-snug">
            {rule}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export interface BlogFormulaPillProps {
  /** Left side of the formula, e.g. "-ung". */
  left: string;
  /** Right side, typically an article (der/die/das). */
  right: string;
  /** Article colour the right-side text takes on. */
  rightColor: ArticleColor;
  className?: string;
}

/** Compact "-ung → die" pill. The left stays neutral; the right
 *  takes the article's colour so the formula visually resolves to
 *  the article at the same time the reader parses it. */
export function BlogFormulaPill({
  left,
  right,
  rightColor,
  className,
}: BlogFormulaPillProps) {
  const color = ARTICLE_COLOR[rightColor];
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-3",
        "px-5 py-3 rounded-full",
        "font-sans font-bold",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      <span className="text-[22px] text-fg">{left}</span>
      <span className="text-[18px] text-fg-faint" aria-hidden>
        →
      </span>
      <span className="text-[22px]" style={{ color }}>
        {right}
      </span>
    </div>
  );
}

export interface BlogWordGalleryProps {
  words: BlogWordCardProps[];
  className?: string;
}

/** 1 or 2 column grid of BlogWordCards, used to show a pattern
 *  (five -ung nouns, four -keit nouns, etc.) visually at a glance
 *  inside a blog article. */
export function BlogWordGallery({
  words,
  className,
}: BlogWordGalleryProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 gap-3",
        className,
      )}
    >
      {words.map((w, i) => (
        <BlogWordCard key={`${w.article}-${w.noun}-${i}`} {...w} />
      ))}
    </div>
  );
}
