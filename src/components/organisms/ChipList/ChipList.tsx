"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Chip, type ChipKind } from "@/components/molecules/Chip/Chip";
import { useChipStore } from "@/stores/chipStore";

/**
 * ChipList — the /try/ left card's picker body: four chips stacked
 * vertically. Reads state straight from chipStore, dispatches openChip
 * on tap.
 *
 * Spec: claude/GenauApp_Web_Try_ChipPicker_Brief.md §2, §4-5.
 *
 * Order: Words → Grammar → Sentence → Reading (natural pedagogical
 * sequence; Listen is deliberately excluded from the demo).
 *
 * Why an ul not a div: each chip is a distinct named option in a
 * single-select picker, which is list semantics. Screen readers
 * announce "list, 4 items" and users can use arrow-key navigation
 * through them in some AT setups.
 */

interface ChipConfig {
  id: ChipKind;
  title: string;
  meta: string;
}

const CHIPS: ChipConfig[] = [
  { id: "words",    title: "Words",    meta: "20 words · ~5 min" },
  { id: "grammar",  title: "Grammar",  meta: "20 questions · ~5 min" },
  { id: "sentence", title: "Sentence", meta: "12 sentences · ~4 min" },
  { id: "reading",  title: "Reading",  meta: "1 passage · 5 questions" },
];

export interface ChipListProps {
  className?: string;
}

export function ChipList({ className }: ChipListProps) {
  const progress = useChipStore((s) => s.progress);
  const selected = useChipStore((s) => s.selected);
  const openChip = useChipStore((s) => s.openChip);
  const closeChip = useChipStore((s) => s.closeChip);

  return (
    <ul
      className={clsx(
        // Mobile strip: horizontal row, each chip flex-1 so the four
        // share the card width evenly (no vertical scroll cost for the
        // picker). At lg+ the spec §4 vertical stack returns so the
        // meta line has room to breathe in the sticky sidebar.
        "list-none m-0 p-0 flex flex-row gap-2",
        "lg:flex-col lg:gap-2.5",
        className,
      )}
    >
      {CHIPS.map((c) => {
        const done = progress[c.id] === "done";
        const isSelected = selected === c.id;
        // Done beats selected visually only when the chip isn't currently
        // open. If the user re-opens a done chip, show it as selected so
        // the active ring reads; the done badge stays visible via the
        // store (done state in store is independent of selection).
        const state = isSelected ? "selected" : done ? "done" : "default";

        return (
          <li key={c.id} className="m-0 flex-1 lg:flex-none min-w-0">
            <Chip
              kind={c.id}
              state={state}
              title={c.title}
              meta={c.meta}
              onClick={() => (isSelected ? closeChip() : openChip(c.id))}
            />
          </li>
        );
      })}
    </ul>
  );
}
