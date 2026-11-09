import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * PhoneStack — three stacked iOS phones in the hero.
 *
 * No bottom mask / no crop. Each phone image is `object-contain` inside
 * a slot whose height tracks the parent — so phones shrink as the
 * available space shrinks, but they never crop. Center phone slightly
 * taller / up front; back-left and back-right 80% of center, rotated
 * ±9deg and dropped a touch.
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
    >
      {/* Back-left — Prepositions */}
      <Slot
        className="absolute inset-y-2 left-0 w-[32%] -rotate-[9deg] translate-y-3"
        filter={dropShadowSide}
      >
        <Img
          lightSrc="/app-prep-light.png"
          darkSrc="/app-prep-dark.png"
          alt="GenauApp Prepositions screen"
        />
      </Slot>

      {/* Back-right — Word card */}
      <Slot
        className="absolute inset-y-2 right-0 w-[32%] rotate-[9deg] translate-y-3"
        filter={dropShadowSide}
      >
        <Img
          lightSrc="/app-word-light.png"
          darkSrc="/app-word-dark.png"
          alt="GenauApp Word learn card"
        />
      </Slot>

      {/* Center — Home */}
      <Slot
        className="relative z-20 inset-y-0 h-full w-[38%]"
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
