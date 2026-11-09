import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ICONS, type IconName } from "./icons";

export type { IconName };

/**
 * Icon — a tint-friendly SVG symbol.
 *
 * Usage:
 *   <Icon name="lightbulb" className="w-5 h-5 text-accent" />
 *
 * Sizing is driven by Tailwind utilities on className (w-4 h-4, w-6 h-6…)
 * and color by currentColor — set text-{token} and the icon tints with it.
 * Decorative by default (aria-hidden); pass `title` to expose it with a
 * <title> element and role="img".
 */

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  /** When set, the icon becomes accessible with role="img" and this label. */
  title?: string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, title, className, ...rest },
  ref,
) {
  const children = ICONS[name];
  const labelled = typeof title === "string" && title.length > 0;

  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? title : undefined}
      className={clsx("inline-block shrink-0", className)}
      {...rest}
    >
      {labelled ? <title>{title}</title> : null}
      {children}
    </svg>
  );
});
