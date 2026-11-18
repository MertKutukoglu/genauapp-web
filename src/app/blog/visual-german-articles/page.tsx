import type { Metadata } from "next";
import Link from "next/link";
import { BlogLayout } from "@/components/templates/BlogLayout/BlogLayout";
import { BlogCTA } from "@/components/molecules/BlogCTA/BlogCTA";
import {
  BlogArticlePicker,
  BlogFormulaPill,
  BlogWordCard,
  BlogWordGallery,
} from "@/components/molecules/BlogAppSnippets/BlogAppSnippets";

/**
 * /blog/visual-german-articles, the "color-coded articles" post.
 *
 * SEO primary target: "der die das learning", "how to memorize
 * german articles", "german article rules". Puts GenauApp's
 * article-colour convention at the centre and walks through the
 * five pattern rules that actually explain most of the die/der/das
 * assignments learners encounter.
 *
 * Inline UI mockups (BlogAppSnippets) render the app's visual DNA
 * directly in the article flow instead of screenshot PNGs, so the
 * blog stays in sync with the app and the images remain crisp
 * across viewports + themes.
 */
export const metadata: Metadata = {
  title: "Visual German articles, the color-coded method",
  description:
    "Memorizing der / die / das one word at a time is slow. German articles follow patterns you can see at a glance once the UI gives you a color for each gender. Here is how we teach them.",
  alternates: {
    canonical: "/blog/visual-german-articles",
    languages: {
      en: "/blog/visual-german-articles",
      tr: "/tr/blog/gorsel-almanca-artikel",
      "x-default": "/blog/visual-german-articles",
    },
  },
  openGraph: {
    title: "Visual German articles, the color-coded method",
    description:
      "German articles follow patterns you can see. der blue, die red, das green. Learn the five rules that explain most der / die / das assignments.",
    type: "article",
  },
};

const TOC = [
  { id: "problem", label: "Why lists don't work" },
  { id: "colors", label: "The three colors" },
  { id: "ung", label: "-ung → die" },
  { id: "keit-heit", label: "-keit, -heit → die" },
  { id: "ge", label: "Ge- → das" },
  { id: "nis", label: "-nis → das" },
  { id: "compound", label: "Compound nouns" },
  { id: "app", label: "How it looks in the app" },
];

