import type { Metadata } from "next";
import { BlogLayout } from "@/components/templates/BlogLayout/BlogLayout";
import { BlogCTA } from "@/components/molecules/BlogCTA/BlogCTA";

/**
 * /tr/blog/kokenler — Origins of Genau, Turkish version.
 *
 * Localized (not translated) from `claude/GenauApp_Landing_Origins_Blog.md`
 * via the approved TR copy in `claude/GenauApp_Web_TR_Localization_Draft.md`
 * §5. Section markers (dots / cases / classroom / adaptive / why) keep
 * their EN anchor ids so cross-language deep links still work; the TOC
 * labels and all body prose are Turkish.
 *
 * German inline words (der / die / das, Akkusativ, Dativ, Genitiv,
 * sein, Perfekt, helfen, Bürgeramt) stay in German — that's the
 * subject matter, not translation surface — with the same article-
 * color spans the EN post uses.
 */

export const metadata: Metadata = {
  title: "Genau'nun kökenleri",
  description:
    "Kendi Almanca flashcard'larımı renkli yazdım, sonra etrafında bir uygulama kurdum. Almanya'da yaşamak için Almanca'ya ihtiyacı olan yetişkinler için.",
  alternates: {
    canonical: "/tr/blog/kokenler",
    languages: {
      en: "/blog/origins-of-genau",
      tr: "/tr/blog/kokenler",
      "x-default": "/blog/origins-of-genau",
    },
  },
  openGraph: {
    title: "Genau'nun kökenleri",
    description:
      "Kendi Almanca flashcard'larımı renkli yazdım, sonra etrafında bir uygulama kurdum.",
    type: "article",
    locale: "tr_TR",
  },
};

const TOC = [
  { id: "dots", label: "Noktaların sorunu" },
  { id: "cases", label: "Sonra cases" },
  { id: "classroom", label: "Sınıfın sınıra geldiği yer" },
  { id: "adaptive", label: "Adaptive dönüş" },
  { id: "why", label: "Neden Genau" },
];

