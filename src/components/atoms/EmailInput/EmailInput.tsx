import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * EmailInput — pill-shaped text input for the waitlist form.
 *
 * Styled to match the live landing: rounded-full, surface-card bg,
 * low-contrast muted placeholder, no visible border until focus.
 * Pairs with Button (tone="primary") inside WaitlistForm molecule.
 */

export type EmailInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  function EmailInput({ className, type = "email", ...rest }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        inputMode="email"
        autoComplete="email"
        className={clsx(
          "h-11 w-full min-w-0 rounded-full bg-surface-sunk px-5 text-base text-fg",
          "placeholder:text-fg-faint",
          "border border-transparent transition",
          "focus:border-accent focus:outline-none focus:bg-surface-card",
          "disabled:opacity-50",
          className,
        )}
        {...rest}
      />
    );
  },
);
