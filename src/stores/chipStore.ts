"use client";

/**
 * chipStore — the /try/ demo chip-picker state, plus the chosen CEFR
 * level that opens the whole flow.
 *
 * Owns:
 *   - `selectedLevel` — CEFR level picked on the gateway screen.
 *     Persisted so a returning visitor skips the picker and lands
 *     straight in the demo at their last level.
 *   - `progress[chipId]` — persisted `'active' | 'done'` per chip,
 *     written to localStorage under `taste.chipProgress`. A refresh
 *     keeps completed chips as done so a returning visitor sees
 *     their earlier effort.
 *   - `selected` — which chip the right card is currently showing.
 *     In-memory only; a refresh goes back to the placeholder right
 *     card, by design (the right card re-opens on tap).
 *
 * Actions:
 *   - `setLevel(level)` / `clearLevel()` — gateway flow
 *   - `openChip(id)`     — sets `selected`, fires `demo_chip_opened`
 *   - `completeChip(id)` — marks a chip done (idempotent for re-plays)
 *   - `closeChip()`      — clears selection, right card returns to
 *                          placeholder
 *   - `resetAll()`       — wipes every piece of state (used by
 *                          /try/?reset and dev tooling)
 *
 * Shape matches claude/GenauApp_Web_Try_ChipPicker_Brief.md §11 + §12
 * plus the LevelPicker gateway Mert specced in chat.
 */

import { create } from "zustand";
import { persist, type PersistStorage, type StorageValue } from "zustand/middleware";
import type { CEFRLevel } from "@/components/atoms/LevelButton/LevelButton";

export type ChipId = "words" | "grammar" | "sentence" | "reading";
export type ChipState = "active" | "done";

const CHIP_IDS: readonly ChipId[] = [
  "words",
  "grammar",
  "sentence",
  "reading",
] as const;

/** Only A1-B2 are offered in v1. C1/C2 are reserved. */
export const ACTIVE_LEVELS: readonly CEFRLevel[] = ["A1", "A2", "B1", "B2"] as const;

export interface ChipStore {
  /** CEFR level picked on the gateway. Persisted. */
  selectedLevel: CEFRLevel | null;
  /** Persisted per-chip progress. All four start as 'active' (unlocked). */
  progress: Record<ChipId, ChipState>;
  /** Which chip the right card is showing; null when nothing is open. */
  selected: ChipId | null;
  /**
   * `true` once the user taps "See workout summary →" on the all-done
   * ExerciseCompletion. Not persisted — the summary is a one-time flow
   * per session, we don't want returning visitors to land on the
   * summary screen without context.
   */
  showSummary: boolean;
  /**
   * Running first-try stats across the 4-chip workout. Each chip's
   * ExerciseDeck pushes its own correct + total into `addStats` when
   * the deck empties. The Summary screen reads these numbers in the
   * "N / T first-try" tile. Not persisted — the stats pair starts
   * fresh on every refresh.
   */
  workoutStats: { correct: number; total: number };
  setLevel: (level: CEFRLevel) => void;
  clearLevel: () => void;
  openChip: (id: ChipId) => void;
  completeChip: (id: ChipId) => void;
  closeChip: () => void;
  openSummary: () => void;
  closeSummary: () => void;
  addStats: (payload: { correct: number; total: number }) => void;
  resetAll: () => void;
}

const INITIAL_PROGRESS: Record<ChipId, ChipState> = {
  words: "active",
  grammar: "active",
  sentence: "active",
  reading: "active",
};

/** What we actually persist across refreshes. */
type Persisted = Pick<ChipStore, "selectedLevel" | "progress">;

/**
 * Hand-rolled JSON storage so an SSR render (where localStorage is
 * undefined) returns null cleanly instead of throwing.
 */
const safeStorage: PersistStorage<Persisted> = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(name);
      return raw ? (JSON.parse(raw) as StorageValue<Persisted>) : null;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(name, JSON.stringify(value));
    } catch {
      /* quota / private mode — drop the write silently */
    }
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(name);
    } catch {
      /* no-op */
    }
  },
};

export const useChipStore = create<ChipStore>()(
  persist(
    (set) => ({
      selectedLevel: null,
      progress: INITIAL_PROGRESS,
      selected: null,
      showSummary: false,
      workoutStats: { correct: 0, total: 0 },
      setLevel: (level) => {
        set({ selectedLevel: level });
        if (typeof window !== "undefined") {
          try {
            window.__track?.("demo_level_picked", { level });
          } catch {
            /* no-op */
          }
        }
      },
      clearLevel: () => set({ selectedLevel: null, selected: null }),
      openChip: (id) => {
        set({ selected: id });
        if (typeof window !== "undefined") {
          try {
            window.__track?.("demo_chip_opened", { chip: id });
          } catch {
            /* no-op */
          }
        }
      },
      completeChip: (id) =>
        set((s) => ({
          progress: { ...s.progress, [id]: "done" },
        })),
      closeChip: () => set({ selected: null }),
      openSummary: () => {
        set({ showSummary: true });
        if (typeof window !== "undefined") {
          try {
            window.__track?.("demo_workout_summary_shown");
          } catch {
            /* no-op */
          }
        }
      },
      closeSummary: () => set({ showSummary: false }),
      addStats: ({ correct, total }) =>
        set((s) => ({
          workoutStats: {
            correct: s.workoutStats.correct + correct,
            total: s.workoutStats.total + total,
          },
        })),
      resetAll: () =>
        set({
          selectedLevel: null,
          progress: { ...INITIAL_PROGRESS },
          selected: null,
          showSummary: false,
          workoutStats: { correct: 0, total: 0 },
        }),
    }),
    {
      name: "taste.chipProgress",
      storage: safeStorage,
      // `selected` stays in memory — a refresh drops the current pick
      // and returns the right card to its placeholder (spec §11).
      partialize: (s) => ({
        selectedLevel: s.selectedLevel,
        progress: s.progress,
      }),
    },
  ),
);

export { CHIP_IDS };
