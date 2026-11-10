import * as React from "react";

/**
 * parseBold — turn `"a **b** c"` into `[a, <strong>b</strong>, c]`.
 *
 * Only `**bold**` is supported per the Sentence brief §4.6. Anything
 * else (italics, lists, links, nested bold) renders as plain text.
 * Kept small on purpose — a real markdown parser would be overkill
 * for a one-paragraph body field.
 *
 * Splitting on `**` and alternating plain / strong is the trick: odd
 * indices in the resulting array are the bolded chunks, even indices
 * are the surrounding plain text. A dangling (unclosed) `**` at the
 * end of the string ends up as a trailing plain segment, which reads
 * as the author intended "literal **" there; treat it as harmless.
 */
export function parseBold(body: string): React.ReactNode {
  if (!body.includes("**")) return body;
  const parts = body.split("**");
  return parts.map((chunk, i) =>
    i % 2 === 0 ? (
      <React.Fragment key={i}>{chunk}</React.Fragment>
    ) : (
      <strong key={i} className="font-sans font-semibold">
        {chunk}
      </strong>
    ),
  );
}
