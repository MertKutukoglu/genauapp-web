import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * Button — the primary tappable atom.
 *
 * Rules the handoff bakes in:
 *   - Mobile-first: comfortable 44x44 hit target on touch; size variants
 *     grow with breakpoints.
 *   - Token-only styling. No literal hex anywhere.
 *   - Two tones (primary = cherry fill, ghost = outlined). Add new tones
 *     here, never as inline overrides at call sites.
 */

type Tone = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

const toneClasses: Record<Tone, string> = {
  primary:
    "bg-accent text-white shadow-md hover:-translate-y-px hover:shadow-lg active:translate-y-0 focus-visible:ring-accent",
  ghost:
    "bg-transparent text-fg border border-border hover:border-border-strong hover:bg-surface-sunk focus-visible:ring-accent",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-base sm:h-12",
  lg: "h-12 px-6 text-base sm:h-14 sm:text-lg",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
  size?: Size;
  /** Render as a full-width block — the default on mobile for CTAs. */
  block?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { tone = "primary", size = "md", block = false, className, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:cursor-not-allowed disabled:opacity-50",
          block && "w-full",
          toneClasses[tone],
          sizeClasses[size],
          className,
        )}
        {...rest}
      />
    );
  },
);