export default function VisualGermanArticlesPage() {
  return (
    <BlogLayout slug="visual-german-articles" toc={TOC}>
      <h1 className="title">
        Visual German articles, the color-coded method
      </h1>
      <p className="byline">By Mert · November 2026 · 6 min read</p>

      <p>
        If you have ever tried to memorize German articles, you know how
        it usually goes. You open a vocabulary page. You see the noun. You
        see a tiny &ldquo;der,&rdquo; &ldquo;die,&rdquo; or &ldquo;das&rdquo;
        in front of it. You try to burn the pair into your head by
        repetition. By page three you have forgotten which one was which,
        and by page six the words are starting to blur.
      </p>

      <p>
        There is a better way, and it starts with giving each gender a
        color.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="problem">Why lists don&rsquo;t work</h2>

      <p>
        A noun and its article isn&rsquo;t two separate facts, it&rsquo;s
        one unit. But a flat list treats it like two: here is the noun,
        here is its article, memorize both. The learner&rsquo;s brain
        obliges and stores them separately. A week later the noun comes
        back but its article does not.
      </p>

      <p>
        The fix is to make the article a visual property of the noun,
        not a separate word in front of it. In GenauApp, every German
        noun carries its gender color:
      </p>

      <BlogWordGallery
        words={[
          { article: "der", noun: "Tisch", translation: "the table" },
          { article: "die", noun: "Lampe", translation: "the lamp" },
          { article: "das", noun: "Fenster", translation: "the window" },
        ]}
      />

      <p>
        Look at that trio a few times and the pattern starts to stick.
        Blue is masculine, red is feminine, green is neuter. The next
        German noun you see, your brain already asks the color question
        before it asks the article question.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="colors">The three colors</h2>

      <p>
        Three gender colors, and they never swap:
      </p>

      <ul>
        <li>
          <strong>der</strong> = blue (masculine)
        </li>
        <li>
          <strong>die</strong> = red (feminine)
        </li>
        <li>
          <strong>das</strong> = green (neuter)
        </li>
      </ul>

      <p>
        The colors carry across the whole app. They appear on article
        pickers, on sample sentences, on case tables, on the Reading
        chip&rsquo;s highlighted nouns. Once the association is made,
        it is reused everywhere you see German.
      </p>

      <p>
        That alone would be useful. But the real leverage is that
        German articles are not random. Four or five pattern rules
        explain most of what a learner encounters. Here they are.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="ung">-ung → die</h2>

      <p>
        Every German noun ending in <strong>-ung</strong> is feminine.
        No exceptions worth worrying about at A1 or A2 level. These are
        abstract nouns formed from verbs: &ldquo;entscheiden&rdquo; (to
        decide) becomes &ldquo;Entscheidung&rdquo; (decision), and that
        decision takes <strong>die</strong>.
      </p>

      <BlogFormulaPill left="-ung" right="die" rightColor="die" />

      <BlogWordGallery
        words={[
          {
            article: "die",
            noun: "Entscheidung",
            translation: "the decision",
            rule: "-ung → die",
          },
          {
            article: "die",
            noun: "Lösung",
            translation: "the solution",
            rule: "-ung → die",
          },
          {
            article: "die",
            noun: "Meinung",
            translation: "the opinion",
            rule: "-ung → die",
          },
          {
            article: "die",
            noun: "Erfahrung",
            translation: "the experience",
            rule: "-ung → die",
          },
        ]}
      />

      <p>
        Four red cards. Scroll back to them in a month and your brain
        will still know what to do with the next <strong>-ung</strong>
        noun it meets.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="keit-heit">-keit, -heit → die</h2>

      <p>
        Two more suffixes, same gender. <strong>-keit</strong> and
        <strong> -heit</strong> turn adjectives and adjective-like words
        into abstract nouns, and all of them take <strong>die</strong>.
      </p>

      <BlogFormulaPill left="-keit, -heit" right="die" rightColor="die" />

      <BlogWordGallery
        words={[
          {
            article: "die",
            noun: "Möglichkeit",
            translation: "the possibility",
            rule: "-keit → die",
          },
          {
            article: "die",
            noun: "Freundlichkeit",
            translation: "the friendliness",
            rule: "-keit → die",
          },
          {
            article: "die",
            noun: "Gesundheit",
            translation: "the health",
            rule: "-heit → die",
          },
          {
            article: "die",
            noun: "Freiheit",
            translation: "the freedom",
            rule: "-heit → die",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="ge">Ge- → das</h2>

      <p>
        Now the greens. The prefix <strong>Ge-</strong> often marks a
        collective noun, something that groups a bunch of things or
        actions together. Those are <strong>das</strong>.
      </p>

      <BlogFormulaPill left="Ge-" right="das" rightColor="das" />

      <BlogWordGallery
        words={[
          {
            article: "das",
            noun: "Gebäude",
            translation: "the building",
            rule: "Ge- → das",
          },
          {
            article: "das",
            noun: "Gepäck",
            translation: "the luggage",
            rule: "Ge- → das",
          },
          {
            article: "das",
            noun: "Geschäft",
            translation: "the shop",
            rule: "Ge- → das",
          },
          {
            article: "das",
            noun: "Geschenk",
            translation: "the gift",
            rule: "Ge- → das",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="nis">-nis → das</h2>

      <p>
        <strong>-nis</strong> nouns usually name a result or a state,
        and they are also <strong>das</strong>. A handful are feminine
        (die Erlaubnis, die Kenntnis), which we flag inline when they
        come up; the default is green.
      </p>

      <BlogFormulaPill left="-nis" right="das" rightColor="das" />

      <BlogWordGallery
        words={[
          {
            article: "das",
            noun: "Ergebnis",
            translation: "the result",
            rule: "-nis → das",
          },
          {
            article: "das",
            noun: "Verständnis",
            translation: "the understanding",
            rule: "-nis → das",
          },
          {
            article: "das",
            noun: "Geheimnis",
            translation: "the secret",
            rule: "-nis → das",
          },
          {
            article: "das",
            noun: "Bedürfnis",
            translation: "the need",
            rule: "-nis → das",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="compound">Compound nouns take the last part&rsquo;s gender</h2>

      <p>
        German loves to glue nouns together. <em>Haustür</em>,{" "}
        <em>Bahnhof</em>, <em>Küchentisch</em>. The gender of a compound
        is the gender of its <strong>last</strong> part, always.
      </p>

      <p>
        <em>die Tür</em> is feminine, so <em>die Haustür</em> (the front
        door) is feminine too. <em>der Hof</em> is masculine, so{" "}
        <em>der Bahnhof</em> (the station) is masculine. <em>der Tisch</em>{" "}
        is masculine, so <em>der Küchentisch</em> (the kitchen table) is
        masculine, even though <em>die Küche</em> is feminine.
      </p>

      <BlogWordGallery
        words={[
          {
            article: "die",
            noun: "Haustür",
            translation: "the front door",
            rule: "die Tür → die Haustür",
          },
          {
            article: "der",
            noun: "Bahnhof",
            translation: "the station",
            rule: "der Hof → der Bahnhof",
          },
          {
            article: "der",
            noun: "Küchentisch",
            translation: "the kitchen table",
            rule: "der Tisch → der Küchentisch",
          },
        ]}
      />

      <p>
        This rule alone unlocks hundreds of nouns. Every time you meet
        a compound, read it right-to-left to find its gender.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="app">How it looks in the app</h2>

      <p>
        When a Words workout gives you an article picker, the question
        has no article in front of the noun. You tap one of the three
        buttons. Then the rule shows up next to the answer, whether you
        got it right or wrong.
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="the decision"
          className="max-w-[360px] w-full"
        />
      </div>

      <p>
        Pick <strong>die</strong>, and the rule lands:
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="the decision"
          answered="die"
          className="max-w-[360px] w-full"
        />
      </div>

      <p>
        A dozen repetitions of this on <strong>-ung</strong> words and
        you stop second-guessing. The pattern is no longer a rule to
        recall, it&rsquo;s the first thing your eye checks. If the noun
        ends in -ung, the article is die. You know it the way you know
        a traffic light.
      </p>

      <p>
        Each Words workout feeds Vocabulary primarily and pulls Grammar
        and Writing along with it (we wrote up{" "}
        <Link href="/blog/how-skills-work">how the network works</Link>{" "}
        if you want the deeper mechanic). Twenty cards per workout, five
        patterns in rotation, and the article question starts to answer
        itself.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <p>
        If you want to try this in the demo, open the Words chip at A1
        or A2 level. Every third card will carry an <strong>-ung</strong>,
        a <strong>Ge-</strong>, or a <strong>-keit</strong>. After a
        workout the rule starts to feel less like a rule and more like
        how German actually works.
      </p>

      <BlogCTA source="visual_articles_blog" />
    </BlogLayout>
  );
}
