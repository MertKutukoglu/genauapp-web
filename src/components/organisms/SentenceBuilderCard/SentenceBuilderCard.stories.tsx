import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SentenceBuilderCard } from "./SentenceBuilderCard";

const meta: Meta<typeof SentenceBuilderCard> = {
  title: "Organisms/SentenceBuilderCard",
  component: SentenceBuilderCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Sentence chip's single Exercise card. Topic eyebrow + 'Build the sentence.' instruction + dashed-outline slot row + shuffled pool of tappable word chips + teal Check button. Shuffle is deterministic per sentence so re-renders don't re-order under the user; the correct state surfaces per-slot (green/red) after Check. On wrong, the Incorrect banner reveals the correct sentence — role-colored for anchors, plain for pack-themed drills.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SentenceBuilderCard>;

export const HauptsatzAnchor: Story = {
  args: {
    topic: "Subject + Verb + Object",
    words: ["Ich", "esse", "Brot."],
    revealSegments: [
      { text: "Ich", role: "subject" },
      { text: "esse", role: "verb" },
      { text: "Brot.", role: "object" },
    ],
    current: 1,
    total: 12,
  },
};

export const ZeitangabeAnchor: Story = {
  args: {
    topic: "Time adverb",
    words: ["Ich", "kaufe", "heute", "Brot."],
    revealSegments: [
      { text: "Ich", role: "subject" },
      { text: "kaufe", role: "verb" },
      { text: "heute", role: "time" },
      { text: "Brot.", role: "object" },
    ],
    current: 4,
    total: 12,
  },
};

export const WFrageAnchor: Story = {
  args: {
    topic: "Question (W-word)",
    words: ["Wo", "wohnst", "du?"],
    revealSegments: [
      { text: "Wo", role: "qword" },
      { text: "wohnst", role: "verb" },
      { text: "du?", role: "subject" },
    ],
    current: 6,
    total: 12,
  },
};

export const PackDrillNoReveal: Story = {
  args: {
    topic: "Hairdresser",
    words: ["Was", "kostet", "der", "Haarschnitt?"],
    current: 10,
    total: 12,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pack-themed scenes ship no `learn` block, so the Incorrect banner falls back to plain fg instead of role-colored segments.",
      },
    },
  },
};
