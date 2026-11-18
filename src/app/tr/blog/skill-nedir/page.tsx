import type { Metadata } from "next";
import { BlogLayout } from "@/components/templates/BlogLayout/BlogLayout";
import { BlogCTA } from "@/components/molecules/BlogCTA/BlogCTA";

/**
 * /tr/blog/skill-nedir, "GenauApp'te Skill Nedir" post.
 *
 * TR mirror of /blog/how-skills-work. Section anchor ids are kept
 * in English so cross-language deep links still work; headings
 * and body prose are localized (not word-for-word translated) to
 * Mert's Turkish voice.
 */
export const metadata: Metadata = {
  title: "GenauApp'te skill nedir? (Ve neden aşağı da iner)",
  description:
    "Çoğu dil uygulaması sadece ileri sayar. GenauApp'in skill ring'leri iki yönde de hareket eder. Her sayı nasıl büyür, nasıl küçülür, ve Speaking ring'i neden şimdilik kilitli, hepsi burada.",
  alternates: {
    canonical: "/tr/blog/skill-nedir",
    languages: {
      en: "/blog/how-skills-work",
      tr: "/tr/blog/skill-nedir",
      "x-default": "/blog/how-skills-work",
    },
  },
  openGraph: {
    title: "GenauApp'te skill nedir? (Ve neden aşağı da iner)",
    description:
      "GenauApp'in skill ring'leri nasıl büyür, nasıl küçülür ve Almancan hakkında sana gerçeği nasıl söyler.",
    type: "article",
  },
};

const TOC = [
  { id: "skills", label: "Takip ettiğimiz beş skill" },
  { id: "grows", label: "Bir skill nasıl büyür" },
  { id: "shrinks", label: "Bir skill nasıl küçülür" },
  { id: "data", label: "Yeterli veri olmadığında" },
  { id: "speaking", label: "Speaking neden kilitli" },
  { id: "payoff", label: "Bu sana ne kazandırır" },
];

