import Link from "next/link";
import { LegalLayout } from "@/components/templates/LegalLayout/LegalLayout";

/**
 * /tr/kunye — Impressum (Turkish).
 *
 * Alman TMG §5 Impressum zorunluluğu — yasal metin Almanca tutulmalı.
 * Bu sayfa TR başlık + kısa TR özet + aşağıda birebir Almanca yasal
 * metin. İçerik EN /impressum ile tam olarak aynı (Alman yasal
 * sorumluluk), sadece çerçeveleme Türkçe.
 */

export const metadata = {
  title: "Künye",
  description: "GenauApp için yasal bilgiler ve iletişim.",
  alternates: {
    canonical: "/tr/kunye",
    languages: {
      en: "/impressum",
      tr: "/tr/kunye",
      "x-default": "/impressum",
    },
  },
};

export default function KunyePage() {
  return (
    <LegalLayout>
      <span className="eyebrow">Yasal · § 5 TMG</span>
      <h1>Künye</h1>

      <p className="meta">
        <Link href="/impressum">English version →</Link>
      </p>

      <p>
        Bu site Mert Kütükoğlu tarafından Almanya üzerinden
        yayınlanıyor. Yasal sorumlu kişi, iletişim adresi ve tüm resmi
        beyanlar aşağıdaki Almanca Impressum metnindedir.
      </p>

      <p>
        Alman TMG §5 ve RStV §55 uyarınca resmi Impressum metni Almanca
        tutulmak zorunda — bu TR sayfa yalnızca bilgilendirme amaçlı
        bir özet taşır, bağlayıcı metin aşağıdaki Almanca bloktur.
      </p>

      <p>
        Her türlü soru için:{" "}
        <a href="mailto:mertkutukloglu@genauapp.io">
          mertkutukloglu@genauapp.io
        </a>
        .
      </p>

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Genau App / Mert Kuetuekoglu<br />
        Kantstraße 73<br />
        10627 Berlin<br />
        Deutschland
      </p>

      <h2>Vertreten durch</h2>
      <p>Mert Kuetuekoglu</p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href="mailto:mertkutukloglu@genauapp.io">
          mertkutukloglu@genauapp.io
        </a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        13/404/01743
      </p>

      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        Mert Kuetuekoglu<br />
        Kantstraße 73<br />
        10627 Berlin<br />
        Deutschland
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§
        8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der
        Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>
    </LegalLayout>
  );
}
