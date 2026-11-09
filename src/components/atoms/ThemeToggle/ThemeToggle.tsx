"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { track } from "@/lib/analytics/track";
import { Icon } from "@/components/atoms/Icon/Icon";

/**
 * ThemeToggle — sun/moon round button.
 *
 * Reads/writes the same localStorage key as the live landing
 * ("genauapp-landing-theme") so a user's preference carries across the
 * domain cutover. Toggling fires the "theme_toggle" analytics event
 * (not in the DemoEvent union because it isn't a demo event, hence
 * the raw window.__track call).
 */

type Theme = "light" | "dark";
const STORAGE_KEY = "genauapp-landing-theme";

function readCurrent(): Theme {
  if (typeof document === "undefined") return "light";
  return (
    (document.documentElement.getAttribute("data-theme") as Theme | null) ??
    "light"
  );
}

export type ThemeToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ThemeToggle({ className, ...rest }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    // Hydration sync: pull the live theme once on mount. Intentional
    // state-from-external-source pattern, not a cascading render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(readCurrent());
  }, []);

  const handleToggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / private-mode errors */
    }
    setTheme(next);
    if (typeof window !== "undefined") {
      try {
        window.__track?.("theme_toggle", { to: next, from: theme });
      } catch {
        /* no-op */
      }
    }
    void track;
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={clsx(
        "inline-grid place-items-center rounded-full border border-border bg-surface-card text-fg-muted transition",
        "hover:text-fg hover:border-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "w-9 h-9 max-[640px]:w-8 max-[640px]:h-8",
        className,
      )}
      {...rest}
    >
      <Icon name={isDark ? "sun" : "moon"} className="w-4 h-4" />
    </button>
  );
}
