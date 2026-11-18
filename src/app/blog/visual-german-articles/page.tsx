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
  { id: "die", label: "die (feminine)" },
  { id: "der", label: "der (masculine)" },
  { id: "das", label: "das (neuter)" },
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

      <h2 id="die">die (feminine), the signals</h2>

      <p>
        Most feminine nouns announce themselves through their ending.
        Five suffixes do most of the work; if a noun ends in one of
        these, you can almost always reach for <strong>die</strong>
        without checking.
      </p>

      <BlogFormulaPill
        left="-ung · -keit · -heit · -schaft · -ion"
        right="die"
        rightColor="die"
      />

      <p>
        <strong>-ung</strong> for abstract nouns from verbs,
        <strong> -keit</strong> and <strong>-heit</strong> for abstract
        nouns from adjectives, <strong>-schaft</strong> for groupings
        and relationships, and <strong>-ion</strong> for Latin-origin
        loanwords. <strong>-ik</strong> and <strong>-tät</strong>
        belong to the same family (die Musik, die Universität).
      </p>

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
            noun: "Möglichkeit",
            translation: "the possibility",
            rule: "-keit → die",
          },
          {
            article: "die",
            noun: "Freiheit",
            translation: "the freedom",
            rule: "-heit → die",
          },
          {
            article: "die",
            noun: "Freundschaft",
            translation: "the friendship",
            rule: "-schaft → die",
          },
          {
            article: "die",
            noun: "Information",
            translation: "the information",
            rule: "-ion → die",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="der">der (masculine), the signals</h2>

      <p>
        Masculine nouns don&rsquo;t have a single suffix family the way
        feminine ones do, but they do carry recognizable signals. The
        agent suffix <strong>-er</strong> on a profession, the suffix
        <strong> -ling</strong>, the ending <strong>-ismus</strong>
        on an ideology, plus the whole calendar: days of the week,
        months, and seasons are all masculine.
      </p>

      <BlogFormulaPill
        left="-er · -ling · -ismus · days, months, seasons"
        right="der"
        rightColor="der"
      />

      <BlogWordGallery
        words={[
          {
            article: "der",
            noun: "Lehrer",
            translation: "the teacher",
            rule: "-er → der (agent)",
          },
          {
            article: "der",
            noun: "Lehrling",
            translation: "the apprentice",
            rule: "-ling → der",
          },
          {
            article: "der",
            noun: "Kapitalismus",
            translation: "the capitalism",
            rule: "-ismus → der",
          },
          {
            article: "der",
            noun: "Montag",
            translation: "the Monday",
            rule: "weekday → der",
          },
          {
            article: "der",
            noun: "Januar",
            translation: "the January",
            rule: "month → der",
          },
          {
            article: "der",
            noun: "Winter",
            translation: "the winter",
            rule: "season → der",
          },
        ]}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="das">das (neuter), the signals</h2>

      <p>
        Neuter signals cluster around the prefix <strong>Ge-</strong>
        for collective nouns, the suffixes <strong>-nis</strong> for
        results and states, <strong>-ment</strong> for Latin-origin
        loanwords, and the two diminutive endings <strong>-chen</strong>
        and <strong>-lein</strong>, which always take das regardless of
        the original word&rsquo;s gender.
      </p>

      <BlogFormulaPill
        left="Ge- · -nis · -ment · -chen · -lein"
        right="das"
        rightColor="das"
      />

      <p>
        A handful of <strong>-nis</strong> nouns are feminine
        (die Erlaubnis, die Kenntnis), which we flag inline when they
        come up. The default is green.
      </p>

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
            noun: "Geschenk",
            translation: "the gift",
            rule: "Ge- → das",
          },
          {
            article: "das",
            noun: "Ergebnis",
            translation: "the result",
            rule: "-nis → das",
          },
          {
            article: "das",
            noun: "Dokument",
            translation: "the document",
            rule: "-ment → das",
          },
          {
            article: "das",
            noun: "Mädchen",
            translation: "the girl",
            rule: "-chen → das (diminutive)",
          },
          {
            article: "das",
            noun: "Büchlein",
            translation: "the little book",
            rule: "-lein → das (diminutive)",
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
        buttons. Then the rule shows up, whether you got it right or
        wrong.
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="the decision"
          correctArticle="die"
          className="max-w-[380px] w-full"
        />
      </div>

      <p>
        Pick <strong>die</strong>, and the picker locks on the correct
        answer:
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="the decision"
          correctArticle="die"
          answered="die"
          className="max-w-[380px] w-full"
        />
      </div>

      <p>
        Pick the wrong one, and two things happen at once. The pill you
        tapped goes solid in the error colour, the correct article drops
        in alongside the noun in its own gender colour so you see what
        the right answer was, and the rule banner slides in under the
        pills with the pattern that explains it. The mistake becomes a
        lesson in the same two seconds it took to make it.
      </p>

      <div className="flex justify-center my-5">
        <BlogArticlePicker
          noun="Entscheidung"
          translation="the decision"
          correctArticle="die"
          wrongPick="das"
          rule="Nouns ending in -ung are feminine. die Entscheidung, die Lösung, die Meinung."
          className="max-w-[380px] w-full"
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
        if you want the deeper mechanic). Twenty cards per workout, the
        rule next to every answer, and the article question starts to
        answer itself.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <p>
        If you want to try this in the demo, open the Words chip at A1
        or A2 level. Most of the cards carry a pattern you can spot by
        the ending or the prefix. After a workout, the rules start to
        feel less like rules and more like how German actually works.
      </p>

      <BlogCTA source="visual_articles_blog" />
    </BlogLayout>
  );
}
