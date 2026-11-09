import * as React from "react";
import type { ChipFlavor } from "@/components/atoms/Chip/Chip";

/**
 * ActiveSlot — one card per workout chip. Each slot is a tiny
 * app-faithful mock of the "what today's workout looks like" peek.
 *
 * Content follows the handoff spec for Slide 1. The visuals are
 * intentionally small and typographic — the slide tells the story
 * through the cycling selection, not through a huge dashboard.
 */

export type WorkoutChip = Extract<
  ChipFlavor,
  "words" | "grammar" | "story" | "sentence" | "pronunciation" | "reading"
>;

export const WORKOUT_CHIPS: WorkoutChip[] = [
  "words",
  "grammar",
  "story",
  "sentence",
  "pronunciation",
  "reading",
];

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between text-sm">{children}</div>
);

export const SLOT_META: Record<
  WorkoutChip,
  { title: string; meta: string; cta: string }
> = {
  words:         { title: "Words",         meta: "12 words · 5 min", cta: "Start Words" },
  grammar:       { title: "Grammar",       meta: "3 topics · 8 min", cta: "Start Grammar" },
  story:         { title: "Story",         meta: "Scene 4 of 7 · Haircut", cta: "Continue Story" },
  sentence:      { title: "Sentence",      meta: "2 sentences · 3 min", cta: "Start Sentence" },
  pronunciation: { title: "Pronunciation", meta: "5 words · 4 min", cta: "Start Pronunciation" },
  reading:       { title: "Reading",       meta: "1 passage · 4 min", cta: "Start Reading" },
};

export function ActiveSlot({ chip }: { chip: WorkoutChip }) {
  const meta = SLOT_META[chip];
  return (
    <div className="rounded-xl bg-surface-sunk/70 border border-border p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <h4 className="font-display text-base font-semibold text-fg">
          {meta.title}
        </h4>
        <span className="text-xs text-fg-faint">{meta.meta}</span>
      </div>
      <div className="min-h-[80px] text-sm text-fg-muted">
        {chip === "words" && (
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--chip-words-color)]" />
              Pack · <span className="text-fg">Daily Life</span>
            </li>
            <li>Samples: <em className="not-italic text-fg">das Brot</em>, <em className="not-italic text-fg">gehen</em>, <em className="not-italic text-fg">die Tür</em></li>
          </ul>
        )}
        {chip === "grammar" && (
          <ul className="space-y-1">
            <Row><span>Articles (der/die/das)</span><span className="text-fg">84%</span></Row>
            <Row><span>Perfekt — Partizip II</span><span className="text-fg">56%</span></Row>
            <Row><span>Separable verbs</span><span className="text-fg">71%</span></Row>
          </ul>
        )}
        {chip === "story" && (
          <div className="space-y-2">
            <p className="text-xs text-fg-faint">Chat preview</p>
            <div className="rounded-lg bg-surface-card px-3 py-2 text-sm text-fg">
              „Wohin gehst du?&quot;
            </div>
            <div className="ml-6 rounded-lg bg-[color:color-mix(in_oklab,var(--chip-story-color)_18%,var(--surface-card))] px-3 py-2 text-sm text-fg">
              „Ich gehe nach Hause.&quot;
            </div>
          </div>
        )}
        {chip === "sentence" && (
          <div className="flex flex-wrap gap-1.5">
            {["Ich", "gehe", "nach", "Hause", "."].map((w) => (
              <span
                key={w}
                className="inline-flex items-center rounded-md border border-border bg-surface-card px-2 py-1 text-sm text-fg"
              >
                {w}
              </span>
            ))}
          </div>
        )}
        {chip === "pronunciation" && (
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 64 24" className="h-6 w-16 text-[color:var(--chip-pronunciation-color)]" aria-hidden>
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {[2, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61].map((x, i) => {
                  const h = 4 + ((i * 7) % 14);
                  return <line key={x} x1={x} x2={x} y1={12 - h / 2} y2={12 + h / 2} />;
                })}
              </g>
            </svg>
            <span className="text-fg">gehen</span>
            <span className="text-xs text-fg-faint">Tap to hear a native speaker</span>
          </div>
        )}
        {chip === "reading" && (
          <blockquote className="border-l-2 border-[color:var(--chip-reading-color)] pl-3 italic text-fg">
            „Max öffnet die Tür. Draußen scheint die Sonne…&quot;
          </blockquote>
        )}
      </div>
    </div>
  );
}
