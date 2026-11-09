import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * PhoneStack — three stacked iOS screens in the "multi-phone hero"
 * composition: a large center phone (Home), a back-left phone rotated
 * -8deg (Prepositions), a back-right phone rotated +8deg (Word card).
 *
 * The whole stack is masked from the bottom so the phones dissolve
 * into the card surface instead of cropping with a hard edge —
 * matches the reference layout the user shared.
 *
 * Per-theme swap uses the .theme-light-only / .theme-dark-only
 * utilities in globals.css so each phone shows its correct screen
 * per theme with no JS.
 *
 * Assets expected in public/:
 *   app-home-{light,dark}.png  — framed Home (center)
 *   app-prep-{light,dark}.png  — framed Prepositions detail (back-left)
 *   app-word-{light,dark}.png  — Word learn card, screen-only (back-right)
 */

export interface PhoneStackProps {
  className?: string;
}

export function PhoneStack({ className }: PhoneStackProps) {
  return (
    <div
      className={clsx(
        "relative mx-auto w-full",
        className,
      )}
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
      }}
    >
      <div className="relative aspect-[5/4] w-full">
        {/* Back-left — Prepositions, angled behind the center phone */}
        <div
          className="absolute left-[-6%] top-[12%] z-10 w-[42%] -rotate-[9deg]"
          style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.35))" }}
        >
          <Img
            lightSrc="/app-prep-light.png"
            darkSrc="/app-prep-dark.png"
            alt="GenauApp Prepositions screen"
          />
        </div>

        {/* Back-right — Word card, angled the other way */}
        <div
          className="absolute right-[-6%] top-[12%] z-10 w-[42%] rotate-[9deg]"
          style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.35))" }}
        >
          <Img
            lightSrc="/app-word-light.png"
            darkSrc="/app-word-dark.png"
            alt="GenauApp Word learn card"
          />
        </div>

        {/* Center — Home, big and up front */}
        <div
          className="absolute left-1/2 top-0 z-20 w-[48%] -translate-x-1/2"
          style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.45))" }}
        >
          <Img
            lightSrc="/app-home-light.png"
            darkSrc="/app-home-dark.png"
            alt="GenauApp Home screen"
          />
        </div>
      </div>
    </div>
  );
}

function Img({
  lightSrc,
  darkSrc,
  alt,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lightSrc}
        alt={alt}
        width={400}
        height={820}
        loading="eager"
        decoding="async"
        className="theme-light-only h-auto w-full"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={darkSrc}
        alt=""
        aria-hidden="true"
        width={400}
        height={820}
        loading="eager"
        decoding="async"
        className="theme-dark-only h-auto w-full"
      />
    </>
  );
}
