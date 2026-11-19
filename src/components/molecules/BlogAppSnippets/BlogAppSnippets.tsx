import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";
import { SkillRing } from "@/components/atoms/SkillRing/SkillRing";

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
 *   - <BlogChipRow />          the four Chip tiles (Words / Grammar / Sentence / Reading)
 *   - <BlogRoleStrip />        role colored sentence pills (subject, verb, Mittelfeld, verb2)
 *   - <BlogSentenceBuilder />  pool of uncolored chips + an answered row in role colors
 *   - <BlogReadingExcerpt />   a passage block with an underlined word + translation chip
 *   - <BlogSkillRingRow />     four SkillRings with sample progress and momentum arrows
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

/* ---------------------------------------------------------------- *
 *  BlogChipRow                                                     *
 *  Visual only mock of the four workout chips in the picker.       *
 *  Not a button, not focusable: it stands in an article as a       *
 *  picture of the chips.                                           *
 * ---------------------------------------------------------------- */

type BlogChipId = "words" | "grammar" | "sentence" | "reading";

interface BlogChipMetaEntry {
  label: string;
  colorVar: string;
  icon: IconName;
}

const BLOG_CHIP_META: Record<BlogChipId, BlogChipMetaEntry> = {
  words: {
    label: "Words",
    colorVar: "var(--chip-words-color)",
    icon: "chip-words",
  },
  grammar: {
    label: "Grammar",
    colorVar: "var(--chip-grammar-color)",
    icon: "chip-grammar",
  },
  sentence: {
    label: "Sentence",
    colorVar: "var(--chip-sentence-color)",
    icon: "chip-sentence",
  },
  reading: {
    label: "Reading",
    colorVar: "var(--chip-reading-color)",
    icon: "chip-reading",
  },
};

export interface BlogChipRowProps {
  /** Which chip renders in the selected state (solid border + glow).
   *  Omit for an all idle look. */
  selected?: BlogChipId;
  /** Which chips render in the done state (check, muted). */
  done?: BlogChipId[];
  /** Optional override for which chips to show and in what order.
   *  Defaults to all four in app order. */
  chips?: BlogChipId[];
  /** Optional per chip caption. Keyed by chip id. */
  captions?: Partial<Record<BlogChipId, string>>;
  className?: string;
}

/** Row of four chip tiles. Carries the same tint math the live
 *  Chip atom uses (14% idle, 28% selected, 10% done, 36% icon well)
 *  so the picture is faithful without pulling in a button. */
