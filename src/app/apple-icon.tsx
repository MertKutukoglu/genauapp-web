import { ImageResponse } from "next/og";

/**
 * Apple touch icon — iOS home-screen bookmark + a few Android launchers.
 * Same brand mark as /icon.tsx, scaled to 180×180 with the proportions
 * iOS squircle-masks correctly. iOS rounds the corners itself, so the
 * source stays a full-bleed square.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const FRAUNCES_SEMIBOLD =
  "https://fonts.gstatic.com/s/fraunces/v32/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk.woff";

export default async function AppleIcon() {
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
          fontSize: 128,
          lineHeight: 1,
          paddingTop: 4,
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
