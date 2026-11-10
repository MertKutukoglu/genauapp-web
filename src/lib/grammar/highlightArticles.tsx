import * as React from "react";

/**
 * highlightArticles — wrap any stand-alone der / die / das / Der /
 * Die / Das token in the sentence with the article's color.
 *
 * Used inside Grammar chip Exercise feedback bodies: an explanation
 * like \`"Frau" is feminine → die.\` reads sharper when "die" shows up
 * in red inline. Matches the "substring-wrap" trick the Words brief
 * uses on noun explanations.
 *
 * Match boundary: strict stand-alone tokens only. The regex uses
 * \\b so prefixes like "Der" in "Derivative" never match, and the
 * final "-s" check lets possessives stay plain (we don't try to
 * color "das" inside "dass" either — the \\b handles that).
 *
 * Returns a ReactNode (array of strings + spans) ready to drop into
 * JSX. Pass a string body in; the caller inlines the result.
 */

const COLORS: Record<string, string> = {
  der: "var(--color-article-der)",
  die: "var(--color-article-die)",
  das: "var(--color-article-das)",
};

// Case-insensitive, word-boundary matched. Grouped so the split
// alternates [text, match, text, match, …].
const ARTICLE_RE = /\b(der|die|das)\b/gi;

export function highlightArticles(body: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of body.matchAll(ARTICLE_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) parts.push(body.slice(last, idx));
    const token = m[0];
    const color = COLORS[token.toLowerCase()];
    parts.push(
      <strong
        key={`art-${i}-${idx}`}
        className="font-sans font-semibold"
        style={{ color }}
      >
        {token}
      </strong>,
    );
    last = idx + token.length;
    i += 1;
  }
  if (last < body.length) parts.push(body.slice(last));
  return <>{parts}</>;
}
