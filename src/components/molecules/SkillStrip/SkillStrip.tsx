"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SkillRing, type Skill } from "@/components/atoms/SkillRing/SkillRing";

/**
 * SkillStrip — the row of four 54×54 skill badges that sits between
 * the left card's subtitle and the chip list.
 *
 * Mirrors the production markup in
 * claude/GenauApp_Web_Try_ChipPicker_Brief.md §8 and the geometry
 * from claude/GenauApp_Web_SkillBadges_SVG.md.
 *
 * Listen is deliberately excluded from the demo per spec — the four
 * badges are Vocab, Gram, Read, Write in that order.
 *
 * Progress is passed in as a per-skill 0..1 map. The parent owns the
 * numbers — this component is presentational so the same strip can
 * sit on surfaces with different data sources (store, static demo,
 * server-rendered summary). `pending` and `onCollect` are per-skill
 * too, powering the "tap to collect" mechanic from §8; omit them and
 * the badges render as inert visuals.
 */

export type SkillStripId = Exclude<Skill, "listening">;

const SKILLS: SkillStripId[] = ["vocab", "grammar", "reading", "writing"];

export interface SkillStripProps {
  /** 0..1 fill per skill. Missing keys default to 0. */
  progress?: Partial<Record<SkillStripId, number>>;
  /** Show the "collect-me" cherry badge on these skills. */
  pending?: Partial<Record<SkillStripId, boolean>>;
  /** Called when the user taps a badge (used by the collect mechanic). */
  onCollect?: (skill: SkillStripId) => void;
  className?: string;
}

export function SkillStrip({
  progress,
  pending,
  onCollect,
  className,
}: SkillStripProps) {
  return (
    <div
      aria-label="Skills progress"
      className={clsx(
        // Spec §8 CSS: flex row, 10px gap, space-between, nowrap.
        "flex flex-nowrap justify-between items-start gap-2.5",
        className,
      )}
    >
      {SKILLS.map((id) => {
        const p = progress?.[id] ?? 0;
        const isPending = Boolean(pending?.[id]);
        const interactive = typeof onCollect === "function";

        const ring = (
          <SkillRing
            skill={id}
            size="xs"
            progress={p}
            pending={isPending}
          />
        );

        return interactive ? (
          <button
            key={id}
            type="button"
            onClick={() => onCollect?.(id)}
            aria-label={`${id} skill${isPending ? " — pending progress" : ""}`}
            className={clsx(
              "appearance-none bg-transparent border-0 p-0 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              "rounded-full transition-transform duration-200 hover:scale-[1.05]",
            )}
          >
            {ring}
          </button>
        ) : (
          <div key={id}>{ring}</div>
        );
      })}
    </div>
  );
}
