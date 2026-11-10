import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReadingChip } from "./ReadingChip";
import { READING_A1 } from "@/content/reading-a1";

const meta: Meta<typeof ReadingChip> = {
  title: "Organisms/ReadingChip",
  component: ReadingChip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The full Reading-chip right-column experience: mode toggle with \"Read / Exercise\" labels + one passage card (Read) + 5 MC question cards (Exercise) + ExerciseCompletion with YOU FED badges. Mode rule: Read → Exercise resets qIdx; Exercise → Read preserves it.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ReadingChip>;

export const StartsOnRead: Story = {
  args: { content: READING_A1 },
};

export const StartsOnExercise: Story = {
  args: { content: READING_A1, initialMode: "exercise" },
};
