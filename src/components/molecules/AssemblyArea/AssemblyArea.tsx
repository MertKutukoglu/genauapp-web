"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * AssemblyArea — the shared tile-puzzle mechanic used by Scrambled and
 * ChunkCompose Learn cards.
 *
 * Caller hands the component `pieces` — the target string split into
 * the ordered sequence the user needs to reconstruct. For Scrambled
 * that's the word split into single letters; for ChunkCompose it's
 * the syllable chunks from the content file.
 *
 * Shape (mirrors iOS Learn-card variants):
 *   - Answer row: thin horizontal dash per empty slot; filled slots
 *     show the piece in bold white (or on completion, the article
 *     color — passed via onChange's isCorrect so the parent can tint)
 *   - Tile pool: bigger rectangular tiles, Open Sans bold 22, with a
 *     backspace tile at the end of the row that removes the last pick
 *
 * Tiles carry their original index so duplicate pieces (two "n"s in
 * "sprechen") stay independently selectable. The answer is the array
 * of selected indices; the target check compares the user's string to
 * the joined pieces, so any valid ordering wins.
 *
 * Callers get `{ assembled, isCorrect }` via `onChange`. Parents use
 * `isCorrect` to auto-advance or light up a continue affordance.
 */

export interface AssemblyAreaProps {
  /** Target sequence — Scrambled: letters; ChunkCompose: syllable chunks. */
  pieces: string[];
  /**
   * Stable seed for the initial shuffle. When the parent remounts the
   * card (via `key`), a different seed gives a different scramble;
   * within one mount the shuffle stays put.
   */
  seed?: string;
  /** Fires on every pick/unpick so the parent can react to completion. */
  onChange?: (state: { assembled: string; isCorrect: boolean }) => void;
  className?: string;
}

/**
 * Deterministic Fisher-Yates shuffle keyed on a string. Same seed →
 * same order. Lifted into a util so the mount-time shuffle doesn't
 * jitter on every re-render.
 */
function shuffleWithSeed<T>(arr: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995);
    const j = (h >>> 0) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function AssemblyArea({
  pieces,
  seed,
  onChange,
  className,
}: AssemblyAreaProps) {
  const piecesKey = pieces.join("|");

  // Pool of tiles with stable indices into `pieces`. Shuffle fixed per mount.
  const pool = React.useMemo(() => {
    const indexed = pieces.map((p, i) => ({ piece: p, idx: i }));
    const s = seed ?? pieces.join("-");
    const shuffled = shuffleWithSeed(indexed, s);
    // If the shuffle landed in target order, swap the first two so the
    // user still has something to do.
    if (
      shuffled.length >= 2 &&
      shuffled.every((t, i) => t.idx === i)
    ) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }
    return shuffled;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, piecesKey]);

  const [picked, setPicked] = React.useState<number[]>([]);

  const target = pieces.join("");
  const assembled = picked.map((i) => pieces[i]).join("");
  const isCorrect = assembled === target;
  const isFull = picked.length === pieces.length;

  React.useEffect(() => {
    onChange?.({ assembled, isCorrect });
  }, [assembled, isCorrect, onChange]);

  const pickTile = (idx: number) => {
    if (isFull) return;
    if (picked.includes(idx)) return;
    setPicked((p) => [...p, idx]);
  };

  const backspace = () => {
    setPicked((p) => (p.length === 0 ? p : p.slice(0, -1)));
  };

  const slotColor = isCorrect ? "var(--ok)" : "var(--fg)";

  return (
    <div className={clsx("flex flex-col gap-6 items-center", className)}>
      {/* Answer slots — thin horizontal dashes, piece rendered on top
          of the dash when filled. iOS shows the dash disappear into
          the glyph as soon as content lands; we keep both for clarity. */}
      <div className="flex flex-wrap items-end justify-center gap-3">
        {pieces.map((piece, slotIdx) => {
          const filledWith = picked[slotIdx];
          const hasContent = filledWith !== undefined;
          const content = hasContent ? pieces[filledWith] : "";

          return (
            <div
              key={slotIdx}
              className="flex flex-col items-center gap-1.5"
              style={{ minWidth: hasContent ? "auto" : 24 }}
            >
              {hasContent ? (
                <span
                  className="font-sans font-bold text-[28px] leading-none whitespace-pre"
                  style={{ color: slotColor }}
                >
                  {content}
                </span>
              ) : (
                <span
                  className="font-sans font-bold text-[28px] leading-none opacity-0 whitespace-pre"
                  aria-hidden
                >
                  {piece}
                </span>
              )}
              <span
                aria-hidden
                className={clsx(
                  "block h-[3px] rounded-full",
                  hasContent
                    ? "bg-transparent"
                    : "bg-[color:color-mix(in_srgb,var(--fg)_22%,transparent)]",
                )}
                style={{
                  width: hasContent ? "100%" : 24,
                  minWidth: 24,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Tile pool — larger rectangular tiles + backspace at the end. */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-full">
        {pool.map(({ piece, idx }) => {
          const used = picked.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => pickTile(idx)}
              disabled={used || isFull}
              aria-label={`Place ${piece}`}
              className={clsx(
                "min-w-[52px] h-[56px] px-5 rounded-2xl",
                "font-sans font-bold text-[22px] leading-none text-fg",
                "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
                "transition-[opacity,transform,background] duration-150",
                "hover:bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)] hover:-translate-y-0.5",
                "active:translate-y-0",
                used && "opacity-0 pointer-events-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              )}
            >
              {piece}
            </button>
          );
        })}

        {/* Backspace tile — always visible, removes the last-placed piece. */}
        <button
          type="button"
          onClick={backspace}
          disabled={picked.length === 0}
          aria-label="Remove last letter"
          className={clsx(
            "min-w-[52px] h-[56px] px-5 rounded-2xl",
            "inline-flex items-center justify-center",
            "text-fg-muted",
            "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
            "transition-[opacity,transform,color,background] duration-150",
            "enabled:hover:text-fg enabled:hover:bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)] enabled:hover:-translate-y-0.5",
            "active:translate-y-0",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
            aria-hidden
          >
            <path d="M22 5H8l-6 7 6 7h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
            <path d="M18 9l-5 6M13 9l5 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
