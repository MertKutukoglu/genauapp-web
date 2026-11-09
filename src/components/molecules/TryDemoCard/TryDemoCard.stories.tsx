import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TryDemoCard } from "./TryDemoCard";

const meta: Meta<typeof TryDemoCard> = {
  title: "Molecules/TryDemoCard",
  component: TryDemoCard,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["soft", "solid"] },
    heading: { control: "text" },
    body: { control: "text" },
    ctaLabel: { control: "text" },
    footnote: { control: "text" },
    href: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof TryDemoCard>;

export const Soft: Story = {
  args: { variant: "soft" },
  render: (args) => (
    <div className="w-[min(100%,440px)]">
      <TryDemoCard {...args} />
    </div>
  ),
};

export const Solid: Story = {
  args: { variant: "solid" },
  render: (args) => (
    <div className="w-[min(100%,440px)]">
      <TryDemoCard {...args} />
    </div>
  ),
};

export const BothSideBySide: Story = {
  parameters: { viewport: { defaultViewport: "desktop" } },
  render: () => (
    <div className="grid w-[min(100%,920px)] grid-cols-1 gap-4 md:grid-cols-2">
      <TryDemoCard variant="soft" />
      <TryDemoCard variant="solid" />
    </div>
  ),
};

/** Shorter copy option, when the surrounding headline already does the work. */
export const CopyAlt: Story = {
  args: {
    heading: "See it for yourself.",
    body: "The browser demo takes five minutes. No signup required.",
    ctaLabel: "Open the demo",
    footnote: null,
  },
  render: (args) => (
    <div className="w-[min(100%,440px)]">
      <TryDemoCard {...args} />
    </div>
  ),
};
