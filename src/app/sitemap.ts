import type { MetadataRoute } from "next";

/**
 * sitemap.xml — the public surface we want indexed. Add new static
 * routes here as they land (blog posts, docs pages, product pages).
 * Dates are last-reviewed timestamps, bumped whenever content moves.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://genauapp.io";
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/try`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog/origins-of-genau`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/impressum`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/datenschutz`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/cookie-policy`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
