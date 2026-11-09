import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Wordmark } from "./Wordmark";

const meta: Meta<typeof Wordmark> = {
  title: "Atoms/Wordmark",
  component: Wordmark,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["topnav", "compact", "footer"],
    },
    showPill: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Wordmark>;

export const Topnav: Story = { args: { variant: "topnav", showPill: true } };
export const Compact: Story = { args: { variant: "compact", showPill: true } };
export const Footer: Story = {
  args: { variant: "footer", showPill: true },
  decorators: [
    (Story) => (
      <div style={{ background: "#000", padding: 24, borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-10 pr-16">
      <Wordmark variant="topnav" />
      <Wordmark variant="compact" />
      <div style={{ background: "#000", padding: 16, borderRadius: 12 }}>
        <Wordmark variant="footer" />
      </div>
    </div>
  ),
};
