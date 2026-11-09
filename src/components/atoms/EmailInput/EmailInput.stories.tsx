import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmailInput } from "./EmailInput";

const meta: Meta<typeof EmailInput> = {
  title: "Atoms/EmailInput",
  component: EmailInput,
  tags: ["autodocs"],
  args: {
    placeholder: "your@email.com",
  },
};
export default meta;
type Story = StoryObj<typeof EmailInput>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: "mert@example.com" } };
export const Disabled: Story = { args: { disabled: true } };

export const InContext: Story = {
  render: () => (
    <div className="w-[min(100%,420px)]">
      <EmailInput placeholder="your@email.com" />
    </div>
  ),
};
