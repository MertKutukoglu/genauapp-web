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

export const metadata: Metadata = {
  title: {
    default: "GenauApp — refresh your German",
    template: "%s · GenauApp",
  },
  description:
    "A SwiftUI German practice companion for people refreshing existing German. Try the browser demo in 5 minutes.",
  metadataBase: new URL("https://genauapp.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GenauApp",
    url: "https://genauapp.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenauApp — refresh your German",
    description:
      "A SwiftUI German practice companion for people refreshing existing German. Try the browser demo in 5 minutes.",
  },
  alternates: {
    canonical: "/",
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
