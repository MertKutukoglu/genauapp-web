import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip, type ChipFlavor } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    flavor: "words",
    state: "default",
    caption: "20 questions · ~2 min",
  },
  argTypes: {
    flavor: {
      control: "inline-radio",
      options: ["words", "grammar", "sentence", "reading"],
    },
    state: {
      control: "inline-radio",
      options: ["default", "selected", "done"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};
export const Selected: Story = { args: { state: "selected" } };
export const Done: Story = { args: { state: "done" } };

export const AllFlavors: Story = {
  render: () => {
    const flavors: ChipFlavor[] = ["words", "grammar", "sentence", "reading"];
    return (
      <div className="grid w-[min(100%,560px)] grid-cols-1 gap-3 sm:grid-cols-2">
        {flavors.map((f) => (
          <Chip key={f} flavor={f} caption="20 questions · ~2 min" />
        ))}
      </div>
    );
  },
};

export const StatesSideBySide: Story = {
  render: () => (
    <div className="grid w-[min(100%,560px)] grid-cols-1 gap-3 sm:grid-cols-3">
      <Chip flavor="grammar" state="default" caption="Default" />
      <Chip flavor="grammar" state="selected" caption="Selected" />
      <Chip flavor="grammar" state="done" caption="Done" />
    </div>
  ),
};
