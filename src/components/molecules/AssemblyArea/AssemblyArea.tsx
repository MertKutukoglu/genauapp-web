"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import type { ArticleColor } from "@/components/molecules/WordSection/WordSection";

/**
 * AssemblyArea — the shared tile-puzzle mechanic used by Scrambled and
 * ChunkCompose Learn cards.
 *
 * Caller hands the component `pieces` — the target string split into
 * the ordered sequence the user needs to reconstruct. For Scrambled
 * that's the word split into single letters; for ChunkCompose it's
 * the syllable chunks from the content file. The component shuffles
 * the pieces into a tile pool, lets the user tap tiles to assemble
 * an answer, and surfaces success when the assembled sequence
 * matches `pieces` in order.
 *
 * Tiles carry their original index so duplicate pieces (two "n"s in
 * "sprechen" → ["s","p","r","e","c","h","e","n"]) stay independently
 * selectable. The answer is the array of selected indices; the target
 * check compares the user's letter string (not indices) to the joined
 * `pieces`, so any valid ordering wins.
 *
 * Callers get `isCorrect` + the assembled string via `onChange`. The
 * card can use that to colour the slots in the article color on
 * success and to decide whether to light up the Repeat/I know row.
 */

const ARTICLE_TOKEN: Record<Exclude<ArticleColor, null>, string> = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
};

export interface AssemblyAreaProps {
  /** Target sequence — Scrambled: letters; ChunkCompose: syllable chunks. */
  pieces: string[];
  /** Nouns tint the completed slots in article color; verbs stay on --fg. */
  article?: ArticleColor;
  /**
   * Stable seed for the initial shuffle. When the parent remounts the
   * card (via `key`), a different seed gives a different scramble;
   * within one mount the shuffle stays put so the user isn't fighting
   * a moving tile pool.
   */
  seed?: string;
  /** Fires on every pick/unpick/clear so the parent can gate actions. */
  onChange?: (state: { assembled: string; isCorrect: boolean }) => void;
  className?: string;
}

/**
 * Deterministic Fisher-Yates shuffle keyed on a string. Same seed →
 * same order. Lifted into a util so the mount-time shuffle doesn't
 * jitter on every re-render.
 */
function shuffleWithSeed<T>(arr: T[], seed: string): T[] {
  // Tiny hash → number
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
  article,
  seed,
  onChange,
  className,
}: AssemblyAreaProps) {
  // Signature for the deps array — a plain string so the exhaustive-deps
  // linter stays happy with a simple expression.
  const piecesKey = pieces.join("|");

  // Pool of tiles with stable indices into `pieces`. Shuffle fixed per mount.
  const pool = React.useMemo(() => {
    const indexed = pieces.map((p, i) => ({ piece: p, idx: i }));
    const s = seed ?? pieces.join("-");
    const shuffled = shuffleWithSeed(indexed, s);
    // Guard: if the shuffle landed in target order, swap the first two
    // so the user still has something to do.
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

  // Report state up — parent uses isCorrect to gate Repeat/I know.
  React.useEffect(() => {
    onChange?.({ assembled, isCorrect });
  }, [assembled, isCorrect, onChange]);

  const pickTile = (idx: number) => {
    if (isFull) return;
    if (picked.includes(idx)) return;
    setPicked((p) => [...p, idx]);
  };

  const unpickSlot = (slotIndex: number) => {
    setPicked((p) => p.filter((_, i) => i !== slotIndex));
  };

  const clear = () => setPicked([]);

  const slotColor = article && isCorrect ? ARTICLE_TOKEN[article] : "var(--fg)";

  return (
    <div className={clsx("flex flex-col gap-4 items-center", className)}>
      {/* Answer slots — show what the user has assembled so far. */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {pieces.map((piece, slotIdx) => {
          const filledWith = picked[slotIdx];
          const content = filledWith !== undefined ? pieces[filledWith] : "";
          const hasContent = filledWith !== undefined;

          return (
            <button
              key={slotIdx}
              type="button"
              onClick={hasContent ? () => unpickSlot(slotIdx) : undefined}
              disabled={!hasContent}
              aria-label={
                hasContent ? `Remove ${content} from slot ${slotIdx + 1}` : `Empty slot ${slotIdx + 1}`
              }
              className={clsx(
                "min-w-[36px] min-h-[52px] px-2.5 rounded-xl",
                "flex items-center justify-center",
                "font-sans font-bold text-[22px] leading-none",
                "transition-colors duration-150",
                hasContent
                  ? "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)] cursor-pointer hover:bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)]"
                  : "border border-dashed border-border-strong bg-transparent cursor-default",
              )}
              style={{ color: hasContent ? slotColor : "transparent" }}
            >
              {hasContent ? content : "·"}
            </button>
          );
        })}
      </div>

      {/* Tile pool — scrambled pieces the user hasn't placed yet. */}
      <div className="flex flex-wrap items-center justify-center gap-2">
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
                "min-w-[40px] h-[44px] px-3 rounded-xl",
                "font-sans font-bold text-[18px] leading-none text-fg",
                "border border-border-strong bg-surface-card",
                "transition-[opacity,transform,background]",
                "hover:bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)] hover:-translate-y-0.5",
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
      </div>

      {/* Clear — only shown when something is placed. */}
      {picked.length > 0 ? (
        <button
          type="button"
          onClick={clear}
          className={clsx(
            "font-sans text-[13px] font-semibold text-fg-muted",
            "underline underline-offset-4 decoration-fg-faint",
            "hover:text-fg hover:decoration-fg",
            "transition-colors",
          )}
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
