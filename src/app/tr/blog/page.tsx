import type { Metadata } from "next";
import { BlogIndex } from "@/components/organisms/BlogIndex/BlogIndex";

/**
 * `/tr/blog`, Turkish blog hub.
 *
 * Mirrors `/blog` with Turkish strings and the TR view of the
 * posts registry. The registry (`src/content/blog/posts.ts`) is
 * shared with EN; this page just picks the TR surface per entry.
 */
export const metadata: Metadata = {
  title: "Blog · GenauApp",
  description:
    "GenauApp'in Almancayı nasıl öğrettiğine dair notlar: pedagoji, tasarım kararları ve her antrenmanın arkasındaki yöntem.",
  alternates: {
    canonical: "/tr/blog",
    languages: {
      en: "/blog",
      tr: "/tr/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: "Blog · GenauApp",
    description:
      "GenauApp'in Almancayı nasıl öğrettiğine dair notlar: pedagoji, tasarım kararları ve her antrenmanın arkasındaki yöntem.",
    type: "website",
  },
};

export default function TRBlogIndexPage() {
  return <BlogIndex locale="tr" />;
}
