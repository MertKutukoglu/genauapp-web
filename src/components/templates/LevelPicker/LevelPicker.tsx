"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import {
  LevelButton,
  type CEFRLevel,
} from "@/components/atoms/LevelButton/LevelButton";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * LevelPicker — the gateway screen between landing and /try/.
 *
 * Four CEFR cards in a 4-col grid that collapses to 2 cols at ≤820px
 * and 1 col at ≤480px. The user picks one; the parent takes them
 * into the demo tuned to that level.
 *
 * C1/C2 aren't rendered at all right now — the live demand data
 * suggests they don't justify the content investment yet. The
 * LevelButton atom keeps a `soon` variant in its API for the day
 * they come back as locked tiles.
 *
 * Copy is Mert's own, written for the brand's second-person, direct
 * voice — don't edit it into something more generic.
 */

type OfferedLevel = Extract<CEFRLevel, "A1" | "A2" | "B1" | "B2">;
const LEVEL_ORDER: OfferedLevel[] = ["A1", "A2", "B1", "B2"];

export interface LevelPickerProps {
  /** Currently-chosen level; drives the selected ring on that card. */
  selected?: CEFRLevel | null;
  /** Fires when a user taps an active level. Parent owns the nav. */
  onSelect?: (level: CEFRLevel) => void;
  className?: string;
}

export function LevelPicker({
  selected,
  onSelect,
  className,
}: LevelPickerProps) {
  const { strings } = useLocale();
  const t = strings.try.levelPicker;
  return (
    <section
      aria-label={t.heading}
      className={clsx(
        "mx-auto w-full max-w-[1040px]",
        "px-6 py-14 md:py-20",
        className,
      )}
    >
      <header className="text-center mb-10 md:mb-12">
        <p
          className={clsx(
            "font-sans text-[11px] font-bold uppercase tracking-[0.12em]",
            "text-accent mb-3",
          )}
        >
          {t.eyebrow}
        </p>
        <h1
          className={clsx(
            "font-display italic font-semibold text-fg",
            "text-[36px] sm:text-[44px] md:text-[48px] leading-[1.08]",
            "max-w-[720px] mx-auto",
          )}
        >
          {t.heading}
        </h1>
        <p
          className={clsx(
            "mt-4 font-sans text-[15px] md:text-base text-fg-muted",
            "max-w-[520px] mx-auto leading-relaxed",
          )}
        >
          {t.sub}
        </p>
      </header>

      {/* Grid: 4-col ≥820px, 2-col 480-819px, 1-col ≤479px */}
      <div
        className={clsx(
          "grid gap-3 md:gap-4",
          "grid-cols-1",
          "min-[480px]:grid-cols-2",
          "min-[820px]:grid-cols-4",
        )}
      >
        {LEVEL_ORDER.map((lvl) => {
          const card = t.cards[lvl];
          return (
            <LevelButton
              key={lvl}
              level={lvl}
              label={card.tagline}
              description={card.description}
              selected={selected === lvl}
              onClick={() => onSelect?.(lvl)}
            />
          );
        })}
      </div>
    </section>
  );
}
