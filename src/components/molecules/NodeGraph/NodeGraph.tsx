import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import type { Skill } from "@/components/atoms/SkillRing/SkillRing";

/**
 * NodeGraph — the labeled-dot decoration under the SkillRingArc on the
 * landing hero. Six content nodes (Words, Grammar, Stories, Sentences,
 * Reading, Pronunciation) sit around the hero text, each connected by
 * thin lines to the skill ring that feeds it.
 *
 * Highlight one `activeSkill` to cherry-light the lines belonging to it
 * (matches the live landing's scene-synced highlight).
 */

export interface NodeGraphNode {
  id: string;
  /** Display name under the dot. */
  label: string;
  /** Position inside the 600×400 viewBox. */
  x: number;
  y: number;
  /** Which skill ring(s) feed this node. Line color comes from the first. */
  from: Skill[];
}

export interface NodeGraphProps {
  /** When set, lines from THIS skill render in the skill color; others stay muted. */
  activeSkill?: Skill;
  className?: string;
}

/** The 5 ring anchors across the top of the viewBox (match SkillRingArc). */
const RING_ANCHORS: Record<Skill, { x: number; y: number }> = {
  vocab:     { x:  80, y: 50 },
  grammar:   { x: 200, y: 32 },
  reading:   { x: 300, y: 20 },
  writing:   { x: 400, y: 32 },
  listening: { x: 520, y: 50 },
};

const SKILL_VARS: Record<Skill, string> = {
  vocab:     "var(--color-skill-vocab)",
  grammar:   "var(--color-skill-grammar)",
  reading:   "var(--color-skill-reading)",
  writing:   "var(--color-skill-writing)",
  listening: "var(--color-skill-listening)",
};

const DEFAULT_NODES: NodeGraphNode[] = [
  { id: "words",         label: "Words",         x:  60, y: 210, from: ["vocab", "writing"] },
  { id: "grammar",       label: "Grammar",       x: 540, y: 210, from: ["grammar", "writing"] },
  { id: "stories",       label: "Stories",       x:  50, y: 320, from: ["reading", "vocab"] },
  { id: "sentences",     label: "Sentences",     x: 540, y: 320, from: ["writing", "grammar"] },
  { id: "reading",       label: "Reading",       x: 140, y: 380, from: ["reading", "vocab"] },
  { id: "pronunciation", label: "Pronunciation", x: 440, y: 380, from: ["listening", "writing"] },
];

export function NodeGraph({ activeSkill, className }: NodeGraphProps) {
  return (
    <svg
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMid meet"
      className={clsx("w-full h-auto select-none", className)}
      aria-hidden
    >
      {/* Lines first so the dots paint over them. */}
      {DEFAULT_NODES.flatMap((n) =>
        n.from.map((skill, i) => {
          const a = RING_ANCHORS[skill];
          const isActive = activeSkill === skill;
          return (
            <line
              key={`${n.id}-${skill}-${i}`}
              x1={a.x}
              y1={a.y}
              x2={n.x}
              y2={n.y}
              stroke={
                isActive
                  ? SKILL_VARS[skill]
                  : `color-mix(in oklab, ${SKILL_VARS[skill]} 22%, transparent)`
              }
              strokeWidth={isActive ? 1.4 : 0.9}
              strokeLinecap="round"
              style={{ transition: "stroke 300ms ease, stroke-width 300ms ease" }}
            />
          );
        }),
      )}

      {/* Nodes */}
      {DEFAULT_NODES.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={6}
            fill="var(--surface-sunk)"
            stroke="var(--fg-faint)"
            strokeWidth="1"
          />
          <text
            x={n.x}
            y={n.y + 22}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-body)"
            fill="var(--fg-muted)"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
