import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SkillBadgeArt } from "./SkillBadgeArt";

/**
 * SkillRing — the signature badge of GenauApp.
 *
 * Geometry ported verbatim from the iOS `SegmentedSkillRing.swift`:
 *   - 86×86 viewBox
 *   - Soft colored disc at r=32 (10%-tint skill color)
 *   - 4 ring segments at r=40 with 6px stroke
 *   - Each segment = 74° arc, 16° gap at 12/3/6/9 o'clock
 *   - Segment 0 starts at -82° (just clockwise of 12), subsequent rotated 90°
 *
 * Progress spreads sequentially across all four segments:
 *   ratio_i = clamp(progress * 4 - i, 0, 1)
 *
 * So progress 0.25 fills segment 0 only; 0.5 fills segments 0+1; 1.0 fills all four.
 *
 * Each skill draws its own illustration in the center via SkillBadgeArt
 * (pink closed book, purple set-square, blue newspaper, worn pencil).
 */

export type Skill = "vocab" | "grammar" | "reading" | "writing" | "listening";
export type SkillRingSize = "sm" | "md" | "lg";

const skillMeta: Record<Skill, { colorVar: string; label: string }> = {
  vocab:     { colorVar: "var(--color-skill-vocab)",     label: "Vocab" },
  grammar:   { colorVar: "var(--color-skill-grammar)",   label: "Gram"  },
  reading:   { colorVar: "var(--color-skill-reading)",   label: "Read"  },
  writing:   { colorVar: "var(--color-skill-writing)",   label: "Write" },
  listening: { colorVar: "var(--color-skill-listening)", label: "Listen"},
};

const sizePx: Record<SkillRingSize, { outer: number; labelCls: string }> = {
  // outer is the rendered CSS width; the SVG keeps its 86 viewBox and scales.
  sm: { outer: 64,  labelCls: "text-[10px]" },
  md: { outer: 86,  labelCls: "text-[11px]" },
  lg: { outer: 120, labelCls: "text-xs"     },
};

// --- Ring geometry (viewBox units) ---
const VB = 86;
const CENTER = 43;
const R_RING = 40;
const R_DISC = 32;
const STROKE = 6;
const SEG_GAP = 16;        // degrees
const SEG_ARC = 90 - SEG_GAP;        // 74°
const SEG_LEN = 2 * Math.PI * R_RING * (SEG_ARC / 360);

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

function arcPath(startDeg: number, endDeg: number) {
  const sx = CENTER + R_RING * Math.cos(toRad(startDeg));
  const sy = CENTER + R_RING * Math.sin(toRad(startDeg));
  const ex = CENTER + R_RING * Math.cos(toRad(endDeg));
  const ey = CENTER + R_RING * Math.sin(toRad(endDeg));
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${R_RING} ${R_RING} 0 ${largeArc} 1 ${ex} ${ey}`;
}

function segmentsFor(progress: number) {
  const p = Math.min(Math.max(progress, 0), 1);
  return [0, 1, 2, 3].map((i) => {
    const startDeg = -82 + i * 90;
    const endDeg = startDeg + SEG_ARC;
    const ratio = Math.min(Math.max(p * 4 - i, 0), 1);
    return {
      d: arcPath(startDeg, endDeg),
      dashOffset: SEG_LEN * (1 - ratio),
    };
  });
}

export interface SkillRingProps {
  skill: Skill;
  /** 0..1 — spread across 4 segments sequentially (0.25/0.5/0.75/1 fill 1/2/3/4). */
  progress?: number;
  size?: SkillRingSize;
  label?: string;
  hideLabel?: boolean;
  /**
   * When true, a cherry "collect-me" arrow badge appears top-right.
   * Used in the /try/ demo's skill strip to indicate pending progress.
   */
  pending?: boolean;
  className?: string;
}

export function SkillRing({
  skill,
  progress = 0.25,
  size = "md",
  label,
  hideLabel = false,
  pending = false,
  className,
}: SkillRingProps) {
  const { colorVar, label: defaultLabel } = skillMeta[skill];
  const { outer, labelCls } = sizePx[size];
  const segments = segmentsFor(progress);

  return (
    <div
      className={clsx("inline-flex flex-col items-center gap-1.5", className)}
      style={{
        ["--ring-color" as string]: colorVar,
        ["--ring-ghost" as string]: `color-mix(in oklab, ${colorVar} 18%, transparent)`,
      }}
    >
      <div
        className="relative inline-block"
        style={{ width: outer, height: outer }}
      >
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          width={outer}
          height={outer}
          aria-hidden
          className="block"
        >
          {/* Soft colored disc */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={R_DISC}
            fill="var(--ring-color)"
            fillOpacity="0.1"
          />
          {/* Ghost rails — all four arcs at low alpha so the frame reads even at 0% */}
          {segments.map((s, i) => (
            <path
              key={`g-${i}`}
              d={s.d}
              stroke="var(--ring-ghost)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              fill="none"
            />
          ))}
          {/* Fill — same arcs, tinted + dash-offset by ratio */}
          {segments.map((s, i) => (
            <path
              key={`f-${i}`}
              d={s.d}
              stroke="var(--ring-color)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={SEG_LEN}
              strokeDashoffset={s.dashOffset}
              style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.33, 1, 0.68, 1)" }}
            />
          ))}
          {/* Center illustration */}
          <SkillBadgeArt skill={skill} />
        </svg>

        {pending ? (
          <span
            aria-label="Collect pending progress"
            className="absolute -top-1 -right-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-accent text-white shadow-[0_2px_8px_color-mix(in_srgb,var(--accent)_45%,transparent)] animate-skill-pending"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        ) : null}
      </div>

      {hideLabel ? null : (
        <span className={clsx("font-semibold text-fg", labelCls)}>
          {label ?? defaultLabel}
        </span>
      )}
    </div>
  );
}
