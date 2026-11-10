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
  neutral: "var(--fg)",
};
