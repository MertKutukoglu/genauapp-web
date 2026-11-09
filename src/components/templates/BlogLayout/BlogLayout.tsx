"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { BlogTOC, type BlogTOCItem } from "@/components/molecules/BlogTOC/BlogTOC";

/**
 * BlogLayout — article shell for `/blog/*` posts.
 *
 * Shape: [sticky TOC | article column] on lg+, article-only on < lg.
 * The article column uses `.blog-article` typography (serif body +
 * Open Sans counted H2s) defined in globals.css.
 *
 * `slug` flows into analytics (TOC clicks, read-75% ping), so each post
 * attributes its own events without the molecule caring which one.
 */

export interface BlogLayoutProps {
  slug: string;
  toc: BlogTOCItem[];
  children: React.ReactNode;
  className?: string;
}

export function BlogLayout({ slug, toc, children, className }: BlogLayoutProps) {
  const read75Fired = React.useRef(false);

  React.useEffect(() => {
    const onScroll = () => {
      if (read75Fired.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.75) {
        read75Fired.current = true;
        try {
          window.__track?.("blog_read_75", { slug });
        } catch {
          /* no-op */
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[1180px] px-6 pt-6 pb-16 md:px-10 md:pt-10 md:pb-24",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-[1020px] gap-10 lg:grid-cols-[220px_1fr]">
        <BlogTOC items={toc} slug={slug} />
        <article className="blog-article min-w-0">{children}</article>
      </div>
    </div>
  );
}
