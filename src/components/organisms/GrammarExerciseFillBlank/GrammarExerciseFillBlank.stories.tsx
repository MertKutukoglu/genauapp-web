import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarExerciseFillBlank } from "./GrammarExerciseFillBlank";

const meta: Meta<typeof GrammarExerciseFillBlank> = {
  title: "Organisms/GrammarExerciseFillBlank",
  component: GrammarExerciseFillBlank,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grammar chip's typed-answer exercise card. Topic eyebrow + cloze prompt (literal `___`) + always-visible hint + centered text input + cherry Check/Next button. Case-insensitive + umlaut-folded comparison via `normalizeDE` — Wir / wir both accept the stored canonical form.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarExerciseFillBlank>;

export const VerbSein: Story = {
  args: {
    topic: "Verb sein",
    prompt: "Du ___ freundlich.",
    hint: "You are friendly.",
    answer: "bist",
    explanation: "sein, 2nd person singular: du bist.",
    current: 6,
    total: 22,
  },
};

export const PronounsWir: Story = {
  args: {
    topic: "Pronouns",
    prompt: "___ wohnen in Berlin.",
    hint: "We live in Berlin.",
    answer: "Wir",
    explanation: '"Wir" means "we", used for 1st person plural.',
    current: 13,
    total: 22,
  },
};

export const ArticlesDer: Story = {
  args: {
    topic: "Articles (der / die / das)",
    prompt: "___ Mann kommt spät.",
    hint: "The man is coming late.",
    answer: "Der",
    explanation:
      '"Mann" is masculine → der (capitalised at sentence start).',
    current: 16,
    total: 22,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Sentence-initial article. The explanation substring-highlights `der` in blue inside the feedback card.",
      },
    },
  },
};
