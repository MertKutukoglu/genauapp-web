import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkoutFeedbackCard } from "./WorkoutFeedbackCard";

const meta: Meta<typeof WorkoutFeedbackCard> = {
  title: "Organisms/WorkoutFeedbackCard",
  component: WorkoutFeedbackCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Soft intercept shown after the user dismisses the Summary email ask. One textarea + Send / Skip. Submit fires PostHog `demo_workout_feedback_submitted` with the text clipped to 2000 chars; Skip fires `demo_workout_feedback_skipped`. Nothing hits Supabase from this card — feedback isn't a waitlist signup.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof WorkoutFeedbackCard>;

export const Default: Story = { args: { onDone: () => {} } };
