import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * ParadigmGrid — the 2-column pronoun→form table shared by the
 * Grammar chip's verbParadigm, pronounChart, and verbConjugation
 * layouts.
 *
 * The left column is the pronoun (or whatever the row is keyed by),
 * right-aligned and muted. The right column is the form (or gloss),
 * left-aligned and semi-bold `--fg`. Row gap is 10px — spacing alone
 * separates rows; divider lines would read as a worksheet.
 *
 * The whole grid sits inside a sunk container (`--surface-sunk`,
 * 16/20 padding, 16 radius) so the six/eight rows group visually
 * against the card's own surface.
 *
 * For verbConjugation's "stem · ending" shape the caller passes a
 * React node in `form` — the two-part typography (muted stem / purple
 * ending) is the caller's job, not the grid's.
 */

export interface ParadigmRow {
  /** Row identifier shown in the left column. */
  pronoun: string;
  /** Form / gloss shown in the right column. Plain string, or a
   *  ReactNode for conjugation's stem + ending composition. */
  form: React.ReactNode;
}

export interface ParadigmGridProps {
  rows: ParadigmRow[];
  className?: string;
}

export function ParadigmGrid({ rows, className }: ParadigmGridProps) {
  return (
    // No sunk container around the grid any more — the card
    // surface alone frames it, which keeps the eye on the content
    // instead of the box. `justify-items-center` pins the 2-col
    // grid to the center of the card width; `w-max mx-auto` keeps
    // the grid itself only as wide as its content, so the pronouns
    // right-align against the forms without stretching across the
    // full card.
    <div className={clsx("flex justify-center", className)}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "auto 1fr",
          columnGap: "20px",
          rowGap: "10px",
        }}
      >
        {rows.map((row, i) => (
          <React.Fragment key={`${row.pronoun}-${i}`}>
            <div className="font-sans font-normal text-[15px] text-fg-muted text-right leading-tight">
              {row.pronoun}
            </div>
            <div className="font-sans font-semibold text-[17px] text-fg text-left leading-tight">
              {row.form}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
