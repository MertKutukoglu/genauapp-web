import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHomeMockup } from "./AppHomeMockup";
import { PhoneFrame } from "@/components/atoms/PhoneFrame/PhoneFrame";

const meta: Meta<typeof AppHomeMockup> = {
  title: "Molecules/AppHomeMockup",
  component: AppHomeMockup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof AppHomeMockup>;

export const Bare: Story = {
  render: () => (
    <div className="w-[260px] rounded-[32px] border border-border bg-white p-2">
      <AppHomeMockup />
    </div>
  ),
};

export const InPhoneFrame: Story = {
  render: () => (
    <PhoneFrame width={280}>
      <AppHomeMockup />
    </PhoneFrame>
  ),
};
