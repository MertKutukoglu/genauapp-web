import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { BlogIndexCard } from "@/components/molecules/BlogIndexCard/BlogIndexCard";
import { getBlogPostsForLocale } from "@/content/blog/posts";
import type { Locale } from "@/lib/i18n/config";
import { getStrings } from "@/lib/i18n/strings";

/**
 * BlogIndex, the `/blog` and `/tr/blog` hub page body.
 *
 * Reads the registry (`src/content/blog/posts.ts`) for the given
 * locale and renders a single H1 + an ordered list of
 * `BlogIndexCard`s, newest-first. Page-level metadata (title, meta
 * description, OG) lives on the `page.tsx` that mounts this organism,
 * because Next's `metadata` export has to be colocated with the route.
 *
 * Server-renderable: no `"use client"`, no hooks. Strings come from
 * the i18n dict via a plain lookup; locale picks the right surface.
 *
 * Index copy in `strings.blogIndex` says what the blog IS without
 * naming any specific post, so the page reads well even on days
 * when the registry has just one post in it.
 */

export interface BlogIndexProps {
  locale: Locale;
  className?: string;
}

export function BlogIndex({ locale, className }: BlogIndexProps) {
  const strings = getStrings(locale);
  const posts = getBlogPostsForLocale(locale);

  return (
    <main
      className={clsx(
        "w-full mx-auto max-w-[760px]",
        "px-6 pt-10 pb-20 md:px-10 md:pt-16 md:pb-28",
        className,
      )}
    >
      <header className="mb-10 md:mb-14">
        <h1
          className={clsx(
            "font-display font-bold text-fg m-0 leading-tight",
            "text-[40px] md:text-[56px]",
          )}
        >
          {strings.blogIndex.title}
        </h1>
        <p
          className={clsx(
            "mt-4 font-sans font-normal text-fg-muted leading-relaxed",
            "text-[17px] md:text-[19px] max-w-[620px]",
          )}
        >
          {strings.blogIndex.description}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="font-sans text-fg-muted text-[16px]">
          {strings.blogIndex.emptyState}
        </p>
      ) : (
        <ul className="flex flex-col gap-4 md:gap-5 list-none p-0 m-0">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogIndexCard
                href={post.href}
                title={post.title}
                description={post.description}
                publishedAt={post.publishedAt}
                readingTimeMinutes={post.readingTimeMinutes}
                readingTimeLabel={strings.blogIndex.readingTime}
                locale={locale}
                ariaLabel={strings.blogIndex.postCardAria}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
