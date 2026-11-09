import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

/**
 * Storybook config for this repo.
 *
 * Next.js uses `@tailwindcss/turbopack`, which only runs under Next's
 * own build. Storybook's Vite builder needs Tailwind's Vite plugin
 * (`@tailwindcss/vite`), merged in via `viteFinal` so `@import "tailwindcss"`
 * in our globals.css actually generates classes here too.
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (cfg) => {
    cfg.plugins = cfg.plugins ?? [];
    cfg.plugins.push(tailwindcss());
    return cfg;
  },
};

export default config;
