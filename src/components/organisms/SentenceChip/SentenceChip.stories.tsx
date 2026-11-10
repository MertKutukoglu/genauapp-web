import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SentenceChip } from "./SentenceChip";
import { SENTENCE_A1 } from "@/content/sentence-a1";

const meta: Meta<typeof SentenceChip> = {
  title: "Organisms/SentenceChip",
  component: SentenceChip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The full Sentence-chip right-column experience: ModeToggle + Learn deck (6 formula anchors, all rendered through the single SentenceFormulaCard layout) + Exercise stub (the real word-chip sentence builder lands in the follow-up pass). Learn mechanics mirror Words / Grammar (Repeat reorders, I know advances).",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SentenceChip>;

export const FullLearn: Story = {
  args: { items: SENTENCE_A1 },
};

export const StartsOnExercise: Story = {
  args: { items: SENTENCE_A1, initialMode: "exercise" },
};

export const SingleAnchor: Story = {
  args: { items: [SENTENCE_A1[0]] },
};
