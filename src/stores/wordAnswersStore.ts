"use client";

/**
 * wordAnswersStore — append-only log of per-question Words-chip
 * answers, written by the Exercise variants on every submit.
 *
 * Owns:
 *   - `answers` — the raw array (persisted to localStorage under
 *     `taste.wordAnswers`). Capped at 200 entries on write to
 *     prevent unbounded growth; a 5-minute demo never exceeds this.
 *
 * Derivation helpers (`computeWordStats`, `tier`, `articleStats`)
 * are exported from this module so the Vocabulary skill sheet can
 * compute Word Mastery + Article Performance from the log at
 * open-time — no incremental state, no stale cache.
 *
 * Shape mirrors the spec in
 * claude/GenauApp_Web_Try_SkillSheet_Vocab.md §3, with the one
 * engineering adjustment that `article` is typed as the union
 * literal set actually possible across our WordItem data.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type WordAnswerExercise =
  | "articlePicker"
  | "translationMC"
  | "typing";

export type CEFRLabel = "A1" | "A2" | "B1" | "B2";

export interface WordAnswer {
  /** Stable slug for the word, e.g. "das-brot" or "verb-beeilen". */
  wordId: string;
  /** Display form of the word, e.g. "Brot" or "sich beeilen". */
  word: string;
  article: "der" | "die" | "das" | null;
  exerciseType: WordAnswerExercise;
  correct: boolean;
  /** Date.now() at the moment of submission. */
  timestamp: number;
  level: CEFRLabel;
}

export interface WordStat {
  wordId: string;
  word: string;
  article: "der" | "die" | "das" | null;
  attempts: number;
  correct: number;
  lastAttempts: boolean[];
}

export type MasteryTier = "strong" | "average" | "weak";

interface WordAnswersStore {
  answers: WordAnswer[];
  append: (a: WordAnswer) => void;
  reset: () => void;
}

const MAX_ANSWERS = 200;

export const useWordAnswersStore = create<WordAnswersStore>()(
  persist(
    (set) => ({
      answers: [],
      append: (a) =>
        set((s) => {
          const next = [...s.answers, a];
          // Prune oldest when past the cap.
          if (next.length > MAX_ANSWERS) next.splice(0, next.length - MAX_ANSWERS);
          return { answers: next };
        }),
      reset: () => set({ answers: [] }),
    }),
    {
      name: "taste.wordAnswers",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

/**
 * Build a stable `wordId` slug for a WordItem. Noun form:
 * `<article>-<word>`. Verb form: `verb-<word>` (reflexive `sich ` is
 * stripped to keep the slug stable across typing variants). Lower-
 * cased and non-word chars collapsed to dashes so Umlauts and
 * spaces don't produce fragile keys.
 */
export function makeWordId(word: string, article: "der" | "die" | "das" | null): string {
  const base = word
    .replace(/^sich\s+/i, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9äöüß]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return article ? `${article}-${base}` : `verb-${base}`;
}

/**
 * Collapse the append-only log into one stat per unique wordId.
 * `lastAttempts` keeps only the trailing 3 attempts, since that's
 * the window the Strong tier threshold reads from.
 */
export function computeWordStats(answers: WordAnswer[]): WordStat[] {
  const byId = new Map<string, WordStat>();
  for (const a of answers) {
    const existing = byId.get(a.wordId);
    const s: WordStat = existing ?? {
      wordId: a.wordId,
      word: a.word,
      article: a.article,
      attempts: 0,
      correct: 0,
      lastAttempts: [],
    };
    s.attempts += 1;
    if (a.correct) s.correct += 1;
    s.lastAttempts.push(a.correct);
    if (s.lastAttempts.length > 3) s.lastAttempts.shift();
    byId.set(a.wordId, s);
  }
  return [...byId.values()];
}

/**
 * Mastery tier per word, matching the thresholds documented in
 * SkillSheet §3.3 (and the iOS SkillCalculator):
 *   strong  — last 3 attempts all correct OR ≥80% w/ ≥3 attempts
 *   average — ≥50% accuracy
 *   weak    — everything else
 */
export function tier(stat: WordStat): MasteryTier {
  if (stat.lastAttempts.length >= 3 && stat.lastAttempts.every((x) => x)) {
    return "strong";
  }
  const acc = stat.attempts === 0 ? 0 : stat.correct / stat.attempts;
  if (acc >= 0.8 && stat.attempts >= 3) return "strong";
  if (acc >= 0.5) return "average";
  return "weak";
}

/**
 * Per-article attempt / correct counts, computed over articlePicker
 * answers only (the only exercise type that tests article choice).
 * Non-noun answers (verbs) and translationMC / typing are skipped.
 */
export interface ArticleStats {
  der: { attempts: number; correct: number };
  die: { attempts: number; correct: number };
  das: { attempts: number; correct: number };
}

export function articleStats(answers: WordAnswer[]): ArticleStats {
  const out: ArticleStats = {
    der: { attempts: 0, correct: 0 },
    die: { attempts: 0, correct: 0 },
    das: { attempts: 0, correct: 0 },
  };
  for (const a of answers) {
    if (a.exerciseType !== "articlePicker") continue;
    if (!a.article) continue;
    const slot = out[a.article];
    slot.attempts += 1;
    if (a.correct) slot.correct += 1;
  }
  return out;
}

/**
 * Tier label for the Vocab sheet header, taken from `skill.vocab`
 * ring progress (0..1). Thresholds match the spec §4.2.
 */
export function tierLabel(ratio: number): "Starting" | "Building" | "Growing" | "Strong" | "Mastery" {
  if (ratio < 0.2) return "Starting";
  if (ratio < 0.4) return "Building";
  if (ratio < 0.6) return "Growing";
  if (ratio < 0.8) return "Strong";
  return "Mastery";
}
