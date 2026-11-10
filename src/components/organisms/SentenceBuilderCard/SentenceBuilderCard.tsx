"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { WordChip } from "@/components/molecules/WordChip/WordChip";
import { ExerciseFeedback } from "@/components/molecules/ExerciseFeedback/ExerciseFeedback";
import { RoleSegment } from "@/components/molecules/RoleSegment/RoleSegment";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { FormulaExample } from "@/content/sentence-a1";

/**
 * SentenceBuilderCard — the Sentence chip's single Exercise card:
 * a tap-to-order word-chip reorderer (brief §5).
 *
 * The user taps words from the shuffled pool below. Each tap moves
 * the word into the next empty slot in the top row. Tapping a placed
 * chip returns it to its original pool position (so the pool order
 * stays stable across place/unplace cycles). When all slots fill,
 * the teal Check button enables. Correct → auto-advance in 1.4s;
 * wrong → chips light up green/red per position, Incorrect banner
 * reveals the correct sentence with Next.
 *
 * Shuffle is one-shot per item (seeded on the `wordsKey`) so React
 * re-renders don't reshuffle under the user. `words` itself is the
 * canonical order; `correctOrder` is identity in current content —
 * we always validate against `words` by position for safety.
 */

export interface SentenceBuilderCardProps {
  topic: string;
  /** Canonical sentence tokens in correct order (punctuation attached). */
  words: string[];
  /**
   * Optional role-colored segments to render inside the Incorrect
   * feedback banner (passed from the anchor's `learn.examples[0]`).
   * Pack-themed scenes don't ship this; they fall back to plain fg.
   */
  revealSegments?: FormulaExample["segments"];
  current: number;
  total: number;
  onNext?: (result: { correct: boolean }) => void;
  className?: string;
}

const CORRECT_ADVANCE_MS = 1400;

/**
 * Deterministic Fisher-Yates: same `seed` string → same permutation.
 * We key the shuffle on the sentence words joined, so re-mounts
 * within the same item pick the same order; a new item (new seed)
 * picks fresh.
 */
