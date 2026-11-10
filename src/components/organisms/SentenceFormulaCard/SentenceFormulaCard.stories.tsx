import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SentenceFormulaCard } from "./SentenceFormulaCard";

const meta: Meta<typeof SentenceFormulaCard> = {
  title: "Organisms/SentenceFormulaCard",
  component: SentenceFormulaCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Sentence chip's single Learn-card layout. Headline + role-colored parts strip + role-colored examples + prose body (supports **bold**). Covers all 6 A1 formula anchors by varying the data; the organism stays the same.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SentenceFormulaCard>;

export const Hauptsatz: Story = {
  args: {
    headline: "Hauptsatz",
    english: "Main clause (Subject · Verb · Object)",
    parts: [
      { text: "Subjekt", caption: "Position 1", role: "subject" },
      { text: "Verb", caption: "Position 2", role: "verb" },
      { text: "Objekt", caption: "Rest", role: "object" },
    ],
    examples: [
      {
        segments: [
          { text: "Ich", role: "subject" },
          { text: "esse", role: "verb" },
          { text: "Brot.", role: "object" },
        ],
        en: "I eat bread.",
      },
      {
        segments: [
          { text: "Wir", role: "subject" },
          { text: "lernen", role: "verb" },
          { text: "Deutsch.", role: "object" },
        ],
        en: "We learn German.",
      },
    ],
    body: "German's backbone: **Subject, Verb, Object**. The verb is always in position 2.",
    current: 1,
    total: 6,
  },
};

export const Zeitangabe: Story = {
  args: {
    headline: "Zeitangabe",
    english: "Time expression (S · V · Time · Rest)",
    parts: [
      { text: "Subjekt", caption: "Who", role: "subject" },
      { text: "Verb", caption: "Position 2", role: "verb" },
      { text: "Zeit", caption: "When", role: "time" },
      { text: "Rest", caption: "What / Where", role: "object" },
    ],
    examples: [
      {
        segments: [
          { text: "Ich", role: "subject" },
          { text: "kaufe", role: "verb" },
          { text: "heute", role: "time" },
          { text: "Brot.", role: "object" },
        ],
        en: "I buy bread today.",
      },
      {
        segments: [
          { text: "Wir", role: "subject" },
          { text: "fahren", role: "verb" },
          { text: "morgen", role: "time" },
          { text: "nach Köln.", role: "place" },
        ],
        en: "We're going to Cologne tomorrow.",
      },
    ],
    body: "Time adverbs like **heute** (today), **morgen** (tomorrow), **oft** (often) sit right after the verb. S, V, Time, Rest.",
    current: 4,
    total: 6,
  },
};

export const Possessivartikel: Story = {
  args: {
    headline: "Possessivartikel",
    english: "Possessive before the noun",
    parts: [
      { text: "Subjekt", caption: "Who", role: "subject" },
      { text: "Verb", caption: "Position 2", role: "verb" },
      { text: "Possessiv +\nNomen", caption: "Who's", role: "object" },
    ],
    examples: [
      {
        segments: [
          { text: "Er", role: "subject" },
          { text: "ist", role: "verb" },
          { text: "mein Bruder.", role: "object" },
        ],
        en: "He is my brother.",
      },
    ],
    body: "Possessives go before the noun: **mein** Bruder, **dein** Buch, **ihr** Hund. They change with the noun's gender.",
    current: 3,
    total: 6,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Longer headline (`Possessivartikel` > 15 chars) drops from 32 to 26. The third pill uses a two-line label with an embedded newline.",
      },
    },
  },
};

export const WFrage: Story = {
  args: {
    headline: "W-Frage",
    english: "Question with a W-word (W · Verb · Subject)",
    parts: [
      { text: "W-Wort", caption: "wo / was / wer", role: "qword" },
      { text: "Verb", caption: "Position 2", role: "verb" },
      { text: "Subjekt", caption: "Who", role: "subject" },
    ],
    examples: [
      {
        segments: [
          { text: "Wo", role: "qword" },
          { text: "wohnst", role: "verb" },
          { text: "du?", role: "subject" },
        ],
        en: "Where do you live?",
      },
    ],
    body: "Questions with **wo / was / wer / wann / warum / wie** put the W-word first, verb second, then the subject.",
    current: 6,
    total: 6,
  },
};
