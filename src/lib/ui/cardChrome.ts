/**
 * Shared card-surface chrome for /try/.
 *
 * Dark mode mirrors the home page's LandingLayout cards verbatim:
 * no stroke, subtle translucent white vertical gradient as the
 * whole lift, 1-pixel top-edge inset sheen for glass. On warmdk-900
 * (the dark page bg) this reads as a softly lifted glass tile.
 *
 * Light mode diverges from the home card recipe — the home cards
 * use a near-invisible black gradient (3% → 7%) that barely
 * separates from a warm-50 page bg, so /try/ cards bled into the
 * background. Switch light mode to an opaque white (`--surface-
 * card`) + a hairline inset so cards read as clearly white against
 * the page's warm cream. The home page keeps its glass recipe
 * untouched.
 *
 * Does NOT set radius, padding, display or layout — callers keep
 * their own geometry so this utility drops in anywhere a card
 * lives without fighting layout.
 */
export const tryCardSurface =
  "relative overflow-hidden " +
  // Dark mode: translucent white gradient + white top hairline
  "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.10))] " +
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] " +
  // Light mode: solid white card + faint 1px hairline. Readable
  // contrast against the warm-cream page bg without needing a
  // stroke.
  "[html:not([data-theme=dark])_&]:bg-[color:var(--surface-card)] " +
  "[html:not([data-theme=dark])_&]:shadow-[inset_0_1px_0_0_rgba(14,10,10,0.05),0_1px_2px_0_rgba(14,10,10,0.04)]";
