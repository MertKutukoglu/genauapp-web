/**
 * Dictionary analytics: typed wrapper around `window.__track` for
 * the dictionary surface's events.
 *
 * Why its own file (next to track.ts's DemoEvent helper): the demo
 * and the dictionary are different funnels and their dashboards are
 * going to be sliced separately. Keeping the event name unions
 * apart stops a typo from `/try` leaking into dict queries.
 *
 * Event names are the source of truth for the PostHog dashboards,
 * do NOT rename without updating the dashboards.
 */

export type DictEvent =
  /** User typed a query and the debounced fetch returned.
   *  `results_count` is the row count returned by /api/dict/search
   *  BEFORE any client-side filter; 0 means the backend had nothing
   *  (same signal as dict_search_empty below). */
  | "dict_search_submitted"
  /** Convenience split of dict_search_submitted when results_count
   *  is 0. Fires in addition to dict_search_submitted so a single
   *  PostHog funnel can show 'searched' vs 'searched and found
   *  nothing' without doing math on properties. */
  | "dict_search_empty"
  /** User clicked a result row in the live result list (not a
   *  link from Popular/WOTD). `position` is 0-indexed. */
  | "dict_result_clicked"
  /** The word page mounted. The one event that best captures
   *  'engaged with a word', regardless of how they got there. */
  | "dict_word_viewed"
  /** The disclosure `<details>` on the word page was opened
   *  (closed is not tracked; the signal is engagement, not scrubbing). */
  | "dict_word_anatomy_opened"
  /** User switched the TR/EN translation toggle next to the
   *  search bar. */
  | "dict_translation_lang_toggled"
  /** Any click that leaves the dictionary toward the main
   *  waitlist, from any surface. `source` names the surface so we
   *  can tell which hook converts. */
  | "dict_waitlist_click"
  /** User clicked the Word of the Day card on the landing surface. */
  | "dict_wotd_clicked"
  /** User clicked a card in the Popular carousel on the landing
   *  surface. `position` is 0-indexed within the full list. */
  | "dict_popular_clicked";

export function trackDict(
  event: DictEvent,
  props: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  try {
    window.__track?.(event, props);
  } catch {
    /* swallow, analytics must never break the UI */
  }
}
