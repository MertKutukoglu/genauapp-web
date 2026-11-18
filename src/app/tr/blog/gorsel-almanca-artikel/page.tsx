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
  { id: "die", label: "die (dişil)" },
  { id: "der", label: "der (eril)" },
  { id: "das", label: "das (nötr)" },
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

      <h2 id="die">die (dişil), sinyaller</h2>

      <p>
        Dişil isimlerin çoğu kendini sonlarıyla ele verir. Beş son ek
        işin büyük kısmını yapar; bir isim bunlardan biriyle bitiyorsa,
        kontrol etmeden hemen <strong>die</strong>&rsquo;ye uzanabilirsin.
      </p>

      <BlogFormulaPill
        left="-ung · -keit · -heit · -schaft · -ion"
        right="die"
        rightColor="die"
      />

      <p>
        Fiillerden türetilmiş soyut isimler için <strong>-ung</strong>,
        sıfatlardan türetilmiş soyut isimler için <strong>-keit</strong>
        ve <strong>-heit</strong>, grup ve ilişki isimleri için
        <strong> -schaft</strong>, ve Latince kökenli yabancı kelimeler
        için <strong>-ion</strong>. <strong>-ik</strong> ile
        <strong> -tät</strong> aynı aileye ait (die Musik, die Universität).
      </p>

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
            noun: "Möglichkeit",
            translation: "ihtimal",
            rule: "-keit → die",
          },
          {
            article: "die",
            noun: "Freiheit",
            translation: "özgürlük",
            rule: "-heit → die",
          },
          {
            article: "die",
            noun: "Freundschaft",
            translation: "arkadaşlık",
            rule: "-schaft → die",
          },
          {
            article: "die",
            noun: "Information",
            translation: "bilgi",
            rule: "-ion → die",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="der">der (eril), sinyaller</h2>

      <p>
        Eril isimlerin dişilde olduğu gibi tek bir son ek ailesi yok,
        ama tanınabilir sinyalleri var. Meslek adlarında işi yapanı
        gösteren <strong>-er</strong>, <strong>-ling</strong> son eki,
        ideoloji ve akım adlarında <strong>-ismus</strong>, artı
        tüm takvim: haftanın günleri, aylar ve mevsimler erildir.
      </p>

      <BlogFormulaPill
        left="-er · -ling · -ismus · günler, aylar, mevsimler"
        right="der"
        rightColor="der"
      />

      <BlogWordGallery
        words={[
          {
            article: "der",
            noun: "Lehrer",
            translation: "öğretmen",
            rule: "-er → der (işi yapan)",
          },
          {
            article: "der",
            noun: "Lehrling",
            translation: "çırak",
            rule: "-ling → der",
          },
          {
            article: "der",
            noun: "Kapitalismus",
            translation: "kapitalizm",
            rule: "-ismus → der",
          },
          {
            article: "der",
            noun: "Montag",
            translation: "Pazartesi",
            rule: "gün → der",
          },
          {
            article: "der",
            noun: "Januar",
            translation: "Ocak",
            rule: "ay → der",
          },
          {
            article: "der",
            noun: "Winter",
            translation: "kış",
            rule: "mevsim → der",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="das">das (nötr), sinyaller</h2>

      <p>
        Nötr sinyalleri topluluk isimleri için <strong>Ge-</strong>
        ön eki etrafında, sonuç ve durum adları için
        <strong> -nis</strong> son eki, Latince kökenli yabancı
        kelimeler için <strong>-ment</strong>, ve orijinal kelimenin
        cinsi ne olursa olsun her zaman das alan iki küçültme eki
        <strong> -chen</strong> ve <strong>-lein</strong> etrafında
        toplanır.
      </p>

      <BlogFormulaPill
        left="Ge- · -nis · -ment · -chen · -lein"
        right="das"
        rightColor="das"
      />

      <p>
        Bir avuç <strong>-nis</strong> ismi dişildir (die Erlaubnis,
        die Kenntnis), karşına çıktığında satır içinde işaretliyoruz.
        Varsayılan yeşil.
      </p>

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
            noun: "Geschenk",
            translation: "hediye",
            rule: "Ge- → das",
          },
          {
            article: "das",
            noun: "Ergebnis",
            translation: "sonuç",
            rule: "-nis → das",
          },
          {
            article: "das",
            noun: "Dokument",
            translation: "belge",
            rule: "-ment → das",
          },
          {
            article: "das",
            noun: "Mädchen",
            translation: "kız",
            rule: "-chen → das (küçültme)",
          },
          {
            article: "das",
            noun: "Büchlein",
            translation: "kitapçık",
            rule: "-lein → das (küçültme)",
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
        Sonra, doğru da cevaplasan yanlış da cevaplasan, kural belirir.
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="karar"
          correctArticle="die"
          className="max-w-[380px] w-full"
        />
      </div>

      <p>
        <strong>die</strong>&rsquo;yi seç, picker doğru cevap üzerinde
        kilitlenir:
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="karar"
          correctArticle="die"
          answered="die"
          className="max-w-[380px] w-full"
        />
      </div>

      <p>
        Yanlış olanı seçersen aynı anda iki şey olur. Dokunduğun pill
        hata renginde kalır, doğru artikel ismin yanına kendi cins
        renginde düşer ki doğru cevabın ne olduğunu göresin, ve
        pill&rsquo;lerin altından kuralı açıklayan bir banner kayar.
        Hata, yapıldığı iki saniyenin içinde derse dönüşür.
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="karar"
          correctArticle="die"
          wrongPick="das"
          rule="-ung ile biten isimler dişildir. die Entscheidung, die Lösung, die Meinung."
          className="max-w-[380px] w-full"
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
        Workout başına yirmi kart, her cevabın yanında kural, ve artikel
        sorusu kendini cevaplamaya başlar.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <p>
        Bunu demoda denemek istersen, A1 ya da A2 seviyede Words
        chip&rsquo;ini aç. Kartların çoğu, sonundan ya da önündeki ekten
        tanıyabileceğin bir kalıp taşır. Bir workout sonrasında
        kurallar, kural gibi değil, Almancanın gerçekte nasıl çalıştığı
        gibi hissettirmeye başlar.
      </p>

      <BlogCTA source="visual_articles_blog" />
    </BlogLayout>
  );
}
