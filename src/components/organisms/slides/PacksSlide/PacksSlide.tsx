"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SlideHead } from "@/components/molecules/SlideHead/SlideHead";
import { useLocale } from "@/lib/i18n/LocaleContext";
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
  /** Key into `strings.packs` for the localized title. */
  packKey:
    | "dailyLife"
    | "burgeramt"
    | "hairdresser"
    | "pharmacyDoctor"
    | "foodDrink"
    | "shopping";
  level: CEFRLevel;
  image: string;
}

const PACKS: Pack[] = [
  // Pack illustrations live in public/ (see
  // claude/GenauApp_Web_Pack_Illustrations.md for filename map). The
  // display title is resolved from the i18n dict at render time so
  // TR picks up "Günlük Hayat" / "Berber" / etc. automatically.
  { packKey: "dailyLife",      level: "A1", image: "/pack-dailylife.webp" },
  { packKey: "burgeramt",      level: "B2", image: "/pack-officialappointments.webp" },
  { packKey: "hairdresser",    level: "A2", image: "/pack-hairdresser.webp" },
  { packKey: "pharmacyDoctor", level: "C1", image: "/pack-gesundheit.webp" },
  { packKey: "foodDrink",      level: "B1", image: "/pack-fooddrink.webp" },
  { packKey: "shopping",       level: "C2", image: "/pack-shopping.webp" },
];

export interface PacksSlideProps {
  /** isActiveSlide is unused here (no inner cycler), accepted for parity with other slides. */
  isActiveSlide?: boolean;
  className?: string;
}

export function PacksSlide({ className }: PacksSlideProps) {
  const { strings } = useLocale();
  const slide = strings.slides.packs;
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
        eyebrow={slide.eyebrow}
        headline={
          <>
            {slide.h2Before}
            <em>{slide.h2Emphasis}</em>
            {slide.h2After}
          </>
        }
        sub={slide.sub}
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
          <PackGrid ref={firstGridRef} packs={PACKS} titles={strings.packs} />
          <PackGrid packs={PACKS} titles={strings.packs} ariaHidden />
        </div>
      </div>
    </div>
  );
}

interface PackGridProps {
  packs: Pack[];
  /** Localized title per pack key. Resolved once by the parent. */
  titles: Record<Pack["packKey"], string>;
  ariaHidden?: boolean;
}

const PackGrid = React.forwardRef<HTMLDivElement, PackGridProps>(function PackGrid(
  { packs, titles, ariaHidden },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden={ariaHidden || undefined}
      className="grid shrink-0 grid-cols-2 gap-2.5 md:grid-cols-3"
    >
      {packs.map((p, i) => {
        const title = titles[p.packKey];
        return (
          <PackMarqueeCard
            key={`${p.packKey}-${i}`}
            title={title}
            level={p.level}
            imageSrc={p.image}
            imageAlt={title}
          />
        );
      })}
    </div>
  );
});
