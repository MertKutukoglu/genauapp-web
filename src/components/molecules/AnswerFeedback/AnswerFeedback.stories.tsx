import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AnswerFeedback } from "./AnswerFeedback";

const meta: Meta<typeof AnswerFeedback> = {
  title: "Molecules/AnswerFeedback",
  component: AnswerFeedback,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[420px] bg-surface-card p-5 rounded-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AnswerFeedback>;

export const Correct: Story = {
  args: { state: "correct" },
};

export const Incorrect: Story = {
  args: {
    state: "incorrect",
    correctAnswer: "die Familie",
    speakText: "die Familie",
  },
};

export const IncorrectShortWord: Story = {
  args: {
    state: "incorrect",
    correctAnswer: "Brot",
    speakText: "das Brot",
  },
};

export const IncorrectLongWord: Story = {
  args: {
    state: "incorrect",
    correctAnswer: "der Schlüssel",
    speakText: "der Schlüssel",
  },
};
