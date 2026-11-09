import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Wordmark } from "@/components/atoms/Wordmark/Wordmark";

/**
 * Site footer — always sits on a pure-black band so the wordmark and legal
 * links read the same in light and dark themes (matches the live site).
 *
 * Desktop: three-column grid — wordmark left, "Made in Berlin · 2026"
 * centered, legal links right.
 * Mobile: stack — wordmark + made-in on top, legal links below.
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
        "landing-footer w-full bg-black text-white/85",
        "[padding-inline:max(1rem,env(safe-area-inset-left))_max(1rem,env(safe-area-inset-right))]",
        "md:[padding-inline:2rem]",
        "py-6",
        className,
      )}
    >
      <div
        className={clsx(
          "max-w-7xl mx-auto",
          "grid gap-4",
          "grid-cols-1 md:grid-cols-[1fr_auto_1fr]",
          "items-center",
        )}
      >
        <div className="md:justify-self-start">
          <Wordmark variant="footer" />
        </div>
        <p className="md:justify-self-center text-sm text-white/70">
          Made in Berlin · 2026
        </p>
        <nav
          aria-label="Legal"
          className="md:justify-self-end flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70"
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
