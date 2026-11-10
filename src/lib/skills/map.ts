/**
 * Chip → Skill map + delta compute for the /try/ skill-feeding system.
 *
 * Spec (locked by Mert, 2026-11-10):
 *   - Each chip has 1 primary skill (bigger pay) + 2 fed skills
 *     (smaller pay). The 4th skill is deliberately not fed, so each
 *     chip "misses" one ring.
 *   - Reading ring is only fed by the Reading chip — other chips
 *     touch vocab/grammar/writing but never reading. That makes
 *     reading comprehension feel like its own practice path.
 *
 *   - Deltas apply ONCE, at the end of a session (not per question).
 *   - Deltas are positive-only — a bad run earns less bonus, never
 *     costs ring progress. Demo framing: completion = effort, score
 *     = reward on top.
 *
 * Formula:
 *   correctRatio = correct / total           // 0..1
 *   primaryDelta = 0.15 + 0.10 * ratio       // 15%..25%
 *   fedDelta     = 0.05 + 0.05 * ratio       // 5%..10%
 *
 *   Ring cap is 1.0; callers clamp with Math.min(1, current + delta).
 */

export type SkillKey = "vocab" | "grammar" | "writing" | "reading";
export type ChipKey = "words" | "grammar" | "sentence" | "reading";

interface ChipSkillWeights {
  primary: SkillKey;
  fed: [SkillKey, SkillKey];
}

export const CHIP_SKILL_MAP: Record<ChipKey, ChipSkillWeights> = {
  words: {
    primary: "vocab",
    fed: ["grammar", "writing"],
  },
  grammar: {
    primary: "grammar",
    fed: ["writing", "vocab"],
  },
  sentence: {
    primary: "writing",
    fed: ["grammar", "vocab"],
  },
  reading: {
    primary: "reading",
    fed: ["vocab", "grammar"],
  },
};

export interface DeltaInput {
  chip: ChipKey;
  correct: number;
  total: number;
}

export type SkillDeltas = Partial<Record<SkillKey, number>>;

/**
 * Compute per-skill deltas for a finished chip session.
 *
 * Edge case: when `total === 0` (nothing was asked) both deltas
 * collapse to their floors (15% / 5%). We still fire — the user
 * reached the completion screen, which counts as completion. If a
 * caller wants to suppress that (e.g. early-exit), it can simply not
 * call `computeSkillDeltas`.
 */
export function computeSkillDeltas({
  chip,
  correct,
  total,
}: DeltaInput): SkillDeltas {
  const ratio = total > 0 ? Math.max(0, Math.min(1, correct / total)) : 0;
  const primaryDelta = 0.15 + 0.1 * ratio;
  const fedDelta = 0.05 + 0.05 * ratio;

  const { primary, fed } = CHIP_SKILL_MAP[chip];
  const out: SkillDeltas = {};
  out[primary] = primaryDelta;
  out[fed[0]] = (out[fed[0]] ?? 0) + fedDelta;
  out[fed[1]] = (out[fed[1]] ?? 0) + fedDelta;
  return out;
}
