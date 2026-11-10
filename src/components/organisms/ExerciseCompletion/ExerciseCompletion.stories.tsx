import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExerciseCompletion } from "./ExerciseCompletion";

const meta: Meta<typeof ExerciseCompletion> = {
  title: "Organisms/Exercise/Completion",
  component: ExerciseCompletion,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ExerciseCompletion>;

export const PerfectRun: Story = {
  args: { correct: 20, incorrect: 0, total: 20 },
};

export const MixedRun: Story = {
  args: { correct: 15, incorrect: 5, total: 20 },
};

export const RoughRun: Story = {
  args: { correct: 8, incorrect: 12, total: 20 },
};
