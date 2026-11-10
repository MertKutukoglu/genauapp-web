import type { Metadata } from "next";
import { TrLandingClient } from "./TrLandingClient";

/**
 * /tr — Turkish landing root.
 *
 * Server component owns the metadata (title, description, canonical +
 * hreflang pointing at the EN counterpart). The actual UI is the
 * shared landing composition — HeroLeftPanelPhone + CarouselShell with
 * the four slides — rendered in the `TrLandingClient` client child.
 *
 * Shared chrome (Topnav + Footer) lives in `app/layout.tsx` and reads
 * locale via `useLocale`, which derives it from the pathname — so the
 * header picker lights up TR and the footer legal labels flip without
 * any prop threading needed here.
 */

export const metadata: Metadata = {
  title: "GenauApp — Sen Almanca öğreniyorsun, paslanmasına izin vermiyoruz",
  description:
    "Aktif Almanca öğrenenler için keskin ve dürüst bir workout partneri. Hazır olduğunda Berlin'den.",
  alternates: {
    canonical: "/tr",
    languages: {
      en: "/",
      tr: "/tr",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "GenauApp",
    url: "https://www.genauapp.io/tr",
    title:
      "GenauApp — Sen Almanca öğreniyorsun, paslanmasına izin vermiyoruz",
    description:
      "Aktif Almanca öğrenenler için keskin ve dürüst bir workout partneri.",
  },
};

export default function TrLandingPage() {
  return <TrLandingClient />;
}
