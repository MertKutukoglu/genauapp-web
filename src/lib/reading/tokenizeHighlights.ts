/**
 * tokenizeHighlights — splits a Reading passage into a flat token
 * stream where each token is either plain text or a tap-to-translate
 * HIGHLIGHT bound to one of the content's declared highlights.
 *
 * Match strategy (deliberately simple):
 *   - Split the passage on word boundaries using a regex that keeps
 *     German letters (including ß and the umlauts äöüÄÖÜ).
 *   - Walk the word tokens in order. For each word, check if any
 *     unclaimed highlight's `surface` matches this exact string
 *     (case-sensitive, whole-word).
 *   - First unclaimed hit wins. Each highlight only matches once,
 *     so authors can pin which occurrence counts by ordering the
 *     highlights array (A1 has no repeats; the mechanism is here
 *     for future passages).
 *   - If a highlight carries a `companion` (separable verb prefix),
 *     a *second* unclaimed word matching that companion gets bound
 *     to the same highlight. The chip for the pair opens whichever
 *     word the user taps.
 *   - Paragraph breaks (`\n\n`) survive as literal `"\n\n"` tokens
 *     so the renderer can group tokens back into <p> blocks.
 *
 * Returned tokens:
 *   - { kind: "text",  text }               — plain text (letters,
 *                                              punctuation, spaces,
 *                                              or the "\n\n" break)
 *   - { kind: "highlight", text, highlight } — a word bound to a
 *                                              ReadingHighlight.
 *
 * Non-goals right now: fuzzy matching, lemma-based matching,
 * multi-word phrase matching (e.g. "zur Verfügung stellen"). All
 * out of scope for the A1 pilot; add when a passage needs them.
 */

import type { ReadingHighlight } from "@/content/reading-a1";

export type HighlightToken =
  | { kind: "text"; text: string }
  | { kind: "highlight"; text: string; highlight: ReadingHighlight };

/** Splits "abc, def!" into ["abc", ", ", "def", "!"] etc. */
const WORD_SPLIT_RE = /([A-Za-zÄÖÜäöüß]+)/;

/**
 * Split a single paragraph (no `\n\n`) into tokens. Paragraph-level
 * splitting happens in the caller — this keeps the function pure.
 */
function tokenizeParagraph(
  paragraph: string,
  highlights: ReadingHighlight[],
  claimed: Set<number>,
): HighlightToken[] {
  const parts = paragraph.split(WORD_SPLIT_RE);
  const out: HighlightToken[] = [];
  for (const part of parts) {
    if (!part) continue;
    // Non-word parts (whitespace, punctuation) always pass through.
    if (!WORD_SPLIT_RE.test(part)) {
      out.push({ kind: "text", text: part });
      continue;
    }
    // Word part — first try surface matches, then companion matches.
    let matched: ReadingHighlight | null = null;
    for (let i = 0; i < highlights.length; i++) {
      if (claimed.has(i)) continue;
      const h = highlights[i];
      if (h.surface === part) {
        matched = h;
        claimed.add(i);
        break;
      }
    }
    if (!matched) {
      // Companion pass — a separable verb's detached prefix can
      // still match an already-claimed highlight (both tokens open
      // the same chip). Only sep-verb highlights have a companion.
      for (let i = 0; i < highlights.length; i++) {
        const h = highlights[i];
        if (!h.companion || h.companion !== part) continue;
        matched = h;
        break;
      }
    }
    if (matched) {
      out.push({ kind: "highlight", text: part, highlight: matched });
    } else {
      out.push({ kind: "text", text: part });
    }
  }
  return out;
}

/**
 * Full passage tokenizer. Returns a flat token stream with literal
 * "\n\n" tokens marking paragraph breaks. Callers that render by
 * paragraph should group on those breaks.
 */
export function tokenizeHighlights(
  passage: string,
  highlights: ReadingHighlight[] | undefined,
): HighlightToken[] {
  if (!highlights || highlights.length === 0) {
    // Nothing to annotate — return the paragraphs as plain text with
    // explicit `\n\n` breaks, so callers use the same group-by-break
    // code path either way.
    const parts = passage.split("\n\n");
    const out: HighlightToken[] = [];
    parts.forEach((p, i) => {
      if (p) out.push({ kind: "text", text: p });
      if (i < parts.length - 1) out.push({ kind: "text", text: "\n\n" });
    });
    return out;
  }
  const claimed = new Set<number>();
  const paragraphs = passage.split("\n\n");
  const out: HighlightToken[] = [];
  paragraphs.forEach((para, i) => {
    out.push(...tokenizeParagraph(para, highlights, claimed));
    if (i < paragraphs.length - 1) {
      out.push({ kind: "text", text: "\n\n" });
    }
  });
  return out;
}

/** Group tokens back into paragraphs, splitting on literal "\n\n". */
export function groupByParagraph(
  tokens: HighlightToken[],
): HighlightToken[][] {
  const paragraphs: HighlightToken[][] = [[]];
  for (const t of tokens) {
    if (t.kind === "text" && t.text === "\n\n") {
      paragraphs.push([]);
      continue;
    }
    paragraphs[paragraphs.length - 1].push(t);
  }
  return paragraphs;
}
