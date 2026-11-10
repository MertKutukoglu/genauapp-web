"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { useChipStore, type ChipId } from "@/stores/chipStore";
import { RightCardPlaceholder } from "@/components/molecules/RightCardPlaceholder/RightCardPlaceholder";
import { WordsChip } from "@/components/organisms/WordsChip/WordsChip";
import { GrammarChip } from "@/components/organisms/GrammarChip/GrammarChip";
import { WORDS_A1 } from "@/content/words-a1";
import { GRAMMAR_A1 } from "@/content/grammar-a1";

/**
 * RightCardRouter — resolves `chipStore.selected` to the right-column
 * content on the /try/ page.
 *
 * Current map:
 *   - null                → RightCardPlaceholder (idle)
 *   - 'words'             → <WordsChip words={WORDS_A1} />
 *   - 'grammar' | 'sentence' | 'reading'
 *                         → RightCardPlaceholder (stub — chip wiring
 *                           lands when that chip's content ships)
 *
 * Mobile auto-focus: when `selected` transitions from null → a chip,
 * the component scrolls its own node into view with smooth behavior.
 * Desktop (lg+) keeps the two cards side-by-side as a sticky pair, so
 * we skip the scroll above the lg breakpoint via a media-query guard.
 * The lg guard also prevents a jarring re-scroll on desktop when the
 * user swaps chips.
 *
 * The level is hard-coded to A1 for now because the rest of the A2/B1/B2
 * decks haven't landed yet; once they do, we'll read
 * `chipStore.selectedLevel` and pick a deck per level.
 */

export interface RightCardRouterProps {
  className?: string;
}

export function RightCardRouter({ className }: RightCardRouterProps) {
  const selected = useChipStore((s) => s.selected);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Smooth-scroll the right card into view on mobile when a chip opens.
  // Only fires on the null → chip transition; chip → other-chip skips.
  const prevSelected = React.useRef<ChipId | null>(selected);
  React.useEffect(() => {
    const was = prevSelected.current;
    prevSelected.current = selected;

    if (!selected) return;
    if (was === selected) return;
    if (was !== null && was !== undefined) return; // chip → chip, no re-scroll

    if (typeof window === "undefined") return;
    // Skip auto-scroll on lg+ where both cards are visible side-by-side.
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    const node = containerRef.current;
    if (!node) return;

    // Let the swap settle (a frame or two) before scrolling so the right
    // card's real height is in layout.
    const raf = window.requestAnimationFrame(() => {
      node.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [selected]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        // Desktop: fill the grid row so the right column matches the
        // LeftCard's height when its own content is shorter. Inner
        // children drop `lg:h-full` to actually stretch.
        "flex flex-col lg:h-full",
        className,
      )}
      style={{ scrollMarginTop: 84 }}
    >
      {selected === "words" ? (
        <WordsChip words={WORDS_A1} className="lg:flex-1 lg:h-full" />
      ) : selected === "grammar" ? (
        <GrammarChip items={GRAMMAR_A1} className="lg:flex-1 lg:h-full" />
      ) : (
        <RightCardPlaceholder
          selectedChip={selected}
          className="lg:flex-1 lg:h-full"
        />
      )}
    </div>
  );
}
