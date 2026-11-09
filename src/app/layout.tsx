import type { Metadata, Viewport } from "next";
import { Fraunces, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/lib/analytics/posthog-provider";
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
 * Reads localStorage.theme first, falls back to prefers-color-scheme.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
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
      <body className="min-h-full flex flex-col bg-bg text-fg font-sans">
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
