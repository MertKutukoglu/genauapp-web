"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * AssemblyArea — shared tile-puzzle mechanic for the Scrambled +
 * ChunkCompose Learn variants.
 *
 * Caller hands the component `pieces` — the target string split into
 * the ordered sequence the user needs to reconstruct. For Scrambled
 * that's the word split into single letters; for ChunkCompose it's
 * the syllable chunks.
 *
 * Shape (per iOS reference):
 *   - Slot row: one dash per CHARACTER in the target (not per piece).
 *     Placed pieces fill characters left-to-right, so a chunk like
 *     "Fa" fills slots 0 + 1. The assembled characters read as a
 *     single continuous word — no visible gap between consecutive
 *     filled characters, which was the bug the chunk layout had
 *     previously.
 *   - Tile pool: pieces as bigger rectangular tiles + backspace at
 *     the end of the row; backspace removes the last-placed piece.
 *
 * `keyboardEnabled` adds desktop keyboard support (letter key → pick
 * matching tile, Backspace → remove last). Scrambled turns this on;
 * ChunkCompose keeps it off because typing one letter against
 * multi-char tiles doesn't map cleanly.
 *
 * Callers get `{ assembled, isCorrect }` via `onChange` and gate their
 * next step on isCorrect (auto-advance in the Learn card variants).
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
  /**
   * When true, window keydown listeners translate letter presses into
   * tile picks and Backspace into the backspace action. Scrambled
   * variants turn this on for desktop typists.
   */
  keyboardEnabled?: boolean;
  /** Fires on every pick/backspace so the parent can react to completion. */
  onChange?: (state: { assembled: string; isCorrect: boolean }) => void;
  className?: string;
}

/** Fisher-Yates shuffle keyed on a string so same seed → same order. */
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
  keyboardEnabled = false,
  onChange,
  className,
}: AssemblyAreaProps) {
  const piecesKey = pieces.join("|");
  const target = pieces.join("");
  const targetChars = target.split("");

  // Pool of tiles with stable indices into `pieces`. Shuffle fixed per mount.
  const pool = React.useMemo(() => {
    const indexed = pieces.map((p, i) => ({ piece: p, idx: i }));
    const s = seed ?? pieces.join("-");
    const shuffled = shuffleWithSeed(indexed, s);
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

  const assembled = picked.map((i) => pieces[i]).join("");
  const isCorrect = assembled === target;
  const isFull = picked.length === pieces.length;

  React.useEffect(() => {
    onChange?.({ assembled, isCorrect });
  }, [assembled, isCorrect, onChange]);

  const pickTile = React.useCallback(
    (idx: number) => {
      setPicked((p) => {
        if (p.length >= pieces.length) return p;
        if (p.includes(idx)) return p;
        return [...p, idx];
      });
    },
    [pieces.length],
  );

  const backspace = React.useCallback(() => {
    setPicked((p) => (p.length === 0 ? p : p.slice(0, -1)));
  }, []);

  // Desktop keyboard support (Scrambled only). Each un-picked tile
  // whose piece matches the typed key becomes available; the first
  // one found gets picked.
  React.useEffect(() => {
    if (!keyboardEnabled) return;
    if (typeof window === "undefined") return;

    const onKey = (e: KeyboardEvent) => {
      // Don't steal keystrokes when the user is typing in an input/textarea.
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
        return;
      }

      // Single-character keys only (no Shift, Meta, F1 etc.)
      if (e.key.length !== 1) return;
      // Skip if any modifier is held
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const needle = e.key.toLowerCase();
      const matchIdx = pool.findIndex(
        ({ piece, idx }) =>
          !picked.includes(idx) && piece.toLowerCase() === needle,
      );
      if (matchIdx >= 0) {
        e.preventDefault();
        pickTile(pool[matchIdx].idx);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyboardEnabled, picked, pool, pickTile, backspace]);

  const slotColor = isCorrect ? "var(--ok)" : "var(--fg)";

  return (
    <div className={clsx("flex flex-col gap-6 items-center", className)}>
      {/* Slot row — one entry per CHARACTER in the target. Filled chars
          sit directly beside each other with no gap so chunks assemble
          into a single continuous word (fixing the "Fa mi lie" look). */}
      <div
        className="flex items-end justify-center"
        style={{ columnGap: 2 }}
      >
        {targetChars.map((char, i) => {
          const filled = i < assembled.length;
          const display = filled ? assembled[i] : "";

          return (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{ minWidth: 14 }}
            >
              <span
                className="font-sans font-bold text-[28px] leading-none whitespace-pre"
                style={{
                  color: slotColor,
                  // Reserve the character's own natural width even when
                  // empty, so the dashes below line up under the real
                  // glyphs they'll become.
                  visibility: filled ? "visible" : "hidden",
                }}
              >
                {filled ? display : char}
              </span>
              <span
                aria-hidden
                className={clsx(
                  "block h-[3px] rounded-full mt-1.5",
                  filled
                    ? "bg-transparent"
                    : "bg-[color:color-mix(in_srgb,var(--fg)_22%,transparent)]",
                )}
                style={{ width: Math.max(14, char.length * 10) }}
              />
            </div>
          );
        })}
      </div>

      {/* Tile pool + backspace. */}
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

        <button
          type="button"
          onClick={backspace}
          disabled={picked.length === 0}
          aria-label="Remove last letter"
          title={keyboardEnabled ? "Backspace" : undefined}
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

      {keyboardEnabled ? (
        <p className="font-sans text-[11px] text-fg-faint tracking-wide uppercase">
          Type on your keyboard · Backspace to undo
        </p>
      ) : null}
    </div>
  );
}
