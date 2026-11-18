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
    "Her workout dört skill'inin üçünü birden besler, birini değil. Ring hep yükselir, ama yanındaki ok sana yönünün gerçeğini söyler. İşte nasıl çalışıyor.",
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
      "GenauApp'in skill ring'leri ağ gibi nasıl büyür, dürüst ok nasıl hareket eder, ve neden sadece ileri sayan bir skora güvenemezsin.",
    type: "article",
  },
};

const TOC = [
  { id: "skills", label: "Takip ettiğimiz skill'ler" },
  { id: "grows", label: "Bir skill nasıl büyür (ağ gibi)" },
  { id: "shrinks", label: "Bir skill nasıl aşağı iner (ok iner)" },
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
      <p className="byline">Mert · Kasım 2026 · 6 dk okuma</p>

      <p>
        Çoğu uygulama sadece ileri sayar. XP birikir, streak sayılır, hearts
        bir süre bekleyince tekrar dolar. Bir yıl sonra tekrar açsan, o sayı
        hâlâ orada, hâlâ öncekinden büyük.
      </p>

      <p>
        GenauApp öyle çalışmıyor. Son Grammar cevapların geçmiş ortalamandan
        kötüyse, ring&rsquo;in yanındaki küçük ok yukarıdan aşağı döner. Duyguları
        incitmemek için &ldquo;stabil&rdquo; omuz silkmeleri yok. Doğruluk
        düştüyse, ok bunu söyler.
      </p>

      <p>Bu rahatsız edici. Ve bütün mesele tam da bu.</p>

      <p>
        Aşağıda uygulamanın tam olarak neyi takip ettiğini, her ring&rsquo;in
        nasıl hareket ettiğini, her workout&rsquo;un neden bir skill&rsquo;i değil üç
        skill&rsquo;i birden beslediğini, ve elimizde yeterli veri olmadığında ne
        yaptığımızı anlatıyoruz.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="skills">Takip ettiğimiz skill&rsquo;ler</h2>

      <p>
        Her öğrenen küçük bir ring kümesi taşır: şu anki web demosunda
        Vocabulary, Grammar, Writing, ve Reading. Listening, dürüstçe
        ölçtüğümüze güvendiğimizde onlara katılacak; ondan sonraki ring
        olacak Speaking ise gerçek konuşma tanıma gelene kadar kilitli
        kalacak. Kilitli olanları yazının sonunda anlatacağız.
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

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="grows">Bir skill nasıl büyür (ağ gibi)</h2>

      <p>
        İnsanlar uygulamayı ilk açtığında burada yanlış tahmin yapıyor,
        çünkü bire bir eşleme bekliyorlar. Bitirdiğin her workout dört
        skill&rsquo;inin <strong>üçünü birden</strong> besler, birini değil.
        Eşleme şöyle:
      </p>

      <ul>
        <li>
          <strong>Words</strong>: primary Vocabulary&rsquo;yi, yanında
          Grammar ve Writing&rsquo;i de besler.
        </li>
        <li>
          <strong>Grammar</strong>: primary Grammar&rsquo;ı, yanında Writing
          ve Vocabulary&rsquo;yi de besler.
        </li>
        <li>
          <strong>Sentence</strong>: primary Writing&rsquo;i, yanında Grammar
          ve Vocabulary&rsquo;yi de besler.
        </li>
        <li>
          <strong>Reading</strong>: primary Reading&rsquo;i, yanında
          Vocabulary ve Grammar&rsquo;ı da besler.
        </li>
      </ul>

      <p>
        İki şey dikkat çekici. Birincisi, her workout <strong>bir
        skill&rsquo;i kasıtlı atlar</strong>. Words, Grammar ve Sentence
        workout&rsquo;ları Reading ring&rsquo;ine hiç dokunmaz. Reading&rsquo;i sadece
        Reading chip&rsquo;inin kendisi besler. Bu uygulamada reading
        anlama yeteneğinin kendi path&rsquo;i var: ne kadar artikel seçersen
        seç, ne kadar cümle kurarsan kur, Alman gazetesini okumaya hazır
        olmazsın. Gerçekten Alman gazetesi okuyarak hazır olursun.
      </p>

      <p>
        İkincisi, workout&rsquo;un primary skill&rsquo;i daha büyük payoff alır
        (ne kadar iyi gittiğine göre session başına ring doluluğunun
        %15&rsquo;i ile %25&rsquo;i arasında), beslenen iki skill ise daha küçük
        payoff alır (%5 ile %10). Yani bir Grammar workout&rsquo;unu iyi
        bitirince Grammar sertçe ileri giderken, Writing ve Vocabulary
        de yanında sürüklenir. Öğrenme izole değil, ağ şeklinde.
      </p>

      <p>
        Tek bir doğru cevap yine de işi bitirmez. Ring doluluğu
        <strong>güven ağırlıklı</strong>: ilk denemeler bar&rsquo;ı pek
        hareket ettirmez çünkü henüz güvenecek yeterli veri yok. Bir
        skill&rsquo;de on veya daha fazla deneme sonrası bar gerçek
        doğruluğa oturur. Başta iyi gitsen bile ring yavaş hareket eder.
        İleride ise tek kötü bir gün sayıyı çökertmez. Sinyali her iki
        yönde de hak etmiş oluyorsun.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="shrinks">Bir skill nasıl aşağı iner (ok iner)</h2>

      <p>
        Ring&rsquo;in kendisi geri gitmez. Kötü bir session&rsquo;ı negatif
        progress ile cezalandırmıyoruz çünkü çaba çabadır, ve bir
        workout&rsquo;u bitirmek cevaplar yanlış olsa bile çaba sayılır.
        Ring sadece tırmanır.
      </p>

      <p>
        Ama her skill&rsquo;in yanında küçük bir ok duruyor: yukarı,
        stabil, veya <strong>aşağı</strong>. İşte o ok dürüst yön
        sinyali, ve ters yöne gidiyor.
      </p>

      <p>
        Ok, o skill&rsquo;deki <strong>son üç cevabını</strong> <strong>geçmiş
        ortalamanla</strong> karşılaştırır. Son dönem geçmişinden 10 puan
        veya daha fazla iyiyse, ok yukarı. 10 puan veya daha fazla
        kötüyse, ok aşağı. Arada ise stabil. Gerçek düşüşü yumuşatmak için
        kullanılan &ldquo;stabil&rdquo; omuz silkmesi yok.
      </p>

      <p>
        Bu ayrımın neden önemli olduğu şu: ring sana &ldquo;şu ana kadar
        ne kadar Almanca inşa ettin&rdquo; der. Ok ise sana &ldquo;şu an
        hangi yöne gidiyorsun&rdquo; der. Grammar ring&rsquo;in %70&rsquo;te
        olup yanında aşağı ok görebilirsin, bu şu demek: temelin
        gerçek, ama son cevapların eskiye göre daha sarsak. Bu değerli
        bir bilgi. Yarınki workout&rsquo;unun nereye gitmesi gerektiğini
        söyler.
      </p>

      <p>
        Aşağı ok, sadece ileri sayan uygulamaların sana gösteremediği
        şey, çünkü göstermek için sayılarının asıl önemli olan yönde
        hiçbir şey ifade etmediğini kabul etmek zorundalar. Sadece
        yukarı saymayı bilen bir skor, skor olmaktan çıkar, dekorasyona
        dönüşür.
      </p>

      <p className="section-divider">
        <span>§</span>
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

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="speaking">Speaking neden kilitli (ve Listening geliyor)</h2>

      <p>
        Şu anki web demosunda iki ring eksik: Listening ve Speaking. Farklı
        sebeplerle eksikler, ama ikisi de aynı kurala dayanıyor.
      </p>

      <p>
        <strong>Listening</strong> roadmap&rsquo;te. İçerik ve ses
        pipeline&rsquo;ı işi web demosunda değil, native iOS uygulamasında
        yaşıyor, o yüzden tarayıcıda henüz Listening ring&rsquo;ini görmüyorsun.
        Ring geldiğinde, diğerleriyle aynı şekilde beslenecek: büyütmek
        için tasarlanmış aktivitelerden, aynı güven ağırlıklandırmasıyla,
        aynı dürüst okla.
      </p>

      <p>
        <strong>Speaking</strong> her iki tarafta da kilitli. Konuşma
        tanıma, bir öğrenenin aksanına karşı çalışmak zorunda, ve bu zor.
        İyi yapması henüz üzerinde çalışmadığımız model işi gerektiriyor.
        Konuşmanı dürüstçe ölçebilene kadar, ona bir sayı koymayız.
      </p>

      <p>
        Çoğu uygulama, hiçbir veriye dayanmayan bir konuşma skoru severek
        verir. Biz, savunamayacağımız bir skor vermektense ring&rsquo;i boş
        bırakmayı tercih ederiz. Konuşma tanıma geldiğinde, ring açılır,
        ve senin sesinin verdiği veriden başlar, bizim uydurduğumuz bir
        tohumdan değil.
      </p>

      <p className="section-divider">
        <span>§</span>
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
