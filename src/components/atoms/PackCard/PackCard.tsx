import * as React from "react";
import Image from "next/image";
import { clsx } from "@/lib/utils/clsx";
import { Badge } from "@/components/atoms/Badge/Badge";

/**
 * PackCard — illustrated pack tile for the landing Packs scene.
 *
 * Shape: square aspect, rounded-xl, illustration fills the whole tile
 * with a dark gradient scrim at the bottom. Title sits over the scrim
 * on the bottom-left; CEFR level badge in the bottom-right.
 *
 * `imageSrc` is optional — when missing, the tile renders a tinted
 * placeholder so pack covers can land incrementally.
 */

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface PackCardProps {
  title: string;
  level: CEFRLevel;
  /** Absolute / public-relative path to the cover image. Omit for a placeholder. */
  imageSrc?: string;
  /** Optional alternative text for the cover. Defaults to the title. */
  imageAlt?: string;
  /** Click handler; omit to render a non-interactive tile. */
  onClick?: () => void;
  className?: string;
}

export function PackCard({
  title,
  level,
  imageSrc,
  imageAlt,
  onClick,
  className,
}: PackCardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      {...(onClick ? { type: "button", onClick } : {})}
      className={clsx(
        "group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface-card",
        "aspect-square",
        onClick && "transition hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className,
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-fg-faint text-sm"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--accent) 12%, var(--surface-sunk)) 0%, var(--surface-sunk) 100%)",
          }}
        >
          <span>cover coming</span>
        </div>
      )}

      {/* Dark scrim so title + badge stay readable on any image. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"
      />

      <span className="absolute bottom-3 left-3 pr-16 font-display text-base font-semibold text-white">
        {title}
      </span>
      <Badge
        tone="neutral"
        className="absolute bottom-3 right-3 !bg-white/15 !text-white !border-white/25 backdrop-blur"
      >
        {level}
      </Badge>
    </Tag>
  );
}
