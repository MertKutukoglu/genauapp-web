"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { WorkoutCounter } from "@/components/atoms/WorkoutCounter/WorkoutCounter";
import { SkillStrip } from "@/components/molecules/SkillStrip/SkillStrip";
import { ChipList } from "@/components/organisms/ChipList/ChipList";
import { useChipStore } from "@/stores/chipStore";
import { useSkillStore } from "@/stores/skillStore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { tryCardSurface } from "@/lib/ui/cardChrome";

/**
 * LeftCard — the /try/ page's sticky left column.
 *
 * Now composed of TWO stacked cards instead of one combined card:
 *
 *   1. Skills card — "Skills" h2 above the SkillStrip. Carries only
 *      the skill badges; progress rings + pending-badge collect
 *      interactions live here.
 *   2. Your workout card — the familiar chip picker: header
 *      ("Your workout" + 0/4 counter) → one-line subtitle → ChipList.
 *
 * Why split: one card trying to hold both responsibilities read as
 * dense setup. Two cards each own one concept — glanceable, each
 * card is a complete small unit the user can parse in one sweep.
 *
 * Shared frame styling kept in the inner `Card` wrapper so both
 * cards look identical and spacing + shadow stay consistent. The
 * whole aside stays sticky on desktop; mobile stacks naturally.
 *
 * Spec: claude/GenauApp_Web_Try_ChipPicker_Brief.md §7, §9
 * (updated layout — 2026-11-12).
 */

export interface LeftCardProps {
  /**
   * Override for the SkillStrip in the Skills card. When
   * `undefined` (default) the strip is live-bound to the
   * skillStore. Pass `null` to hide the Skills card entirely, or
   * a React node to swap in a stub (used by stories / previews).
   */
  skillStrip?: React.ReactNode | null;
  className?: string;
}

/** Shared card frame — matches the one the old single-card LeftCard
 *  used so the visual register of the column doesn't shift. */
function Card({
  children,
  ariaLabel,
  className,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <section
      aria-label={ariaLabel}
      className={clsx(
        tryCardSurface,
        "rounded-[22px] p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function LeftCard({ skillStrip, className }: LeftCardProps) {
  const { strings } = useLocale();
  const t = strings.try.leftCard;
  const skillsT = strings.try.skillsCard;
  const doneCount = useChipStore((s) =>
    Object.values(s.progress).filter((v) => v === "done").length,
  );

  const progress = useSkillStore((s) => s.progress);
  const pending = useSkillStore((s) => s.pending);
  const collect = useSkillStore((s) => s.collect);

  // Default strip: live-bound to the skillStore. The pending prop is
  // a boolean map (presence = badge visible); the number lives in
  // the store. Clicking a badge fires `collect`, which applies that
  // skill's staged delta and clears the badge.
  const pendingFlags = React.useMemo(
    () => ({
      vocab: Boolean(pending.vocab),
      grammar: Boolean(pending.grammar),
      writing: Boolean(pending.writing),
      reading: Boolean(pending.reading),
    }),
    [pending],
  );

  const stripNode =
    skillStrip === undefined ? (
      <SkillStrip
        progress={progress}
        pending={pendingFlags}
        onCollect={collect}
      />
    ) : (
      skillStrip
    );

  return (
    <aside
      aria-label={t.title}
      className={clsx(
        // Column gap between the Skills card and Your workout card
        // matches the spacing the old combined card used between
        // its subtitle and the skill strip.
        "flex flex-col gap-3.5",
        // Sticky on desktop only; the parent grid stacks on mobile.
        "lg:sticky lg:top-[92px] lg:self-start",
        className,
      )}
    >
      {/* Card 1 — Skills. Hidden when the caller explicitly passes
          null, so previews can suppress it. */}
      {stripNode ? (
        <Card ariaLabel={skillsT.title}>
          <h2
            className={clsx(
              "font-display font-semibold italic text-[22px] leading-tight",
              "text-fg m-0 mb-3",
            )}
          >
            {skillsT.title}
          </h2>
          {stripNode}
        </Card>
      ) : null}

      {/* Card 2 — Your workout: header + subtitle + chip picker. */}
      <Card ariaLabel={t.title}>
        <header className="flex items-center justify-between gap-3">
          <h2
            className={clsx(
              "font-display font-semibold italic text-[22px] leading-tight",
              "text-fg m-0",
            )}
          >
            {t.title}
          </h2>
          <WorkoutCounter count={doneCount} total={4} />
        </header>
        <p className="mt-2 mb-3.5 font-sans text-[13px] leading-normal text-fg-muted">
          {t.subtitle}
        </p>
        <ChipList />
      </Card>
    </aside>
  );
}
