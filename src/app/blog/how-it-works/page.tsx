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
 * /blog/how-it-works, the "4 chips" overview post.
 *
 * Commodity overview that complements /blog/how-skills-work: the
 * Skills post explains the architecture (network, rings, honest
 * arrow), this one walks through the actual day-to-day experience,
 * one chip at a time. Cross-linked to the Skills post in the
 * payoff section so the two posts form an internal link graph.
 */
export const metadata: Metadata = {
  title: "How GenauApp works, the 4 chips",
  description:
    "Every session is built from four chips: Words, Grammar, Sentence, Reading. Here is what each chip does, how it teaches, and why they add up to a workout you can actually finish.",
  alternates: {
    canonical: "/blog/how-it-works",
    languages: {
      en: "/blog/how-it-works",
      tr: "/tr/blog/nasil-calisir",
      "x-default": "/blog/how-it-works",
    },
  },
  openGraph: {
    title: "How GenauApp works, the 4 chips",
    description:
      "Words, Grammar, Sentence, Reading. One chip per session, three skills fed, a single rule always in reach.",
    type: "article",
  },
};

const TOC = [
  { id: "words", label: "Words" },
  { id: "grammar", label: "Grammar" },
  { id: "sentence", label: "Sentence" },
  { id: "reading", label: "Reading" },
  { id: "payoff", label: "How they add up" },
];

