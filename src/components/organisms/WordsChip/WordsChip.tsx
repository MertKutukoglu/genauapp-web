"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ModeToggle, type WordsMode } from "@/components/molecules/ModeToggle/ModeToggle";
import { NormalLearnCard } from "@/components/organisms/NormalLearnCard/NormalLearnCard";
import { AssemblyLearnCard } from "@/components/organisms/AssemblyLearnCard/AssemblyLearnCard";
import { LearnCompletion } from "@/components/organisms/LearnCompletion/LearnCompletion";
import { pickLearnCardType, type LearnCardVariant } from "@/lib/words/pickLearnCardType";
import type { WordItem } from "@/content/words-a1";

/**
 * WordsChip — the right-card experience when the user picks the Words
 * chip. Owns:
 *   - mode (learn / exercise) via the ModeToggle at the top
 *   - the Learn deck's remaining-items state + Repeat/I-know mechanics
 *   - Learn-variant routing per card (normal / scrambled / chunkCompose)
 *     via pickLearnCardType, random per card per spec §3.1
 *   - routing between Learn card / Learn completion / Exercise stub
 *
 * Deck mechanics (spec §8):
 *   - I know  → head card removed; deck shrinks
 *   - Repeat  → head card removed + reinserted at a random later index
 *               (not back at position 0); deck size unchanged
 *   - Counter: `currentIndex = deckSize - remainingCount + 1`
 *     Repeat does NOT advance the counter; I-know does.
 *
 * The Learn variant is picked when the current card changes (via
 * remainingKey). Same word on Repeat gets a fresh pick, which keeps
 * the walk visually fresh. ChunkCompose only enters the pool when the
 * word's chunks have ≥ 2 elements; single-chunk words fall back to
 * [normal, scrambled].
 *
 * Exercise mode in this round is a placeholder — the Exercise cards
 * land in their own spec'd round.
 */

export interface WordsChipProps {
  /** The full Learn+Exercise deck (20 items for the A1 taste demo). */
  words: WordItem[];
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
  const [remaining, setRemaining] = React.useState<WordItem[]>(words);

  // Re-seed the deck whenever the input words array changes. Lets the
  // parent swap decks (different chip, different level) without
  // remounting WordsChip.
  const wordsKey = React.useMemo(
    () => words.map((w) => w.learn.word).join("|"),
    [words],
  );
  React.useEffect(() => {
    // Intentional state-from-external-input sync: new deck → reseed.
    // Dep is wordsKey (not words) so we don't fire on array-identity
    // changes that carry the same content.
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
    setRemaining(words);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsKey]);

  const deckSize = words.length;
  const remainingCount = remaining.length;
  const currentIndex = deckSize - remainingCount + 1;
  const current = remaining[0];
  const learnCompleted = remainingCount === 0 && deckSize > 0;

  // Pick a Learn variant for the current card. Keyed on the card's
  // word so Repeat on the same card gets a fresh variant; different
  // deck entirely also triggers a fresh pick.
  const currentWord = current?.learn.word;
  const currentChunks = current?.chunks;
  const variant: LearnCardVariant = React.useMemo(() => {
    if (!currentChunks) return "normal";
    return pickLearnCardType({ chunks: currentChunks });
  }, [currentWord, currentChunks]);

  const handleRepeat = React.useCallback(() => {
    setRemaining((r) => {
      if (r.length === 0) return r;
      if (r.length === 1) return r;
      const [head, ...rest] = r;
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
          <LearnCardSwitch
            key={current.learn.word}
            variant={variant}
            word={current}
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

interface LearnCardSwitchProps {
  variant: LearnCardVariant;
  word: WordItem;
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
}

function LearnCardSwitch({
  variant,
  word,
  current,
  total,
  onRepeat,
  onIKnow,
}: LearnCardSwitchProps) {
  if (variant === "normal") {
    return (
      <NormalLearnCard
        topic={word.topic}
        german={word.learn.word}
        english={word.learn.english}
        article={word.learn.article}
        grammarTags={word.grammarTags}
        example={word.learn.sample.de}
        rule={word.learn.rule}
        current={current}
        total={total}
        onRepeat={onRepeat}
        onIKnow={onIKnow}
      />
    );
  }

  // Assembly variants: no sample / rule / Repeat per Mert's iOS reference.
  // Auto-advance handles the deck step when the user solves the puzzle.
  return (
    <AssemblyLearnCard
      mode={variant === "scrambled" ? "scrambled" : "chunkCompose"}
      topic={word.topic}
      word={word.learn.word}
      english={word.learn.english}
      article={word.learn.article}
      chunks={word.chunks}
      current={current}
      total={total}
      onIKnow={onIKnow}
    />
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
