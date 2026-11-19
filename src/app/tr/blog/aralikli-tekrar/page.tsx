import type { Metadata } from "next";
import Link from "next/link";
import { BlogLayout } from "@/components/templates/BlogLayout/BlogLayout";
import { BlogCTA } from "@/components/molecules/BlogCTA/BlogCTA";
import {
  BlogSrsSelfRateCard,
  BlogObservedAnswer,
  BlogSkillRingRow,
} from "@/components/molecules/BlogAppSnippets/BlogAppSnippets";

/**
 * /tr/blog/aralikli-tekrar, "Aralıklı tekrar, ama dürüstçe" post.
 *
 * TR mirror of /blog/spaced-repetition-done-honestly. Anchor ids
 * kept in English across locales so cross-language deep links
 * land on the same section.
 */
export const metadata: Metadata = {
  title: "Aralıklı tekrar, ama dürüstçe",
  description:
    "Klasik SRS senden kendi kağıdını not vermeni ister. GenauApp ölçer: dokunduğun cevap data'dır, ring'in yanındaki ok yönünü söyler, ve kutu kapalı değildir.",
  alternates: {
    canonical: "/tr/blog/aralikli-tekrar",
    languages: {
      en: "/blog/spaced-repetition-done-honestly",
      tr: "/tr/blog/aralikli-tekrar",
      "x-default": "/blog/spaced-repetition-done-honestly",
    },
  },
  openGraph: {
    title: "Aralıklı tekrar, ama dürüstçe",
    description:
      "Self-rating yok. Kapalı kutu yok. Ölçülmüş accuracy, confidence weighted, ve yanında iki yönlü bir ok.",
    type: "article",
  },
};

const TOC = [
  { id: "box", label: "Kapalı kutu" },
  { id: "classic", label: "Klasik SRS ne sorar" },
  { id: "self", label: "Self-rating asıl sorun" },
  { id: "measure", label: "Biz ne ölçüyoruz" },
  { id: "confidence", label: "Neden tek cevap zayıf sinyal" },
  { id: "arrow", label: "İki yönlü ok" },
  { id: "payoff", label: "Bütün döngü" },
];

