"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import type { DictionaryEntry, DictLocale } from "./types";
import { STR, TYPE_LABEL, pick } from "./strings";
import { GrammarInfoModule } from "./GrammarInfoModule";

/**
 * GrammarInfoDisclosure wraps the Word Anatomy block as a native
 * <details>/<summary> element so the content ships in the HTML
 * (Google indexes it) without any client JS to expand. When the
 * user toggles it open:
 *
 *   - No card-in-card nesting. The trigger pill is its own card;
 *     every anatomy sub-card below it (flag, summary row, grammar,
 *     samples, phrases) stands on its own. The <details> element
 *     itself has no card chrome, it's a plain container.
 *   - A soft smooth-scroll runs as soon as the body appears, so
 *     the user lands at the top of the expanded anatomy rather
 *     than hunting for it below the fold.
 */

export interface GrammarInfoDisclosureProps {
  entry: DictionaryEntry;
  locale: DictLocale;
  defaultOpen?: boolean;
  className?: string;
}

export function GrammarInfoDisclosure({
  entry,
  locale,
  defaultOpen = false,
  className,
}: GrammarInfoDisclosureProps) {
  const detailsRef = React.useRef<HTMLDetailsElement>(null);

  // onToggle fires both on open and close. Only scroll on open,
  // and only after the browser has laid the expanded body out so
  // the scroll target is correct.
  const handleToggle = React.useCallback(
    (e: React.SyntheticEvent<HTMLDetailsElement>) => {
      const el = e.currentTarget;
      if (!el.open) return;
      requestAnimationFrame(() => {
        if (!detailsRef.current) return;
        detailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
    [],
  );

  return (
    <details
      ref={detailsRef}
      open={defaultOpen || undefined}
      onToggle={handleToggle}
      className={clsx(
        "group dict-grammar-disclosure",
        "flex flex-col gap-2",
        className,
      )}
    >
      {/* Trigger: its own card. No outer wrapper competes with it,
          so the summary acts as a proper button with the body
          opening fresh underneath. */}
      <summary
        className={clsx(
          "flex items-center justify-between gap-3",
          "rounded-[20px] px-5 sm:px-6 py-4",
          "cursor-pointer select-none list-none",
          "transition-colors",
          "outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
          "hover:opacity-90",
        )}
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
        }}
      >
        <span className="flex items-baseline gap-2">
          <span className="font-sans font-semibold text-[16px] text-fg">
            {pick(STR.grammarInfo, locale)}
          </span>
          <span
            className="font-sans text-[11px] uppercase text-fg-faint"
            style={{ letterSpacing: "0.4px" }}
          >
            {pick(TYPE_LABEL[entry.type], locale)}
          </span>
        </span>
        <span
          aria-hidden
          className="inline-flex items-center justify-center text-fg-muted transition-transform duration-200 group-open:rotate-90"
        >
          <Icon name="chevron-right" className="w-5 h-5" />
        </span>
      </summary>

      {/* Body: a flat stack of independent cards. GrammarInfoModule
          with hideHeader renders its own flat flex-col; we unwrap
          it once more here so the module's inner gap is the only
          spacing between cards. */}
      <GrammarInfoModule
        entry={entry}
        locale={locale}
        hideHeader
      />
    </details>
  );
}
