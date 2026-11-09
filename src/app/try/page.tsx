"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useChipStore } from "@/stores/chipStore";
import { LevelPicker } from "@/components/templates/LevelPicker/LevelPicker";
import { TryLayout } from "@/components/templates/TryLayout/TryLayout";
import { LeftCard } from "@/components/templates/LeftCard/LeftCard";
import { RightCardRouter } from "@/components/organisms/RightCardRouter/RightCardRouter";

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
  const setLevel = useChipStore((s) => s.setLevel);
  const clearLevel = useChipStore((s) => s.clearLevel);
  const resetAll = useChipStore((s) => s.resetAll);

  // Honor query params — handled once on mount, then stripped from the
  // URL so a refresh doesn't re-fire them.
  //   ?reset  → full wipe (level + progress + selected)
  //   ?level  → clear only selectedLevel, keeping progress (used by the
  //             landing "Try it in your browser" CTA so returning
  //             visitors can pick a different level without losing done
  //             chips)
  const queryHandled = React.useRef(false);
  React.useEffect(() => {
    if (queryHandled.current) return;
    if (!searchParams) return;

    const hasReset = searchParams.get("reset") !== null;
    const hasLevel = searchParams.get("level") !== null;
    if (!hasReset && !hasLevel) return;

    queryHandled.current = true;
    if (hasReset) {
      resetAll();
    } else if (hasLevel) {
      clearLevel();
    }
    router.replace("/try", { scroll: false });
  }, [searchParams, resetAll, clearLevel, router]);

  // Gateway: no level picked yet.
  if (!selectedLevel) {
    return <LevelPicker onSelect={setLevel} />;
  }

  // Demo flow: left card + right slot. RightCardRouter resolves
  // chipStore.selected to the right-column content and handles the
  // mobile auto-focus scroll on chip open.
  return <TryLayout left={<LeftCard />} right={<RightCardRouter />} />;
}
