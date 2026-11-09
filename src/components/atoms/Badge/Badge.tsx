import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * Badge — small label pill (level badge "A1", "SOON", chip-done check).
 * Four tones map onto semantic tokens so they follow the theme.
 */

type Tone = "neutral" | "accent" | "ok" | "muted";
type Size = "xs" | "sm";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-sunk text-fg border border-border",
  accent: "bg-accent text-white",
  ok: "bg-ok text-white",
  muted: "bg-transparent text-fg-muted border border-border",
};

const sizeClasses: Record<Size, string> = {
  xs: "h-5 px-2 text-[11px] tracking-wide",
  sm: "h-6 px-2.5 text-xs",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: Size;
}

export function Badge({
  tone = "neutral",
  size = "sm",
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center gap-1 rounded-full font-semibold uppercase",
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
      {...rest}
    />
  );
}
