"use client";

import * as React from "react";
import { trackDict } from "@/lib/analytics/dict";
import type { DictLocale } from "./types";

/**
 * Fires a single `dict_word_viewed` event when a word page mounts.
 *
 * The word pages are server components for SEO (static per-slug via
 * generateStaticParams), so the only way to get a client-side view
 * event is to drop a tiny client child in. StrictMode in dev will
 * mount-unmount-mount; the hasFiredRef guard keeps the production
 * count honest at exactly one per visit.
 */
export interface DictWordViewTrackerProps {
  slug: string;
  type: string;
  level: string;
  locale: DictLocale;
}

export function DictWordViewTracker({
  slug,
  type,
  level,
  locale,
}: DictWordViewTrackerProps) {
  const hasFiredRef = React.useRef(false);

  React.useEffect(() => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;
    trackDict("dict_word_viewed", {
      slug,
      type,
      level,
      locale,
    });
  }, [slug, type, level, locale]);

  return null;
}
