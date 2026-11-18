import type { Metadata } from "next";
import { BlogLayout } from "@/components/templates/BlogLayout/BlogLayout";
import { BlogCTA } from "@/components/molecules/BlogCTA/BlogCTA";

/**
 * /blog/how-skills-work, the "what are skills in GenauApp" post.
 *
 * Positions the skill-tracking model (confidence-weighted rings,
 * honest down signals, dot placeholder for low data, locked
 * Speaking) as the contrarian angle: unlike every XP-only app on
 * the market, our numbers can move both ways. SEO target: brand
 * term + method keywords around honest language-learning progress
 * tracking.
 */
export const metadata: Metadata = {
  title: "What skills are in GenauApp (and why they can go down)",
  description:
    "Most language apps count forward only. GenauApp's skill rings move both ways. Here is how each number grows, how it shrinks, and why the Speaking ring stays locked for now.",
  alternates: {
    canonical: "/blog/how-skills-work",
    languages: {
      en: "/blog/how-skills-work",
      tr: "/tr/blog/skill-nedir",
      "x-default": "/blog/how-skills-work",
    },
  },
  openGraph: {
    title: "What skills are in GenauApp (and why they can go down)",
    description:
      "Most language apps count forward only. Here is how GenauApp's skill rings grow, shrink, and tell the truth about your German.",
    type: "article",
  },
};

const TOC = [
  { id: "skills", label: "The five skills we track" },
  { id: "grows", label: "How a skill grows" },
  { id: "shrinks", label: "How a skill shrinks" },
  { id: "data", label: "When there isn't enough data" },
  { id: "speaking", label: "Why Speaking is locked" },
  { id: "payoff", label: "Why this matters" },
];

export default function HowSkillsWorkPage() {
  return (
    <BlogLayout slug="how-skills-work" toc={TOC}>
      <h1 className="title">
        What skills are in GenauApp (and why they can go down)
      </h1>
      <p className="byline">By Mert · November 2026</p>

      <p>
        Most apps count forward only. XP goes up. Streaks count up. Hearts
        refill if you wait. You open the app a year later and the number is
        still there, still bigger than it was.
      </p>

      <p>
        GenauApp doesn&rsquo;t work that way. If you haven&rsquo;t practiced
        Grammar in two weeks, your Grammar ring drops a notch. If your recent
        accuracy on Vocabulary falls, the ring reflects that, with a small
        arrow pointing down next to the number.
      </p>

      <p>This is uncomfortable. It is also the point.</p>

      <p>
        Below is what the app actually tracks, how each number moves, and
        what we do when we don&rsquo;t have enough data to tell.
      </p>

      <h2 id="skills">The five skills we track</h2>

      <p>
        Every learner carries five rings: Vocabulary, Grammar, Writing,
        Reading, and Listening. A sixth, Speaking, stays locked for now, and
        we will explain why in a moment.
      </p>

      <p>
        Each ring is one number between zero and one hundred, one color, one
        shape. The ring is what you see; the number is what we compute from
        everything you have done inside that skill.
      </p>

      <p>
        Vocabulary tracks how well you recognize and produce German words.
        Grammar tracks your handling of articles, cases, verb conjugation,
        and sentence structure. Writing tracks productive output: typing a
        word, assembling a sentence, producing an answer. Reading tracks how
        you handle real German text. Listening tracks how you parse spoken
        German.
      </p>

      <p>
        Nothing clever, nothing hidden. One ring per skill, and the skill
        names mean what you would expect them to mean.
      </p>

      <h2 id="grows">How a skill grows</h2>

      <p>
        Every workout you finish feeds specific skills. A Words workout
        feeds Vocabulary. A Grammar workout feeds Grammar. A Sentence
        workout feeds Writing. A Reading workout feeds Reading. The mapping
        is deliberate: the activity you just did is the activity that
        should move the ring you would expect it to move.
      </p>

      <p>
        But one correct answer does not finish the job. Most language apps
        will light up a progress bar after your first tap, because a jumping
        bar feels rewarding. We will not. The bar is <strong>confidence
        weighted</strong>: if you have answered three questions in a skill,
        the ring shows a tentative estimate. If you have answered thirty,
        the ring shows real accuracy. The more you have practiced, the more
        the ring trusts what it sees.
      </p>

      <p>
        This means that early on, your ring moves slowly, even when you are
        doing well. It also means that later on, one bad day does not crash
        the number. You have earned the signal both ways.
      </p>

      <h2 id="shrinks">How a skill shrinks</h2>

      <p>Here is the part most apps leave out.</p>

      <p>
        Two weeks without touching Grammar? The Grammar ring drops. Not
        back to zero, but a step down, enough to tell you honestly that
        your Grammar practice is cooling off. If you come back and your
        recent answers are worse than your historical ones, the ring
        reflects that, and a small down arrow appears next to the number.
      </p>

      <p>
        Nobody designs this to make you feel bad. It is the opposite. An
        ever upward number is a lie: you know you have been away, you know
        your German is rustier than it was, and if the app keeps telling
        you that you are at eighty five percent, the app is lying to your
        face. The app you trust is the one that tells you the truth even
        when the truth is uncomfortable.
      </p>

      <p>
        The down arrow is also useful. It tells you where your next workout
        should go. If Reading is holding steady but Grammar has a down
        arrow next to it, you do not need to think about what to open
        tomorrow.
      </p>

      <h2 id="data">When there isn&rsquo;t enough data</h2>

      <p>
        If you have only answered one or two questions in a skill, we do
        not make up a number. The ring shows a small <code>·</code> dot,
        which means &ldquo;we need more data to say anything honest about
        this skill.&rdquo;
      </p>

      <p>
        A lucky first answer should not claim mastery. A single wrong
        answer in the first session should not call you weak. Under three
        attempts, the honest thing is to stay quiet, so we do.
      </p>

      <p>
        This matters more than it sounds. Imagine you decided to visit the
        Bürgeramt tomorrow and the app told you your Grammar was at ninety
        two percent. You would walk in confident. If that ninety two
        percent came from three lucky multiple choice answers, you would
        walk in unprepared. The dot keeps that from happening.
      </p>

      <h2 id="speaking">Why Speaking is locked</h2>

      <p>
        Speech recognition against a learner&rsquo;s accent is hard. Doing
        it well requires audio pipelines and model work that live in the
        native app, not in the web demo. Until we can measure your
        speaking honestly, we will not put a number on it.
      </p>

      <p>
        Most apps will cheerfully give you a speaking score based on
        nothing. We would rather leave the ring empty than give you a
        score we cannot defend. When speaking recognition lands, the ring
        unlocks, and it starts from the data your voice gives us, not
        from a seed we invented.
      </p>

      <h2 id="payoff">Why this matters</h2>

      <p>A ring that only goes up isn&rsquo;t information. It is decoration.</p>

      <p>
        A ring that moves both ways is a signal. It tells you where you are
        strong, where you have been away too long, where your next workout
        should go. It tells you when to trust the number, and when to
        practice more before trusting it.
      </p>

      <p>
        That is what skill tracking is for: to tell you the truth about
        your German, so your next workout is the one that actually matters.
      </p>

      <p>
        If you want to see this in action, open the web demo. Your first
        few workouts will show the <code>·</code> placeholder while the
        app gathers data. Give it a few sessions and the rings will tell
        you something real.
      </p>

      <BlogCTA source="skills_blog" />
    </BlogLayout>
  );
}
