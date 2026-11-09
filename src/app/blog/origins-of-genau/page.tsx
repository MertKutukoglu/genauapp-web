import type { Metadata } from "next";
import { BlogLayout } from "@/components/templates/BlogLayout/BlogLayout";
import { BlogCTA } from "@/components/molecules/BlogCTA/BlogCTA";

/**
 * /blog/origins-of-genau — Mert's origin story for GenauApp, ported
 * verbatim from `claude/GenauApp_Landing_Origins_Blog.md` in the
 * project. Article colors on German nouns / cases follow the system
 * tokens (--article-der/die/das, --accent for Akk, --ok for Dat,
 * --grammar-500 for Gen).
 */

export const metadata: Metadata = {
  title: "Origins of Genau",
  description:
    "I rewrote my German flashcards in color, then built an app around it. For adults who need German to live in Germany, not to pass an exam in ten years.",
  alternates: { canonical: "/blog/origins-of-genau" },
  openGraph: {
    title: "Origins of Genau",
    description:
      "I rewrote my German flashcards in color, then built an app around it.",
    type: "article",
  },
};

const TOC = [
  { id: "dots", label: "The problem with the dots" },
  { id: "cases", label: "Then the cases" },
  { id: "classroom", label: "Where the classroom hits its limit" },
  { id: "adaptive", label: "The adaptive turn" },
  { id: "why", label: "Why Genau" },
];

