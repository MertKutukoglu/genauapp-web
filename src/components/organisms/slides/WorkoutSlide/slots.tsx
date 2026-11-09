/**
 * Slide 1 — Workout: data definitions.
 *
 * Verbatim content lifted from `_landing-deploy/index.html` per
 * `claude/GenauApp_Web_Landing_Slide1_Workout.md`. Per-chip colors are
 * the inline rgba values from the live markup — kept here (not via
 * design tokens) because they're part of the content, not the theme.
 */

export type WorkoutChipKey =
  | "words"
  | "grammar"
  | "story"
  | "sentence"
  | "pronunciation"
  | "reading";

export interface ChipSpec {
  key: WorkoutChipKey;
  label: string;
  /** Tinted background color for the idle chip tile. */
  fill: string;
  /** Saturated icon + selected-border color. */
  icon: string;
}

/**
 * Display order inside the 6-column grid. Words first because it is
 * the DONE chip on the production landing.
 */
export const CHIP_LAYOUT: ChipSpec[] = [
  { key: "words",         label: "Words",         fill: "rgba(236, 72, 153, 0.14)", icon: "#EC4899" },
  { key: "grammar",       label: "Grammar",       fill: "rgba(139, 92, 246, 0.18)", icon: "#8B5CF6" },
  { key: "story",         label: "Story",         fill: "rgba(245, 158, 11, 0.18)", icon: "#F59E0B" },
  { key: "sentence",      label: "Sentence",      fill: "rgba(16, 185, 129, 0.18)", icon: "#10B981" },
  { key: "pronunciation", label: "Pronunciation", fill: "rgba(239, 68, 68, 0.18)",  icon: "#EF4444" },
  { key: "reading",       label: "Reading",       fill: "rgba(59, 130, 246, 0.18)", icon: "#3B82F6" },
];

/**
 * Cycling order the controller walks through — matches the live JS's
 * ORDER array. Grammar first on first paint; Words last.
 */
export const CYCLE_ORDER: WorkoutChipKey[] = [
  "grammar",
  "story",
  "sentence",
  "pronunciation",
  "reading",
  "words",
];

/** Which chips start in the `done` (green-check) state. */
export const DONE_KEYS: WorkoutChipKey[] = ["words"];

export interface WorkoutTask {
  title: string;
  value: string;
  done?: boolean;
}

export interface SlotContent {
  heading: string;
  cta: string;
  tasks: WorkoutTask[];
}

export const SLOT_CONTENT: Record<WorkoutChipKey, SlotContent> = {
  grammar: {
    heading: "Grammar",
    cta: "Start · Separable Verbs · Deck 1",
    tasks: [
      { title: "Modal Verbs",      value: "Wollen", done: true },
      { title: "Separable Verbs",  value: "Deck 1" },
    ],
  },
  words: {
    heading: "Words",
    cta: "Practice again · Daily Life · Verbs Deck 1",
    tasks: [
      { title: "Daily Life", value: "Nouns Deck 1", done: true },
      { title: "Daily Life", value: "Verbs Deck 1", done: true },
    ],
  },
  story: {
    heading: "Story",
    cta: "Start · Film Night at Home",
    tasks: [
      { title: "Film Night at Home", value: "6 steps" },
    ],
  },
  sentence: {
    heading: "Sentence Builder",
    cta: "Start · Daily Routines · Set 2",
    tasks: [
      { title: "Daily Routines", value: "Set 1", done: true },
      { title: "Daily Routines", value: "Set 2" },
    ],
  },
  pronunciation: {
    heading: "Pronunciation",
    cta: "Start · Everyday Sounds",
    tasks: [
      { title: "Everyday Sounds", value: "10 words" },
    ],
  },
  reading: {
    heading: "Reading",
    cta: "Start · Erster Schnee",
    tasks: [
      { title: "Erster Schnee", value: "A1 · 4 questions" },
    ],
  },
};
