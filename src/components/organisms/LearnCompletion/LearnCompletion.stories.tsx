import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LearnCompletion } from "./LearnCompletion";

const meta: Meta<typeof LearnCompletion> = {
  title: "Organisms/LearnCompletion",
  component: LearnCompletion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The moment shown after the user has I-known every card in the Learn deck. Explicit CTA — no auto-flip to Exercise.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof LearnCompletion>;

export const Default: Story = {
  args: { total: 20, repeats: 3 },
};

export const CleanRun: Story = {
  args: { total: 20, repeats: 0 },
};

export const RoughRun: Story = {
  args: { total: 20, repeats: 12 },
};

export const WithHandlers: Story = {
  args: { total: 20, repeats: 3 },
  render: (args) => (
    <LearnCompletion
      {...args}
      onStartOver={() => console.log("Start over tapped")}
      onSwitchToExercise={() => console.log("Switch to Exercise tapped")}
    />
  ),
};
