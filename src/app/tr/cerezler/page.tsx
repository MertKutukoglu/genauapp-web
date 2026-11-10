import Link from "next/link";
import { LegalLayout } from "@/components/templates/LegalLayout/LegalLayout";
import { ChangeConsentButton } from "@/components/molecules/CookieConsent/ChangeConsentButton";

/**
 * /tr/cerezler — Cookie Policy, tam Türkçe.
 *
 * Datenschutz / Impressum'un aksine çerez politikasının Almanca
 * tutulması yasal zorunluluk değil. Metin kısa ve doğrudan
 * kullanıcıya yarar sağlayan türden olduğu için tamamını TR'ye
 * lokalize ediyoruz. ChangeConsentButton EN sayfadaki ile aynı — rıza
 * seçimini sıfırlar ve banner'ı yeniden açar.
 */

export const metadata = {
  title: "Çerezler",
  description:
    "GenauApp'in çerez kullanımı — hangi çerezler neden, nasıl kontrol edilir.",
  alternates: {
    canonical: "/tr/cerezler",
    languages: {
      en: "/cookie-policy",
      tr: "/tr/cerezler",
      "x-default": "/cookie-policy",
    },
  },
};

export default function CerezlerPage() {
  return (
    <LegalLayout>
      <span className="eyebrow">Yasal · Çerezler</span>
      <h1>Çerez politikası</h1>
      <p className="meta">
        Son güncelleme: 10 Kasım 2026 · {" "}
        <Link href="/cookie-policy">English version →</Link>
      </p>

      <h2>Çerez nedir?</h2>
      <p>
        Çerezler, bir web sitesini ziyaret ettiğinde bilgisayarına veya
        telefonuna yerleştirilen küçük metin dosyalarıdır. Sitenin seni
        tanımasına ve tercihlerini hatırlamasına yardımcı olurlar.
      </p>

      <h2>Çerezleri nasıl kullanıyoruz</h2>
      <p>GenauApp olarak çerezleri şu amaçlarla kullanıyoruz:</p>
      <ul>
        <li>Tema (açık/koyu) tercihini hatırlamak</li>
        <li>Dil tercihini hatırlamak (EN / TR)</li>
        <li>Anonim kullanım istatistiği (hangi sayfa görüldü, hangi butona basıldı)</li>
      </ul>

      <h2>Hangi tür çerezleri kullanıyoruz</h2>

      <h3>🔒 Zorunlu çerezler</h3>
      <p>
        Bu çerezler site çalışsın diye var — temayı ve dili
        hatırlamak, güvenlik. Rıza gerektirmezler, kapatılamazlar;
        site olmazsa olmaz altyapısı.
      </p>

      <h3>📊 Analitik çerezler</h3>
      <p>
        Bu çerezler siteyi nasıl kullandığını anlamamıza yardımcı olur
        — hangi sayfa görüntüleniyor, hangi butona basılıyor. Kimlik
        bilgin bu verilere bağlanmıyor. <strong>PostHog</strong> (AB
        sunucularında) ile tutuluyor.
      </p>

      <h3>📈 Vercel Analytics</h3>
      <p>
        Çerezsiz çalışıyor — sadece anonim sayfa görüntülemelerini
        sayıyor. Rıza gerektirmez, hiçbir kişisel veri toplamaz.
      </p>

      <p>
        <strong>Pazarlama çerezi kullanmıyoruz.</strong> Reklam ağı
        çerezi yok, kullanıcı takibi yok, üçüncü taraf reklam yok.
      </p>

      <h2>Çerez tercihlerini yönet</h2>
      <p>
        Analitik çerez tercihini istediğin zaman aşağıdaki butondan
        değiştirebilirsin. Buton, saklı tercihini temizler ve çerez
        onay banner&apos;ını yeniden açar; kabul ya da reddedebilirsin.
        Çerezleri tarayıcı ayarlarından da temizleyebilirsin.
      </p>
      <ChangeConsentButton />

      <h2>İletişim</h2>
      <p>
        Çerez kullanımımızla ilgili sorularınız için:{" "}
        <a href="mailto:mertkutukloglu@genauapp.io">
          mertkutukloglu@genauapp.io
        </a>
      </p>
    </LegalLayout>
  );
}
