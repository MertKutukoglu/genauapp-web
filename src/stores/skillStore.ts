"use client";

/**
 * skillStore — ring values for the /try/ skill-feeding system.
 *
 * Owns:
 *   - `progress[skill]` — 0..1 ring fill per skill. Persisted so the
 *     user's earned rings carry across refreshes.
 *   - `pending[skill]` — a staged delta per skill, applied the moment
 *     the user taps the ring's "↗ collect" badge. Kept IN MEMORY so a
 *     refresh re-asks the user to earn the bonus (prevents a stale
 *     badge nagging after they closed the tab mid-collect; a chip
 *     completed in a new session will re-stage anyway).
 *
 * Actions:
 *   - `stageDeltas(deltas)` — merges pending deltas (sums with any
 *     already staged for the same skill). Called by the chip's
 *     completion screen with the output of `computeSkillDeltas`.
 *   - `collect(skill)` — applies the pending delta for one skill to
 *     its progress (clamped to 1), clears that pending entry.
 *   - `collectAll()` — convenience: collect every skill with a
 *     pending delta at once.
 *   - `resetAll()` — wipes progress + pending (dev / taste reset).
 *
 * Design intent: the two-step stage → collect flow makes each ring
 * bump a conscious, earned moment instead of a confetti spam after
 * every submit. See spec §4.
 */

import { create } from "zustand";
import { persist, type PersistStorage, type StorageValue } from "zustand/middleware";
import type { SkillKey, SkillDeltas } from "@/lib/skills/map";

/**
 * Flatten a per-skill delta map into analytics-safe props. Vercel's
 * track() rejects nested objects — only strings / numbers / booleans
 * / null are allowed — so a shape like `{ deltas: { vocab: 0.23 } }`
 * throws. Spreading into keyed primitives (`delta_vocab: 0.23`) also
 * makes PostHog filters much easier to slice later.
 */
function deltasToProps(deltas: SkillDeltas): Record<string, number> {
  const out: Record<string, number> = {};
  for (const k of ["vocab", "grammar", "writing", "reading"] as const) {
    const v = deltas[k];
    if (typeof v === "number" && v > 0) {
      out[`delta_${k}`] = v;
    }
  }
  return out;
}

type ProgressMap = Record<SkillKey, number>;
type PendingMap = Partial<Record<SkillKey, number>>;

const SKILL_KEYS: readonly SkillKey[] = [
  "vocab",
  "grammar",
  "writing",
  "reading",
] as const;

const INITIAL_PROGRESS: ProgressMap = {
  vocab: 0,
  grammar: 0,
  writing: 0,
  reading: 0,
};

export interface SkillStore {
  progress: ProgressMap;
  pending: PendingMap;
  stageDeltas: (deltas: SkillDeltas) => void;
  collect: (skill: SkillKey) => void;
  collectAll: () => void;
  resetAll: () => void;
}

/** Persist the earned rings only; pending stays in memory by design. */
type Persisted = Pick<SkillStore, "progress">;

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
      /* quota / private mode — drop silently */
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

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export const useSkillStore = create<SkillStore>()(
  persist(
    (set) => ({
      progress: { ...INITIAL_PROGRESS },
      pending: {},

      stageDeltas: (deltas) =>
        set((s) => {
          const next: PendingMap = { ...s.pending };
          for (const key of SKILL_KEYS) {
            const add = deltas[key];
            if (typeof add === "number" && add > 0) {
              next[key] = (next[key] ?? 0) + add;
            }
          }
          if (typeof window !== "undefined") {
            try {
              window.__track?.("demo_skills_staged", deltasToProps(deltas));
            } catch {
              /* no-op */
            }
          }
          return { pending: next };
        }),

      collect: (skill) =>
        set((s) => {
          const amount = s.pending[skill];
          if (!amount) return s;
          const nextProgress: ProgressMap = {
            ...s.progress,
            [skill]: clamp01(s.progress[skill] + amount),
          };
          const nextPending: PendingMap = { ...s.pending };
          delete nextPending[skill];
          if (typeof window !== "undefined") {
            try {
              window.__track?.("demo_skill_collected", {
                skill,
                delta: amount,
                to: nextProgress[skill],
              });
            } catch {
              /* no-op */
            }
          }
          return { progress: nextProgress, pending: nextPending };
        }),

      collectAll: () =>
        set((s) => {
          if (Object.keys(s.pending).length === 0) return s;
          const nextProgress: ProgressMap = { ...s.progress };
          for (const key of SKILL_KEYS) {
            const add = s.pending[key];
            if (typeof add === "number" && add > 0) {
              nextProgress[key] = clamp01(nextProgress[key] + add);
            }
          }
          if (typeof window !== "undefined") {
            try {
              window.__track?.(
                "demo_skills_collected_all",
                deltasToProps(s.pending),
              );
            } catch {
              /* no-op */
            }
          }
          return { progress: nextProgress, pending: {} };
        }),

      resetAll: () =>
        set({ progress: { ...INITIAL_PROGRESS }, pending: {} }),
    }),
    {
      name: "taste.skillProgress",
      storage: safeStorage,
      // pending stays in memory; see file header for rationale.
      partialize: (s) => ({ progress: s.progress }),
    },
  ),
);
