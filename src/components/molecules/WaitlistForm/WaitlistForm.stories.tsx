import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WaitlistForm } from "./WaitlistForm";

const meta: Meta<typeof WaitlistForm> = {
  title: "Molecules/WaitlistForm",
  component: WaitlistForm,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof WaitlistForm>;

export const BareField: Story = {
  render: () => (
    <div className="w-[min(100%,480px)]">
      <WaitlistForm />
    </div>
  ),
};

export const WithHeading: Story = {
  render: () => (
    <div className="w-[min(100%,480px)]">
      <WaitlistForm
        heading="Be first in line."
        sub="iOS beta drops Q1 2027. Drop your email and we'll let you know the moment it's live."
      />
    </div>
  ),
};
