"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useChipStore } from "@/stores/chipStore";
import { LevelPicker } from "@/components/templates/LevelPicker/LevelPicker";
import { TryLayout } from "@/components/templates/TryLayout/TryLayout";
import { LeftCard } from "@/components/templates/LeftCard/LeftCard";
import { RightCardPlaceholder } from "@/components/molecules/RightCardPlaceholder/RightCardPlaceholder";

/**
 * /try/ — the interactive taste demo.
 *
 * Two shapes, driven by the chip store:
 *   1. No level picked  → LevelPicker gateway (A1 / A2 / B1 / B2).
 *   2. Level picked     → TryLayout(LeftCard, right slot). Right slot
 *                         is RightCardPlaceholder for now; a chip's
 *                         session component replaces it when that
 *                         chip's content lands.
 *
 * `?reset` wipes every taste.* store key and reloads, then strips
 * the query so the URL doesn't carry it. Matches the escape-hatch
 * documented in GenauApp_Web_Try_ChipPicker_Brief.md §11.
 *
 * SSR note: the store is persist()-hydrated on the client. On the
 * very first paint, selectedLevel is null even for a returning
 * visitor — the useEffect in Zustand's persist middleware re-hydrates
 * on mount, after which the picker vanishes. The flicker is one
 * frame; a persist-aware skeleton is overkill for a gateway.
 */

export default function TryPage() {
  // useSearchParams forces this subtree into dynamic rendering. Wrap it
  // in Suspense so the rest of the app layout stays statically renderable
  // and the build doesn't error on bailout to client rendering.
  return (
    <React.Suspense fallback={null}>
      <TryPageInner />
    </React.Suspense>
  );
}

function TryPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedLevel = useChipStore((s) => s.selectedLevel);
  const selectedChip = useChipStore((s) => s.selected);
  const setLevel = useChipStore((s) => s.setLevel);
  const resetAll = useChipStore((s) => s.resetAll);

  // Honor ?reset — wipe everything, then strip the query so refreshes
  // don't re-reset. Runs exactly once on mount.
  const resetHandled = React.useRef(false);
  React.useEffect(() => {
    if (resetHandled.current) return;
    if (searchParams?.get("reset") !== null && searchParams?.get("reset") !== undefined) {
      resetHandled.current = true;
      resetAll();
      router.replace("/try", { scroll: false });
    }
  }, [searchParams, resetAll, router]);

  // Gateway: no level picked yet.
  if (!selectedLevel) {
    return <LevelPicker onSelect={setLevel} />;
  }

  // Demo flow: left card + right slot.
  return (
    <TryLayout
      left={<LeftCard />}
      right={<RightCardPlaceholder selectedChip={selectedChip} />}
    />
  );
}
