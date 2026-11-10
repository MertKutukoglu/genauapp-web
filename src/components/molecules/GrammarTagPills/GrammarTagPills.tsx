"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * GrammarTagPills — center-aligned row of clickable grammar pills.
 *
 * Each pill is a button; tapping one expands a small explanation card
 * beneath the row (and closes any previously open one). Tapping the
 * same pill again, or the ✕ inside the card, dismisses it. Keeps the
 * surface quiet by default — explanations only appear when asked.
 *
 * Color conventions follow the textbook / blog tradition the rest of
 * the app uses:
 *   - akkusativ → accent (red/rose) — matches `.color-akk` in the blog
 *   - dativ     → article-das (green) — matches `.color-dat`
 *
 * These pull through CSS variables so dark mode flips with the rest of
 * the theme; no need for per-pill dark overrides.
 */

export type GrammarTag =
  | "separable"
  | "reflexive"
  | "aux-sein"
  | "transitive"
  | "intransitive"
  | "irregular"
  | "akkusativ"
  | "dativ";

interface TagDef {
  label: string;
  /** CSS color expression — either a token var() reference or a hex. */
  color: string;
  /** One or two sentences, shown in the expanded card. */
  explanation: string;
}

const TAG_DEFS: Record<GrammarTag, TagDef> = {
  separable: {
    label: "Separable",
    color: "#E8A838",
    explanation:
      "The prefix splits off when conjugated: aufstehen → Ich stehe um sieben auf.",
  },
  reflexive: {
    label: "Reflexive",
    color: "#4A90D9",
    explanation:
      "Verb takes itself as object with a reflexive pronoun: sich waschen → Ich wasche mich.",
  },
  "aux-sein": {
    label: "takes sein",
    color: "#8B5CF6",
    explanation:
      "Forms the Perfekt with sein, not haben: Ich bin nach Hause gegangen. Usually motion or change of state.",
  },
  transitive: {
    label: "Transitive",
    color: "#0EA5E9",
    explanation:
      "Takes a direct object (something that receives the action): Ich sehe den Mann.",
  },
  intransitive: {
    label: "Intransitive",
    color: "#64748B",
    explanation:
      "No direct object — the action stands on its own: Ich gehe. Ich schlafe.",
  },
  irregular: {
    label: "Irregular",
    color: "#DB2777",
    explanation:
      "Stem vowel changes in du / er forms: lesen → du liest, er liest. Sprechen, essen, fahren follow the same pattern.",
  },
  akkusativ: {
    label: "Akkusativ",
    color: "var(--accent)",
    explanation:
      "Direct-object case. Articles: den, einen, das, ein, die, eine. Example: Ich lese das Buch.",
  },
  dativ: {
    label: "Dativ",
    color: "var(--article-das)",
    explanation:
      "Indirect-object case (also triggered by verbs like helfen, danken). Articles: dem, einem, der, einer, dem. Example: Ich helfe dem Mann.",
  },
};

export interface GrammarTagPillsProps {
  tags: GrammarTag[];
  className?: string;
}

const CLOSE_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function GrammarTagPills({ tags, className }: GrammarTagPillsProps) {
  const [active, setActive] = React.useState<GrammarTag | null>(null);

  // Collapse any open card when the tag list itself changes — a new
  // card word should start with everything closed.
  const tagsKey = tags.join("|");
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(null);
  }, [tagsKey]);

  if (!tags || tags.length === 0) return null;

  const activeDef = active ? TAG_DEFS[active] : null;

  return (
    <div className={clsx("flex flex-col gap-3", className)}>
      {/* Pills row — centered so the group reads as a header strip,
          not a flush-left meta line. */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((t) => {
          const def = TAG_DEFS[t];
          const isActive = active === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActive(isActive ? null : t)}
              aria-expanded={isActive}
              aria-label={`${def.label} — tap to learn more`}
              className={clsx(
                "inline-flex items-center rounded-full",
                "px-2.5 py-1.5 font-sans font-semibold text-[13px] leading-none",
                "transition-[background,box-shadow] duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                isActive && "ring-2",
              )}
              style={{
                color: def.color,
                background: `color-mix(in srgb, ${def.color} ${
                  isActive ? "22%" : "12%"
                }, transparent)`,
                // Ring color = pill color for the active state.
                ["--tw-ring-color" as string]: def.color,
              }}
            >
              {def.label}
            </button>
          );
        })}
      </div>

      {/* Expanded card — appears inline below the pill row when a pill
          is open. Left-border uses the active pill's color so the
          association is immediate. */}
      {activeDef ? (
        <div
          role="region"
          aria-label={`${activeDef.label} explanation`}
          className={clsx(
            "relative rounded-xl py-3 pl-3.5 pr-10",
            "text-[13.5px] leading-relaxed text-fg",
          )}
          style={{
            background: `color-mix(in srgb, ${activeDef.color} 8%, transparent)`,
            borderLeft: `3px solid ${activeDef.color}`,
          }}
        >
          <p className="m-0 font-sans">{activeDef.explanation}</p>
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close explanation"
            className={clsx(
              "absolute top-2.5 right-2 inline-flex items-center justify-center",
              "w-7 h-7 rounded-full text-fg-muted",
              "transition hover:text-fg hover:bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            {CLOSE_ICON}
          </button>
        </div>
      ) : null}
    </div>
  );
}
