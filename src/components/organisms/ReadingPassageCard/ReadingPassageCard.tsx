"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ReadingHighlight } from "@/content/reading-a1";
import {
  tokenizeHighlights,
  groupByParagraph,
  type HighlightToken,
} from "@/lib/reading/tokenizeHighlights";
import { HighlightChip } from "@/components/molecules/HighlightChip/HighlightChip";

/**
 * ReadingPassageCard — the Reading chip's Read-mode card. One
 * passage, prose on the card surface, cherry "Try the questions →"
 * CTA at the bottom.
 *
 * Brief §3 design rule (non-negotiable): the passage renders as a
 * plain `<p>` directly on the card. No sunk container, no border,
 * no padding beyond the card's own 20. Wrapping prose in an inner
 * surface reads as a quote-pull, which the passage is not.
 *
 * The toolbar's counter pill is hidden here — Reading has one
 * passage, so there's no "card N of total" to show. The
 * CardToolbar molecule accepts undefined current/total and
 * collapses the pill accordingly.
 *
 * Tap-to-translate: if the passage ships `highlights`, those words
 * render as subtle underlined buttons inside the prose. Tapping
 * one opens a HighlightChip pinned to the top of the card, with
 * the German lemma, EN or TR translation, audio and bookmark
 * affordances. Tapping another highlight swaps the chip's content;
 * the X in the chip closes it; tapping the same word again toggles
 * it closed.
 */

export interface ReadingPassageCardProps {
  title: string;
  subtitle: string;
  /** Full German text. `\n\n` splits paragraphs. */
  passage: string;
  /** Optional tap-to-translate hints over the prose. */
  highlights?: ReadingHighlight[];
  onStartExercise?: () => void;
  className?: string;
}

/** Stable identity for a highlight (lemma preferred, else surface). */
function highlightKey(h: ReadingHighlight): string {
  return h.lemma ?? h.surface;
}

export function ReadingPassageCard({
  title,
  subtitle,
  passage,
  highlights,
  onStartExercise,
  className,
}: ReadingPassageCardProps) {
  const { locale } = useLocale();
  const ctaLabel =
    locale === "tr" ? "Soruları dene →" : "Try the questions →";

  // Tokenize once per passage/highlights change. Grouping back by
  // paragraph keeps the <p> layout we had before — the only change
  // is that some tokens now become <button>s.
  const paragraphs = React.useMemo(() => {
    const tokens = tokenizeHighlights(passage, highlights);
    return groupByParagraph(tokens);
  }, [passage, highlights]);

  const [active, setActive] = React.useState<ReadingHighlight | null>(null);

  // Clear the active chip if the passage changes (level switch,
  // etc.) — a chip stuck on a word from the previous passage would
  // never find a matching highlight to re-open.
  React.useEffect(() => {
    setActive(null);
  }, [passage]);

  const handleHighlightTap = React.useCallback(
    (h: ReadingHighlight) => {
      // Toggle off when tapping the same highlight that's already
      // open; swap otherwise.
      setActive((prev) =>
        prev && highlightKey(prev) === highlightKey(h) ? null : h,
      );
    },
    [],
  );

  return (
    <div
      className={clsx(
        tryCardSurface,
        "rounded-3xl p-5",
        "flex flex-col gap-5",
        className,
      )}
    >
      {/* No counter pill — one passage, no deck position. The speaker
          target is the full passage (TTS-friendly German with
          lang='de-DE' inside SpeakerButton). */}
      <CardToolbar speakText={passage} />

      {/* Header — title + subtitle, centered. */}
      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-bold text-[24px] text-fg leading-tight">
          {title}
        </div>
        <div
          className="font-sans font-normal text-[13px] text-fg-muted leading-snug"
          style={{ letterSpacing: "0.3px" }}
        >
          {subtitle}
        </div>
      </div>

      {/* Passage — plain prose, directly on the card. Tokens render
          as text runs or highlight buttons depending on the token's
          kind. 16/1.7 for breathing room. */}
      <div className="flex flex-col gap-3 flex-1">
        {paragraphs.map((paraTokens, i) => (
          <p
            key={i}
            className="font-sans font-normal text-base text-fg m-0"
            style={{ lineHeight: 1.7 }}
          >
            {paraTokens.map((t, j) =>
              t.kind === "text" ? (
                <React.Fragment key={j}>{t.text}</React.Fragment>
              ) : (
                <HighlightMark
                  key={j}
                  token={t}
                  isActive={
                    active != null &&
                    highlightKey(active) === highlightKey(t.highlight)
                  }
                  onTap={handleHighlightTap}
                />
              ),
            )}
          </p>
        ))}
      </div>

      {/* Bottom-pinned stack: the optional HighlightChip sits
          immediately above the CTA, and the whole stack is
          sticky-to-viewport-bottom so a learner scrolling through
          a long passage (B1 / B2) always has the translation of
          whichever word they just tapped within reach, not
          buried at the top. A subtle bg-blur strip underneath
          keeps text from showing through the chip. When nothing's
          active, only the CTA stickies. */}
      <div
        className={clsx(
          "sticky bottom-0 -mx-5 -mb-5 px-5 pt-3 pb-5 z-10",
          "flex flex-col gap-3",
          // Fade the card surface in behind so the sticky stack
          // reads as its own layer over the scrolling passage.
          "backdrop-blur-sm",
        )}
        style={{
          background:
            "linear-gradient(to top, var(--surface-card) 70%, color-mix(in srgb, var(--surface-card) 0%, transparent))",
        }}
      >
        {active ? (
          <HighlightChip
            highlight={active}
            onClose={() => setActive(null)}
          />
        ) : null}
        <button
          type="button"
          onClick={onStartExercise}
          className={clsx(
            "h-[52px] rounded-2xl w-full",
            "font-sans font-bold text-base text-white",
            "transition-colors cursor-pointer hover:brightness-105",
          )}
          style={{ background: "var(--accent)" }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

/**
 * HighlightMark — an inline <button> that renders a single
 * highlighted word in the passage. Visual: subtle 1.5px underline
 * in the accent color so the word reads as "tap me" without
 * shouting at the reader. Active state deepens the underline and
 * tints the background slightly.
 *
 * The button sits inside a <p>, so we have to set `display: inline`
 * and keep it baseline-aligned — using an <a>-style inline element
 * instead of block button so it wraps across lines naturally.
 */
function HighlightMark({
  token,
  isActive,
  onTap,
}: {
  token: Extract<HighlightToken, { kind: "highlight" }>;
  isActive: boolean;
  onTap: (h: ReadingHighlight) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onTap(token.highlight)}
      className={clsx(
        "inline-baseline cursor-pointer bg-transparent border-0 p-0",
        "font-inherit text-inherit",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bg rounded-sm",
      )}
      style={{
        // Dashed underline reads as "annotated" without competing
        // with the passage's own punctuation. Active state swaps to
        // a solid, slightly thicker underline and tints the word.
        textDecoration: "underline",
        textDecorationStyle: isActive ? "solid" : "dashed",
        textDecorationColor: isActive
          ? "var(--accent)"
          : "color-mix(in srgb, var(--accent) 60%, transparent)",
        textDecorationThickness: isActive ? "2px" : "1.5px",
        textUnderlineOffset: "3px",
        backgroundColor: isActive
          ? "color-mix(in srgb, var(--accent) 10%, transparent)"
          : "transparent",
        color: "inherit",
        borderRadius: isActive ? "3px" : "0",
        padding: isActive ? "0 2px" : "0",
      }}
    >
      {token.text}
    </button>
  );
}