export default function HowItWorksPage() {
  return (
    <BlogLayout slug="how-it-works" toc={TOC}>
      <h1 className="title">How GenauApp works, the 4 chips</h1>
      <p className="byline">By Mert · November 2026 · 4 min read</p>

      <p>
        Every GenauApp session is built from four chips: Words, Grammar,
        Sentence, and Reading. You pick one from the chip picker, you
        finish the workout, your skill rings move, and the daily plan
        nudges you toward the next one.
      </p>

      <p>Here is what each chip does and how it teaches.</p>

      <BlogChipRow
        captions={{
          words: "Nouns & verbs",
          grammar: "Rules in use",
          sentence: "Build the shape",
          reading: "Real passages",
        }}
      />

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="words">Words</h2>

      <p>
        Twenty cards per workout. Half of them are article pickers (der,
        die, das buttons under an undecorated noun); five are typing
        exercises (produce the verb or word in full); five are translation
        multiple choice.
      </p>

      <p>
        Every Word Card carries the noun in its gender color (der blue, die
        red, das green), the article next to it, the English translation,
        and whenever we can, a rule fragment: <strong>-ung → die</strong>,
        <strong> Ge- → das</strong>, <strong>-nis → das</strong>. The rule
        is not a footnote. It is the point. You are not memorizing a list
        of words, you are learning the pattern that explains why this word
        takes die and the next five like it will too.
      </p>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3">
        <BlogWordCard
          article="die"
          noun="Erfahrung"
          translation="experience"
          rule="-ung → die"
        />
        <BlogWordCard
          article="das"
          noun="Geschenk"
          translation="gift"
          rule="Ge- → das"
        />
        <BlogWordCard
          article="das"
          noun="Ergebnis"
          translation="result"
          rule="-nis → das"
        />
      </div>

      <p>
        A Words workout feeds Vocabulary first, then nudges Grammar and
        Writing along with it.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="grammar">Grammar</h2>

      <p>
        Between 24 and 40 items per workout (B1 lands at 40 and splits
        into three parts so you can bite it off in sittings). Each
        workout opens with anchor cards: one concept per card, with a
        role colored formula strip showing the pattern (subject blue,
        verb cherry, object green) and two example sentences.
      </p>

      <p>
        The second example always carries the contrast, never a variation.
        Hauptsatz vs Nebensatz. dass vs no dass. wenn vs wenn less. Micro
        interleaving is where the rule actually lands, so we build it into
        the Learn card itself.
      </p>

      <p>
        After the anchors come the drills: multiple choice and fill in the
        blank. Each drill shows a one line rule next to the answer regardless
        of whether you got it right. A rule that only shows up after a
        wrong answer is a rule you learn to associate with failure. A rule
        that shows up every time is a rule that becomes the reflex.
      </p>

      <BlogRoleStrip
        pieces={[
          { text: "Der Hund", role: "subject" },
          { text: "sieht", role: "verb" },
          { text: "den Mann", role: "object" },
        ]}
        translation="The dog sees the man. Subject blue, verb cherry, object green."
      />

      <p>
        A Grammar workout feeds Grammar first, then Writing and Vocabulary.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="sentence">Sentence</h2>

      <p>
        Where Words teaches you what German is, and Grammar teaches you
        which form is right, Sentence teaches you how a German sentence is
        actually built.
      </p>

      <p>
        The Learn card is a role colored formula strip: subject blue, verb
        cherry, Mittelfeld neutral, verb final cherry again, so the two
        cherry pills on either end of the clause show you the Verbklammer
        shape without naming it. Then two example sentences, each broken
        into those same colored chunks. The second example shows the
        twist: wenn drop, verb first inversion, double infinitive.
      </p>

      <p>
        Exercise mode is Sentence Builder. Word chips arrive in random
        order; you tap them into the correct sequence. The chips in the
        pool are uncolored on purpose. Color only appears once they are
        in the right place, because the color should not give the answer
        away. You earn the color by getting the order right.
      </p>

      <BlogRoleStrip
        pieces={[
          { text: "Ich", role: "subject" },
          { text: "will", role: "verb" },
          { text: "heute Abend ins Kino", role: "middle" },
          { text: "gehen", role: "verb2" },
        ]}
        translation="Two cherry pills at the ends of the clause, the Verbklammer in picture form."
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
        A Sentence workout feeds Writing first, then Grammar and
        Vocabulary.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="reading">Reading</h2>

      <p>
        One passage per workout plus multiple choice questions. Passage
        length grows with level: A1 lands around 120 words, B2 around 420
        words of news style prose.
      </p>

      <p>
        Some words are underlined. Tap one and a translation chip slides
        up from the bottom with per word audio. Separable verbs highlight
        both halves at once (<strong>ab</strong>...<strong>holen</strong>)
        and the chip shows the full infinitive, so you never stare at a
        lonely &ldquo;ab&rdquo; wondering what it is doing at the end of
        the sentence.
      </p>

      <p>
        Questions at the top level are a careful mix: three Main Idea,
        two Detail, two Vocabulary, three Inference, two Sequence. Not
        because we want to test you, but because a comprehension signal
        built only on detail questions is a weak signal. Inference and
        sequence are where real reading happens.
      </p>

      <BlogReadingExcerpt
        passage="Am Montag holt sie ihre Tochter vom Kindergarten ab und bringt sie zum Arzt."
        tappable="holt"
        infinitive="abholen"
        translation="to pick up (separable)"
      />

      <p>
        A Reading workout feeds Reading. No other chip does. Reading
        comprehension is its own path in this app, and no amount of
        article picking or sentence building will get you ready to read
        German news. You have to actually read German news.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="payoff">How they add up</h2>

      <p>
        Each workout feeds three of your four skill rings at once (we
        wrote up <Link href="/blog/how-skills-work">how the network
        works</Link> in more detail; the short version is: Words feeds
        Vocab, Grammar, and Writing; Grammar feeds Grammar, Writing, and
        Vocab; Sentence feeds Writing, Grammar, and Vocab; Reading feeds
        Reading, Vocab, and Grammar).
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
        The daily plan picks one of the four chips for you based on what
        you need most. You finish a workout, your rings move, and if a
        ring has a down arrow next to it, the plan knows that is where
        tomorrow&rsquo;s workout should go.
      </p>

      <p>
        Four chips, one language, no filler. If you want to see them in
        action, open the demo and work through one of each. By the end of
        four workouts, the shape of the whole system is on the table.
      </p>

      <BlogCTA source="how_it_works_blog" />
    </BlogLayout>
  );
}
