/**
 * PostCSS config — registers Tailwind v4's PostCSS plugin so Next's
 * CSS pipeline understands @theme / @import "tailwindcss" / the whole
 * v4 at-rule set. Without this, `next dev` falls back to vanilla
 * PostCSS, chokes on `@theme`, and ships the page unstyled.
 */
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
