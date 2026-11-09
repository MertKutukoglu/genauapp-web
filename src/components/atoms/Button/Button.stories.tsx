import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Try it in your browser",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["primary", "ghost"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    block: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { tone: "primary", size: "md" },
};

export const Ghost: Story = {
  args: { tone: "ghost", size: "md" },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const BlockOnMobile: Story = {
  args: { tone: "primary", size: "lg", block: true },
  parameters: {
    docs: {
      description: {
        story:
          "Mobile CTAs default to full-width so the tap target spans the screen. Switch the viewport to Desktop to see the inline form.",
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
