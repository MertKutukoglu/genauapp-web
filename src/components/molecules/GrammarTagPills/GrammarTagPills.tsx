import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * GrammarTagPills — the flow-wrapping row of pills verbs sometimes
 * carry (separable / reflexive / aux sein / transitive / intransitive).
 *
 * Spec §6.1:
 *   - Each pill: Open Sans semi-bold 13, padding 10×6, radius 999,
 *     color = tag color, background = tag color @ 12% opacity.
 *   - FlowLayout (web: flex-wrap) so long rows wrap.
 *
 * Hex values come from Theme/GrammarTags.swift in the iOS repo per
 * spec. Icon per tag is kept out of the first pass — text labels alone
 * read fine at the pill's compact size; add icons in a later iteration
 * if the pills need more visual weight.
 *
 * Returns `null` on empty input so the parent can hand the component
 * whatever it has without a conditional.
 */

export type GrammarTag =
  | "separable"
  | "reflexive"
  | "aux-sein"
  | "transitive"
  | "intransitive";

interface TagDef {
  label: string;
  color: string;
}

const TAG_DEFS: Record<GrammarTag, TagDef> = {
  separable:    { label: "Separable",    color: "#E8A838" },
  reflexive:    { label: "Reflexive",    color: "#4A90D9" },
  "aux-sein":   { label: "takes sein",   color: "#8B5CF6" },
  transitive:   { label: "Transitive",   color: "#0EA5E9" },
  intransitive: { label: "Intransitive", color: "#64748B" },
};

export interface GrammarTagPillsProps {
  tags: GrammarTag[];
  className?: string;
}

export function GrammarTagPills({ tags, className }: GrammarTagPillsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={clsx("flex flex-wrap gap-2", className)}>
      {tags.map((t) => {
        const def = TAG_DEFS[t];
        return (
          <span
            key={t}
            className="inline-flex items-center rounded-full px-2.5 py-1.5 font-sans font-semibold text-[13px] leading-none"
            style={{
              color: def.color,
              background: `color-mix(in srgb, ${def.color} 12%, transparent)`,
            }}
          >
            {def.label}
          </span>
        );
      })}
    </div>
  );
}
