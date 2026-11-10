import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkoutDoneCard } from "./WorkoutDoneCard";

const meta: Meta<typeof WorkoutDoneCard> = {
  title: "Organisms/WorkoutDoneCard",
  component: WorkoutDoneCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Confirmation shown after a successful email submit on the Summary card. Primary cherry \"Take a look at the blog →\" link (routes to the Origins post in the current locale) + muted \"Back to home\" link below.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof WorkoutDoneCard>;

export const Default: Story = { args: {} };
