"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ModeToggle, type WordsMode } from "@/components/molecules/ModeToggle/ModeToggle";
import { NormalLearnCard } from "@/components/organisms/NormalLearnCard/NormalLearnCard";
import { LearnCompletion } from "@/components/organisms/LearnCompletion/LearnCompletion";
import type { ArticleColor } from "@/components/molecules/WordSection/WordSection";
import type { GrammarTag } from "@/components/molecules/GrammarTagPills/GrammarTagPills";

/**
 * WordsChip — the right-card experience when the user picks the Words
 * chip. Owns:
 *   - mode (learn / exercise) via the ModeToggle at the top
 *   - the Learn deck's remaining-words state + Repeat/I-know mechanics
 *   - routing between Learn card / Learn completion / Exercise stub
 *
 * Deck mechanics (spec §8):
 *   - I know  → head card removed; deck shrinks
 *   - Repeat  → head card removed + reinserted at a random later index
 *               (not back at position 0); deck size unchanged
 *   - Counter: `currentIndex = deckSize - remainingCount + 1`
 *     Repeat does NOT advance the counter; I-know does.
 *
 * Exercise mode in this round is a placeholder — the Exercise cards
 * (article picker + translation quiz + keyboard write + feedback
 * banner) land in their own spec'd round. The toggle + completion
 * flow are wired now so the shell is testable end-to-end.
 *
 * State is local to the component (useState). If we later need deck
 * state across refreshes, migrate to a dedicated wordsStore — the
 * refactor is one find-replace.
 */

export interface WordsChipWord {
  id: string;
  german: string;
  english: string;
  article?: ArticleColor;
  grammarTags?: GrammarTag[];
  example?: string;
  rule?: string;
}

export interface WordsChipProps {
  /** The Learn deck. For the taste demo: 5 words (3 nouns + 2 verbs). */
  words: WordsChipWord[];
  /** Initial mode when the chip mounts. Defaults to 'learn'. */
  initialMode?: WordsMode;
  className?: string;
}

export function WordsChip({
  words,
  initialMode = "learn",
  className,
}: WordsChipProps) {
  const [mode, setMode] = React.useState<WordsMode>(initialMode);
  const [remaining, setRemaining] = React.useState<WordsChipWord[]>(words);

  // Re-seed the deck whenever the input words array changes. Lets the
  // parent swap decks (different chip, different level) without
  // remounting WordsChip.
  const wordsKey = React.useMemo(() => words.map((w) => w.id).join("|"), [words]);
  React.useEffect(() => {
    // Intentional state-from-external-input sync: new deck → reseed.
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
    setRemaining(words);
  }, [wordsKey]);

  const deckSize = words.length;
  const remainingCount = remaining.length;
  const currentIndex = deckSize - remainingCount + 1;
  const current = remaining[0];
  const learnCompleted = remainingCount === 0 && deckSize > 0;

  const handleRepeat = React.useCallback(() => {
    setRemaining((r) => {
      if (r.length === 0) return r;
      if (r.length === 1) return r; // one card left → stays in slot 0
      const [head, ...rest] = r;
      // Insert at a random index in 1..rest.length (never back to head)
      const idx = 1 + Math.floor(Math.random() * rest.length);
      return [...rest.slice(0, idx), head, ...rest.slice(idx)];
    });
    try {
      window.__track?.("demo_learn_repeat", { chip: "words" });
    } catch {
      /* no-op */
    }
  }, []);

  const handleIKnow = React.useCallback(() => {
    setRemaining((r) => r.slice(1));
    try {
      window.__track?.("demo_learn_iknow", { chip: "words" });
    } catch {
      /* no-op */
    }
  }, []);

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <ModeToggle mode={mode} onChange={setMode} />

      {mode === "learn" ? (
        learnCompleted ? (
          <LearnCompletion onSwitchToExercise={() => setMode("exercise")} />
        ) : current ? (
          <NormalLearnCard
            // key on word id → React remounts the card on each swap,
            // which is the fade + slide in disguise once we wire
            // AnimatePresence. For now it's a clean cut.
            key={current.id}
            german={current.german}
            english={current.english}
            article={current.article}
            grammarTags={current.grammarTags}
            example={current.example}
            rule={current.rule}
            current={currentIndex}
            total={deckSize}
            onRepeat={handleRepeat}
            onIKnow={handleIKnow}
          />
        ) : (
          <EmptyDeck />
        )
      ) : (
        <ExerciseStub onBackToLearn={() => setMode("learn")} />
      )}
    </div>
  );
}

function EmptyDeck() {
  return (
    <div className="bg-surface-card rounded-3xl p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <p className="font-sans text-fg-muted m-0">No words in this deck yet.</p>
    </div>
  );
}

function ExerciseStub({ onBackToLearn }: { onBackToLearn: () => void }) {
  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl px-6 py-10 text-center",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col items-center gap-5",
      )}
    >
      <h2 className="font-display italic font-semibold text-2xl text-fg m-0 leading-tight">
        Exercise is on its way.
      </h2>
      <p className="font-sans text-[15px] text-fg-muted m-0 leading-relaxed max-w-md">
        The testing side of the Words chip lands in the next update.
        Flip back to Learn to try the deck.
      </p>
      <button
        type="button"
        onClick={onBackToLearn}
        className={clsx(
          "inline-flex items-center justify-center gap-2 h-[44px] px-5 rounded-full",
          "border border-border-strong bg-transparent",
          "font-sans font-semibold text-sm text-fg",
          "transition hover:bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        ← Back to Learn
      </button>
    </div>
  );
}
