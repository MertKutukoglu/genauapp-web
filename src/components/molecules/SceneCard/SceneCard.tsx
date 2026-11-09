import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * SceneCard — container for each scene in the landing's right column.
 *
 * Every scene has:
 *   - An eyebrow (small uppercase cherry label) — e.g. "WORKOUT"
 *   - A Fraunces headline with optional cherry italic emphasis
 *   - A body paragraph
 *   - A visual slot (child) — the WorkoutCardMock, Grammar score card,
 *     Packs grid, etc.
 *
 * The container itself owns padding and the content column width;
 * callers only supply the slot content.
 */

export interface SceneCardProps {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  body?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function SceneCard({
  eyebrow,
  heading,
  body,
  children,
  className,
}: SceneCardProps) {
  return (
    <section
      className={clsx(
        "flex w-full flex-col gap-4 px-6 py-10 md:gap-6 md:px-10 md:py-12",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-semibold uppercase tracking-[0.18em] text-sm text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-fg leading-[1.1] md:text-4xl">
        {heading}
      </h2>
      {body ? (
        <p className="max-w-prose text-base text-fg-muted md:text-lg">{body}</p>
      ) : null}
      {children ? <div className="mt-4 md:mt-6">{children}</div> : null}
    </section>
  );
}
