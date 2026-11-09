import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * MDX is wired up here for Phase 3's blog. Content lives at
 * `src/app/blog/[slug]/page.mdx` or similar — the extension list below
 * tells Next to treat those as routable.
 */
const withMDX = createMDX({
  // Add remark/rehype plugins here when blog starts; keep empty for now.
  options: {},
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
};

export default withMDX(nextConfig);
