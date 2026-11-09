/**
 * Tiny className joiner. Keeps bundle small and keeps call sites readable.
 * Falsy values are dropped so conditional classes compose cleanly.
 */
export function clsx(
  ...parts: Array<string | number | false | null | undefined>
): string {
  const out: string[] = [];
  for (const p of parts) {
    if (p || p === 0) out.push(String(p));
  }
  return out.join(" ");
}
