import { ImageResponse } from "next/og";

/**
 * Default Open Graph / Twitter card image — rendered dynamically at
 * the edge via @vercel/og. Shows the wordmark + tagline on the brand
 * dark surface with the cherry accent bar, matching the hero.
 *
 * Next 16 picks this up automatically for every route that doesn't
 * declare its own opengraph-image file. The blog post inherits it
 * until we ship a per-post variant.
 */

export const alt = "GenauApp — refresh your German";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background:
            "linear-gradient(180deg, #141010 0%, #1C1414 100%)",
          color: "#FBF8F5",
          fontFamily: "sans-serif",
        }}
      >
        {/* Cherry accent bar */}
        <div
          style={{
            width: 72,
            height: 6,
            borderRadius: 3,
            background: "#E54959",
            marginBottom: 48,
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            fontSize: 108,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          <span>Genau</span>
          <span style={{ color: "#E54959" }}>.</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.2,
            color: "#E6E0DB",
            maxWidth: 820,
          }}
        >
          Refresh your German, five minutes at a time.
        </div>

        {/* Footer row */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#8B827C",
            paddingTop: 48,
          }}
        >
          <div>genauapp.io</div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>Grammar</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Vocabulary</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Reading</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Listening</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
