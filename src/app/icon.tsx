import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Brand favicon — rendered at build time by Next's icon convention,
 * cached forever by the CDN after first hit. Cherry background with
 * white Fraunces G; inverted from the OG lockup (dark on white) so
 * it stays legible on both light and dark browser chrome at 16-32px.
 *
 * Font ships from the repo (src/assets/fonts/) rather than being
 * fetched from Google's CDN — the earlier CDN-fetch version broke
 * the Vercel build when Google returned a 404 HTML page instead of
 * the font binary.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

async function loadFraunces(): Promise<Buffer> {
  return readFile(
    join(process.cwd(), "src/assets/fonts/fraunces-latin-600-normal.woff"),
  );
}

export default async function Icon() {
  const fraunces = await loadFraunces();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E54959",
          color: "#FFFFFF",
          fontFamily: "Fraunces",
          fontWeight: 600,
          fontSize: 24,
          lineHeight: 1,
          // Nudge the serif G visually center — its curve puts optical
          // weight slightly low-left of the glyph's bounding box.
          paddingTop: 1,
        }}
      >
        G
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
      ],
    },
  );
}
