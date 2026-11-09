"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { track } from "@/lib/analytics/track";

/**
 * BlogTOC — sticky table-of-contents sidebar used by the blog layout.
 *
 * Numbered list (decimal-leading-zero via CSS counters) of section
 * anchors. Clicking a link smooth-scrolls to the anchor and fires the
 * blog_toc_click analytics event so dashboards can see which sections
 * pull reader attention.
 *
 * Hidden below 920px — mobile readers scroll through the article
 * linearly without a nav aid.
 */

export interface BlogTOCItem {
  id: string;
  label: string;
}

export interface BlogTOCProps {
  items: BlogTOCItem[];
  /** Slug passed into blog_toc_click so it can be filtered per post. */
  slug: string;
  className?: string;
}

export function BlogTOC({ items, slug, className }: BlogTOCProps) {
  const onClick = (item: BlogTOCItem) => {
    if (typeof window === "undefined") return;
    try {
      window.__track?.("blog_toc_click", { section: item.id, label: item.label, slug });
    } catch {
      /* no-op */
    }
    void track; // keep the import consistent across call sites
  };

  return (
    <aside
      aria-label="Contents"
      className={clsx(
        "hidden lg:block sticky top-10 text-sm leading-tight font-sans",
        className,
      )}
      style={{ ["--toc-counter" as string]: "toc" }}
    >
      <div className="mb-3.5 pb-2.5 border-b border-border text-[11px] font-bold uppercase tracking-[0.1em] text-fg-faint">
        Contents
      </div>
      <ol className="list-none p-0 m-0" style={{ counterReset: "toc" }}>
        {items.map((item, i) => (
          <li
            key={item.id}
            className="mb-2.5"
            style={{ counterIncrement: "toc" }}
          >
            <a
              href={`#${item.id}`}
              onClick={() => onClick(item)}
              className={clsx(
                "flex items-baseline gap-2.5 py-1 text-fg-muted transition-colors hover:text-accent",
                "[&::before]:text-[10px] [&::before]:font-bold [&::before]:text-fg-faint [&::before]:tracking-[0.05em] [&::before]:flex-shrink-0 [&::before]:w-5 hover:[&::before]:text-accent",
              )}
              style={{
                // Inline content for ::before to make counter accessible to Tailwind arbitrary.
                // CSS counter is active via parent's counterReset + li's counterIncrement above.
              }}
              data-toc-index={i + 1}
            >
              <span
                aria-hidden
                className="text-[10px] font-bold text-fg-faint tracking-[0.05em] flex-shrink-0 w-5 inline-block"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
