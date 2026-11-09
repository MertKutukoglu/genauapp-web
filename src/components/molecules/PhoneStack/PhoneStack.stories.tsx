import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PhoneStack } from "./PhoneStack";

const meta: Meta<typeof PhoneStack> = {
  title: "Molecules/PhoneStack",
  component: PhoneStack,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof PhoneStack>;

export const Default: Story = {
  render: () => (
    <div className="w-[min(640px,80vw)] bg-bg p-6">
      <PhoneStack />
    </div>
  ),
};

export const Narrow: Story = {
  render: () => (
    <div className="w-[380px] bg-bg p-6">
      <PhoneStack />
    </div>
  ),
};
