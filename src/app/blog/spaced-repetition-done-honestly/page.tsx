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
 * /blog/spaced-repetition-done-honestly, the SRS contrast post.
 *
 * Positions GenauApp against the classic SM-2 / Anki loop: the
 * user doesn't rate themselves, the app measures from real
 * exercise outcomes, confidence-weighting delays trust in small
 * samples, and the momentum arrow carries the two-way signal
 * classic SRS cannot. Cross-link: how-skills-work for the
 * network / arrow mechanics.
 *
 * SEO target: "spaced repetition german", "SRS language
 * learning". ~900 words, 5 min.
 */
export const metadata: Metadata = {
  title: "Spaced repetition done honestly",
  description:
    "Classic SRS asks you to grade your own paper. GenauApp measures instead: the answer you tap is the data, the arrow next to the ring is the direction, and the box is not opaque.",
  alternates: {
    canonical: "/blog/spaced-repetition-done-honestly",
    languages: {
      en: "/blog/spaced-repetition-done-honestly",
      tr: "/tr/blog/aralikli-tekrar",
      "x-default": "/blog/spaced-repetition-done-honestly",
    },
  },
  openGraph: {
    title: "Spaced repetition done honestly",
    description:
      "No self-rating. No opaque box. Measured accuracy, confidence weighted, with a two-way arrow telling you the truth about your direction.",
    type: "article",
  },
};

const TOC = [
  { id: "box", label: "The opaque box" },
  { id: "classic", label: "What classic SRS asks" },
  { id: "self", label: "Self-rating is the problem" },
  { id: "measure", label: "What we measure instead" },
  { id: "confidence", label: "Why one answer is a weak signal" },
  { id: "arrow", label: "The two-way arrow" },
  { id: "payoff", label: "The whole loop" },
];

export default function SpacedRepetitionPage() {
  return (
    <BlogLayout slug="spaced-repetition-done-honestly" toc={TOC}>
      <h1 className="title">Spaced repetition done honestly</h1>
      <p className="byline">By Mert · November 2026 · 5 min read</p>

      <p>
        Spaced repetition is a good idea with a bad interface. Every app
        that ships it hides what the box does, then asks you to help it
        decide when to show the card again by rating a thing you
        haven&rsquo;t earned yet. You tap &ldquo;Good,&rdquo; the box
        swallows the tap, and a week later a card shows up with no
        explanation of why today.
      </p>

      <p>
        We kept the idea and threw out the self-rating. Here is what we
        do instead, and why it holds up.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="classic">What classic SRS asks</h2>

      <p>
        SM-2 is the algorithm under Anki, SuperMemo, and most of the
        descendants. It schedules the next review of a card by
        multiplying the current interval by an ease factor, and that
        ease factor moves up or down based on a rating the user picks
        after each card.
      </p>

      <BlogSrsSelfRateCard
        prompt="die Erfahrung"
        answer="experience (feminine, -ung)"
      />

      <p>
        The user sees the prompt, reveals the answer, then picks Again,
        Hard, Good, or Easy. That pick is the only signal the algorithm
        gets. The box computes a new interval, puts the card in a queue,
        and shows it to you next week, or in a month, or tomorrow, or
        in ten minutes.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="self">Self-rating is the problem</h2>

      <p>
        The thing you are being asked to rate (did I know that?) is the
        same thing you are trying to learn. Brains are famously bad at
        this. Recognition feels like recall. Reading the answer out loud
        feels like remembering it. The fluency illusion is a real,
        measured cognitive effect, and the four buttons at the foot of
        every SRS card sit right on top of it.
      </p>

      <p>
        There is also the evening problem. At 11pm on a Tuesday, Hard
        and Good collapse into the same button. People press Good so
        the queue shrinks faster. The queue does shrink faster. Weeks
        later the cards they called Good come back as holes, and the
        algorithm had no way to know the user lied to it, because the
        user lied to it on purpose.
      </p>

      <p>
        An honest learning system measures. It does not ask.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="measure">What we measure instead</h2>

      <p>
        Every answer in GenauApp is a real exercise, not a self-report.
        An article picker is three buttons under a noun; you tap one.
        That tap is the measurement. A fill in the blank has one right
        answer and a typed guess; the match is the measurement. Sentence
        Builder is a sequence; the order you built is the measurement.
      </p>

      <BlogObservedAnswer
        noun="Erfahrung"
        translation="experience"
        correctArticle="die"
        tapped="die"
      />

      <p>
        The app never asks how you felt about that answer. It already
        has the answer. &ldquo;How confident were you?&rdquo; is a
        worse question than &ldquo;did you get it right?&rdquo; and
        the right question is the one with data under it.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="confidence">Why one answer is a weak signal</h2>

      <p>
        A single correct answer does not mean you know a topic. Ten
        correct answers means something. Our progress bar multiplies
        your accuracy by the number of attempts over ten, capped at
        one. Early on your ring moves slowly even when you are getting
        them right, because two data points do not get promoted to a
        &ldquo;learned&rdquo; signal. Later, one bad day does not
        crash the number either, because the sample is big enough to
        absorb it.
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
        This is spaced repetition&rsquo;s honest version of
        &ldquo;mature card.&rdquo; A card is mature when the data says
        it is. Not when a deadline passed, and not when the user
        tapped Easy on it twice in a row.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="arrow">The two-way arrow</h2>

      <p>
        The ring only climbs. That is a design choice: finishing a
        workout is effort, and effort is positive even when the
        answers were wrong. But the ring alone cannot tell you where
        you are heading, which is the one thing a learner actually
        needs.
      </p>

      <p>
        So right next to each ring sits a small arrow: up, stable, or
        down. The arrow compares your last three answers in that skill
        to your historical average. Ten points better and it points
        up. Ten points worse and it points down. Everything in between
        is stable, and &ldquo;stable&rdquo; is not a shrug (we wrote
        up <Link href="/blog/how-skills-work">the full mechanic
        here</Link>).
      </p>

      <p>
        That arrow is the thing SM-2 cannot give you. SM-2 can say
        &ldquo;your next review is in four days.&rdquo; It cannot say
        &ldquo;your recent answers are shakier than they used to be.&rdquo;
        We can.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="payoff">The whole loop</h2>

      <p>
        The loop, in order. You open the app and the daily plan picks
        one of your four chips for you, usually the one whose arrow is
        pointing the wrong way. You work through the exercises. The
        app measures each answer. Confidence weighting decides how
        much the ring moves. The arrow next to the ring tells you
        which direction the recent data is heading. No rate yourself.
        No ease factor. No opaque interval calculation.
      </p>

      <p>
        Spaced repetition was always a good idea. It just needed the
        user to stop grading their own paper.
      </p>

      <BlogCTA source="spaced_repetition_blog" />
    </BlogLayout>
  );
}
