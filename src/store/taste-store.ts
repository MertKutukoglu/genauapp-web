/**
 * Zustand store for the /try/ taste demo.
 * Phase 1: skeleton only. Real chip flow, skill feeding, and the collect
 * mechanic (handoff §8) wire up in Phase 4.
 *
 * Persistence model (handoff §11):
 *   - `taste.level` + `taste.chipProgress` → localStorage (survives reload)
 *   - `taste_skills_v1` → sessionStorage (resets per tab)
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Level = "A1" | "A2" | "B1" | "B2";
export type ChipId = "words" | "grammar" | "sentence" | "reading";
export type ChipStatus = "locked" | "active" | "done";

export interface TasteState {
  level: Level | null;
  chipProgress: Record<ChipId, ChipStatus>;
  setLevel: (level: Level) => void;
  setChipStatus: (chip: ChipId, status: ChipStatus) => void;
  reset: () => void;
}

const initialChipProgress: Record<ChipId, ChipStatus> = {
  words: "active",
  grammar: "active",
  sentence: "active",
  reading: "active",
};

export const useTasteStore = create<TasteState>()(
  persist(
    (set) => ({
      level: null,
      chipProgress: initialChipProgress,
      setLevel: (level) => set({ level }),
      setChipStatus: (chip, status) =>
        set((state) => ({
          chipProgress: { ...state.chipProgress, [chip]: status },
        })),
      reset: () =>
        set({ level: null, chipProgress: { ...initialChipProgress } }),
    }),
    {
      name: "taste",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        level: state.level,
        chipProgress: state.chipProgress,
      }),
    },
  ),
);
