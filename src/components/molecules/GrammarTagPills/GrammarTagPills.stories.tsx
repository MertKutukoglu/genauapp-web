import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarTagPills } from "./GrammarTagPills";

const meta: Meta<typeof GrammarTagPills> = {
  title: "Molecules/GrammarTagPills",
  component: GrammarTagPills,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarTagPills>;

export const Single: Story = { args: { tags: ["aux-sein"] } };
export const Pair: Story = { args: { tags: ["reflexive", "transitive"] } };
export const AllTags: Story = {
  args: {
    tags: [
      "separable",
      "reflexive",
      "aux-sein",
      "transitive",
      "intransitive",
      "irregular",
      "akkusativ",
      "dativ",
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Every tag side by side, forced to wrap at this width. `irregular`, `akkusativ`, `dativ` are additions beyond spec §6.1 — the first for strong verbs on the A1 deck, the latter two for A2/B1 case-governance teaching.",
      },
    },
  },
};
export const Empty: Story = {
  args: { tags: [] },
  parameters: {
    docs: {
      description: { story: "Empty tags → component returns null, nothing renders." },
    },
  },
};
