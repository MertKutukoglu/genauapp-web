import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

/**
 * SkillRing — the signature visual of GenauApp.
 *
 * A segmented circular progress ring in the skill's color, with the
 * matching workout glyph tinted in the center. Mirrors the iOS
 * SegmentedSkillRing: 20 segments around the perimeter, the first N
 * filled by progress, the rest ghosted.
 *
 * Usage:
 *   <SkillRing skill="vocab" progress={0.35} size="md" label="Words" />
 */

export type Skill = "vocab" | "grammar" | "reading" | "writing" | "listening";
export type SkillRingSize = "sm" | "md" | "lg";

const skillMeta: Record<Skill, { colorVar: string; icon: IconName; label: string }> = {
  vocab:     { colorVar: "var(--color-skill-vocab)",     icon: "chip-words",    label: "Vocab" },
  grammar:   { colorVar: "var(--color-skill-grammar)",   icon: "chip-grammar",  label: "Gram"  },
  reading:   { colorVar: "var(--color-skill-reading)",   icon: "chip-reading",  label: "Read"  },
  writing:   { colorVar: "var(--color-skill-writing)",   icon: "chip-sentence", label: "Write" },
  listening: { colorVar: "var(--color-skill-listening)", icon: "headphones",    label: "Listen"},
};

const sizePx: Record<SkillRingSize, { outer: number; stroke: number; icon: number; label: string }> = {
  sm: { outer: 56,  stroke: 3,   icon: 20, label: "text-[10px]" },
  md: { outer: 80,  stroke: 4,   icon: 28, label: "text-[11px]" },
  lg: { outer: 112, stroke: 5,   icon: 36, label: "text-xs"     },
};

const SEGMENTS = 20;
const GAP_DEG = 2;

export interface SkillRingProps {
  skill: Skill;
  /** 0..1 — how much of the ring is filled with the skill color. */
  progress?: number;
  size?: SkillRingSize;
  /** Override the default label (e.g. "Words" instead of "Vocab"). */
  label?: string;
  /** Hide the text label underneath. */
  hideLabel?: boolean;
  className?: string;
}

export function SkillRing({
  skill,
  progress = 0.35,
  size = "md",
  label,
  hideLabel = false,
  className,
}: SkillRingProps) {
  const { colorVar, icon, label: defaultLabel } = skillMeta[skill];
  const { outer, stroke, icon: iconSize, label: labelCls } = sizePx[size];

  const cx = outer / 2;
  const cy = outer / 2;
  const r = outer / 2 - stroke;

  const segDeg = 360 / SEGMENTS;
  const arcDeg = segDeg - GAP_DEG;

  const filled = Math.round(Math.max(0, Math.min(1, progress)) * SEGMENTS);

  // Build an arc <path> for each segment at its angle.
  const segments = Array.from({ length: SEGMENTS }).map((_, i) => {
    // Start from top (−90°) and go clockwise.
    const startAngle = -90 + i * segDeg - arcDeg / 2 + segDeg / 2;
    const endAngle = startAngle + arcDeg;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const startX = cx + r * Math.cos(toRad(startAngle));
    const startY = cy + r * Math.sin(toRad(startAngle));
    const endX = cx + r * Math.cos(toRad(endAngle));
    const endY = cy + r * Math.sin(toRad(endAngle));
    const largeArc = arcDeg > 180 ? 1 : 0;
    const d = `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`;
    return (
      <path
        key={i}
        d={d}
        stroke={i < filled ? "var(--ring-color)" : "var(--ring-ghost)"}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
    );
  });

  return (
    <div
      className={clsx("inline-flex flex-col items-center gap-1", className)}
      style={{
        ["--ring-color" as string]: colorVar,
        ["--ring-ghost" as string]: `color-mix(in oklab, ${colorVar} 18%, transparent)`,
      }}
    >
      <div
        className="relative inline-flex items-center justify-center rounded-full"
        style={{
          width: outer,
          height: outer,
          background: `color-mix(in oklab, var(--ring-color) 10%, var(--surface-card))`,
        }}
      >
        <svg
          viewBox={`0 0 ${outer} ${outer}`}
          width={outer}
          height={outer}
          aria-hidden
          className="absolute inset-0"
        >
          {segments}
        </svg>
        <Icon
          name={icon}
          className="text-[color:var(--ring-color)]"
          style={{ width: iconSize, height: iconSize }}
        />
      </div>
      {hideLabel ? null : (
        <span className={clsx("font-semibold text-fg", labelCls)}>
          {label ?? defaultLabel}
        </span>
      )}
    </div>
  );
}
