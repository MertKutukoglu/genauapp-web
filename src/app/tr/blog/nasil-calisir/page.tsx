import type { Metadata } from "next";
import Link from "next/link";
import { BlogLayout } from "@/components/templates/BlogLayout/BlogLayout";
import { BlogCTA } from "@/components/molecules/BlogCTA/BlogCTA";
import {
  BlogChipRow,
  BlogWordCard,
  BlogRoleStrip,
  BlogSentenceBuilder,
  BlogReadingExcerpt,
  BlogSkillRingRow,
} from "@/components/molecules/BlogAppSnippets/BlogAppSnippets";

/**
 * /tr/blog/nasil-calisir, "GenauApp nasıl çalışır" post.
 *
 * TR mirror of /blog/how-it-works. Section anchor ids are kept in
 * English across locales (words / grammar / sentence / reading /
 * payoff) so cross-language deep links still land on the matching
 * section. Headings and body are localized to Mert's Turkish voice.
 */
export const metadata: Metadata = {
  title: "GenauApp nasıl çalışır, 4 chip",
  description:
    "Her session dört chip'ten kuruludur: Words, Grammar, Sentence, Reading. Her chip ne yapar, nasıl öğretir, ve bu dördü nasıl bir arada bir workout'a dönüşür, hepsi burada.",
  alternates: {
    canonical: "/tr/blog/nasil-calisir",
    languages: {
      en: "/blog/how-it-works",
      tr: "/tr/blog/nasil-calisir",
      "x-default": "/blog/how-it-works",
    },
  },
  openGraph: {
    title: "GenauApp nasıl çalışır, 4 chip",
    description:
      "Words, Grammar, Sentence, Reading. Session başına tek chip, beslenen üç skill, ve her cevabın yanında bir kural.",
    type: "article",
  },
};

const TOC = [
  { id: "words", label: "Words" },
  { id: "grammar", label: "Grammar" },
  { id: "sentence", label: "Sentence" },
  { id: "reading", label: "Reading" },
  { id: "payoff", label: "Nasıl bir araya geliyor" },
];

