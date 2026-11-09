import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PhoneFrame } from "./PhoneFrame";

const meta: Meta<typeof PhoneFrame> = {
  title: "Atoms/PhoneFrame",
  component: PhoneFrame,
  tags: ["autodocs"],
  argTypes: {
    width: { control: { type: "range", min: 180, max: 380, step: 10 } },
  },
  args: { width: 260 },
};
export default meta;
type Story = StoryObj<typeof PhoneFrame>;

export const Empty: Story = {};

export const WithSolidScreen: Story = {
  render: (args) => (
    <PhoneFrame
      {...args}
      screenClassName="bg-gradient-to-br from-[#FFF2E3] to-[#FFD8BA] grid place-items-center"
    >
      <span className="text-sm text-fg-muted">Screen slot</span>
    </PhoneFrame>
  ),
};
