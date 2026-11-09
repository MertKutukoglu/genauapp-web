"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SlideHead } from "@/components/molecules/SlideHead/SlideHead";
import {
  CHIP_LAYOUT,
  CYCLE_ORDER,
  DONE_KEYS,
  SLOT_CONTENT,
  type WorkoutChipKey,
} from "./slots";
import { WpChipIcon } from "./WpChipIcons";

/**
 * Slide 1 — Workout. Verbatim port of the production landing slide
 * (claude/GenauApp_Web_Landing_Slide1_Workout.md).
 *
 * Behavior spec:
 *   - 6-chip square grid in DOM order: Words, Grammar, Story, Sentence,
 *     Pronunciation, Reading. Words is permanently `done` (green check
 *     badge, bottom-right).
 *   - Cycling order (the controller walks this): Grammar → Story →
 *     Sentence → Pronunciation → Reading → Words → loop. 2600ms per tick.
 *   - Only runs while the slide is the active carousel slide (the
 *     parent sets `isActiveSlide`); resets to Grammar on re-activation.
 *   - CTA label comes from the active slot's `cta` string (never falls
 *     back to a generic "Start").
 *   - Active slot is absolutely stacked — all 6 mounted, only the
 *     active one has opacity 1 (220ms ease fade between swaps).
 */

export interface WorkoutSlideProps {
  /** Pause cycling while this slide isn't the carousel's active one. */
  isActiveSlide?: boolean;
  /** Override the 2600ms cycle (test harness). */
  cycleMs?: number;
  className?: string;
}

export function WorkoutSlide({
  isActiveSlide = true,
  cycleMs = 2600,
  className,
}: WorkoutSlideProps) {
  const [idx, setIdx] = React.useState(0);
  const active: WorkoutChipKey = CYCLE_ORDER[idx];

  React.useEffect(() => {
    if (!isActiveSlide) return;
    setIdx(0); // reset to Grammar on re-activation
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % CYCLE_ORDER.length),
      cycleMs,
    );
    return () => window.clearInterval(id);
  }, [isActiveSlide, cycleMs]);

  const slot = SLOT_CONTENT[active];

  return (
    <div
      className={clsx(
        "flex flex-col gap-6 md:gap-8",
        className,
      )}
    >
      <SlideHead
        eyebrow="Workout"
        headline={
          <>
            Built from your <em>last performance</em>.
          </>
        }
        sub="Yesterday's misses come back today. Today's wins get a rest. The workout is yours, not a template."
      />

      {/* Workout peek — app-faithful card */}
      <section
        aria-label="Workout sneak peek"
        className="mx-auto flex w-full max-w-[420px] flex-col gap-3.5 rounded-[24px] border border-border bg-surface-card p-5 shadow-[0_24px_56px_-24px_rgba(26,19,18,0.28)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <h3 className="font-sans text-[22px] font-bold leading-tight tracking-[-0.015em] text-fg">
            Your Workout
          </h3>
          <span
            aria-label="7 day streak"
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-sunk px-3 py-1 text-[13px] font-bold tabular-nums text-fg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5 text-[#F97316]">
              <path d="M13 2s4 4 4 9c0 2.5-2 4-2 4s2 .5 3 2.5c0 3-3 4.5-6 4.5s-7-2-7-6c0-5 5-6 5-9 0-2-1-3-1-3s4 1 4-2z" />
            </svg>
            <span>7</span>
          </span>
        </div>

        {/* 6-chip square grid */}
        <div
          className="grid grid-cols-6 gap-2 px-0.5"
          role="tablist"
          aria-label="Workouts"
        >
          {CHIP_LAYOUT.map((c) => {
            const isSelected = c.key === active;
            const isDone = DONE_KEYS.includes(c.key);
            return (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={c.label}
                onClick={() => setIdx(CYCLE_ORDER.indexOf(c.key))}
                className={clsx(
                  "relative grid aspect-square place-items-center rounded-[18px] transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                )}
                style={{
                  background: c.fill,
                  color: c.icon,
                  boxShadow: isSelected ? `inset 0 0 0 2.5px ${c.icon}` : undefined,
                }}
              >
                <WpChipIcon chip={c.key} />
                {isDone ? (
                  <span
                    aria-hidden
                    className="absolute bottom-[5px] right-[5px] grid h-[14px] w-[14px] place-items-center rounded-full bg-[#10B981] text-white shadow-[0_0_0_2px_var(--surface-card)]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2">
                      <path d="M5 12l4 4 10-10" />
                    </svg>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Stacked slots — only the active one is visible */}
        <div className="relative grid [grid-template-areas:'stack']">
          {CYCLE_ORDER.map((k) => {
            const s = SLOT_CONTENT[k];
            const isActive = k === active;
            return (
              <div
                key={k}
                className={clsx(
                  "flex flex-col gap-2.5 px-1 pt-1 [grid-area:stack] transition-[opacity,transform] duration-[220ms] ease-out",
                  isActive
                    ? "pointer-events-auto opacity-100 translate-y-0"
                    : "pointer-events-none opacity-0 translate-y-1.5",
                )}
                aria-hidden={!isActive}
              >
                <h4 className="font-sans text-[18px] font-semibold leading-tight tracking-[-0.01em] text-fg">
                  {s.heading}
                </h4>
                {s.tasks.map((t, ti) => (
                  <TaskRow key={ti} title={t.title} value={t.value} done={t.done} />
                ))}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-[18px] flex w-full items-center gap-3 rounded-[24px] bg-accent px-5 py-3.5 text-[15px] font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span className="flex-1 text-left">{slot.cta}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </section>
    </div>
  );
}

function TaskRow({
  title,
  value,
  done,
}: {
  title: string;
  value: string;
  done?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 text-[15px] font-semibold",
        done ? "text-fg-muted line-through" : "text-fg",
      )}
    >
      <span
        aria-hidden
        className={clsx(
          "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full",
          done
            ? "bg-[#10B981] border-[#10B981] text-white"
            : "border-[1.5px] border-fg-muted/40",
        )}
      >
        {done ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
            <path d="M5 12l4 4 10-10" />
          </svg>
        ) : null}
      </span>
      <span>{title}</span>
      <span aria-hidden className="inline-block h-1 w-1 shrink-0 rounded-full bg-current opacity-90" />
      <span>{value}</span>
    </div>
  );
}
