import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExerciseArticlePicker } from "./ExerciseArticlePicker";

const meta: Meta<typeof ExerciseArticlePicker> = {
  title: "Organisms/Exercise/ArticlePicker",
  component: ExerciseArticlePicker,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ExerciseArticlePicker>;

export const Default: Story = {
  args: {
    noun: "Brot",
    english: "bread",
    correctArticle: "das",
    explanation: "Most nouns ending in -brot are neuter → das.",
    current: 3,
    total: 20,
  },
};

export const FeminineNoun: Story = {
  args: {
    noun: "Familie",
    english: "family",
    correctArticle: "die",
    explanation: "Nouns ending in -ie / -ei are feminine → die.",
    current: 4,
    total: 20,
  },
};

export const MasculineNoun: Story = {
  args: {
    noun: "Ausgang",
    english: "exit",
    correctArticle: "der",
    explanation: "Nouns with the -gang suffix are masculine → der.",
    current: 7,
    total: 20,
  },
};
