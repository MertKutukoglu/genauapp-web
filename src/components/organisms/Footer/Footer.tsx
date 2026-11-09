import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Wordmark } from "@/components/atoms/Wordmark/Wordmark";

/**
 * Site footer — a pure-black band with a hairline top border so it
 * always separates from the hero cards (in dark mode the ambient bg
 * is near-black too, so without the border the footer was dissolving).
 *
 * Desktop: three-column grid — wordmark left, "Made in Berlin · 2026"
 * centered, legal links right.
 * Mobile: single-column stack.
 */

export interface FooterProps {
  className?: string;
}

const LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={clsx(
        "landing-footer w-full shrink-0 bg-black text-white/85",
        "border-t border-white/10",
        "[padding-inline:max(1rem,env(safe-area-inset-left))_max(1rem,env(safe-area-inset-right))]",
        "md:[padding-inline:2rem]",
        "py-4 md:py-5",
        className,
      )}
    >
      <div
        className={clsx(
          "max-w-7xl mx-auto",
          "grid gap-3",
          "grid-cols-1 md:grid-cols-[1fr_auto_1fr]",
          "items-center",
        )}
      >
        <div className="md:justify-self-start">
          <Wordmark variant="footer" />
        </div>
        <p className="md:justify-self-center text-xs text-white/60">
          Made in Berlin · 2026
        </p>
        <nav
          aria-label="Legal"
          className="md:justify-self-end flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/70"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-white transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
