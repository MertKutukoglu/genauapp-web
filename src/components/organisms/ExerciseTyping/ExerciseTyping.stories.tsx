import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExerciseTyping } from "./ExerciseTyping";

const meta: Meta<typeof ExerciseTyping> = {
  title: "Organisms/Exercise/Typing",
  component: ExerciseTyping,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ExerciseTyping>;

export const Default: Story = {
  args: {
    prompt: "international",
    answer: "international",
    explanation: '"international" is a cognate — same spelling in both languages.',
    current: 5,
    total: 20,
  },
};

export const UmlautAnswer: Story = {
  args: {
    prompt: "the door",
    answer: "die Tür",
    explanation: '"die Tür" — feminine noun. Tolerant input: "Tuer" also accepted.',
    current: 11,
    total: 20,
  },
};
