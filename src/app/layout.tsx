import type { Metadata, Viewport } from "next";
import { Fraunces, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/lib/analytics/posthog-provider";
import { Topnav } from "@/components/organisms/Topnav/Topnav";
import { OurStoryBanner } from "@/components/molecules/OurStoryBanner/OurStoryBanner";
import { Footer } from "@/components/organisms/Footer/Footer";
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

export const metadata: Metadata = {
  title: {
    default: "GenauApp — refresh your German",
    template: "%s · GenauApp",
  },
  description:
    "A SwiftUI German practice companion for people refreshing existing German. Try the browser demo in 5 minutes.",
  metadataBase: new URL("https://genauapp.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GenauApp",
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
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('genauapp-landing-theme');
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (sysDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {}
})();
`.trim();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${openSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* On desktop the page fits the viewport (no outer scroll); on mobile
          it scrolls naturally. lg:h-screen + lg:overflow-hidden flips the
          constraint on at the lg breakpoint; below that the body can grow. */}
      <body className="min-h-screen flex flex-col bg-bg text-fg font-sans lg:h-screen lg:overflow-hidden">
        <PostHogProvider>
          <Topnav />
          <OurStoryBanner />
          <main className="flex-1 min-h-0 flex flex-col">{children}</main>
          <Footer />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