export default function OriginsOfGenauPage() {
  return (
    <BlogLayout slug="origins-of-genau" toc={TOC}>
      <h1 className="title">Origins of Genau</h1>
      <p className="byline">By Mert · November 2026</p>

      <p>
        If you have ever tried to learn German as an adult, you probably know
        the feeling. You open the textbook, you look at the vocabulary page,
        and you realize three things at once. The words all look the same. The
        colors meant to help you are the size of a pinhead. And by page four
        of the book, you are already behind.
      </p>

      <p>That is where this app started.</p>

      <p>
        I am Mert. I am a designer. I moved to Germany not for fun, but
        because life pushed me there. I needed German fast enough to live. Not
        to pass an exam in eight years, but in six months. To go to the
        Bürgeramt and understand what the officer was saying. To read the
        lease. To talk to a neighbor without rehearsing the sentence first.
      </p>

      <p>
        What I found was that none of the apps were built for me. They were
        built for tourists, for teenagers, for people with ten years. The
        adult in a hurry was on his own.
      </p>

      <p>
        So I did what everyone in that spot does. I collected apps. One just
        for verb conjugations. Another just for{" "}
        <em>der / die / das</em>. A third for vocabulary that was so gamified
        it felt like someone wanted me to build a farm instead of learn a
        language. A fourth for sentences. A proper German grammar app took me
        weeks to find, because almost nobody builds one. By the end I had
        five apps open on my phone, paying around ten euros for each, maybe
        fifty euros a month in total, on top of everything else that moving
        to a new country already costs. And I was still jumping from one tab
        to the next, trying to figure out which one was going to teach me the
        thing I actually needed next.
      </p>

      <p>That was the moment I started with flashcards.</p>

      <h2 id="dots">The problem with the dots</h2>

      <p>
        Every German textbook codes noun genders with a tiny colored dot next
        to the word. Green for <span className="color-das">das</span>. Blue
        for <span className="color-der">der</span>. Red for{" "}
        <span className="color-die">die</span>. The idea is fine. The
        execution is not. The dots are smaller than a punctuation mark. I did
        not notice them for the first three chapters. Even once I did, my eye
        did not go to them when I needed them. They were decoration, not
        signal.
      </p>

      <p>
        The irony is that colors are one of the oldest tricks in the memory
        book. We remember color before we remember text. Give me a red word
        and a green word and I will remember which is which months after I
        forget the words themselves. The textbook had the right idea. It just
        did not commit.
      </p>

      <p>
        So I committed for it. I rewrote my own flashcards. Every noun, in
        its gender color.{" "}
        <span className="color-das">Das Fenster</span> in green.{" "}
        <span className="color-der">Der Tisch</span> in blue.{" "}
        <span className="color-die">Die Tür</span> in red. Not just the dot.
        The whole word. You cannot miss a whole word.
      </p>

      <p>
        Within a week, my gender errors dropped by half. Not because I was
        smarter. Because the colors were doing the work my brain refused to
        do on grey text.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="cases">Then the cases</h2>

      <p>
        Once I trusted the color trick, I pushed it further. German cases are
        the thing that breaks most learners.{" "}
        <span className="color-akk">Akkusativ</span>,{" "}
        <span className="color-dat">Dativ</span>,{" "}
        <span className="color-gen">Genitiv</span>. Four forms per article,
        four more if you count the plural. Standard grammar tables are a wall
        of grey.
      </p>

      <p>
        I gave them colors too. <span className="color-akk">Akkusativ</span>{" "}
        red. <span className="color-dat">Dativ</span> green.{" "}
        <span className="color-gen">Genitiv</span> purple. Suddenly
        conjugation tables were not a wall. They were a pattern. And when I
        read a sentence, the right article color flashed in my head before I
        even remembered the rule.
      </p>

      <p>
        I later read that there are roughly four learning styles. Visual,
        kinesthetic, auditory, verbal. People lean on different ones. I lean
        hard on visual. Someone else leans on writing it out by hand. Someone
        else on hearing it spoken. A good language app would let each person
        pick the lane that fits them.
      </p>

      <p>
        That became the first principle of this app. You can change the der /
        die / das colors in your profile. You can turn autoplay audio on or
        off. You can toggle rule reminders. You can hide sample sentences if
        they distract you. The app meets you where your brain is, not where
        someone else&apos;s textbook thinks it should be.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="classroom">Where the classroom hits its limit</h2>

      <p>
        I want to be clear before this part. I am grateful to the teachers I
        had. I learned German from two of them, a Turkish man and a German
        woman, both patient and both excellent at what they do. The point of
        this section is not about either of them, or about any teacher.
      </p>

      <p>
        Teachers are human. They get tired. They have twenty-five other
        people in the room. One person cannot carry that load for every
        learner in it. That is just what being a human teacher looks like.
        The point is about the shape of a classroom.
      </p>

      <p>
        A classroom is one teacher and a lot of students. That shape has
        structural limits. When a teacher corrects your writing, they move to
        the next sentence. They tell you yours should be <em>dem</em>, not{" "}
        <em>den</em>. What the format rarely leaves room for is the line
        after that: <em>because helfen takes the dative</em>. The reminder of
        the rule is what builds the reflex. Without it, you fix the one
        sentence and lose the pattern.
      </p>

      <p>
        This app always keeps the rule in reach. You tap a wrong answer, the
        rule shows up. You tap a right answer, the pattern you just used is
        named. Every tap reinforces something, not just the specific word.
      </p>

      <p>
        The other thing a classroom cannot do at scale is personalize. A
        mechanic needs mechanic vocabulary. A nurse needs nurse vocabulary. A
        software engineer needs the words for her job. Any group course moves
        at the pace of its average, and adult learners who need the language
        for their specific life tend to hit a ceiling somewhere around B1.
        The format runs out of room, not because the teachers stopped caring,
        but because one-to-many teaching was never designed for one specific
        adult in one specific hurry.
      </p>

      <p>
        Software can do what a group format cannot. It can watch each learner
        specifically, see where their gaps actually are, and route the next
        exercise at those gaps.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="adaptive">The adaptive turn</h2>

      <p>
        This is where the app is heading. Not just a static deck of grammar
        packs, but something that watches what you keep missing and pulls
        content at that gap, in a scene that fits your life.
      </p>

      <p>
        If you keep dropping <span className="color-dat">Dativ</span>{" "}
        articles when you talk about work, the app notices, and the next ten
        exercises are <span className="color-dat">Dativ</span> articles at
        the office. If you keep missing Perfekt with <em>sein</em>, the next
        ten are movement verbs in the past.
      </p>

      <p>
        You do not have to figure out what you are bad at. The app knows. You
        do not have to design your own study plan. The app writes it, one
        session at a time.
      </p>

      <p>
        That is the promise. A German app that treats you like one specific
        adult trying to live a specific life, not like a classroom average.
      </p>

      <p className="section-divider">
        <span>§</span>
      </p>

      <h2 id="why">Why Genau</h2>

      <p>
        <em>Genau</em> is one of the first words you learn in German. It
        means &ldquo;exactly&rdquo; or &ldquo;right.&rdquo; It is what you
        say when someone has understood you correctly. It is also what
        Germans say when they agree with you, which is often. If you ever
        want to sound a little more German, you can do worse than saying{" "}
        <em>genau</em> at every opportunity.
      </p>

      <p>
        I liked the word because it is honest. <em>Genau</em> means hitting
        the spot. Not close. Not approximately. Exactly.
      </p>

      <p>
        That is what this app tries to do. Hit the specific spot your
        learning actually needs. Nothing extra, nothing drip-fed, nothing
        wasted.
      </p>

      <p>
        If you are an adult learning German and you are tired of apps built
        for people who have ten years, this one is for you.
      </p>

      <BlogCTA source="origins_blog" />
    </BlogLayout>
  );
}
