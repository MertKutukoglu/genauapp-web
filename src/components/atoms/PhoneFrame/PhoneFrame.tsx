import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * PhoneFrame — a CSS iPhone 14 Pro-style hardware shell.
 *
 * Pure CSS: rounded corners (~48px), thin bezel, side buttons on the
 * left + a power button on the right, and a Dynamic Island cutout
 * centered at the top. Accepts any children that paint the screen —
 * usually AppHomeMockup, but could also be a single screenshot.
 *
 * The `screenClassName` prop lets callers paint the screen's own
 * background (bg-white for a light app shell, etc.). Default is
 * surface-card so the frame still reads if left empty.
 */

export interface PhoneFrameProps {
  children?: React.ReactNode;
  /** Outer width in px (height derives from the 9:19.5 aspect ratio). */
  width?: number;
  screenClassName?: string;
  className?: string;
}

export function PhoneFrame({
  children,
  width = 260,
  screenClassName,
  className,
}: PhoneFrameProps) {
  return (
    <div
      className={clsx(
        "relative isolate select-none",
        className,
      )}
      style={{
        width,
        aspectRatio: "9 / 19.5",
      }}
    >
      {/* Body — black hardware bezel with a subtle sheen */}
      <div
        className="absolute inset-0 rounded-[13%] bg-[#141112] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.45),inset_0_0_0_2px_rgba(255,255,255,0.06)]"
        aria-hidden
      />

      {/* Side buttons */}
      <span aria-hidden className="absolute left-[-2px] top-[16%] h-[6%] w-[3px] rounded-l-full bg-[#2a2426]" />
      <span aria-hidden className="absolute left-[-2px] top-[25%] h-[9%] w-[3px] rounded-l-full bg-[#2a2426]" />
      <span aria-hidden className="absolute left-[-2px] top-[36%] h-[9%] w-[3px] rounded-l-full bg-[#2a2426]" />
      <span aria-hidden className="absolute right-[-2px] top-[23%] h-[14%] w-[3px] rounded-r-full bg-[#2a2426]" />

      {/* Screen */}
      <div
        className={clsx(
          "absolute inset-[3%] overflow-hidden rounded-[11%]",
          "bg-white text-[#141112]",
          screenClassName,
        )}
        style={{ colorScheme: "light" }}
      >
        {children}
      </div>

      {/* Dynamic Island — pill cutout on top of the screen */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[2.4%] z-10 h-[3.6%] w-[34%] -translate-x-1/2 rounded-full bg-black"
      />
    </div>
  );
}
