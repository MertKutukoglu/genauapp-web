import { ImageResponse } from "next/og";

/**
 * Apple touch icon — iOS home-screen bookmark + a few Android launchers.
 *
 * Renders the Genau logomark (black G + orange sparkle on white) as a
 * 180×180 PNG so iOS has a raster asset to squircle-mask onto the
 * home screen. Matches the SVG at src/app/icon.svg visually — same
 * paths, same colors, just emitted as a raster.
 *
 * iOS applies its own corner mask, so the source stays a full-bleed
 * square. The mark itself sits on a 128/128 grid centered inside the
 * tile with a small top gutter so the sparkle doesn't touch the
 * corner mask's safe area.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // The brand logomark SVG, inlined as a data URL so ImageResponse
  // can rasterize it without a filesystem/network fetch.
  const LOGOMARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="180" height="180">
    <rect width="128" height="128" fill="#ffffff"/>
    <g transform="translate(9, 4)">
      <path d="M108.169 20.2909V16.9091C98.9811 16.9091 91.5335 9.33862 91.5335 0H88.2065C88.2065 9.33862 80.7586 16.9091 71.5713 16.9091V20.2909C80.7586 20.2909 88.2065 27.8614 88.2065 37.2H91.5335C91.5335 27.8614 98.9811 20.2909 108.169 20.2909Z" fill="#FC6E2D"/>
      <path d="M58.4493 21.4813C52.2743 21.4813 45.8864 23.1045 40.8826 26.3511C35.9852 29.4894 32.0992 33.8181 29.2247 39.3373C26.4566 44.8564 25.0725 51.1331 25.0725 58.1673C25.0725 65.5261 26.4566 71.9651 29.2247 77.4842C31.9927 82.8951 35.8787 87.1697 40.8826 90.3081C45.8864 93.3382 51.742 94.8532 58.4493 94.8532C62.6014 94.8532 66.4342 94.1498 69.9475 92.743C73.4609 91.2279 76.6016 89.1718 79.3697 86.5745C82.1378 83.9773 84.48 81.0013 86.3964 77.6465V67.1223H58.4493V47.3184H109.553V82.1917C106.997 88.1437 103.271 93.7169 98.3737 98.9114C93.4763 103.998 87.5675 108.164 80.6473 111.411C73.727 114.549 65.8486 116.118 57.012 116.118C48.7077 116.118 41.0955 114.711 34.1753 111.898C27.255 109.084 21.2398 105.08 16.1295 99.8854C11.0191 94.6909 7.02669 88.5766 4.15214 81.5424C1.38405 74.4 0 66.6083 0 58.1673C0 49.7263 1.38405 41.9887 4.15214 34.9545C7.02669 27.812 10.9659 21.6436 15.9698 16.4491C21.0801 11.2547 27.0953 7.25058 34.0156 4.43691C40.9358 1.62324 50.145 0 58.4493 0V21.4813Z" fill="#141414"/>
    </g>
  </svg>`;

  const src = `data:image/svg+xml;utf8,${encodeURIComponent(LOGOMARK)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={180} height={180} alt="" />
      </div>
    ),
    { ...size },
  );
}
