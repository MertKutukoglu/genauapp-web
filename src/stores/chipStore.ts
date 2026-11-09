"use client";

/**
 * chipStore — the /try/ demo chip-picker state.
 *
 * Owns:
 *   - `progress[chipId]` — persisted `'active' | 'done'` per chip, written
 *     to localStorage under `taste.chipProgress`. A refresh keeps completed
 *     chips as done so a returning visitor sees their earlier effort.
 *   - `selected` — which chip the right card is currently showing. In-memory
 *     only; a refresh goes back to the placeholder right card.
 *
 * Actions:
 *   - `openChip(id)`  — sets `selected`, fires `demo_chip_opened` PostHog event
 *   - `completeChip(id)` — marks a chip done (idempotent for re-plays)
 *   - `closeChip()`   — clears selection, right card returns to placeholder
 *
 * Shape matches claude/GenauApp_Web_Try_ChipPicker_Brief.md §11-12 verbatim:
 * four chips (words / grammar / sentence / reading), no locked state in v1.
 */

import { create } from "zustand";
import { persist, type PersistStorage, type StorageValue } from "zustand/middleware";

export type ChipId = "words" | "grammar" | "sentence" | "reading";
export type ChipState = "active" | "done";

const CHIP_IDS: readonly ChipId[] = [
  "words",
  "grammar",
  "sentence",
  "reading",
] as const;

export interface ChipStore {
  /** Persisted per-chip progress. All four start as 'active' (unlocked). */
  progress: Record<ChipId, ChipState>;
  /** Which chip the right card is showing; null when nothing is open. */
  selected: ChipId | null;
  openChip: (id: ChipId) => void;
  completeChip: (id: ChipId) => void;
  closeChip: () => void;
  /** Full reset — used by /try/?reset and dev tooling. */
  resetAll: () => void;
}

const INITIAL_PROGRESS: Record<ChipId, ChipState> = {
  words: "active",
  grammar: "active",
  sentence: "active",
  reading: "active",
};

/**
 * Hand-rolled JSON storage so an SSR render (where localStorage is
 * undefined) returns null cleanly instead of throwing.
 */
const safeStorage: PersistStorage<Pick<ChipStore, "progress">> = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(name);
      return raw
        ? (JSON.parse(raw) as StorageValue<Pick<ChipStore, "progress">>)
        : null;
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
      progress: INITIAL_PROGRESS,
      selected: null,
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
      resetAll: () =>
        set({
          progress: { ...INITIAL_PROGRESS },
          selected: null,
        }),
    }),
    {
      name: "taste.chipProgress",
      storage: safeStorage,
      // `selected` stays in memory — a refresh drops the current pick
      // and returns the right card to its placeholder, per spec §11.
      partialize: (s) => ({ progress: s.progress }),
    },
  ),
);

export { CHIP_IDS };
