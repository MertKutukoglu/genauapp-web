/**
 * pickLearnCardType — chooses which Learn card variant to render per
 * word. Mirrors `LearnCardType.random(for:)` from the iOS spec
 * (ExerciseView.swift lines ~1911–1925):
 *
 *   - 1 chunk  → pool is [normal, scrambled]
 *     (chunkCompose with a single chunk is a degenerate puzzle)
 *   - ≥ 2 chunks → pool is [normal, scrambled, chunkCompose]
 *
 * Each card pick is independent — a word that comes back on a
 * subsequent Repeat may get a different variant, which keeps the
 * Learn walk fresh.
 */

export type LearnCardVariant = "normal" | "scrambled" | "chunkCompose";

export interface PickLearnCardTypeInput {
  chunks: string[];
  /**
   * Optional random source so tests can pin the pick. Should return a
   * float in [0, 1).
   */
  random?: () => number;
}

export function pickLearnCardType({
  chunks,
  random = Math.random,
}: PickLearnCardTypeInput): LearnCardVariant {
  const pool: LearnCardVariant[] =
    chunks.length >= 2
      ? ["normal", "scrambled", "chunkCompose"]
      : ["normal", "scrambled"];
  return pool[Math.floor(random() * pool.length)];
}
