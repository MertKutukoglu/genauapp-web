import type { Metadata, Viewport } from "next";
import { Fraunces, Open_Sans, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import { PostHogProvider } from "@/lib/analytics/posthog-provider";
import { PostHogPageview } from "@/lib/analytics/PostHogPageview";
import { Topnav } from "@/components/organisms/Topnav/Topnav";
import { OurStoryBanner } from "@/components/molecules/OurStoryBanner/OurStoryBanner";
import { Footer } from "@/components/organisms/Footer/Footer";
import { CookieConsent } from "@/components/molecules/CookieConsent/CookieConsent";
import "./globals.css";

/**
 * Fraunces for display, Open Sans for body — self-hosted via next/font
 * (GDPR-safe: no runtime Google Fonts request).
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  // Italic 600 is used by the /try/ left card's "Your workout" title
  // and may appear in blog pull-quotes; load both styles up front so
  // they're ready without a second request.
  style: ["normal", "italic"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/**
 * Source Serif 4 — used in /blog/* articles for a reading-column feel
 * (body copy). Headings stay on Open Sans for brand consistency.
 */
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Verbatim from claude/GenauApp_Web_OG_Image.md §4 — matches the live
// landing's current social meta exactly, so unfurls in Slack / iMessage /
// LinkedIn / Twitter look identical to the old deploy.
const OG_TITLE =
  "GenauApp — You keep learning German. We keep it from fading.";
const OG_DESCRIPTION =
  "A sharp, honest companion for active German learners. Built in Berlin.";

export const metadata: Metadata = {
  title: {
    default: OG_TITLE,
    template: "%s · GenauApp",
  },
  description: OG_DESCRIPTION,
  metadataBase: new URL("https://www.genauapp.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GenauApp",
    url: "https://www.genauapp.io/",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    // images come from app/opengraph-image.tsx (Next 16 convention) —
    // it's picked up automatically, no need to list it here.
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
    // Tell Google the EN root and the TR tree are the same product in
    // different languages. x-default points at EN (the global default).
    // Each sub-route can override `alternates` with its own matched
    // pair (see /blog/origins-of-genau / /tr/blog/kokenler, etc.).
    languages: {
      en: "/",
      tr: "/tr",
      "x-default": "/",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#141010" },
  ],
};

/**
 * Inline theme script — set data-theme BEFORE the first paint to avoid FOUC.
 * Uses the same storage key as the live landing ("genauapp-landing-theme")
 * so a user's saved preference carries across the domain cutover.
 *
 * Default theme is DARK — the brand reads best there, so first-time
 * visitors land in dark mode regardless of their OS setting. Once they
 * toggle, their choice persists in localStorage and overrides the default.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('genauapp-landing-theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`.trim();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${openSans.variable} ${sourceSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Body scrolls on all breakpoints; the LandingLayout container
          constrains itself to the viewport on desktop so the home page
          stays fit-to-screen without needing a body-level overflow
          lock that would break legal / blog / longform pages. */}
      <body className="min-h-screen flex flex-col bg-bg text-fg font-sans">
        <PostHogProvider>
          {/* Suspense is required: PostHogPageview uses useSearchParams,
              which forces its tree into dynamic rendering. The boundary
              keeps the rest of the app statically renderable. */}
          <Suspense fallback={null}>
            <PostHogPageview />
          </Suspense>
          <Topnav />
          <OurStoryBanner />
          <main className="flex-1 min-h-0 flex flex-col">{children}</main>
          <Footer />
          <CookieConsent />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
