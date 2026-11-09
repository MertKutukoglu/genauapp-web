import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { LearnActions } from "./LearnActions";

const meta: Meta<typeof LearnActions> = {
  title: "Molecules/LearnActions",
  component: LearnActions,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "`Repeat` + `I know` ghost buttons at the bottom of the Learn card. Intentionally identical — there is no primary CTA in Learn mode. Pushing the user toward either choice would distort the signal.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof LearnActions>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const WithConsoleHandlers: Story = {
  render: () => (
    <LearnActions
      onRepeat={() => console.log("Repeat tapped")}
      onIKnow={() => console.log("I know tapped")}
    />
  ),
};
