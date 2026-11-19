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
    "Every workout feeds three of your four skills, not one. The ring moves both ways because wrong answers cost you points, and the arrow next to it tells the truth about your direction. Here is how it works.",
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
      "How GenauApp's skill rings grow as a network, how the honest direction arrow moves, and why we don't lie to you with a score that only counts up.",
    type: "article",
  },
};

const TOC = [
  { id: "skills", label: "The skills we track" },
  { id: "grows", label: "How a skill grows (it's a network)" },
  { id: "shrinks", label: "How a skill goes down" },
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
      <p className="byline">By Mert · November 2026 · 6 min read</p>

      <p>
        Most apps count forward only. XP goes up. Streaks count up. Hearts
        refill if you wait. You open the app a year later and the number is
        still there, still bigger than it was.
      </p>

      <p>
        GenauApp doesn&rsquo;t work that way. If your recent Grammar answers
        are worse than your historical ones, a small arrow next to the ring
        flips from up to down. No &ldquo;stable&rdquo; shrug to spare
        feelings. If accuracy dropped, the arrow says so.
      </p>

      <p>This is uncomfortable. It is also the point.</p>

      <p>
        Below is what the app actually tracks, how each ring moves, why
        every workout you finish feeds three skills at once rather than
        one, and what we do when we don&rsquo;t have enough data to tell.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="skills">The skills we track</h2>

      <p>
        Every learner carries a small set of rings: Vocabulary, Grammar,
        Writing, and Reading in the current web demo. Listening joins them
        when we are confident it measures honestly; Speaking, which would
        be the next ring after that, stays locked until real speech
        recognition lands. We will explain the locked ones at the end of
        the post.
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

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="grows">How a skill grows (it&rsquo;s a network)</h2>

      <p>
        Here is the part most people get wrong when they first open the
        app, because they expect a one to one mapping. Every workout you
        finish feeds <strong>three</strong> of your four skills at once,
        not one. The mapping is:
      </p>

      <ul>
        <li>
          <strong>Words</strong>: primary feeds Vocabulary, also feeds
          Grammar and Writing.
        </li>
        <li>
          <strong>Grammar</strong>: primary feeds Grammar, also feeds
          Writing and Vocabulary.
        </li>
        <li>
          <strong>Sentence</strong>: primary feeds Writing, also feeds
          Grammar and Vocabulary.
        </li>
        <li>
          <strong>Reading</strong>: primary feeds Reading, also feeds
          Vocabulary and Grammar.
        </li>
      </ul>

      <p>
        Two things worth noticing. First, every workout <strong>skips one
        skill on purpose</strong>. Words, Grammar, and Sentence workouts
        never touch the Reading ring. Only the Reading chip itself feeds
        it. Reading comprehension has its own path in this app: no amount
        of article picking or sentence building will get you ready to
        read German news. You have to actually read German news.
      </p>

      <p>
        Second, the primary skill of a workout gets the bigger payoff
        (15 to 25% of ring fill per session, scaled by how well you did),
        and the two fed skills each get a smaller payoff (5 to 10%). So
        finishing a Grammar workout pushes Grammar forward hard and
        pulls Writing and Vocabulary along with it. The learning is
        networked, not isolated.
      </p>

      <p>
        One correct answer still does not finish the job. The ring fill
        is <strong>confidence weighted</strong>: early attempts barely
        move the bar because we don&rsquo;t have enough data to trust
        them yet. Ten or more attempts in a skill and the bar settles to
        real accuracy. Early on your ring moves slowly, even when you
        are doing well. Later, one bad day does not crash the number.
        You earn the signal in both directions.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="shrinks">How a skill goes down</h2>

      <p>
        The ring itself moves both ways. Right answers push it up. Wrong
        answers cost you progress directly. No &ldquo;effort trumps
        accuracy&rdquo; forgiveness, no silent decay on a timer: the
        ring is a measurement, and measurements include the wrong
        answers you gave.
      </p>

      <p>
        Next to each ring sits a small arrow: up, stable, or
        <strong>down</strong>. The arrow is a second, separate signal.
        It compares your <strong>recent three answers</strong> in that
        skill to your <strong>historical average</strong>. If recent is
        better than history by 10 points or more, the arrow points up.
        If recent is worse by 10 points or more, the arrow points down.
        In between, stable. No &ldquo;stable&rdquo; shrug used to soften
        a real drop.
      </p>

      <p>
        Here is why ring and arrow are separate. The ring says
        &ldquo;this is where your German sits today.&rdquo; The arrow
        says &ldquo;this is which direction you are heading right
        now.&rdquo; You can sit at a 70% Grammar ring with a down arrow
        next to it, which means your foundation is real but your recent
        answers are shakier than they used to be. That is useful
        information. It tells you where tomorrow&rsquo;s workout should
        go.
      </p>

      <p>
        This is the thing XP only apps cannot do, because they would
        have to admit that a number which only counts up means nothing
        in the direction that actually matters. A score that cannot
        move backward stops being a score and starts being a
        decoration.
      </p>

      <p className="section-divider">
        <span>§</span>
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

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="speaking">Why Speaking is locked (and Listening is coming)</h2>

      <p>
        Two rings are missing from the current web demo: Listening and
        Speaking. They are missing for different reasons, and both come
        back to the same rule.
      </p>

      <p>
        <strong>Listening</strong> is on the roadmap. The content and the
        audio pipeline work for it live in the native iOS app, not in the
        web demo, which is why you don&rsquo;t see a Listening ring in
        the browser yet. When the ring ships, it will be fed the same
        way the others are: from the activities designed to grow it,
        with the same confidence weighting and the same honest arrow.
      </p>

      <p>
        <strong>Speaking</strong> is locked across both. Speech recognition
        against a learner&rsquo;s accent is hard. Doing it well requires
        model work that we are not shipping yet. Until we can measure
        your speaking honestly, we will not put a number on it.
      </p>

      <p>
        Most apps cheerfully give you a speaking score based on nothing.
        We would rather leave the ring empty than show you a score we
        cannot defend. When speaking recognition lands, the ring unlocks,
        and it starts from the data your voice gives us, not from a seed
        we invented.
      </p>

      <p className="section-divider">
        <span>§</span>
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
