import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExerciseCompletion } from "./ExerciseCompletion";
import { computeSkillDeltas } from "@/lib/skills/map";

const meta: Meta<typeof ExerciseCompletion> = {
  title: "Organisms/Exercise/Completion",
  component: ExerciseCompletion,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ExerciseCompletion>;

export const PerfectRun: Story = {
  args: {
    chip: "words",
    correct: 20,
    total: 20,
    deltas: computeSkillDeltas({ chip: "words", correct: 20, total: 20 }),
  },
};

export const HalfThere: Story = {
  args: {
    chip: "sentence",
    correct: 6,
    total: 12,
    deltas: computeSkillDeltas({ chip: "sentence", correct: 6, total: 12 }),
  },
};

export const WithContinueCTA: Story = {
  args: {
    chip: "words",
    correct: 15,
    total: 20,
    deltas: computeSkillDeltas({ chip: "words", correct: 15, total: 20 }),
    nextWorkout: {
      label: "Grammar",
      onContinue: () => console.log("Next workout tapped: grammar"),
    },
  },
};

export const RoughRun: Story = {
  args: {
    chip: "grammar",
    correct: 3,
    total: 20,
    deltas: computeSkillDeltas({ chip: "grammar", correct: 3, total: 20 }),
  },
};

export const ReadingChip: Story = {
  args: {
    chip: "reading",
    correct: 8,
    total: 10,
    deltas: computeSkillDeltas({ chip: "reading", correct: 8, total: 10 }),
  },
};

export const NothingLanded: Story = {
  args: {
    chip: "words",
    correct: 0,
    total: 20,
    deltas: computeSkillDeltas({ chip: "words", correct: 0, total: 20 }),
  },
};
