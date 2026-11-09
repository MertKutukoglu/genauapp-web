import { ImageResponse } from "next/og";

/**
 * Brand favicon — rendered once at build/first-hit, cached forever
 * by the CDN. Matches the OG image's brand lockup but inverted for
 * legibility at 16-32px: cherry background with white G. Standing
 * out against both light and dark browser chrome without being noisy.
 *
 * Fraunces loaded so the G keeps its serif character; at 32px the
 * terminal flares are what makes it readable as GenauApp vs any
 * other G.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const FRAUNCES_SEMIBOLD =
  "https://fonts.gstatic.com/s/fraunces/v32/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk.woff";

export default async function Icon() {
  const fraunces = await fetch(FRAUNCES_SEMIBOLD).then((r) => r.arrayBuffer());

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
