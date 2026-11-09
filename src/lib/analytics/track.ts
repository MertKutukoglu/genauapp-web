/**
 * Thin typed wrapper around `window.__track` so callers don't repeat the
 * try/catch. Use the event names from the handoff spec verbatim — PostHog
 * dashboards depend on them.
 */

export type DemoEvent =
  | "demo_landed"
  | "demo_level_picked"
  | "demo_level_change_opened"
  | "demo_chip_opened"
  | "demo_mode_toggled"
  | "demo_learn_repeat"
  | "demo_learn_iknow"
  | "demo_read_to_exercise"
  | "demo_question_answered"
  | "demo_chip_completed"
  | "demo_skill_collected"
  | "demo_pick_any_opened"
  | "demo_all_chips_completed"
  | "demo_taste_feedback"
  | "demo_waitlist_email"
  | "demo_restart";

export function track(event: DemoEvent, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.__track?.(event, props);
  } catch {
    /* swallow — analytics must never break the UI */
  }
}
