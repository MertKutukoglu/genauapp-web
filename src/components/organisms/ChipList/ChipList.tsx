"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Chip, type ChipKind } from "@/components/molecules/Chip/Chip";
import { useChipStore } from "@/stores/chipStore";
import { useLocale } from "@/lib/i18n/LocaleContext";

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

const CHIP_ORDER: ChipKind[] = ["words", "grammar", "sentence", "reading"];

export interface ChipListProps {
  className?: string;
}

export function ChipList({ className }: ChipListProps) {
  const { strings } = useLocale();
  const chipCopy = strings.try.leftCard.chips;
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
      {CHIP_ORDER.map((id) => {
        const done = progress[id] === "done";
        const isSelected = selected === id;
        // Done beats selected visually only when the chip isn't currently
        // open. If the user re-opens a done chip, show it as selected so
        // the active ring reads; the done badge stays visible via the
        // store (done state in store is independent of selection).
        const state = isSelected ? "selected" : done ? "done" : "default";
        const copy = chipCopy[id];

        return (
          <li key={id} className="m-0 flex-1 lg:flex-none min-w-0">
            <Chip
              kind={id}
              state={state}
              title={copy.title}
              meta={copy.meta}
              onClick={() => (isSelected ? closeChip() : openChip(id))}
            />
          </li>
        );
      })}
    </ul>
  );
}
