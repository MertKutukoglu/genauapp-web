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
          "Transition shown after the user has I-known every card in the Learn deck. Explicit Exercise CTA — no auto-flip. Deliberately not a scoreboard: Learn awards no points and moves no skill rings, and the previous Words/Repeats stat tile was being misread as the end-of-session summary.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof LearnCompletion>;

export const Default: Story = {
  args: {},
};

export const WithHandlers: Story = {
  args: {},
  render: (args) => (
    <LearnCompletion
      {...args}
      onStartOver={() => console.log("Start over tapped")}
      onSwitchToExercise={() => console.log("Switch to Exercise tapped")}
    />
  ),
};
