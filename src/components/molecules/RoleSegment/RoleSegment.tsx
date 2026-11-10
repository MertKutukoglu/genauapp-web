import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ROLE_COLORS } from "@/lib/sentence/roleColors";
import type { SentenceRole } from "@/content/sentence-a1";

/**
 * RoleSegment — a single inline-colored span used by the Sentence
 * chip's Learn examples and the Exercise feedback banner.
 *
 * Takes one word (or word group like "mein Bruder." or "in Berlin.")
 * and renders it in the role's color at semi-bold 17. No padding,
 * no background — the segments live inline inside a prose line
 * separated by a single space. Wrapping is the parent's job.
 *
 * Kept as a tiny leaf so both Learn (FormulaExamples) and the
 * Incorrect banner (reveals role-colored correct sentence) can
 * import it from one place.
 */

export interface RoleSegmentProps {
  text: string;
  role: SentenceRole;
  className?: string;
}

export function RoleSegment({ text, role, className }: RoleSegmentProps) {
  return (
    <span
      className={clsx(
        "font-sans font-semibold text-[17px]",
        className,
      )}
      style={{ color: ROLE_COLORS[role] }}
    >
      {text}
    </span>
  );
}
