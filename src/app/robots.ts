import type { MetadataRoute } from "next";

/**
 * robots.txt, allow everything by default. Only /try/ internals stay
 * out of the crawl (the demo is interactive, not content), and we
 * point crawlers at the sitemap so blog posts and future pages get
 * discovered without manual submission.
 */
export default function robots(): MetadataRoute.Robots {
  // Match app/layout.tsx's canonical origin (www.genauapp.io). Using
  // a different host here would make Google chase a sitemap URL on a
  // host it never verified, so both must stay in lockstep.
  const base = "https://www.genauapp.io";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
