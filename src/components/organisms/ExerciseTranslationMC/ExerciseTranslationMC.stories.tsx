import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExerciseTranslationMC } from "./ExerciseTranslationMC";

const meta: Meta<typeof ExerciseTranslationMC> = {
  title: "Organisms/Exercise/TranslationMC",
  component: ExerciseTranslationMC,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ExerciseTranslationMC>;

export const Default: Story = {
  args: {
    prompt: "weggehen",
    options: ["cheap", "passport", "to go away", "to show"],
    correctIndex: 2,
    explanation: '"weggehen" means to go away / depart.',
    current: 1,
    total: 20,
  },
};

export const ShortPrompt: Story = {
  args: {
    prompt: "essen",
    options: ["to eat", "to drink", "to sleep", "to walk"],
    correctIndex: 0,
    explanation: '"essen" is the core verb for eating.',
    current: 2,
    total: 20,
  },
};
