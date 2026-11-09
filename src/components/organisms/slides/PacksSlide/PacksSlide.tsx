"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SlideHead } from "@/components/molecules/SlideHead/SlideHead";
import { PackMarqueeCard, type CEFRLevel } from "./PackMarqueeCard";

/**
 * Slide 4 — Real life events (Packs).
 *
 * Verbatim port of the production slide
 * (claude/GenauApp_Web_Landing_Slide4_Packs.md).
 *
 * Two identical pack-grids stacked inside a single pack-marquee. CSS
 * translates the stack up by exactly one grid-height + its row-gap per
 * loop; the second grid lands pixel-perfect where the first grid
 * started, so the loop reads seamless.
 *
 * `--pack-marquee-dist` is measured at runtime: on mount, on resize,
 * and after each illustration finishes loading. A top-edge mask fades
 * cards as they approach the slide subtitle. Hover pauses the loop so
 * viewers can read titles.
 *
 * Image assets live in `public/` with the original filenames
 * (pack-dailylife.webp, pack-officialappointments.webp, etc.). When
 * the files are missing the card renders a "cover coming" placeholder;
 * dropping the webp into public/ is the only step needed to go live.
 */

interface Pack {
  title: string;
  level: CEFRLevel;
  image: string;
}

const PACKS: Pack[] = [
  // Pack illustrations are served by the live landing on Vercel until
  // we copy the files into this repo's public/ folder (see
  // claude/GenauApp_Web_Pack_Illustrations.md). Plain <img> tags
  // (PackMarqueeCard uses them), so no next.config remotePatterns
  // is required. After DNS cutover these can flip back to local
  // "/pack-*.webp" paths without any other code change.
  { title: "Daily Life",        level: "A1", image: "https://genauapp.io/pack-dailylife.webp" },
  { title: "Bürgeramt",         level: "B2", image: "https://genauapp.io/pack-officialappointments.webp" },
  { title: "Hairdresser",       level: "A2", image: "https://genauapp.io/pack-hairdresser.webp" },
  { title: "Pharmacy & Doctor", level: "C1", image: "https://genauapp.io/pack-gesundheit.webp" },
  { title: "Food & Drink",      level: "B1", image: "https://genauapp.io/pack-fooddrink.webp" },
  { title: "Shopping",          level: "C2", image: "https://genauapp.io/pack-shopping.webp" },
];

export interface PacksSlideProps {
  /** isActiveSlide is unused here (no inner cycler), accepted for parity with other slides. */
  isActiveSlide?: boolean;
  className?: string;
}

export function PacksSlide({ className }: PacksSlideProps) {
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const firstGridRef = React.useRef<HTMLDivElement>(null);

  // Measure the first grid so the marquee loops seamlessly at any viewport.
  React.useEffect(() => {
    const marquee = marqueeRef.current;
    const grid = firstGridRef.current;
    if (!marquee || !grid) return;

    const measure = () => {
      const h = grid.getBoundingClientRect().height;
      if (h <= 0) return;
      const cs = getComputedStyle(marquee);
      const gap = parseFloat(cs.rowGap || cs.gap || "0") || 0;
      marquee.style.setProperty("--pack-marquee-dist", `${h + gap}px`);
    };

    measure();
    window.addEventListener("resize", measure);

    // Re-measure after each image lands (webp intrinsic sizing may shift
    // card heights until all covers are decoded).
    const imgs = Array.from(grid.querySelectorAll("img"));
    const onLoad = () => measure();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onLoad, { once: true });
    });

    return () => {
      window.removeEventListener("resize", measure);
      imgs.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, []);

  return (
    <div className={clsx("flex flex-col gap-6 md:gap-8", className)}>
      <SlideHead
        eyebrow="Real life events"
        headline={
          <>
            Packs for the moments <em>you&apos;ll actually live</em>.
          </>
        }
        sub="Haircut, Bürgeramt, pharmacy, groceries. Each pack holds the words that moment needs, grouped the way German life groups them."
      />

      {/* Stage: overflow hidden + top-edge mask so cards dissolve into the subline. */}
      <div
        className="group relative mx-auto w-full max-w-[520px] flex-1 overflow-hidden pt-1"
        style={{
          minHeight: 420,
          maxHeight: 560,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black 56px, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0, black 56px, black 100%)",
        }}
      >
        {/* Marquee: scrolls up by --pack-marquee-dist per cycle. Pauses on hover. */}
        <div
          ref={marqueeRef}
          className="flex flex-col gap-2.5 animate-pack-scroll group-hover:[animation-play-state:paused]"
        >
          <PackGrid ref={firstGridRef} packs={PACKS} />
          <PackGrid packs={PACKS} ariaHidden />
        </div>
      </div>
    </div>
  );
}

interface PackGridProps {
  packs: Pack[];
  ariaHidden?: boolean;
}

const PackGrid = React.forwardRef<HTMLDivElement, PackGridProps>(function PackGrid(
  { packs, ariaHidden },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden={ariaHidden || undefined}
      className="grid shrink-0 grid-cols-2 gap-2.5 md:grid-cols-3"
    >
      {packs.map((p, i) => (
        <PackMarqueeCard
          key={`${p.title}-${i}`}
          title={p.title}
          level={p.level}
          imageSrc={p.image}
          imageAlt={p.title}
        />
      ))}
    </div>
  );
});
