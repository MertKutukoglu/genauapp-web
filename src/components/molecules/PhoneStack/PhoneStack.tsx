import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * PhoneStack — three stacked iOS phones in the hero.
 *
 * - Side phones (Prepositions / Word card) inset from the card edges
 *   so they don't touch the card wall; respects a horizontal rhythm.
 * - Bottom mask fade (black → transparent over the last ~30%) so the
 *   phones dissolve into the TryDemoCard below instead of cutting with
 *   a hard edge. The TryDemoCard overlaps the fade with a negative
 *   margin in HeroLeftPanelPhone so it sits cleanly over the dissolved
 *   phones.
 *
 * Theme swap via .theme-light-only / .theme-dark-only utilities.
 */

export interface PhoneStackProps {
  className?: string;
}

const dropShadowBig = "drop-shadow(0 30px 40px rgba(0,0,0,0.45))";
const dropShadowSide = "drop-shadow(0 20px 30px rgba(0,0,0,0.35))";

export function PhoneStack({ className }: PhoneStackProps) {
  return (
    <div
      className={clsx(
        "relative mx-auto flex h-full w-full items-center justify-center",
        className,
      )}
      style={{
        // Bottom fade — phones dissolve, no hard crop line.
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
      }}
    >
      {/* Back-left — Prepositions. Inset from the card edge by 4% so
          it has breathing room against the card boundary. */}
      <Slot
        className="absolute inset-y-0 left-[4%] w-[30%] -rotate-[9deg] translate-y-4"
        filter={dropShadowSide}
      >
        <Img
          lightSrc="/app-prep-light.png"
          darkSrc="/app-prep-dark.png"
          alt="GenauApp Prepositions screen"
        />
      </Slot>

      {/* Back-right — Word card, same inset on the right. */}
      <Slot
        className="absolute inset-y-0 right-[4%] w-[30%] rotate-[9deg] translate-y-4"
        filter={dropShadowSide}
      >
        <Img
          lightSrc="/app-word-light.png"
          darkSrc="/app-word-dark.png"
          alt="GenauApp Word learn card"
        />
      </Slot>

      {/* Center — Home, up front. */}
      <Slot
        className="relative z-20 inset-y-0 h-full w-[36%]"
        filter={dropShadowBig}
      >
        <Img
          lightSrc="/app-home-light.png"
          darkSrc="/app-home-dark.png"
          alt="GenauApp Home screen"
        />
      </Slot>
    </div>
  );
}

function Slot({
  children,
  className,
  filter,
}: {
  children: React.ReactNode;
  className?: string;
  filter?: string;
}) {
  return (
    <div
      className={clsx("flex items-center justify-center", className)}
      style={{ filter }}
    >
      {children}
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
        className="theme-light-only h-full max-h-full w-auto max-w-full object-contain"
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
        className="theme-dark-only h-full max-h-full w-auto max-w-full object-contain"
      />
    </>
  );
}
