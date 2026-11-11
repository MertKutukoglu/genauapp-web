import type { SentenceRole } from "@/content/sentence-a1";

/**
 * Role → CSS color token for the Sentence chip's formula strip,
 * example segments, and (post-check) feedback banner.
 *
 * Subject/object reuse the article color tokens on purpose — the
 * Sentence chip's "subjects are blue, objects are green" mnemonic
 * is the same visual grammar the Words chip teaches. Verb reuses
 * the cherry accent so Correct/Next buttons and verb pills share
 * one voice. Time + place get their own (--role-time amber,
 * --role-place violet). Modal/neutral fall back to accent/fg.
 */
export const ROLE_COLORS: Record<SentenceRole, string> = {
  subject: "var(--color-article-der)",
  verb: "var(--accent)",
  object: "var(--color-article-das)",
  time: "var(--role-time)",
  place: "var(--role-place)",
  qword: "var(--accent)",
  modal: "var(--accent)",
  // Reflexive pronouns (mich/dich/sich/uns/euch) refer BACK to the
  // subject, so they reuse the subject's blue. Pedagogically-chosen,
  // not an accident — matching colors teach "this zamir özneyle
  // bağlantılı" without an extra legend. A2 Sentence introduces
  // this role on the Reflexivpronomen anchor + 4 scene drills.
  reflexive: "var(--color-article-der)",
  neutral: "var(--fg)",
};