export default function NasilCalisirPage() {
  return (
    <BlogLayout slug="nasil-calisir" toc={TOC}>
      <h1 className="title">GenauApp nasıl çalışır, 4 chip</h1>
      <p className="byline">Mert tarafından · Kasım 2026 · 4 dk okuma</p>

      <p>
        Her GenauApp session&rsquo;ı dört chip&rsquo;ten kuruludur: Words,
        Grammar, Sentence, ve Reading. Chip picker&rsquo;dan bir tanesini
        seçersin, workout&rsquo;u bitirirsin, skill ring&rsquo;lerin hareket
        eder, ve günlük plan seni bir sonrakine yönlendirir.
      </p>

      <p>İşte her chip ne yapar ve nasıl öğretir.</p>

      <BlogChipRow
        captions={{
          words: "İsim ve fiil",
          grammar: "Kural iş başında",
          sentence: "Şekli kur",
          reading: "Gerçek metin",
        }}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="words">Words</h2>

      <p>
        Workout başına yirmi kart. Yarısı artikel seçici (süssüz bir
        ismin altında der, die, das butonları); beşi yazma egzersizi
        (fiili veya kelimeyi tam olarak üret); beşi çeviri çoktan seçmeli.
      </p>

      <p>
        Her Word Card ismi kendi cins renginde taşır (der mavi, die
        kırmızı, das yeşil), artikeli yanında, Türkçe çeviriyi, ve
        mümkün olduğu her durumda bir kural parçası: <strong>-ung →
        die</strong>, <strong>Ge- → das</strong>, <strong>-nis →
        das</strong>. Kural bir dipnot değil. Kural bütün mesele.
        Bir kelime listesi ezberlemiyorsun, bu kelimenin neden die
        aldığını ve sonraki beş benzerinin de neden die alacağını
        açıklayan kalıbı öğreniyorsun.
      </p>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3">
        <BlogWordCard
          article="die"
          noun="Erfahrung"
          translation="tecrübe, deneyim"
          rule="-ung → die"
        />
        <BlogWordCard
          article="das"
          noun="Geschenk"
          translation="hediye"
          rule="Ge- → das"
        />
        <BlogWordCard
          article="das"
          noun="Ergebnis"
          translation="sonuç"
          rule="-nis → das"
        />
      </div>

      <p>
        Bir Words workout&rsquo;u önce Vocabulary&rsquo;yi besler, sonra
        Grammar ve Writing&rsquo;i onunla birlikte sürükler.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="grammar">Grammar</h2>

      <p>
        Workout başına 24 ile 40 arası item (B1 40&rsquo;a oturur ve üç
        parçaya bölünür, böylece bir oturuşta bitirmesen de olur).
        Her workout anchor kartlarıyla açılır: kart başına tek konu,
        kalıbı gösteren rol renkli bir formül şeridi (özne mavi, fiil
        kiraz kırmızısı, nesne yeşil) ve iki örnek cümle.
      </p>

      <p>
        İkinci örnek her zaman karşıtlığı taşır, varyantı değil.
        Hauptsatz vs Nebensatz. dass ile dass&rsquo;sız. wenn ile
        wenn&rsquo;siz. Mikro interleaving kuralın asıl oturduğu yer, bu
        yüzden Learn kartının içine gömdük.
      </p>

      <p>
        Anchor&rsquo;lardan sonra drill&rsquo;ler gelir: çoktan seçmeli ve
        boşluk doldurma. Her drill, doğru cevaplasan da yanlış
        cevaplasan da, cevabın yanında tek satırlık kural gösterir.
        Sadece yanlış cevaptan sonra beliren bir kural, başarısızlıkla
        özdeşleşmeyi öğreten bir kuraldır. Her seferinde beliren bir
        kural refleks olmaya başlar.
      </p>

      <BlogRoleStrip
        pieces={[
          { text: "Der Hund", role: "subject" },
          { text: "sieht", role: "verb" },
          { text: "den Mann", role: "object" },
        ]}
        translation="Köpek adamı görüyor. Özne mavi, fiil kiraz, nesne yeşil."
      />

      <p>
        Bir Grammar workout&rsquo;u önce Grammar&rsquo;ı besler, sonra
        Writing ve Vocabulary&rsquo;yi.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="sentence">Sentence</h2>

      <p>
        Words sana Almancanın ne olduğunu, Grammar hangi formun doğru
        olduğunu öğretirken, Sentence bir Almanca cümlenin gerçekte
        nasıl kurulduğunu öğretir.
      </p>

      <p>
        Learn kartı rol renkli bir formül şeridi: özne mavi, fiil
        kiraz, Mittelfeld nötr, cümle sonu fiil yine kiraz, böylece
        yan yana duran iki kiraz pill cümlenin iki ucunda Verbklammer
        şeklini adını hiç anmadan sana gösterir. Sonra iki örnek cümle,
        her biri aynı renkli parçalara bölünmüş. İkinci örnek tuzağı
        gösterir: wenn düşürme, fiil başta devrik dizilim, çift mastar.
      </p>

      <p>
        Exercise modu Sentence Builder. Kelime chip&rsquo;leri rastgele
        sırada gelir; doğru sıraya dokunarak diziyorsun. Havuzdaki
        chip&rsquo;ler kasıtlı olarak renksiz. Renk sadece doğru yere
        oturduklarında belirir, çünkü renk cevabı ele vermemeli.
        Rengi doğru sıralamayı kurarak kazanırsın.
      </p>

      <BlogRoleStrip
        pieces={[
          { text: "Ich", role: "subject" },
          { text: "will", role: "verb" },
          { text: "heute Abend ins Kino", role: "middle" },
          { text: "gehen", role: "verb2" },
        ]}
        translation="Cümlenin iki ucunda duran iki kiraz pill. Verbklammer, görsel haliyle."
      />

      <BlogSentenceBuilder
        pool={["gehen", "Ich", "heute Abend", "ins Kino", "will"]}
        placed={[
          { text: "Ich", role: "subject" },
          { text: "will", role: "verb" },
          { text: "heute Abend ins Kino", role: "middle" },
          { text: "gehen", role: "verb2" },
        ]}
      />

      <p>
        Bir Sentence workout&rsquo;u önce Writing&rsquo;i besler, sonra
        Grammar ve Vocabulary&rsquo;yi.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="reading">Reading</h2>

      <p>
        Workout başına bir metin artı çoktan seçmeli sorular. Metin
        uzunluğu seviyeyle büyür: A1 yaklaşık 120 kelime, B2 yaklaşık
        420 kelimelik haber tarzı metin.
      </p>

      <p>
        Bazı kelimelerin altı çizili. Birine dokunursun ve ekranın
        altından bir çeviri chip&rsquo;i kayarak gelir, kelime başına ses
        ile. Ayrılabilir fiiller her iki parçayı aynı anda
        vurgular (<strong>ab</strong>...<strong>holen</strong>) ve chip
        tam mastarı gösterir, böylece cümlenin sonunda tek başına
        duran bir &ldquo;ab&rdquo;a bakıp ne yaptığını düşünmek zorunda
        kalmazsın.
      </p>

      <p>
        Üst seviyedeki sorular dikkatli bir karışım: üç Ana Fikir, iki
        Detay, iki Kelime, üç Çıkarım, iki Sıralama. Seni test etmek
        için değil, sadece detay sorularına dayanan bir anlama sinyali
        zayıf bir sinyal olduğu için. Çıkarım ve sıralama gerçek
        okumanın yaşandığı yer.
      </p>

      <BlogReadingExcerpt
        passage="Am Montag holt sie ihre Tochter vom Kindergarten ab und bringt sie zum Arzt."
        tappable="holt"
        infinitive="abholen"
        translation="almak, teslim almak (ayrılabilir)"
      />

      <p>
        Bir Reading workout&rsquo;u Reading&rsquo;i besler. Başka hiçbir
        chip beslemez. Reading anlama yeteneği bu uygulamada kendi
        path&rsquo;inde durur, ve ne kadar artikel seçersen seç, ne kadar
        cümle kurarsan kur, Alman gazetesini okumaya hazır olmazsın.
        Gerçekten Alman gazetesi okuyarak hazır olursun.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="payoff">Nasıl bir araya geliyor</h2>

      <p>
        Her workout dört skill ring&rsquo;inden üçünü birden besler
        (<Link href="/tr/blog/skill-nedir">ağın nasıl çalıştığını</Link>
        daha ayrıntılı yazdık; kısa versiyonu: Words Vocab, Grammar ve
        Writing&rsquo;i; Grammar Grammar, Writing ve Vocab&rsquo;ı; Sentence
        Writing, Grammar ve Vocab&rsquo;ı; Reading Reading, Vocab ve
        Grammar&rsquo;ı besler).
      </p>

      <BlogSkillRingRow
        skills={[
          { skill: "vocab", value: 72, momentum: "up" },
          { skill: "grammar", value: 58, momentum: "up" },
          { skill: "writing", value: 44, momentum: "stable" },
          { skill: "reading", value: 31, momentum: "down" },
        ]}
      />

      <p>
        Günlük plan senin için dört chip&rsquo;ten birini en çok ihtiyacın
        olana göre seçer. Workout&rsquo;u bitirirsin, ring&rsquo;lerin hareket
        eder, ve bir ring&rsquo;in yanında aşağı ok varsa, plan yarınki
        workout&rsquo;un nereye gitmesi gerektiğini bilir.
      </p>

      <p>
        Dört chip, bir dil, dolgu yok. İş başında görmek istersen,
        demo&rsquo;yu aç ve her birinden birer tane çalış. Dört workout
        sonunda bütün sistemin şekli masaya yatmış olur.
      </p>

      <BlogCTA source="how_it_works_blog" />
    </BlogLayout>
  );
}