function shuffleIndices(length: number, seed: string): number[] {
  // Tiny hash: FNV-1a 32-bit. Enough entropy for a deck of 3–5 items.
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // Mulberry32 RNG from the hash.
  const rand = (): number => {
    h |= 0;
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const idx = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  // If the shuffle happened to leave the sentence in canonical order
  // on short arrays (likely for length ≤ 3), rotate once so the drill
  // still asks something of the user.
  const isIdentity = idx.every((v, i) => v === i);
  if (isIdentity && length > 1) {
    idx.push(idx.shift()!);
  }
  return idx;
}

export function SentenceBuilderCard({
  topic,
  words,
  revealSegments,
  current,
  total,
  onNext,
  className,
}: SentenceBuilderCardProps) {
  const { locale } = useLocale();
  const instructionLabel =
    locale === "tr" ? "Cümleyi oluştur." : "Build the sentence.";

  const wordsKey = React.useMemo(() => words.join("|"), [words]);

  /**
   * poolOrder is the display order of the pool chips — a shuffled
   * permutation of word indices. It never changes once the item
   * mounts. `placed` holds the indices the user has placed, in slot
   * order (null = empty slot).
   */
  const poolOrder = React.useMemo(
    () => shuffleIndices(words.length, wordsKey),
    [words.length, wordsKey],
  );
  const [placed, setPlaced] = React.useState<(number | null)[]>(() =>
    Array(words.length).fill(null),
  );
  const [commit, setCommit] = React.useState<null | { correct: boolean }>(
    null,
  );

  // Reset when the item changes.
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlaced(Array(words.length).fill(null));
    setCommit(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsKey]);

  const placedSet = React.useMemo(() => {
    const s = new Set<number>();
    placed.forEach((v) => {
      if (v !== null) s.add(v);
    });
    return s;
  }, [placed]);

  const allFull = placed.every((v) => v !== null);

  const handleTapPool = React.useCallback(
    (wordIdx: number) => {
      if (commit !== null) return;
      if (placedSet.has(wordIdx)) return;
      setPlaced((p) => {
        const next = [...p];
        const firstEmpty = next.findIndex((v) => v === null);
        if (firstEmpty < 0) return p;
        next[firstEmpty] = wordIdx;
        return next;
      });
    },
    [commit, placedSet],
  );

  const handleTapPlaced = React.useCallback(
    (slotIdx: number) => {
      if (commit !== null) return;
      setPlaced((p) => {
        if (p[slotIdx] === null) return p;
        const next = [...p];
        next[slotIdx] = null;
        return next;
      });
    },
    [commit],
  );

  const handleCheck = React.useCallback(() => {
    if (commit !== null || !allFull) return;
    const correct = placed.every(
      (v, i) => v !== null && words[v] === words[i],
    );
    setCommit({ correct });
  }, [commit, allFull, placed, words]);

  const handleNext = React.useCallback(() => {
    if (commit === null) return;
    onNext?.({ correct: commit.correct });
  }, [commit, onNext]);

  // Auto-advance on correct.
  React.useEffect(() => {
    if (!commit?.correct) return;
    const timer = window.setTimeout(() => {
      onNext?.({ correct: true });
    }, CORRECT_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [commit, onNext]);

  // Per-slot verdict after commit: correct if the placed index equals
  // the slot index (identity-order canonical). `commit` null → no
  // verdict yet, chips stay in the placed teal state.
  const verdict = React.useCallback(
    (slotIdx: number): "correct" | "wrong" | null => {
      if (!commit) return null;
      const placedIdx = placed[slotIdx];
      if (placedIdx === null) return null;
      return words[placedIdx] === words[slotIdx] ? "correct" : "wrong";
    },
    [commit, placed, words],
  );

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-5",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-5",
        "min-h-[400px]",
        className,
      )}
    >
      <CardToolbar current={current} total={total} />

      {commit ? (
        <ExerciseFeedback
          state={commit.correct ? "correct" : "incorrect"}
          explanation={
            !commit.correct ? (
              <CorrectReveal
                words={words}
                revealSegments={revealSegments}
              />
            ) : undefined
          }
          onNext={!commit.correct ? handleNext : undefined}
        />
      ) : null}

      <div
        className="font-sans font-normal text-[13px] text-fg-muted uppercase"
        style={{ letterSpacing: "0.3px" }}
      >
        {topic}
      </div>

      <div className="font-sans font-normal text-[15px] text-fg-muted text-center">
        {instructionLabel}
      </div>

      {/* Slot row — dashed outline container, min-height 80, flex wrap */}
      <div
        className="rounded-2xl p-4 min-h-[80px] flex flex-wrap gap-2 items-center"
        style={{
          background: "var(--surface-sunk)",
          border: "1px dashed color-mix(in srgb, var(--fg) 20%, transparent)",
        }}
      >
        {placed.map((wordIdx, slotIdx) =>
          wordIdx === null ? (
            <EmptySlot key={`slot-${slotIdx}`} />
          ) : (
            <WordChip
              key={`slot-${slotIdx}`}
              text={words[wordIdx]}
              state={verdict(slotIdx) ?? "placed"}
              onClick={
                commit === null ? () => handleTapPlaced(slotIdx) : undefined
              }
              locked={commit !== null}
            />
          ),
        )}
      </div>

      {/* Pool row — shuffled chips. A chip that has been placed is
          rendered as an invisible gap in the pool so the layout
          doesn't collapse when the user places one; the same slot
          re-appears when they un-tap. */}
      <div className="flex flex-wrap justify-center gap-2 py-2">
        {poolOrder.map((wordIdx) => {
          const isPlaced = placedSet.has(wordIdx);
          return (
            <WordChip
              key={`pool-${wordIdx}`}
              text={words[wordIdx]}
              state="idle"
              onClick={
                isPlaced || commit !== null
                  ? undefined
                  : () => handleTapPool(wordIdx)
              }
              locked={isPlaced || commit !== null}
              className={clsx(isPlaced && "opacity-0 pointer-events-none")}
            />
          );
        })}
      </div>

      {commit === null ? (
        <button
          type="button"
          onClick={handleCheck}
          disabled={!allFull}
          className={clsx(
            "h-[52px] rounded-2xl w-full mt-auto",
            "font-sans font-bold text-base text-white",
            "transition-colors",
            allFull
              ? "cursor-pointer hover:brightness-105"
              : "cursor-not-allowed",
          )}
          style={{
            background: allFull
              ? "var(--chip-sentence-color)"
              : "color-mix(in srgb, var(--fg) 30%, transparent)",
          }}
        >
          {locale === "tr" ? "Kontrol et" : "Check"}
        </button>
      ) : (
        // On correct, the auto-advance timer carries the user on — no
        // visible Next needed. The Incorrect banner above already
        // owns its own Next.
        <div className="mt-auto" />
      )}
    </div>
  );
}

/**
 * EmptySlot — the dashed-outline placeholder for an unfilled slot.
 * Matches the WordChip's min-height so the slot row doesn't jump
 * when chips fill it.
 */
function EmptySlot() {
  return (
    <div
      className="min-h-[44px] w-14 rounded-[12px]"
      style={{
        border:
          "1.5px dashed color-mix(in srgb, var(--fg) 15%, transparent)",
      }}
      aria-hidden
    />
  );
}

/**
 * CorrectReveal — the "correct sentence" block rendered inside the
 * Incorrect feedback banner. Role-colored when the question carries
 * `revealSegments` (anchor items 1–6); plain fg for the 6 pack-themed
 * scenes (they ship no `learn` metadata, so there's no segment info).
 */
function CorrectReveal({
  words,
  revealSegments,
}: {
  words: string[];
  revealSegments?: FormulaExample["segments"];
}) {
  if (revealSegments && revealSegments.length > 0) {
    return (
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        {revealSegments.map((seg, i) => (
          <RoleSegment key={i} text={seg.text} role={seg.role} />
        ))}
      </div>
    );
  }
  return <span className="font-sans font-semibold">{words.join(" ")}</span>;
}
