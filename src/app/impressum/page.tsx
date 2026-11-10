import { LegalLayout } from "@/components/templates/LegalLayout/LegalLayout";

export const metadata = {
  title: "Impressum",
  description: "Impressum / Legal notice for GenauApp",
  alternates: {
    canonical: "/impressum",
    languages: {
      en: "/impressum",
      tr: "/tr/kunye",
      "x-default": "/impressum",
    },
  },
};

export default function ImpressumPage() {
  return (
    <LegalLayout>
      <span className="eyebrow">Legal · § 5 TMG</span>
      <h1>Impressum</h1>

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
