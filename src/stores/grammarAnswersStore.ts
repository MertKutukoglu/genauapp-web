"use client";

/**
 * grammarAnswersStore — append-only log of per-question Grammar-chip
 * answers, written by the Exercise variants on every submit. Sibling
 * of wordAnswersStore but keyed by `topic` instead of `wordId`
 * because Grammar's unit of progress is the topic (Verb sein,
 * Perfekt, Konjunktiv II, …), not the individual question.
 *
 * Owns:
 *   - `answers` — raw array, persisted to localStorage at
 *     `taste.grammarAnswers`. 200-entry cap matches Vocab.
 *
 * Derivation helpers (`computeTopicStats`, `momentum`,
 * `progressFill`, `weakestTopic`) run on the array at sheet-open
 * time — no incremental state, no stale cache. Spec:
 * claude/GenauApp_Web_Try_SkillSheet_Grammar.md §4.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CEFRLabel } from "@/stores/wordAnswersStore";

export type GrammarAnswerExercise = "multipleChoice" | "fillBlank";

export interface GrammarAnswer {
  topic: string;
  exerciseType: GrammarAnswerExercise;
  correct: boolean;
  timestamp: number;
  level: CEFRLabel;
  /** True when this question's item carries a `learn` block (it's
   *  one of the 5-7 anchor questions, not a drill). Kept on the
   *  record even though the Grammar sheet doesn't surface it yet —
   *  a future per-section split might. */
  isAnchor: boolean;
}

export interface TopicStat {
  topic: string;
  attempts: number;
  correct: number;
  /** correct / attempts, 0..1 — NaN-safe (0 for empty). */
  accuracy: number;
  /** Last up to 10 answers, newest-first. True = correct. */
  lastN: boolean[];
  /** Last up to 3 answers, oldest-first — for momentum math. */
  recent3: boolean[];
  /** All answers BEFORE the last 3, for baseline. */
  prior: boolean[];
}

export type Momentum = "up" | "down" | "stable" | null;

interface GrammarAnswersStore {
  answers: GrammarAnswer[];
  append: (a: GrammarAnswer) => void;
  reset: () => void;
}

const MAX_ANSWERS = 200;

export const useGrammarAnswersStore = create<GrammarAnswersStore>()(
  persist(
    (set) => ({
      answers: [],
      append: (a) =>
        set((s) => {
          const next = [...s.answers, a];
          if (next.length > MAX_ANSWERS) next.splice(0, next.length - MAX_ANSWERS);
          return { answers: next };
        }),
      reset: () => set({ answers: [] }),
    }),
    {
      name: "taste.grammarAnswers",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

/**
 * Collapse the log to one stat row per unique topic. `lastN` is the
 * trailing 10 answers newest-first (so the UI reads the strip left
 * → right as "most recent to oldest"); `recent3` and `prior` split
 * at the last 3 attempts for momentum math.
 */
export function computeTopicStats(answers: GrammarAnswer[]): TopicStat[] {
  const byTopic = new Map<string, GrammarAnswer[]>();
  for (const a of answers) {
    const arr = byTopic.get(a.topic) ?? [];
    arr.push(a);
    byTopic.set(a.topic, arr);
  }
  const out: TopicStat[] = [];
  for (const [topic, arr] of byTopic.entries()) {
    const sorted = [...arr].sort((a, b) => a.timestamp - b.timestamp);
    const correct = sorted.filter((a) => a.correct).length;
    const attempts = sorted.length;
    const lastN = sorted.slice(-10).map((a) => a.correct).reverse();
    const recent3 = sorted.slice(-3).map((a) => a.correct);
    const prior = sorted.slice(0, -3).map((a) => a.correct);
    out.push({
      topic,
      attempts,
      correct,
      accuracy: attempts === 0 ? 0 : correct / attempts,
      lastN,
      recent3,
      prior,
    });
  }
  return out;
}

/**
 * Honest momentum arrow — recent-3 vs prior accuracy, 10% threshold
 * to flip. Returns `null` on under-3 attempts so the UI can render
 * a muted `—` ("not enough data yet") instead of a false `stable`.
 * This matches the iOS SkillCalculator and the landing-slide 3
 * convention: down arrows exist, mixed up/down is the point.
 */
export function momentum(stat: TopicStat): Momentum {
  if (stat.attempts < 3) return null;
  const recentAvg =
    stat.recent3.filter((x) => x).length / stat.recent3.length;
  if (stat.prior.length === 0) return "stable";
  const priorAvg = stat.prior.filter((x) => x).length / stat.prior.length;
  const delta = recentAvg - priorAvg;
  if (delta > 0.1) return "up";
  if (delta < -0.1) return "down";
  return "stable";
}

/**
 * Confidence-weighted progress-bar fill, 0..1. First attempt barely
 * fills even on a correct answer; 10+ attempts settle to pure
 * accuracy. Matches the iOS SkillCalculator so bars aren't jumpy
 * on low sample sizes.
 */
export function progressFill(stat: TopicStat): number {
  const confidence = Math.min(stat.attempts / 10, 1);
  return stat.accuracy * confidence;
}

/**
 * Pick the default Topic Focus: lowest accuracy with ≥ 2 attempts.
 * Single-attempt topics aren't a trend. If no topic qualifies,
 * falls back to the first topic in the list; if the list is
 * empty, returns null and the caller shows the empty state.
 */
export function weakestTopic(stats: TopicStat[]): TopicStat | null {
  if (stats.length === 0) return null;
  const candidates = stats.filter((s) => s.attempts >= 2);
  if (candidates.length === 0) return stats[0];
  return [...candidates].sort((a, b) => a.accuracy - b.accuracy)[0];
}

/**
 * Sort rows for Section 1: most-practiced first, then alphabetical
 * on ties. Matches the iOS Grammar tab's convention of pulling the
 * user's most-engaged topics to the top of a glance.
 */
export function orderTopicsForList(stats: TopicStat[]): TopicStat[] {
  return [...stats].sort((a, b) => {
    if (b.attempts !== a.attempts) return b.attempts - a.attempts;
    return a.topic.localeCompare(b.topic);
  });
}
