import type { Metadata } from "next";
import { BlogIndex } from "@/components/organisms/BlogIndex/BlogIndex";

/**
 * `/blog`, English blog hub.
 *
 * Shows every published post from `src/content/blog/posts.ts`,
 * newest-first. Standalone route (no `[locale]` segment); the TR
 * sibling lives at `/tr/blog` and reads the same registry.
 *
 * SEO: the H1 is on the BlogIndex organism; here we own the
 * `<title>`, meta description and the alternates mapping so the
 * language picker can hop to the TR hub cleanly.
 */
export const metadata: Metadata = {
  title: "Blog · GenauApp",
  description:
    "Notes on how GenauApp teaches German: the pedagogy, the design choices, and the method behind every workout.",
  alternates: {
    canonical: "/blog",
    languages: {
      en: "/blog",
      tr: "/tr/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: "Blog · GenauApp",
    description:
      "Notes on how GenauApp teaches German: the pedagogy, the design choices, and the method behind every workout.",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return <BlogIndex locale="en" />;
}
