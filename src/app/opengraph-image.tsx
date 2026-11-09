import { ImageResponse } from "next/og";

/**
 * Default Open Graph / Twitter card image — rendered at the edge via
 * @vercel/og, matching the verbatim landing design in
 * claude/GenauApp_Web_OG_Image.md:
 *
 *   - 1200×630, deep ink base with a warm cherry gradient top-left
 *   - Brand lockup top-left: white G disc + cherry 4-point sparkle +
 *     "GenauApp" wordmark in Fraunces
 *   - Headline center-left: "You keep learning German. / We keep it
 *     from fading." — "from fading" in cherry rose italic
 *   - Footer: muted tagline on the left, URL in white on the right
 *
 * Fraunces + Open Sans are fetched at request time from the Google
 * Fonts CDN. Satori (the Vercel OG renderer) has no font fallback for
 * italic, so Fraunces-italic has to be loaded explicitly for the
 * accent span to render.
 *
 * Next 16's App Router convention: this file is picked up as the
 * default opengraph-image for every route that doesn't declare its
 * own. /blog/<slug>/opengraph-image.tsx overrides it with per-post
 * copy.
 */

export const alt = "GenauApp — You keep learning German. We keep it from fading.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pinned Google Fonts CDN URLs for Fraunces + Open Sans. Stable
// filenames — a font refresh here would need a Google Fonts upstream
// change, which is rare.
const FRAUNCES_SEMIBOLD =
  "https://fonts.gstatic.com/s/fraunces/v32/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk.woff";
const FRAUNCES_ITALIC_SEMIBOLD =
  "https://fonts.gstatic.com/s/fraunces/v32/6NUV8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk.woff";
const OPEN_SANS_REGULAR =
  "https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.woff";

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  return res.arrayBuffer();
}

export default async function OGImage() {
  const [fraunces, frauncesItalic, openSans] = await Promise.all([
    loadFont(FRAUNCES_SEMIBOLD),
    loadFont(FRAUNCES_ITALIC_SEMIBOLD),
    loadFont(OPEN_SANS_REGULAR),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "48px 80px",
          color: "#F5EFEE",
          fontFamily: "Fraunces",
          // Satori supports multi-layer backgrounds via comma-separated
          // gradient images, but to be safe we use one radial over the
          // ink base.
          backgroundColor: "#0F0D0C",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(255,135,148,0.10), rgba(15,13,12,0) 55%)",
        }}
      >
        {/* Brand lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "#FFFFFF",
              color: "#0F0D0C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 32,
              position: "relative",
            }}
          >
            G
            {/* Cherry 4-point sparkle, top-right of the G */}
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              style={{ position: "absolute", top: -4, right: -6 }}
            >
              <path
                d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                fill="#FF8794"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#F5EFEE",
            }}
          >
            GenauApp
          </div>
        </div>

        {/* Headline, vertically centered */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.08,
              color: "#F5EFEE",
            }}
          >
            You keep learning German.
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.08,
              color: "#F5EFEE",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>We keep it&nbsp;</span>
            <span style={{ fontStyle: "italic", color: "#FF8794" }}>
              from fading
            </span>
            <span>.</span>
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Open Sans",
          }}
        >
          <div style={{ fontSize: 22, color: "#8A7B77" }}>
            A sharp, honest companion for active learners.
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF" }}>
            www.genauapp.io
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        {
          name: "Fraunces",
          data: frauncesItalic,
          weight: 600,
          style: "italic",
        },
        { name: "Open Sans", data: openSans, weight: 400, style: "normal" },
      ],
    },
  );
}
