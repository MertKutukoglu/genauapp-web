import type { Metadata } from "next";
import Link from "next/link";
import { BlogLayout } from "@/components/templates/BlogLayout/BlogLayout";
import { BlogCTA } from "@/components/molecules/BlogCTA/BlogCTA";
import {
  BlogArticlePicker,
  BlogFormulaPill,
  BlogWordGallery,
} from "@/components/molecules/BlogAppSnippets/BlogAppSnippets";

/**
 * /tr/blog/gorsel-almanca-artikel, TR mirror of
 * /blog/visual-german-articles. Localized (not word-for-word
 * translated) for Mert's Turkish audience, which is the under-
 * competed SEO surface for "almanca artikel ezberleme" and
 * similar long-tail queries.
 */
export const metadata: Metadata = {
  title: "Görsel Almanca artikel, renk kodlu yöntem",
  description:
    "der / die / das'ı kelime kelime ezberlemek yavaş. Almanca artikeller, UI her cinse bir renk verdiğinde göze çarpan kalıplara uyar. İşte nasıl öğrettiğimiz.",
  alternates: {
    canonical: "/tr/blog/gorsel-almanca-artikel",
    languages: {
      en: "/blog/visual-german-articles",
      tr: "/tr/blog/gorsel-almanca-artikel",
      "x-default": "/blog/visual-german-articles",
    },
  },
  openGraph: {
    title: "Görsel Almanca artikel, renk kodlu yöntem",
    description:
      "Almanca artikeller göze çarpan kalıplara uyar. der mavi, die kırmızı, das yeşil. der / die / das atamalarının çoğunu açıklayan beş kuralı öğren.",
    type: "article",
  },
};

const TOC = [
  { id: "problem", label: "Liste neden işe yaramaz" },
  { id: "colors", label: "Üç renk" },
  { id: "ung", label: "-ung → die" },
  { id: "keit-heit", label: "-keit, -heit → die" },
  { id: "ge", label: "Ge- → das" },
  { id: "nis", label: "-nis → das" },
  { id: "compound", label: "Bileşik isimler" },
  { id: "app", label: "Uygulamada nasıl görünüyor" },
];