export default function KokenlerPage() {
  return (
    <BlogLayout slug="kokenler" toc={TOC}>
      <h1 className="title">Genau&apos;nun kökenleri</h1>
      <p className="byline">Mert tarafından · Kasım 2026</p>

      <p>
        Eğer yetişkin olarak Almanca öğrenmeye çalıştıysan, bu hissi
        biliyorsundur. Kitabı açıyorsun, kelime sayfasına bakıyorsun ve aynı
        anda üç şey fark ediyorsun. Kelimelerin hepsi birbirine benziyor.
        Sana yardım etmesi gereken renkler iğne ucu kadar küçük. Ve kitabın
        dördüncü sayfasına geldiğinde zaten geride kalmışsın.
      </p>

      <p>Bu uygulama işte buradan başladı.</p>

      <p>
        Ben Mert&apos;im. Tasarımcıyım. Almanya&apos;ya eğlenmek için değil,
        hayat öyle istediği için taşındım. Yaşayabilecek kadar hızlı
        Almanca&apos;ya ihtiyacım vardı. Sekiz yıl sonra bir sınavı geçmek
        için değil, altı ay içinde. Bürgeramt&apos;a gidip memurun ne dediğini
        anlamak için. Kirayı okumak için. Komşuyla cümleyi önceden provasız
        konuşabilmek için.
      </p>

      <p>
        Bulduğum şey, hiçbir uygulamanın benim için yapılmadığıydı. Turistler
        için yapılmıştı. Gençler için. On yılı olanlar için. Acelesi olan
        yetişkin kendi başınaydı.
      </p>

      <p>
        Herkesin o durumda yaptığı şeyi yaptım. Uygulamaları topladım. Biri
        sadece fiil çekimleri için. Bir başkası sadece{" "}
        <em>der / die / das</em> için. Üçüncüsü vocabulary için ama o kadar
        gamified&apos;di ki birisi bana dil öğretmek yerine çiftlik
        kurdurtmak istiyor gibiydi. Dördüncüsü cümleler için. Düzgün bir
        Almanca gramer uygulaması bulmam haftalar aldı — çünkü kimse
        yapmıyor. Sonunda telefonumda beş uygulama açıktı, her birine ayda
        aşağı yukarı on avro ödüyordum, toplam elli avro — bir de yeni bir
        ülkeye taşınmanın diğer tüm masrafları üstüne. Yine de bir sekmeden
        diğerine atlayıp duruyordum, bir sonraki ihtiyacım olan şeyi
        hangisinin öğreteceğini çözmeye çalışıyordum.
      </p>

      <p>Flashcard&apos;lara o zaman başladım.</p>

      <h2 id="dots">Noktaların sorunu</h2>

      <p>
        Her Almanca kitap, isim cinslerini kelimenin yanındaki minik renkli
        bir noktayla kodlar. <span className="color-das">Das</span> için
        yeşil. <span className="color-der">Der</span> için mavi.{" "}
        <span className="color-die">Die</span> için kırmızı. Fikir güzel.
        Uygulaması değil. Noktalar bir noktalama işaretinden daha küçük. İlk
        üç bölümde fark bile etmedim. Fark ettiğim an bile, ihtiyacım
        olduğunda gözüm oraya gitmiyordu. Dekorasyondu, sinyal değildi.
      </p>

      <p>
        İroni şu: renkler, hafıza oyununun en eski numarası. Rengi metinden
        önce hatırlıyoruz. Bana kırmızı bir kelime ve yeşil bir kelime ver,
        kelimeleri unuttuktan ay sonra bile hangisinin hangisi olduğunu
        hatırlayayım. Kitabın fikri doğruydu. Sadece sonuna kadar
        gitmemişti.
      </p>

      <p>
        Ben sonuna kadar götürdüm. Kendi flashcard&apos;larımı yeniden
        yazdım. Her isim, cinsinin renginde.{" "}
        <span className="color-das">Das Fenster</span> yeşille.{" "}
        <span className="color-der">Der Tisch</span> maviyle.{" "}
        <span className="color-die">Die Tür</span> kırmızıyla. Sadece nokta
        değil. Kelimenin tamamı. Kelimenin tamamını kaçıramazsın.
      </p>

      <p>
        Bir hafta içinde cins hatalarım yarıya düştü. Daha zeki olduğum için
        değil. Renkler, beynimin gri metinde yapmayı reddettiği işi yaptığı
        için.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="cases">Sonra cases</h2>

      <p>
        Renk numarasına güvenmeye başlayınca daha ileri götürdüm. Almanca
        cases, çoğu öğreneni kıran şeydir.{" "}
        <span className="color-akk">Akkusativ</span>,{" "}
        <span className="color-dat">Dativ</span>,{" "}
        <span className="color-gen">Genitiv</span>. Her artikel için dört
        form, çoğulu sayarsan dört tane daha. Standart gramer tabloları gri
        bir duvar.
      </p>

      <p>
        Onlara da renk verdim.{" "}
        <span className="color-akk">Akkusativ</span> kırmızı.{" "}
        <span className="color-dat">Dativ</span> yeşil.{" "}
        <span className="color-gen">Genitiv</span> mor. Birdenbire çekim
        tabloları duvar olmaktan çıktı. Örüntü oldu. Ve bir cümleyi
        okuduğumda, doğru artikel rengi kuralı hatırlamadan önce kafamda
        yanıp sönüyordu.
      </p>

      <p>
        Sonradan okudum ki yaklaşık dört öğrenme stili var. Görsel,
        kinestetik, işitsel, sözel. İnsanlar farklılarına yaslanıyor. Ben
        görsele sertçe yaslanıyorum. Başka biri elle yazmaya yaslanıyor.
        Başka biri sesli duymaya. İyi bir dil uygulaması, her kişinin
        kendine uyan şeridi seçmesine izin vermeliydi.
      </p>

      <p>
        Bu, uygulamanın ilk prensibi oldu. Profilden <em>der / die / das</em>{" "}
        renklerini değiştirebilirsin. Otomatik sesi açıp kapatabilirsin.
        Kural hatırlatıcılarını toggle edebilirsin. Dikkatini dağıtıyorsa
        örnek cümleleri gizleyebilirsin. Uygulama seni, beynin olduğu yerde
        karşılıyor — başka birinin kitabının olman gerektiğini düşündüğü
        yerde değil.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="classroom">Sınıfın sınıra geldiği yer</h2>

      <p>
        Bu bölüme geçmeden açık olmak istiyorum. Öğretmenlerime minnettarım.
        İki kişiden Almanca öğrendim, bir Türk erkeği ve bir Alman kadını,
        ikisi de sabırlı, ikisi de iyi. Bu bölümün konusu onlar değil.
        Herhangi bir öğretmen de değil.
      </p>

      <p>
        Öğretmenler insandır. Yoruluyorlar. Odada yirmi beş kişi daha var.
        Bir kişi, içerisindeki her öğrenen için o yükü taşıyamaz. İnsan
        öğretmen olmak böyle görünür. Konu, bir sınıfın şekli.
      </p>

      <p>
        Bir sınıf, bir öğretmen ve çok öğrencidir. Bu şeklin yapısal
        sınırları var. Öğretmen yazını düzelttiğinde, sonraki cümleye geçer.{" "}
        <em>Dem</em>, <em>den</em> değil der. Formatın nadiren yer bıraktığı
        şey, o satırın hemen arkasından geleni söylemektir:{" "}
        <em>çünkü helfen dativ alır</em>. Kuralın hatırlatılması, refleksi
        inşa eden şeydir. O olmadan tek cümleyi düzeltirsin, örüntüyü
        kaybedersin.
      </p>

      <p>
        Bu uygulama kuralı her zaman el altında tutar. Yanlış cevaba
        basıyorsun, kural geliyor. Doğru cevaba basıyorsun, az önce
        kullandığın örüntünün adı söyleniyor. Her dokunuş bir şeyi
        pekiştiriyor, sadece belirli kelimeyi değil.
      </p>

      <p>
        Bir sınıfın ölçekte yapamayacağı diğer şey, kişiselleştirme. Bir
        tamirci tamirci kelimelerine ihtiyaç duyar. Bir hemşire hemşire
        kelimelerine. Bir yazılım mühendisi işinin kelimelerine. Herhangi
        bir grup kursu ortalama hızında hareket eder, ve dili belirli bir
        hayatı için isteyen yetişkin öğreniciler B1 civarında bir tavana
        çarpar. Format alan kalmaz — öğretmenler önemsemediği için değil,
        bire-çok öğretim, acele etmekte olan belirli bir yetişkin için
        tasarlanmamıştı.
      </p>

      <p>
        Yazılım, bir grup formatının yapamayacağını yapabilir. Her öğreneni
        özellikle izleyebilir, boşluklarının gerçekten nerede olduğunu
        görebilir ve bir sonraki egzersizi o boşluklara yönlendirebilir.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="adaptive">Adaptive dönüş</h2>

      <p>
        Uygulama bu yöne gidiyor. Sadece statik bir gramer pack&apos;i yığını
        değil, neyi kaçırmaya devam ettiğini izleyen ve o boşluğa, hayatına
        uyan bir sahnede içerik çeken bir şey.
      </p>

      <p>
        İş hakkında konuşurken{" "}
        <span className="color-dat">Dativ</span> artikel&apos;leri düşürmeye
        devam edersen, uygulama fark eder ve sonraki on egzersiz ofiste{" "}
        <span className="color-dat">Dativ</span> artikel olur. Perfekt&apos;i{" "}
        <em>sein</em> ile kaçırmaya devam edersen, sonraki on hareket
        fiilleri geçmiş zamanda olur.
      </p>

      <p>
        Neyde kötü olduğunu bulmak zorunda değilsin. Uygulama biliyor. Kendi
        çalışma planını tasarlamak zorunda değilsin. Uygulama yazıyor, bir
        seferde bir oturum.
      </p>

      <p>
        Söz bu: seni on yılı olan birisi gibi değil, belirli bir hayatı
        yaşamaya çalışan belirli bir yetişkin gibi gören bir Almanca
        uygulaması.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="why">Neden Genau</h2>

      <p>
        <em>Genau</em> Almancada ilk öğrendiğin kelimelerden biri.
        &ldquo;Tam&rdquo; ya da &ldquo;doğru&rdquo; anlamına geliyor. Birisi
        seni doğru anladığında söylediğin şey. Almanlar seninle hemfikir
        olduklarında da söylüyor — ki bu çok oluyor. Biraz daha Alman gibi
        görünmek istiyorsan, fırsat buldukça <em>genau</em> demekten
        kötüsünü yapabilirsin.
      </p>

      <p>
        Kelimeyi sevdim çünkü dürüst. <em>Genau</em>, noktayı tutturmak
        demek. Yakın değil. Aşağı yukarı değil. Tam.
      </p>

      <p>
        Uygulama bunu denemeye çalışıyor. Öğrenmenin gerçekten ihtiyacı olan
        belirli noktayı tutmak. Fazlalık yok, damla damla veri yok, israf
        yok.
      </p>

      <p>
        Yetişkin olarak Almanca öğreniyorsan ve on yılı olanlar için
        yapılmış uygulamalardan bıktıysan, bu senin için.
      </p>

      <BlogCTA source="kokenler_blog" />
    </BlogLayout>
  );
}
