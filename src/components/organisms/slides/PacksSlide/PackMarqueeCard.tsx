import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * PackMarqueeCard — the pack tile used inside the Packs slide marquee.
 *
 * Differs from the atomic PackCard by design:
 *   - Title + CEFR level sit UNDER the illustration (a row below), not
 *     over a dark scrim on top of it.
 *   - Level pill uses the muted pill treatment from the production
 *     spec (not the per-level colored pill the demo uses elsewhere).
 *   - Illustration slot has an inner tint so a missing `imageSrc`
 *     still reads as a card, not an empty square.
 *
 * Kept local to this organism so edits here don't drift into the atom
 * used by the /try/ pack grid.
 */

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface PackMarqueeCardProps {
  title: string;
  level: CEFRLevel;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function PackMarqueeCard({
  title,
  level,
  imageSrc,
  imageAlt,
  className,
}: PackMarqueeCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-2 rounded-[18px] border border-border bg-surface-card p-2.5 shadow-[0_10px_24px_-18px_rgba(26,19,18,0.18)] transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      <div
        className="grid aspect-square w-full place-items-center overflow-hidden rounded-[14px]"
        style={{ background: "color-mix(in srgb, var(--fg) 4%, transparent)" }}
      >
        {imageSrc ? (
          // Plain <img> instead of next/image so a missing webp doesn't crash
          // the slide — once the real files land in public/, they're served
          // as-is. Optimize later via next/image if the covers get large.
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            width={240}
            height={240}
            // No loading="lazy" — the Packs slide sits inside the
            // opacity:0 inactive slides of the carousel, and Safari
            // mobile sometimes defers lazy images inside hidden
            // containers past the point where the carousel reveals
            // them. Eager-load the pack covers so they're ready as
            // soon as the marquee becomes visible.
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[10px] uppercase tracking-wider text-fg-faint">
            cover coming
          </span>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-1.5">
        <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold leading-[1.15] tracking-[-0.005em] text-fg">
          {title}
        </span>
        <span
          className="shrink-0 rounded-full px-1.5 py-[2px] font-sans text-[9.5px] font-bold tracking-[0.02em] text-fg-muted"
          style={{ background: "color-mix(in srgb, var(--fg) 7%, transparent)" }}
        >
          {level}
        </span>
      </div>
    </div>
  );
}