export default function AralikliTekrarPage() {
  return (
    <BlogLayout slug="aralikli-tekrar" toc={TOC}>
      <h1 className="title">Aralıklı tekrar, ama dürüstçe</h1>
      <p className="byline">Mert tarafından · Kasım 2026 · 5 dk okuma</p>

      <p>
        Aralıklı tekrar iyi bir fikir, kötü bir arayüzle geliyor. Bunu
        kullanan her uygulama kutunun ne yaptığını gizliyor, sonra
        henüz öğrenmediğin bir şeyi &ldquo;ne kadar iyi bildin?&rdquo;
        diye sana sorarak kartı ne zaman tekrar göstereceğine karar
        vermeye yardım etmeni istiyor. &ldquo;Good&rdquo;a dokunuyorsun,
        kutu dokunuşu yutuyor, bir hafta sonra sana neden bugün
        olduğunu açıklamadan bir kart çıkarıyor.
      </p>

      <p>
        Fikri tuttuk, self-rating&rsquo;i attık. İşte yerine ne
        yapıyoruz ve neden tutuyor.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="classic">Klasik SRS ne sorar</h2>

      <p>
        SM-2, Anki, SuperMemo ve bütün torunlarının altındaki
        algoritmadır. Bir kartın bir sonraki gösterim aralığını,
        mevcut aralığı bir &ldquo;kolaylık faktörü&rdquo; ile çarparak
        hesaplar, ve bu faktör her karttan sonra kullanıcının
        verdiği değerlendirmeye göre yukarı veya aşağı hareket eder.
      </p>

      <BlogSrsSelfRateCard
        prompt="die Erfahrung"
        answer="tecrübe (dişi, -ung)"
      />

      <p>
        Kullanıcı soruyu görür, cevabı açar, sonra Again, Hard, Good
        veya Easy&rsquo;den birini seçer. Algoritmanın aldığı tek
        sinyal bu seçimdir. Kutu yeni bir aralık hesaplar, kartı
        kuyruğa koyar, ve sana onu gelecek hafta, ya bir ay sonra,
        ya yarın, ya on dakika sonra gösterir.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="self">Self-rating asıl sorun</h2>

      <p>
        Değerlendirmen istenen şey (bunu biliyor muydum?) tam da
        öğrenmeye çalıştığın şeyin kendisi. Beyin bu iş için berbat.
        Tanıma hissi hatırlama gibi geliyor. Cevabı sesli okumak
        hatırlamak gibi geliyor. Akıcılık yanılgısı ölçülmüş bir
        bilişsel etki, ve her SRS kartının dibindeki dört buton tam
        onun üstünde duruyor.
      </p>

      <p>
        Bir de akşam sorunu var. Salı günü saat 23&rsquo;te Hard ve
        Good aynı butona dönüşür. İnsanlar kuyruk hızlı kısalsın diye
        Good&rsquo;a basar. Kuyruk gerçekten de hızlı kısalır.
        Haftalar sonra Good dedikleri kartlar boşluk olarak geri
        gelir, ve algoritma kullanıcının yalan söylediğini
        bilemezdi, çünkü kullanıcı ona bilerek yalan söyledi.
      </p>

      <p>Dürüst bir öğrenme sistemi ölçer. Sormaz.</p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="measure">Biz ne ölçüyoruz</h2>

      <p>
        GenauApp&rsquo;teki her cevap gerçek bir egzersiz, self-report
        değil. Artikel seçici bir ismin altında üç buton; birine
        dokunursun. O dokunuş ölçümdür. Fill in the blank&rsquo;in
        tek doğru cevabı var ve yazılı bir tahmin; eşleşme ölçümdür.
        Sentence Builder bir sıralama; kurduğun sıra ölçümdür.
      </p>

      <BlogObservedAnswer
        noun="Erfahrung"
        translation="tecrübe"
        correctArticle="die"
        tapped="die"
      />

      <p>
        Uygulama o cevap hakkında ne hissettiğini hiç sormaz. Cevap
        zaten elinde. &ldquo;Ne kadar eminsin?&rdquo; &ldquo;Doğru
        yaptın mı?&rdquo;dan daha kötü bir soru, ve doğru soru
        altında verisi olan soru.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="confidence">Neden tek cevap zayıf sinyal</h2>

      <p>
        Tek bir doğru cevap bir konuyu bildiğin anlamına gelmez. On
        doğru cevap bir şey ifade eder. Progress bar&rsquo;ımız
        accuracy&rsquo;ni deneme sayısı&rsquo;nın ona oranıyla çarpar,
        bir&rsquo;de tavana vurur. Erken aşamada doğru cevap versen
        bile ring yavaş hareket eder, çünkü iki veri noktası
        &ldquo;öğrenildi&rdquo; sinyaline terfi ettirilmez. İlerde,
        kötü bir gün de sayıyı yere sermez, çünkü örneklem onu
        yutacak kadar büyümüştür.
      </p>

      <BlogSkillRingRow
        skills={[
          { skill: "vocab", value: 20, momentum: "stable" },
          { skill: "grammar", value: 65, momentum: "up" },
          { skill: "writing", value: 44, momentum: "stable" },
          { skill: "reading", value: 31, momentum: "down" },
        ]}
      />

      <p>
        Bu, aralıklı tekrarın dürüst versiyonundaki &ldquo;mature
        card&rdquo; karşılığı. Bir kart data öyle derse olgundur. Bir
        deadline geçtiği için değil, ve kullanıcı Easy&rsquo;ye
        üst üste iki kere dokunduğu için değil.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="arrow">İki yönlü ok</h2>

      <p>
        Ring sadece yukarı çıkar. Bu bir tasarım kararı: workout
        bitirmek efordur ve efor, cevaplar yanlış olsa bile,
        pozitiftir. Ama ring tek başına nereye gittiğini sana
        söyleyemez, ki bir öğrencinin gerçekten ihtiyacı olan tam
        da bu.
      </p>

      <p>
        Bu yüzden her ring&rsquo;in yanında küçük bir ok durur:
        yukarı, stabil veya aşağı. Ok, o skill&rsquo;deki son üç
        cevabını geçmiş ortalamanla karşılaştırır. On puan daha
        iyiyse yukarı. On puan daha kötüyse aşağı. Aradaki her şey
        stabil, ve &ldquo;stabil&rdquo; omuz silkmek değil (bütün
        mekanik <Link href="/tr/blog/skill-nedir">burada</Link>
        yazılı).
      </p>

      <p>
        O ok, SM-2&rsquo;nin sana veremediği şey. SM-2 &ldquo;bir
        sonraki review&rsquo;ın dört gün sonra&rdquo; diyebilir.
        &ldquo;Son cevapların eskiden olduğundan daha
        sallantılı&rdquo; diyemez. Biz diyebiliriz.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="payoff">Bütün döngü</h2>

      <p>
        Döngü, sırasıyla. Uygulamayı açarsın, günlük plan dört
        chip&rsquo;ten birini senin için seçer, genelde oku yanlış
        yöne bakanı. Egzersizleri yaparsın. Uygulama her cevabı
        ölçer. Confidence weighting ring&rsquo;in ne kadar hareket
        edeceğine karar verir. Ring&rsquo;in yanındaki ok son
        data&rsquo;nın hangi yöne gittiğini söyler. Kendini
        değerlendir yok. Ease factor yok. Opak aralık hesabı yok.
      </p>

      <p>
        Aralıklı tekrar hep iyi bir fikirdi. Sadece kullanıcının
        kendi kağıdını not vermeyi bırakması gerekti.
      </p>

      <BlogCTA source="spaced_repetition_blog" />
    </BlogLayout>
  );
}