export default function GorselAlmancaArtikelPage() {
  return (
    <BlogLayout slug="gorsel-almanca-artikel" toc={TOC}>
      <h1 className="title">Görsel Almanca artikel, renk kodlu yöntem</h1>
      <p className="byline">Mert tarafından · Kasım 2026 · 6 dk okuma</p>

      <p>
        Almanca artikel ezberlemeye çalıştıysan, nasıl gittiğini bilirsin.
        Bir kelime sayfası açarsın. İsmi görürsün. Önünde küçük bir
        &ldquo;der,&rdquo; &ldquo;die,&rdquo; ya da &ldquo;das&rdquo;
        duruyordur. Tekrar tekrar söyleyerek ikisini birden kafana
        kazımaya çalışırsın. Üçüncü sayfaya geldiğinde hangisinin hangisi
        olduğunu unutmuşsundur, altıncı sayfada kelimeler birbirine
        karışmaya başlar.
      </p>

      <p>
        Daha iyi bir yol var, ve her cinse bir renk vermekle başlıyor.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="problem">Liste neden işe yaramaz</h2>

      <p>
        Bir isim ve onun artikeli iki ayrı bilgi değil, tek bir birim.
        Ama düz bir liste bunu iki gibi davranır: işte isim, işte onun
        artikeli, ikisini de ezberle. Öğrenenin beyni de buna uyar ve
        onları ayrı ayrı saklar. Bir hafta sonra isim geri geliyor ama
        artikeli gelmiyor.
      </p>

      <p>
        Çözüm, artikeli ismin önünde duran ayrı bir kelime olmaktan
        çıkarıp, ismin görsel bir özelliği haline getirmek. GenauApp&rsquo;te
        her Almanca isim kendi cins rengini taşır:
      </p>

      <BlogWordGallery
        words={[
          { article: "der", noun: "Tisch", translation: "masa" },
          { article: "die", noun: "Lampe", translation: "lamba" },
          { article: "das", noun: "Fenster", translation: "pencere" },
        ]}
      />

      <p>
        Bu üçlüye birkaç kez bak, kalıp oturmaya başlar. Mavi eril,
        kırmızı dişil, yeşil nötr. Gördüğün bir sonraki Almanca isimde
        beynin, artikel sorusundan önce renk sorusunu soruyor olacak.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="colors">Üç renk</h2>

      <p>Üç cins rengi, ve asla yer değiştirmezler:</p>

      <ul>
        <li>
          <strong>der</strong> = mavi (eril)
        </li>
        <li>
          <strong>die</strong> = kırmızı (dişil)
        </li>
        <li>
          <strong>das</strong> = yeşil (nötr)
        </li>
      </ul>

      <p>
        Renkler bütün uygulamada taşınır. Artikel seçicide, örnek
        cümlelerde, hâl tablolarında, Reading chip&rsquo;inin altı çizili
        isimlerinde görürsün. İlişkilendirme bir kez kurulduğunda,
        Almanca gördüğün her yerde yeniden kullanılıyor.
      </p>

      <p>
        Sadece bu bile faydalı olurdu. Ama asıl kaldıraç şu: Almanca
        artikeller rastgele değil. Dört ya da beş kalıp kuralı, bir
        öğrenenin karşılaştığı çoğu şeyi açıklar. İşte burada.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="ung">-ung → die</h2>

      <p>
        <strong>-ung</strong> ile biten her Almanca isim dişildir.
        A1 ya da A2 seviyesinde endişelenecek istisna yok. Bunlar
        fiillerden türetilmiş soyut isimler: &ldquo;entscheiden&rdquo;
        (karar vermek) &ldquo;Entscheidung&rdquo; (karar) olur, ve o
        karar <strong>die</strong> alır.
      </p>

      <BlogFormulaPill left="-ung" right="die" rightColor="die" />

      <BlogWordGallery
        words={[
          {
            article: "die",
            noun: "Entscheidung",
            translation: "karar",
            rule: "-ung → die",
          },
          {
            article: "die",
            noun: "Lösung",
            translation: "çözüm",
            rule: "-ung → die",
          },
          {
            article: "die",
            noun: "Meinung",
            translation: "görüş, fikir",
            rule: "-ung → die",
          },
          {
            article: "die",
            noun: "Erfahrung",
            translation: "deneyim",
            rule: "-ung → die",
          },
        ]}
      />

      <p>
        Dört kırmızı kart. Bir ay sonra buraya geri dön, beynin bir
        sonraki karşılaştığı <strong>-ung</strong> ismi ile ne
        yapacağını hâlâ bilecek.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="keit-heit">-keit, -heit → die</h2>

      <p>
        İki tane daha son ek, aynı cins. <strong>-keit</strong> ve
        <strong> -heit</strong> sıfatları ve sıfat benzeri kelimeleri
        soyut isme çevirir, ve hepsi <strong>die</strong> alır.
      </p>

      <BlogFormulaPill left="-keit, -heit" right="die" rightColor="die" />

      <BlogWordGallery
        words={[
          {
            article: "die",
            noun: "Möglichkeit",
            translation: "ihtimal, olanak",
            rule: "-keit → die",
          },
          {
            article: "die",
            noun: "Freundlichkeit",
            translation: "nezaket",
            rule: "-keit → die",
          },
          {
            article: "die",
            noun: "Gesundheit",
            translation: "sağlık",
            rule: "-heit → die",
          },
          {
            article: "die",
            noun: "Freiheit",
            translation: "özgürlük",
            rule: "-heit → die",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="ge">Ge- → das</h2>

      <p>
        Şimdi yeşiller. <strong>Ge-</strong> ön eki genelde bir
        topluluk ismini işaretler, birçok şeyi ya da eylemi bir arada
        gruplandıran bir şey. Bunlar <strong>das</strong>.
      </p>

      <BlogFormulaPill left="Ge-" right="das" rightColor="das" />

      <BlogWordGallery
        words={[
          {
            article: "das",
            noun: "Gebäude",
            translation: "bina",
            rule: "Ge- → das",
          },
          {
            article: "das",
            noun: "Gepäck",
            translation: "bagaj",
            rule: "Ge- → das",
          },
          {
            article: "das",
            noun: "Geschäft",
            translation: "dükkan",
            rule: "Ge- → das",
          },
          {
            article: "das",
            noun: "Geschenk",
            translation: "hediye",
            rule: "Ge- → das",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="nis">-nis → das</h2>

      <p>
        <strong>-nis</strong> isimleri genelde bir sonucu ya da durumu
        adlandırır, ve onlar da <strong>das</strong>. Bir avuç tanesi
        dişildir (die Erlaubnis, die Kenntnis), karşına çıktığında
        satır içinde işaretliyoruz; varsayılan yeşil.
      </p>

      <BlogFormulaPill left="-nis" right="das" rightColor="das" />

      <BlogWordGallery
        words={[
          {
            article: "das",
            noun: "Ergebnis",
            translation: "sonuç",
            rule: "-nis → das",
          },
          {
            article: "das",
            noun: "Verständnis",
            translation: "anlayış",
            rule: "-nis → das",
          },
          {
            article: "das",
            noun: "Geheimnis",
            translation: "sır",
            rule: "-nis → das",
          },
          {
            article: "das",
            noun: "Bedürfnis",
            translation: "ihtiyaç",
            rule: "-nis → das",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="compound">Bileşik isimler, son parçanın cinsini alır</h2>

      <p>
        Almanca isimleri yapıştırmayı sever. <em>Haustür</em>,{" "}
        <em>Bahnhof</em>, <em>Küchentisch</em>. Bileşik bir ismin cinsi,
        her zaman <strong>son</strong> parçasının cinsidir.
      </p>

      <p>
        <em>die Tür</em> dişil, bu yüzden <em>die Haustür</em> (ön kapı)
        de dişildir. <em>der Hof</em> eril, bu yüzden <em>der Bahnhof</em>
        (istasyon) erildir. <em>der Tisch</em> eril, bu yüzden{" "}
        <em>der Küchentisch</em> (mutfak masası) erildir; <em>die Küche</em>
        dişil olsa bile.
      </p>

      <BlogWordGallery
        words={[
          {
            article: "die",
            noun: "Haustür",
            translation: "ön kapı",
            rule: "die Tür → die Haustür",
          },
          {
            article: "der",
            noun: "Bahnhof",
            translation: "istasyon",
            rule: "der Hof → der Bahnhof",
          },
          {
            article: "der",
            noun: "Küchentisch",
            translation: "mutfak masası",
            rule: "der Tisch → der Küchentisch",
          },
        ]}
      />

      <p>
        Bu kural tek başına yüzlerce ismin kilidini açar. Bir bileşik
        isme her rastladığında, cinsini bulmak için onu sağdan sola oku.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="app">Uygulamada nasıl görünüyor</h2>

      <p>
        Bir Words workout&rsquo;u sana bir artikel seçici verdiğinde,
        sorunun önünde artikel yoktur. Üç butondan birine dokunursun.
        Sonra, doğru da cevaplasan yanlış da cevaplasan, cevabın yanında
        kural belirir.
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="karar"
          className="max-w-[360px] w-full"
        />
      </div>

      <p>
        <strong>die</strong>&rsquo;yi seç, kural yerine oturur:
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="karar"
          answered="die"
          className="max-w-[360px] w-full"
        />
      </div>

      <p>
        <strong>-ung</strong> kelimeleri üzerinde bunun bir düzine
        tekrarı, ikinci tahminde bulunmayı bırakırsın. Kalıp artık
        hatırlanacak bir kural değil, gözünün ilk kontrol ettiği şey.
        İsim -ung ile bitiyorsa, artikel die. Bir trafik ışığını bildiğin
        gibi biliyorsun.
      </p>

      <p>
        Her Words workout&rsquo;u önce Vocabulary&rsquo;yi besler, Grammar
        ve Writing&rsquo;i de yanında sürükler (<Link href="/tr/blog/skill-nedir">
        ağın nasıl çalıştığını</Link> daha derin mekanik için yazdık).
        Workout başına yirmi kart, dönüşümlü beş kalıp, ve artikel
        sorusu kendini cevaplamaya başlar.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <p>
        Bunu demoda denemek istersen, A1 ya da A2 seviyede Words
        chip&rsquo;ini aç. Her üçüncü kart bir <strong>-ung</strong>,
        <strong> Ge-</strong>, ya da <strong>-keit</strong> taşır. Bir
        workout sonrasında kural, bir kural gibi değil, Almancanın
        gerçekte nasıl çalıştığı gibi hissettirmeye başlar.
      </p>

      <BlogCTA source="visual_articles_blog" />
    </BlogLayout>
  );
}
