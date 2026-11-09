import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PackCard } from "./PackCard";

const meta: Meta<typeof PackCard> = {
  title: "Atoms/PackCard",
  component: PackCard,
  tags: ["autodocs"],
  args: {
    title: "Food & Drink",
    level: "B1",
  },
  argTypes: {
    level: {
      control: "inline-radio",
      options: ["A1", "A2", "B1", "B2", "C1", "C2"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof PackCard>;

export const Placeholder: Story = {
  render: (args) => (
    <div className="w-[220px]">
      <PackCard {...args} />
    </div>
  ),
};

export const PackGrid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The Packs scene on the live landing shows six tiles in a 2×3 grid on mobile and 3×2 on desktop. Real cover images drop into /public/packs/ later.",
      },
    },
  },
  render: () => {
    const packs = [
      { title: "Pharmacy & Doctor", level: "C1" as const },
      { title: "Food & Drink",      level: "B1" as const },
      { title: "Shopping",          level: "C2" as const },
      { title: "Daily Life",        level: "A1" as const },
      { title: "Bürgeramt",         level: "B2" as const },
      { title: "Hairdresser",       level: "A2" as const },
    ];
    return (
      <div className="grid w-[min(100%,720px)] grid-cols-2 gap-3 md:grid-cols-3">
        {packs.map((p) => (
          <PackCard key={p.title} title={p.title} level={p.level} />
        ))}
      </div>
    );
  },
};
