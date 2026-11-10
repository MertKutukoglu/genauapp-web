import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkoutSummaryCard } from "./WorkoutSummaryCard";

const meta: Meta<typeof WorkoutSummaryCard> = {
  title: "Organisms/WorkoutSummaryCard",
  component: WorkoutSummaryCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "First screen of the demo-complete flow. Heading + stats tile + A1 content preview + email capture via useWaitlistSubmit (source: \"demo_complete\"). Dismiss link routes the parent to the feedback screen; email success routes to the done card.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof WorkoutSummaryCard>;

export const Default: Story = {
  args: {
    correct: 42,
    total: 60,
    onSuccess: () => {},
    onDismiss: () => {},
  },
};

export const MediocreScore: Story = {
  args: {
    correct: 18,
    total: 60,
    onSuccess: () => {},
    onDismiss: () => {},
  },
};

export const CleanSweep: Story = {
  args: {
    correct: 60,
    total: 60,
    onSuccess: () => {},
    onDismiss: () => {},
  },
};
