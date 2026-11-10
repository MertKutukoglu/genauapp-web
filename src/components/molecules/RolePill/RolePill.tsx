import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ROLE_COLORS } from "@/lib/sentence/roleColors";
import type { SentenceRole } from "@/content/sentence-a1";

/**
 * RolePill — one pill in the Sentence formula strip. Shows a bold
 * role label (Subjekt / Verb / Objekt / Zeit / Ort / W-Wort) in the
 * role's color, with a small muted caption underneath ("Position 1",
 * "Where", "When", …).
 *
 * The label may contain a literal `\n` ("Possessiv +\nNomen") —
 * preserve it with `whitespace-pre-line` so the pill renders two
 * lines instead of stretching sideways.
 *
 * Pill visuals per brief §4.4:
 *   - flex-1 inside the strip (equal widths), min-width 72
 *   - 10×10 padding, radius 14
 *   - bg: color-mix(roleColor 10%, transparent)
 *   - border: 1px solid color-mix(roleColor 20%, transparent)
 *   - label: Open Sans bold 16, role color
 *   - caption: Open Sans regular 11, fg-muted, letter-spacing 0.3
 */

export interface RolePillProps {
  /** German role label (Subjekt, Verb, …). Bold in the role color. */
  text: string;
  /**
   * Translation of `text` in the viewer's locale (English on /try,
   * Turkish on /tr/try). Rendered one typographic step down from
   * `text` so the learner can anchor the German grammar term to a
   * word they already know. Preserves embedded `\n` the same way
   * `text` does — the Possessiv + Nomen pill breaks both lines.
   */
  translation?: string;
  caption: string;
  role: SentenceRole;
  className?: string;
}

export function RolePill({
  text,
  translation,
  caption,
  role,
  className,
}: RolePillProps) {
  const color = ROLE_COLORS[role];
  return (
    <div
      className={clsx(
        "flex-1 min-w-[72px] rounded-[14px] px-2.5 py-2.5",
        "flex flex-col items-center text-center gap-0.5",
        className,
      )}
      style={{
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
      }}
    >
      <div
        className="font-sans font-bold text-base leading-tight whitespace-pre-line"
        style={{ color }}
      >
        {text}
      </div>
      {translation ? (
        <div className="font-sans font-normal text-[13px] text-fg leading-tight whitespace-pre-line">
          {translation}
        </div>
      ) : null}
      <div
        className="font-sans font-normal text-[11px] text-fg-muted leading-tight"
        style={{ letterSpacing: "0.3px" }}
      >
        {caption}
      </div>
    </div>
  );
}
