"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import {
  LevelButton,
  type CEFRLevel,
} from "@/components/atoms/LevelButton/LevelButton";

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

interface LevelConfig {
  level: CEFRLevel;
  label: string;
  description: string;
}

const LEVELS: LevelConfig[] = [
  {
    level: "A1",
    label: "Starting out.",
    description:
      "Basic verbs, articles, days and meals. If you can say your name in German, this is for you.",
  },
  {
    level: "A2",
    label: "Building routines.",
    description:
      "Past tense, weil/dass, reflexive verbs. You can describe your week, read a short note.",
  },
  {
    level: "B1",
    label: "Holding your own.",
    description:
      "Opinions, hypotheticals, longer stories. You can argue, explain, read articles.",
  },
  {
    level: "B2",
    label: "Getting fluent.",
    description:
      "Idioms, nuance, abstract topics. You could run a meeting in German if you had to.",
  },
];

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
  return (
    <section
      aria-label="Pick your level"
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
          Try it in your browser
        </p>
        <h1
          className={clsx(
            "font-display italic font-semibold text-fg",
            "text-[36px] sm:text-[44px] md:text-[48px] leading-[1.08]",
            "max-w-[720px] mx-auto",
          )}
        >
          Where are you with German?
        </h1>
        <p
          className={clsx(
            "mt-4 font-sans text-[15px] md:text-base text-fg-muted",
            "max-w-[520px] mx-auto leading-relaxed",
          )}
        >
          Pick your level. The five-minute demo tunes itself to where you
          actually are.
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
        {LEVELS.map((l) => (
          <LevelButton
            key={l.level}
            level={l.level}
            label={l.label}
            description={l.description}
            selected={selected === l.level}
            onClick={() => onSelect?.(l.level)}
          />
        ))}
      </div>
    </section>
  );
}
