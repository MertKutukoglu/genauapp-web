import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import type { DictionaryEntry, DictLocale } from "./types";
import { STR, TYPE_LABEL, pick } from "./strings";
import { GrammarInfoModule } from "./GrammarInfoModule";

/**
 * GrammarInfoDisclosure, the collapsed-by-default wrapper around
 * GrammarInfoModule. The user lands on the WordCard alone; the
 * disclosure trigger sits below it and expands the module on tap.
 *
 * Uses native <details>/<summary> on purpose:
 *   - Full HTML content ships on first render, so Google indexes
 *     everything inside even when the user never expands.
 *   - No client JS required. The page stays a server component.
 *   - Native keyboard + screen reader support out of the box
 *     (summary is a real interactive element).
 *
 * The visual anatomy mirrors the iOS "Grammar Info →" button: a
 * wide rounded bar with the title left and a chevron right that
 * rotates on open. Expanding the disclosure reveals the module
 * padded inside the same surface, continuing the "one card" read.
 */

export interface GrammarInfoDisclosureProps {
  entry: DictionaryEntry;
  locale: DictLocale;
  /** Whether to start open. Default false (fold-friendly). */
  defaultOpen?: boolean;
  className?: string;
}

export function GrammarInfoDisclosure({
  entry,
  locale,
  defaultOpen = false,
  className,
}: GrammarInfoDisclosureProps) {
  return (
    <details
      open={defaultOpen || undefined}
      className={clsx(
        "group rounded-[24px] overflow-hidden",
        "dict-grammar-disclosure",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      <summary
        className={clsx(
          "flex items-center justify-between gap-3",
          "px-5 sm:px-6 py-4",
          "cursor-pointer select-none",
          "list-none",
          "hover:opacity-90 transition-opacity",
          "outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
        )}
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
          className={clsx(
            "inline-flex items-center justify-center",
            "text-fg-muted",
            "transition-transform duration-200",
            "group-open:rotate-90",
          )}
        >
          <Icon name="chevron-right" className="w-5 h-5" />
        </span>
      </summary>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        {/* Divider line separating trigger from body once open. */}
        <div
          className="h-px w-full mb-5"
          style={{ background: "var(--border)" }}
        />
        <GrammarInfoModule
          entry={entry}
          locale={locale}
          hideHeader
          className="dict-grammar-inner"
        />
      </div>
    </details>
  );
}
