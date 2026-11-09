import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";

/**
 * StreakPill — "🔥 7 days" chip shown in the Workout slide header.
 * Amber-tinted pill, consistent with the app's streak treatment.
 */

export interface StreakPillProps {
  days: number;
  className?: string;
}

export function StreakPill({ days, className }: StreakPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        "text-[color:var(--color-skill-listening)]",
        "bg-[color:color-mix(in_oklab,var(--color-skill-listening)_14%,var(--surface-card))]",
        "border border-[color:color-mix(in_oklab,var(--color-skill-listening)_28%,transparent)]",
        className,
      )}
      aria-label={`${days}-day streak`}
    >
      <Icon name="flame" className="h-3.5 w-3.5" />
      <span>{days} days</span>
    </span>
  );
}
