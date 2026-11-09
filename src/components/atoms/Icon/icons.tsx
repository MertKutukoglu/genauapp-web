import * as React from "react";

/**
 * SVG icon library.
 *
 * Rules:
 *   - 24×24 viewBox, stroke based, 2px stroke, round caps/joins.
 *   - stroke="currentColor" so the tint flows from the parent's text color.
 *   - fill="none" everywhere except the Apple logo and the Sparkle, which
 *     are solid shapes by design (they mirror the live site).
 *
 * Add a new icon by (a) writing the SVG children here under a new key and
 * (b) adding its name to IconName in Icon.tsx.
 */

export const ICONS = {
  // ---------- Navigation / chrome ----------
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  "chevron-right": <path d="M9 6l6 6-6 6" />,
  "chevron-left": <path d="M15 6l-6 6 6 6" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17L17 7M9 7h8v8" />,
  "arrow-down-right": <path d="M7 7l10 10M17 9v8H9" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12l4 4L19 7" />,

  // ---------- Actions ----------
  play: <path d="M8 5l12 7-12 7V5z" fill="currentColor" stroke="none" />,
  pause: <path d="M8 5v14M16 5v14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 10H3c0-3 3-3 3-10z" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),

  // ---------- Content / semantic ----------
  book: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />,
  "book-open": (
    <>
      <path d="M2 4h7a3 3 0 0 1 3 3v13" />
      <path d="M22 4h-7a3 3 0 0 0-3 3v13" />
    </>
  ),
  lightbulb: (
    <>
      {/* AppIcons.hint, ported verbatim from the iOS theme. */}
      <path d="M9.988 16.582C7.644 15.593 6 13.272 6 10.561C6 6.484 9.722 3.284 13.943 4.139C16.443 4.651 18.465 6.661 18.986 9.161C19.664 12.427 17.887 15.437 15.154 16.592L15.151 17.88C15.149 18.708 14.478 19.378 13.65 19.378H11.486C10.655 19.378 9.982 18.703 9.984 17.873L9.988 16.582Z" />
      <path d="M11.283 21.137H13.859" />
      <path d="M15.711 15.731H12.711" />
    </>
  ),
  flame: (
    <path d="M12 2s4 4 4 9a4 4 0 0 1-8 0c0-2 1-3 1-4 0 2 1 3 3 3 0-3-2-4-2-8 1 0 2 0 2 0z" />
  ),
  dumbbell: (
    <>
      <path d="M6 7v10M3 9v6M18 7v10M21 9v6" />
      <path d="M6 12h12" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2z" />
      <path d="M20 14v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2z" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3M8 21h8" />
    </>
  ),

  // ---------- Status / feedback ----------
  "thumbs-up": (
    <path d="M7 10v11H4V10h3zm3 0l3-7a2 2 0 0 1 2 2v5h5a2 2 0 0 1 2 2l-2 7a2 2 0 0 1-2 1h-8V10z" />
  ),
  "thumbs-down": (
    <path d="M7 14V3h-3v11h3zm3 0l3 7a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2l-2-7a2 2 0 0 0-2-1h-8v10z" />
  ),

  // ---------- Brand / decorative ----------
  apple: (
    <path
      d="M17.6 13.1c0-2.8 2.3-4.2 2.4-4.2-1.3-1.9-3.4-2.2-4.1-2.2-1.7-.2-3.4 1-4.3 1-.9 0-2.3-1-3.8-1-2 .1-3.8 1.2-4.8 3-2.1 3.6-.5 8.9 1.5 11.9 1 1.4 2.1 3 3.6 2.9 1.5-.1 2-.9 3.8-.9s2.2.9 3.8.9c1.6 0 2.6-1.4 3.5-2.9.6-1 1.3-2.3 1.6-3.7-.1 0-3.2-1.2-3.2-4.8zm-2.9-8.9c.8-1 1.4-2.3 1.3-3.7-1.2.1-2.7.8-3.5 1.8-.8.8-1.5 2.2-1.3 3.5 1.4.1 2.7-.7 3.5-1.6z"
      fill="currentColor"
      stroke="none"
    />
  ),
  sparkle: (
    <path
      d="M16.96 3.13v-.52c-1.44 0-2.6-1.17-2.6-2.61h-.53c0 1.44-1.17 2.61-2.61 2.61v.52c1.44 0 2.61 1.17 2.61 2.61h.53c0-1.44 1.17-2.61 2.6-2.61z"
      fill="currentColor"
      stroke="none"
      fillOpacity="0.9"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  send: <path d="M22 2L2 11l9 2 2 9L22 2z" />,
} as const;

export type IconName = keyof typeof ICONS;
