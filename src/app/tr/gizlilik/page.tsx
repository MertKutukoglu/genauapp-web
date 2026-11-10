import Link from "next/link";
import { LegalLayout } from "@/components/templates/LegalLayout/LegalLayout";

/**
 * /tr/gizlilik — Datenschutzerklärung (TR özet).
 *
 * TR özet: ne topluyoruz, nereye gidiyor, nasıl silinir, nasıl ulaşılır.
 * Bağlayıcı yasal metin EN /datenschutz'ta duruyor (tam GDPR
 * bildirimi). Buradan oraya link var ve kullanıcı istediğinde tam
 * metni okuyabilir.
 */

export const metadata = {
  title: "Gizlilik",
  description:
    "GenauApp olarak hangi verileri topluyoruz, nereye gidiyor, nasıl silinir — kısa Türkçe özet.",
  alternates: {
    canonical: "/tr/gizlilik",
    languages: {
      en: "/datenschutz",
      tr: "/tr/gizlilik",
      "x-default": "/datenschutz",
    },
  },
};

export default function GizlilikPage() {
  return (
    <LegalLayout>
      <span className="eyebrow">Yasal · GDPR / KVKK</span>
      <h1>Gizlilik</h1>

      <p className="meta">
        Son güncelleme: 10 Kasım 2026 · {" "}
        <Link href="/datenschutz">English version →</Link>
      </p>

      <p>
        Bu, GenauApp&apos;in topladığı verileri kısa Türkçe özetleyen bir
        sayfadır. Tam yasal metin (GDPR Art. 13/14 uyarınca) İngilizce
        olarak <Link href="/datenschutz">/datenschutz</Link> adresinde
        tutuluyor; bir çelişki durumunda bağlayıcı olan oradaki metin.
      </p>

      <h2>Hangi verileri topluyoruz</h2>

      <h3>Bekleme listesi (waitlist)</h3>
      <p>
        Landing sayfasındaki forma girdiğin e-mail adresini — ve
        hangi seviye için ilgilendiğini (A1/A2/B1/B2) kaydediyoruz.
        Başka hiçbir kişisel veri alınmıyor; ad, telefon, adres
        istemiyoruz.
      </p>

      <h3>Anonim kullanım analizi</h3>
      <p>
        Sayfayı nasıl kullandığını öğrenmek için anonim olay kayıtları
        tutuyoruz (hangi butona basıldı, hangi sayfa görüntülendi).
        Bu veri kişisel kimliğe bağlanamaz, başka servislere
        aktarılmaz.
      </p>

      <h3>Çerezler</h3>
      <p>
        Zorunlu olmayan hiçbir çerez senin açık rızan olmadan
        yüklenmez. Detaylar için{" "}
        <Link href="/tr/cerezler">çerez politikası</Link>na bak.
      </p>

      <h2>Veriler nerede saklanıyor</h2>
      <ul>
        <li>
          Bekleme listesi e-mailleri → <strong>Supabase</strong> (Avrupa
          Birliği, Frankfurt sunucuları).
        </li>
        <li>
          Analitik → <strong>PostHog</strong> (Avrupa Birliği) ve{" "}
          <strong>Vercel Analytics</strong> (çerezsiz, anonim). Her ikisi
          de GDPR uyumlu.
        </li>
        <li>
          Site barındırması → <strong>Vercel</strong> (Avrupa Birliği).
        </li>
      </ul>

      <h2>Verini sildirmek, görüntülemek, güncellemek istersen</h2>
      <p>
        Tek bir e-mail yeter:{" "}
        <a href="mailto:mertkutukloglu@genauapp.io">
          mertkutukloglu@genauapp.io
        </a>
        . Hangi e-mail adresini listelediysen onu yazmak kimlik
        doğrulaması için yeterli. 30 gün içinde yanıt alırsın.
      </p>

      <h2>Haklarınız</h2>
      <p>
        GDPR ve KVKK çerçevesinde:
      </p>
      <ul>
        <li>Verilerinize erişme hakkı</li>
        <li>Düzeltme ve silme hakkı</li>
        <li>Veri taşıma hakkı</li>
        <li>İşleme itiraz etme hakkı</li>
      </ul>
      <p>
        Bu haklardan birini kullanmak istiyorsan yukarıdaki e-mail
        adresine yaz, yeter.
      </p>

      <h2>Reşit olmayanlar</h2>
      <p>
        Bu hizmet 18 yaşından küçüklere yönelik değildir. 18 yaşından
        küçük bir kullanıcıdan kasıtlı olarak veri toplamıyoruz.
        Bu konuda bir endişen varsa yukarıdaki e-mail adresine ulaş.
      </p>

      <h2>Bu metin değişirse</h2>
      <p>
        Değişiklik yaparsak tarih yukarıdaki &quot;Son güncelleme&quot;
        satırını güncelleriz. Önemli değişikliklerde bekleme listesine
        kayıtlıysan e-mail ile bilgilendirilirsin.
      </p>

      <h2>İletişim</h2>
      <p>
        Mert Kütükoğlu<br />
        Kantstraße 73, 10627 Berlin, Almanya<br />
        <a href="mailto:mertkutukloglu@genauapp.io">
          mertkutukloglu@genauapp.io
        </a>
      </p>
    </LegalLayout>
  );
}
