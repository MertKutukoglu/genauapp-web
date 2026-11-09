import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Apple touch icon — iOS home-screen bookmark + a few Android launchers.
 * Same brand mark as /icon.tsx scaled to 180×180. iOS squircle-masks
 * the corners itself, so the source stays a full-bleed square.
 *
 * Font ships from the repo (src/assets/fonts/) for the same reason as
 * icon.tsx — Google CDN fetches broke the build.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

async function loadFraunces(): Promise<Buffer> {
  return readFile(
    join(process.cwd(), "src/assets/fonts/fraunces-latin-600-normal.woff"),
  );
}

export default async function AppleIcon() {
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
