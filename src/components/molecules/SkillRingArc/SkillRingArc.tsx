import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SkillRing, type Skill } from "@/components/atoms/SkillRing/SkillRing";

/**
 * SkillRingArc — the 5 SkillRings arranged in a gentle arc at the top of
 * the landing hero. Outer rings sit slightly below, middle ring rises
 * highest — a shallow smile.
 *
 * Callers pass per-skill progress; the arc shape is a layout-only decoration
 * provided by this molecule.
 */

export interface SkillRingArcEntry {
  skill: Skill;
  progress: number;
  /** Override the label shown beneath the ring. */
  label?: string;
}

export interface SkillRingArcProps {
  entries?: SkillRingArcEntry[];
  /** Ring size for every entry. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const DEFAULT: SkillRingArcEntry[] = [
  { skill: "vocab",     progress: 0.6  },
  { skill: "grammar",   progress: 0.4  },
  { skill: "reading",   progress: 0.85 },
  { skill: "writing",   progress: 0.3  },
  { skill: "listening", progress: 0.2  },
];

// Y offset per index for a 5-ring smile — zero at the peak, grows toward the edges.
const ARC_OFFSETS = [10, -14, -24, -14, 10];

export function SkillRingArc({
  entries = DEFAULT,
  size = "md",
  className,
}: SkillRingArcProps) {
  const rings = entries.slice(0, ARC_OFFSETS.length);
  return (
    <div
      className={clsx(
        "mx-auto flex flex-wrap items-end justify-center gap-4 sm:flex-nowrap sm:gap-5",
        className,
      )}
    >
      {rings.map((e, i) => (
        <div
          key={e.skill}
          className="transition-transform"
          style={{ transform: `translateY(${ARC_OFFSETS[i] ?? 0}px)` }}
        >
          <SkillRing
            skill={e.skill}
            progress={e.progress}
            size={size}
            label={e.label}
          />
        </div>
      ))}
    </div>
  );
}
