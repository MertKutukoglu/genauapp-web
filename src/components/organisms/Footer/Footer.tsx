"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Wordmark } from "@/components/atoms/Wordmark/Wordmark";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * Site footer — a pure-black band with a hairline top border so it
 * always separates from the hero cards (in dark mode the ambient bg
 * is near-black too, so without the border the footer was dissolving).
 *
 * Desktop: three-column grid — wordmark left, "Made in Berlin · 2026"
 * centered, legal links right.
 * Mobile: single-column stack.
 *
 * Locale-aware: link labels come from the i18n dict; the href for
 * each legal page points to its TR counterpart when the viewer is on
 * the TR tree. Those TR routes don't exist in Step 2 — Step 4 ships
 * them — so TR visitors currently fall through to the EN page via
 * Next's not-found. Acceptable for a short window; the Künye/Gizlilik/
 * Çerezler files land before the public TR announcement.
 */

export interface FooterProps {
  className?: string;
}

const LEGAL_HREFS = {
  en: {
    impressum: "/impressum",
    datenschutz: "/datenschutz",
    cookies: "/cookie-policy",
  },
  tr: {
    impressum: "/tr/kunye",
    datenschutz: "/tr/gizlilik",
    cookies: "/tr/cerezler",
  },
} as const;

export function Footer({ className }: FooterProps) {
  const { locale, strings } = useLocale();
  const hrefs = LEGAL_HREFS[locale];
  const links = [
    { href: hrefs.impressum, label: strings.footer.impressum },
    { href: hrefs.datenschutz, label: strings.footer.datenschutz },
    { href: hrefs.cookies, label: strings.footer.cookies },
  ];

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
          {strings.footer.tagline} · 2026
        </p>
        <nav
          aria-label={locale === "tr" ? "Yasal" : "Legal"}
          className="md:justify-self-end flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/70"
        >
          {links.map((l) => (
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