export function BlogChipRow({
  selected,
  done,
  chips = ["words", "grammar", "sentence", "reading"],
  captions,
  className,
}: BlogChipRowProps) {
  const doneSet = new Set(done ?? []);
  return (
    <div
      className={clsx(
        "grid grid-cols-2 sm:grid-cols-4 gap-2.5",
        className,
      )}
    >
      {chips.map((id) => {
        const meta = BLOG_CHIP_META[id];
        const isSelected = selected === id;
        const isDone = doneSet.has(id);
        const tintPct = isSelected ? "28%" : isDone ? "10%" : "14%";
        const iconTintPct = isDone ? "20%" : "36%";
        return (
          <div
            key={id}
            className={clsx(
              "relative flex flex-col items-start justify-between",
              "rounded-2xl p-4 min-h-24",
              "border",
              isSelected
                ? "shadow-lg"
                : "",
            )}
            style={{
              ["--blog-chip-color" as string]: meta.colorVar,
              background: `color-mix(in oklab, var(--blog-chip-color) ${tintPct}, var(--surface-card))`,
              borderColor: isSelected
                ? "var(--blog-chip-color)"
                : "transparent",
              opacity: isDone ? 0.9 : 1,
            }}
          >
            <span
              className="inline-flex items-center justify-center rounded-lg h-10 w-10"
              style={{
                background: `color-mix(in oklab, var(--blog-chip-color) ${iconTintPct}, var(--surface-card))`,
              }}
              aria-hidden
            >
              <Icon
                name={meta.icon}
                className={clsx(
                  "w-6 h-6",
                  isDone
                    ? "text-fg-muted"
                    : "",
                )}
                style={
                  isDone
                    ? undefined
                    : { color: "var(--blog-chip-color)" }
                }
              />
            </span>
            <span className="mt-3 flex w-full flex-col items-start gap-0.5">
              <span
                className={clsx(
                  "font-sans text-base font-semibold",
                  isDone ? "text-fg-muted" : "text-fg",
                )}
              >
                {meta.label}
              </span>
              {captions?.[id] ? (
                <span className="text-xs text-fg-muted">
                  {captions[id]}
                </span>
              ) : null}
            </span>
            {isDone ? (
              <span
                aria-label="done"
                className="absolute bottom-2 right-2 inline-flex items-center justify-center rounded-full bg-ok text-white h-6 w-6"
              >
                <Icon name="check" className="w-4 h-4" />
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- *
 *  BlogRoleStrip                                                   *
 *  Role colored pill row for a German sentence. Subject blue,      *
 *  verb cherry, Mittelfeld neutral, verb2 cherry, so the two       *
 *  cherry pills at the ends of the clause show Verbklammer         *
 *  without naming it.                                              *
 * ---------------------------------------------------------------- */

export type SentenceRole =
  | "subject"
  | "verb"
  | "middle"
  | "object"
  | "verb2";

export interface SentencePiece {
  text: string;
  role: SentenceRole;
}

export interface BlogRoleStripProps {
  pieces: SentencePiece[];
  /** Optional translation rendered under the strip, muted. */
  translation?: string;
  className?: string;
}

const ROLE_COLOR: Record<SentenceRole, string> = {
  subject: "var(--article-der)", // blue
  verb: "var(--accent)",         // cherry
  middle: "var(--fg-muted)",     // neutral grey
  object: "var(--article-das)",  // green
  verb2: "var(--accent)",        // cherry, mirrors verb
};

/** Row of role tinted pills. Cherry pills at both ends of the row
 *  carry the Verbklammer visual. Middle pills render neutral so the
 *  two frame pills pop. */
export function BlogRoleStrip({
  pieces,
  translation,
  className,
}: BlogRoleStripProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-5 flex flex-col gap-3",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex flex-wrap gap-2">
        {pieces.map((p, i) => {
          const color = ROLE_COLOR[p.role];
          const isNeutral = p.role === "middle";
          return (
            <span
              key={`${p.text}-${i}`}
              className="inline-flex items-center px-3 py-1.5 rounded-full font-sans font-semibold text-[15px]"
              style={{
                color: isNeutral ? "var(--fg)" : color,
                background: isNeutral
                  ? "var(--surface-sunk)"
                  : `color-mix(in srgb, ${color} 12%, transparent)`,
                border: `1px solid ${
                  isNeutral
                    ? "var(--border)"
                    : `color-mix(in srgb, ${color} 32%, transparent)`
                }`,
              }}
            >
              {p.text}
            </span>
          );
        })}
      </div>
      {translation ? (
        <div className="font-sans font-normal text-[14px] text-fg-muted">
          {translation}
        </div>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- *
 *  BlogSentenceBuilder                                             *
 *  Two rows: a pool of uncolored chips (as they arrive in the      *
 *  exercise) and the placed row where chips take on role color     *
 *  once dropped in the right spot.                                 *
 * ---------------------------------------------------------------- */

export interface BlogSentenceBuilderProps {
  /** Shuffled pool: just text, no roles. Colored neutral. */
  pool: string[];
  /** Placed row: text + role, each pill in its role color. */
  placed: SentencePiece[];
  className?: string;
}

/** Side by side mock of the Sentence Builder. Pool chips stay
 *  neutral; placed chips earn the role color only when they land
 *  in the right spot. Mirrors the "color should not give the
 *  answer away" rule from CDP. */
export function BlogSentenceBuilder({
  pool,
  placed,
  className,
}: BlogSentenceBuilderProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-5 flex flex-col gap-4",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex flex-col gap-2">
        <div
          className="font-sans font-semibold text-[11px] uppercase text-fg-faint"
          style={{ letterSpacing: "0.4px" }}
        >
          Placed
        </div>
        <div
          className="flex flex-wrap gap-2 rounded-xl p-3 min-h-12"
          style={{
            background: "var(--surface-sunk)",
            border: "1px dashed var(--border)",
          }}
        >
          {placed.map((p, i) => {
            const color = ROLE_COLOR[p.role];
            const isNeutral = p.role === "middle";
            return (
              <span
                key={`placed-${p.text}-${i}`}
                className="inline-flex items-center px-3 py-1.5 rounded-full font-sans font-semibold text-[14px]"
                style={{
                  color: isNeutral ? "var(--fg)" : color,
                  background: isNeutral
                    ? "var(--surface-card)"
                    : `color-mix(in srgb, ${color} 14%, transparent)`,
                  border: `1px solid ${
                    isNeutral
                      ? "var(--border)"
                      : `color-mix(in srgb, ${color} 35%, transparent)`
                  }`,
                }}
              >
                {p.text}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="font-sans font-semibold text-[11px] uppercase text-fg-faint"
          style={{ letterSpacing: "0.4px" }}
        >
          Pool
        </div>
        <div className="flex flex-wrap gap-2">
          {pool.map((t, i) => (
            <span
              key={`pool-${t}-${i}`}
              className="inline-flex items-center px-3 py-1.5 rounded-full font-sans font-semibold text-[14px] text-fg"
              style={{
                background: "var(--surface-sunk)",
                border: "1px solid var(--border)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 *  BlogReadingExcerpt                                              *
 *  A short passage block with one word marked as "tappable"        *
 *  (dotted underline) and a translation chip sliding up under it.  *
 * ---------------------------------------------------------------- */

export interface BlogReadingExcerptProps {
  /** Whole passage as a single string. The target word must match
   *  the `tappable` prop verbatim; the first occurrence is marked. */
  passage: string;
  tappable: string;
  /** Translation shown in the chip. */
  translation: string;
  /** Optional infinitive shown inside the chip, useful for
   *  separable verbs where the tapped token is just "ab" or
   *  "holen". */
  infinitive?: string;
  className?: string;
}

/** Short passage snippet. The target word carries a dotted
 *  underline in the Reading blue, and a translation chip renders
 *  below the passage as if it just slid up from the bottom. */
export function BlogReadingExcerpt({
  passage,
  tappable,
  translation,
  infinitive,
  className,
}: BlogReadingExcerptProps) {
  const idx = passage.indexOf(tappable);
  const before = idx >= 0 ? passage.slice(0, idx) : passage;
  const after = idx >= 0 ? passage.slice(idx + tappable.length) : "";
  const readingColor = "var(--chip-reading-color)";
  return (
    <div
      className={clsx(
        "rounded-2xl p-5 flex flex-col gap-4",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      <p className="font-sans text-[16px] text-fg leading-relaxed m-0">
        {before}
        {idx >= 0 ? (
          <span
            className="font-semibold"
            style={{
              color: readingColor,
              borderBottom: `2px dotted ${readingColor}`,
              paddingBottom: "1px",
            }}
          >
            {tappable}
          </span>
        ) : null}
        {after}
      </p>
      <div
        className="inline-flex self-start items-center gap-2 px-3 py-2 rounded-full"
        style={{
          background: `color-mix(in srgb, ${readingColor} 10%, transparent)`,
          border: `1px solid color-mix(in srgb, ${readingColor} 30%, transparent)`,
        }}
      >
        <span
          className="font-sans font-semibold text-[13px]"
          style={{ color: readingColor }}
        >
          {infinitive ?? tappable}
        </span>
        <span className="font-sans text-[13px] text-fg-muted">
          {translation}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 *  BlogSkillRingRow                                                *
 *  Row of SkillRings with sample progress and momentum arrows.     *
 *  Uses the real SkillRing atom so the ring art matches the app.   *
 * ---------------------------------------------------------------- */

export type Momentum = "up" | "down" | "stable";
export type BlogSkill = "vocab" | "grammar" | "writing" | "reading";

export interface BlogSkillState {
  skill: BlogSkill;
  value: number;      // 0..100
  momentum?: Momentum;
}

export interface BlogSkillRingRowProps {
  skills: BlogSkillState[];
  /** Ring size. Defaults to sm (64px) so four fit on a column. */
  size?: "xs" | "sm" | "md";
  className?: string;
}

const MOMENTUM_GLYPH: Record<Momentum, string> = {
  up: "↑",
  down: "↓",
  stable: "·",
};

const MOMENTUM_COLOR: Record<Momentum, string> = {
  up: "var(--ok)",
  down: "var(--accent)",
  stable: "var(--fg-faint)",
};

const SKILL_LABEL: Record<BlogSkill, string> = {
  vocab: "Vocab",
  grammar: "Grammar",
  writing: "Writing",
  reading: "Reading",
};

/** Row of four SkillRings with their labels and momentum arrows.
 *  The momentum arrow renders next to the label, not inside the
 *  ring, matching the SkillStrip layout. */
export function BlogSkillRingRow({
  skills,
  size = "sm",
  className,
}: BlogSkillRingRowProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-5",
        "grid grid-cols-2 sm:grid-cols-4 gap-4",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      {skills.map((s) => {
        const momentum = s.momentum ?? "stable";
        return (
          <div
            key={s.skill}
            className="flex flex-col items-center gap-2"
          >
            <SkillRing
              skill={s.skill}
              progress={Math.min(Math.max(s.value / 100, 0), 1)}
              size={size}
              hideLabel
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-semibold text-[13px] text-fg">
                {SKILL_LABEL[s.skill]}
              </span>
              <span
                className="font-sans font-bold text-[14px] leading-none"
                style={{ color: MOMENTUM_COLOR[momentum] }}
                aria-label={`momentum ${momentum}`}
              >
                {MOMENTUM_GLYPH[momentum]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
