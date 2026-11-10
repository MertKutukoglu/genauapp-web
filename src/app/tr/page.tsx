import type { Metadata } from "next";

/**
 * /tr — Turkish landing root.
 *
 * Placeholder scaffold: the i18n infrastructure (locale detection,
 * LanguagePicker, string dictionaries) ships in Step 1 so we can verify
 * routing + the picker end-to-end before porting content. Step 2
 * replaces this with the full TR landing (hero + carousel + packs +
 * waitlist), reading its copy from `lib/i18n/strings.ts`.
 *
 * Until then: a small centered placeholder so clicking the picker
 * doesn't 404, plus a visible marker that this page is intentional.
 */

export const metadata: Metadata = {
  title: "GenauApp — Almancan var, solmasına izin vermiyoruz",
  description:
    "Aktif Almanca öğrenenler için keskin ve dürüst bir workout partneri. Hazır olduğunda Berlin'den.",
  alternates: {
    canonical: "/tr",
    languages: {
      en: "/",
      tr: "/tr",
      "x-default": "/",
    },
  },
};

export default function TrLandingPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-24 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.14em] text-accent">
        Türkçe sürüm
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-fg md:text-4xl">
        Almancan var.{" "}
        <span className="italic text-accent">
          Solmasına izin vermiyoruz.
        </span>
      </h1>
      <p className="mt-4 font-sans text-base text-fg-muted">
        Türkçe sayfa yolda. Şu anda İngilizce versiyonda tüm içerik
        mevcut.
      </p>
      <p className="mt-6 font-sans text-sm text-fg-faint">
        Üstteki{" "}
        <span className="font-semibold text-fg">EN</span> düğmesinden
        İngilizce sürüme geçebilirsin.
      </p>
    </main>
  );
}
