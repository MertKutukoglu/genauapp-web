import type { Preview } from "@storybook/nextjs-vite";
import React, { useEffect } from "react";
import "../src/app/globals.css";

/**
 * Storybook preview config.
 *
 * - Loads our globals.css so every story gets the full @theme token system
 *   (semantic tokens, dark swap, article colors, chip colors, etc.).
 * - Fonts fall back to Georgia / system sans in Storybook (the live app
 *   uses next/font — which fetches at build time and can't reach the
 *   Google Fonts API from this sandbox). Stories still look typographically
 *   close; visual review of the real fonts happens on the Vercel preview.
 * - Mobile-first viewports — defaults to iPhone SE width so you catch
 *   mobile regressions first.
 * - A `theme` toolbar toggle that sets `data-theme` on <html> at runtime.
 */

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Light / dark app theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "centered",
    backgrounds: { disable: true }, // our bg comes from --bg token
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "todo" },
    viewport: {
      /**
       * Mobile-first: the first entry is the default. Order goes
       * narrow → wide so review starts from the hardest constraint.
       */
      defaultViewport: "mobile1",
      viewports: {
        mobile1: {
          name: "Mobile — iPhone SE (375)",
          styles: { width: "375px", height: "667px" },
          type: "mobile",
        },
        mobile2: {
          name: "Mobile — iPhone 14 (390)",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        mobileLarge: {
          name: "Mobile — Pixel 7 (412)",
          styles: { width: "412px", height: "915px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet — iPad (768)",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        tabletLg: {
          name: "Tablet — iPad Pro (1024)",
          styles: { width: "1024px", height: "1366px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop (1280)",
          styles: { width: "1280px", height: "800px" },
          type: "desktop",
        },
        desktopWide: {
          name: "Desktop wide (1440)",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? "light";
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
      }, [theme]);
      return (
        <div
          style={{
            minHeight: "100%",
            padding: "24px",
            background: "var(--bg)",
            color: "var(--fg)",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
