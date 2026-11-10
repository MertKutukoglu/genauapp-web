import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarExerciseMC } from "./GrammarExerciseMC";

const meta: Meta<typeof GrammarExerciseMC> = {
  title: "Organisms/GrammarExerciseMC",
  component: GrammarExerciseMC,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grammar chip's multiple-choice exercise card. Topic eyebrow + cloze prompt (literal `___`) + always-visible hint + 3-4 options with A/S/D/F keyboard shortcuts. ExerciseFeedback at the top on commit, explanations substring-highlight der/die/das in article colors.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarExerciseMC>;

export const VerbSeinAnchor: Story = {
  args: {
    topic: "Verb sein",
    prompt: "Ich ___ Student.",
    hint: "I am a student.",
    options: ["bin", "bist", "ist"],
    correctIndex: 0,
    explanation: "sein, 1st person singular.",
    current: 1,
    total: 22,
  },
};

export const ArticlesDrill: Story = {
  args: {
    topic: "Articles (der / die / das)",
    prompt: "___ Frau ist Lehrerin.",
    hint: "The woman is a teacher.",
    options: ["die", "der", "das", "dem"],
    correctIndex: 0,
    explanation: '"Frau" is feminine → die.',
    current: 15,
    total: 22,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Four-option drill. Explanation carries a `die` token — the card highlights it in article red inside the feedback card.",
      },
    },
  },
};

export const RegularVerbsDrill: Story = {
  args: {
    topic: "Regular verbs",
    prompt: "Du ___ Musik.",
    hint: "You listen to music.",
    options: ["hörst", "höre", "hören", "hört"],
    correctIndex: 0,
    explanation: '"hören", 2nd person singular ends in -st: du hörst.',
    current: 19,
    total: 22,
  },
};
