"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * BlogTOC — sticky table-of-contents sidebar used by the blog layout.
 *
 * Numbered list (decimal-leading-zero via CSS counters) of section
 * anchors. Clicking smooth-scrolls to the section with a top offset
 * so the heading lands below the viewport edge, and the clicked item
 * stays highlighted. An IntersectionObserver also tracks which
 * section is currently in view so the TOC auto-focuses as the
 * reader scrolls.
 *
 * Hidden below lg — mobile readers scroll through the article
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
  /** Offset in px the clicked section lands below the viewport top. */
  scrollOffset?: number;
}

export function BlogTOC({
  items,
  slug,
  className,
  scrollOffset = 80,
}: BlogTOCProps) {
  const [active, setActive] = React.useState<string>(items[0]?.id ?? "");

  // Observe section headings and keep the TOC's active item in sync
  // with the heading closest to the top of the viewport.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const nodes = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to (and above) the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Account for the scroll offset and give it a comfortable band
        // so a long section stays highlighted while it owns the viewport.
        rootMargin: `-${scrollOffset + 8}px 0px -60% 0px`,
        threshold: 0,
      },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [items, scrollOffset]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, item: BlogTOCItem) => {
    if (typeof window === "undefined") return;
    const target = document.getElementById(item.id);
    if (!target) return;

    e.preventDefault();
    setActive(item.id);
    try {
      window.__track?.("blog_toc_click", {
        section: item.id,
        label: item.label,
        slug,
      });
    } catch {
      /* no-op */
    }

    const top =
      target.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top, behavior: "smooth" });
    // Update the URL hash without jumping (the smooth scroll owns the motion).
    history.replaceState(null, "", `#${item.id}`);
  };

  return (
    <aside
      aria-label="Contents"
      className={clsx(
        "hidden lg:block sticky top-10 self-start text-sm leading-tight font-sans",
        className,
      )}
    >
      <div className="mb-3.5 pb-2.5 border-b border-border text-[11px] font-bold uppercase tracking-[0.1em] text-fg-faint">
        Contents
      </div>
      <ol className="list-none p-0 m-0">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="mb-2.5">
              <a
                href={`#${item.id}`}
                onClick={(e) => onClick(e, item)}
                aria-current={isActive ? "location" : undefined}
                className={clsx(
                  "flex items-baseline gap-2.5 py-1 transition-colors duration-200",
                  isActive
                    ? "text-accent"
                    : "text-fg-muted hover:text-accent",
                )}
              >
                <span
                  aria-hidden
                  className={clsx(
                    "text-[10px] font-bold tracking-[0.05em] flex-shrink-0 w-5 inline-block transition-colors duration-200",
                    isActive ? "text-accent" : "text-fg-faint",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
