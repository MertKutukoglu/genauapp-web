/**
 * Shared card-surface chrome lifted verbatim from the home page
 * (LandingLayout.tsx). One class string so every /try/ card speaks
 * the same visual language the landing cards do: no stroke, subtle
 * vertical translucent gradient as the whole lift, 1-pixel top-edge
 * inset sheen that reads as glass in dark mode and a hairline in
 * light. No outer drop shadow — the home cards don't carry one.
 *
 * Does NOT set radius, padding, display or layout — callers keep
 * their own geometry so this utility drops in anywhere a card lives
 * without fighting layout. Callers that previously carried
 * `bg-surface-card border border-border` or
 * `bg-surface-card ... shadow-[0_4px_12px…]` swap those for this
 * single class.
 *
 * Gradient direction and the pure-neutral white/black (instead of
 * `--fg`, which is a warm cream in dark mode) mirror the home cards
 * verbatim so the two surfaces are literally identical.
 */
export const tryCardSurface =
  "relative overflow-hidden " +
  // Dark mode: translucent white gradient + white top hairline
  "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.10))] " +
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] " +
  // Light mode inverts — faint black gradient + black top hairline
  "[html:not([data-theme=dark])_&]:bg-[linear-gradient(to_bottom,rgba(14,10,10,0.03),rgba(14,10,10,0.07))] " +
  "[html:not([data-theme=dark])_&]:shadow-[inset_0_1px_0_0_rgba(14,10,10,0.08)]";