export default function SkillNedirPage() {
  return (
    <BlogLayout slug="skill-nedir" toc={TOC}>
      <h1 className="title">
        GenauApp&rsquo;te skill nedir? (Ve neden aşağı da iner)
      </h1>
      <p className="byline">Mert · Kasım 2026</p>

      <p>
        Çoğu uygulama sadece ileri sayar. XP birikir, streak sayılır, hearts
        bir süre bekleyince tekrar dolar. Bir yıl sonra tekrar açsan, o sayı
        hâlâ orada, hâlâ öncekinden büyük.
      </p>

      <p>
        GenauApp öyle çalışmıyor. İki haftadır Grammar&rsquo;a dokunmadın mı,
        Grammar ring&rsquo;in bir basamak düşer. Son zamanlardaki Vocabulary
        cevapların önceki ortalamandan kötüyse, ring bunu yansıtır, sayının
        yanında küçük bir aşağı ok belirir.
      </p>

      <p>Bu rahatsız edici. Ve bütün mesele tam da bu.</p>

      <p>
        Aşağıda uygulamanın tam olarak neyi takip ettiğini, her sayının
        nasıl hareket ettiğini, ve elimizde yeterli veri olmadığında ne
        yaptığımızı anlatıyoruz.
      </p>

      <h2 id="skills">Takip ettiğimiz beş skill</h2>

      <p>
        Her öğrenen beş ring taşır: Vocabulary, Grammar, Writing, Reading,
        Listening. Altıncısı, Speaking, şimdilik kilitli; biraz sonra
        sebebini anlatacağız.
      </p>

      <p>
        Her ring sıfır ile yüz arası bir sayı, bir renk, bir şekil. Ring
        senin gördüğün şey; sayı ise o skill içinde yaptığın her şeyden
        hesapladığımız değer.
      </p>

      <p>
        Vocabulary Almanca kelimeleri tanıma ve üretme yeteneğini takip
        eder. Grammar artikel, hâl, fiil çekimi ve cümle yapısı konularındaki
        yeterliliği ölçer. Writing üretim tarafını kapsar: bir kelime
        yazmak, bir cümle kurmak, bir cevap üretmek. Reading gerçek Almanca
        metni nasıl yorumladığını, Listening ise konuşulan Almancayı nasıl
        çözdüğünü takip eder.
      </p>

      <p>
        Kurnazlık yok, gizli bir şey yok. Skill başına bir ring, ve skill
        isimleri tam olarak anlattıklarını ifade ediyor.
      </p>

      <h2 id="grows">Bir skill nasıl büyür</h2>

      <p>
        Bitirdiğin her workout belirli skill&rsquo;leri besler. Words workout&rsquo;u
        Vocabulary&rsquo;yi, Grammar workout&rsquo;u Grammar&rsquo;ı, Sentence workout&rsquo;u
        Writing&rsquo;i, Reading ise Reading&rsquo;i besler. Eşleme kasıtlı: az önce
        yaptığın aktivite, hareket etmesini bekleyeceğin ring&rsquo;i hareket
        ettirir.
      </p>

      <p>
        Ama tek bir doğru cevap işi bitirmez. Çoğu dil uygulaması, ilk
        dokunuşundan sonra ödüllendirici hissettirmek için progress bar&rsquo;ı
        anında yukarı tırmandırır. Biz tırmandırmayız. Bar <strong>güven
        ağırlıklı</strong>: bir skill&rsquo;de üç soru cevapladıysan, ring
        temkinli bir tahmin gösterir. Otuz soru cevapladıysan, ring gerçek
        doğruluğu gösterir. Ne kadar çok pratik yaptıysan, ring gördüğüne
        o kadar güvenir.
      </p>

      <p>
        Bunun anlamı şu: başta iyi gitse bile ring yavaş hareket eder.
        İleride ise tek kötü bir gün sayıyı çökertmez. Sinyali her iki
        yönde de hak etmiş oluyorsun.
      </p>

      <h2 id="shrinks">Bir skill nasıl küçülür</h2>

      <p>Çoğu uygulamanın atladığı kısım tam burası.</p>

      <p>
        İki haftadır Grammar&rsquo;a dokunmadın mı, Grammar ring&rsquo;i düşer. Sıfıra
        kadar değil, bir basamak, ama Grammar pratiğinin soğuduğunu dürüstçe
        söylemeye yetecek kadar. Geri döndüğünde son cevapların geçmiş
        ortalamandan kötüyse, ring bunu yansıtır, sayının yanında küçük bir
        aşağı ok belirir.
      </p>

      <p>
        Bunu kimse seni kötü hissettirmek için tasarlamıyor. Tam tersi. Hep
        yukarı giden bir sayı bir yalan: uzak kaldığını biliyorsun,
        Almancanın eskisi gibi olmadığını biliyorsun, ve uygulama sana hâlâ
        yüzde seksen beştesin demeye devam ediyorsa, uygulama suratına yalan
        söylüyor. Güvenebileceğin uygulama, gerçeğin rahatsız edici olduğu
        zamanlarda bile gerçeği söyleyendir.
      </p>

      <p>
        Aşağı ok aynı zamanda işe de yarar. Sıradaki workout&rsquo;unun nereye
        gitmesi gerektiğini söyler. Reading dengede duruyorsa ama
        Grammar&rsquo;ın yanında aşağı ok varsa, yarın ne açacağını düşünmene
        gerek yok.
      </p>

      <h2 id="data">Yeterli veri olmadığında</h2>

      <p>
        Bir skill&rsquo;de sadece bir veya iki soru cevapladıysan, biz sana bir
        sayı uydurmayız. Ring küçük bir <code>·</code> noktası gösterir, ve
        bu şu anlama gelir: &ldquo;Bu skill hakkında dürüst bir şey
        söyleyebilmek için daha fazla veriye ihtiyacımız var.&rdquo;
      </p>

      <p>
        Şanslı bir ilk cevap ustalık iddiasında bulunmamalı. İlk oturumda
        tek bir yanlış cevap seni zayıf diye nitelendirmemeli. Üç denemenin
        altında, dürüst olan şey sessiz kalmak. Biz de sessiz kalıyoruz.
      </p>

      <p>
        Bu düşündüğünden daha önemli. Düşün ki yarın Bürgeramt&rsquo;a gideceğine
        karar verdin, ve uygulama sana Grammar&rsquo;ının yüzde doksan ikide
        olduğunu söylüyor. İçeri güvenle girersin. Eğer o yüzde doksan iki,
        üç şanslı çoktan seçmeli cevaba dayanıyorsa, hazırlıksız girersin.
        Nokta bunu önler.
      </p>

      <h2 id="speaking">Speaking neden kilitli</h2>

      <p>
        Konuşma tanıma, bir öğrenenin aksanına karşı çalışmak zorunda, ve
        bu zor. İyi yapması, web demosunda değil, native uygulamada yaşayan
        ses pipeline&rsquo;ları ve model işi gerektiriyor. Konuşmanı dürüstçe
        ölçebilene kadar, ona bir sayı koymayız.
      </p>

      <p>
        Çoğu uygulama, hiçbir veriye dayanmayan bir konuşma skoru severek
        verir. Biz, savunamayacağımız bir skor vermektense ring&rsquo;i boş
        bırakmayı tercih ederiz. Konuşma tanıma geldiğinde, ring açılır,
        ve senin sesinin verdiği veriden başlar, bizim uydurduğumuz bir
        tohumdan değil.
      </p>

      <h2 id="payoff">Bu sana ne kazandırır</h2>

      <p>Sadece yukarı giden bir ring bilgi değil. Dekorasyon.</p>

      <p>
        İki yönde de hareket eden bir ring ise bir sinyal. Sana nerede
        güçlü olduğunu, nereden uzun süredir uzak kaldığını, bir sonraki
        workout&rsquo;unun nereye gitmesi gerektiğini söyler. Sayıya ne zaman
        güveneceğini, ne zaman güvenmeden önce daha çok pratik yapman
        gerektiğini söyler.
      </p>

      <p>
        Skill tracking&rsquo;in amacı bu: sana Almancan hakkında gerçeği
        söylemek, ki bir sonraki workout&rsquo;un gerçekten önemli olan workout
        olsun.
      </p>

      <p>
        Bunu uygulamada görmek istersen, web demosunu aç. İlk workout&rsquo;larında
        ring&rsquo;ler <code>·</code> nokta gösterecek, çünkü uygulama veri
        topluyor. Birkaç oturum ver, ring&rsquo;ler sana gerçek bir şey söylemeye
        başlayacak.
      </p>

      <BlogCTA source="skills_blog" />
    </BlogLayout>
  );
}
