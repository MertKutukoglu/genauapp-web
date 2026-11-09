import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * LegalLayout — reading-column shell for Impressum / Datenschutz /
 * Cookie Policy. Keeps the content on a card surface consistent with
 * the hero cards' chrome (rounded, subtle top sheen), but with
 * generous padding and a ~760px reading column optimized for prose.
 *
 * Content inside should carry the `.legal-prose` class (defined in
 * globals.css) so the h1/h2/h3/p/ul styling matches the production
 * legal pages verbatim.
 */

export interface LegalLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function LegalLayout({ children, className }: LegalLayoutProps) {
  return (
    <div className={clsx("w-full mx-auto max-w-[1400px] px-3 pt-3 pb-6 md:px-4", className)}>
      <section
        className={clsx(
          "relative mx-auto flex max-w-[940px] flex-col overflow-hidden rounded-[32px] px-6 py-10 md:px-10 md:py-14",
          "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.10))]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)]",
          "[html:not([data-theme=dark])_&]:bg-[linear-gradient(to_bottom,rgba(14,10,10,0.03),rgba(14,10,10,0.07))]",
          "[html:not([data-theme=dark])_&]:shadow-[inset_0_1px_0_0_rgba(14,10,10,0.08)]",
        )}
      >
        <div className="mx-auto w-full max-w-[760px] legal-prose">
          {children}
        </div>
      </section>
    </div>
  );
}
