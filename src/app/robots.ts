import type { MetadataRoute } from "next";

/**
 * robots.txt — allow everything by default. Only /try/ internals stay
 * out of the crawl (the demo is interactive, not content), and we
 * point crawlers at the sitemap so blog posts and future pages get
 * discovered without manual submission.
 */
export default function robots(): MetadataRoute.Robots {
  const base = "https://genauapp.io";
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
