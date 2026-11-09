import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AssemblyArea } from "./AssemblyArea";

const meta: Meta<typeof AssemblyArea> = {
  title: "Molecules/AssemblyArea",
  component: AssemblyArea,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shared tile-puzzle mechanic for the Scrambled + ChunkCompose Learn variants. Caller hands it the target split into ordered pieces; the component shuffles into a tile pool and tracks the user's assembly.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof AssemblyArea>;

export const ScrambledLetters: Story = {
  args: {
    pieces: "Brot".split(""),
    article: "das",
    seed: "scrambled:Brot",
  },
};

export const ChunkPieces: Story = {
  args: {
    pieces: ["Fa", "mi", "lie"],
    article: "die",
    seed: "chunkCompose:Familie",
  },
};

export const VerbScramble: Story = {
  args: {
    pieces: "schreiben".split(""),
    seed: "scrambled:schreiben",
  },
  parameters: {
    docs: {
      description: {
        story:
          "No article → completed slots stay on --fg (no article-color tint).",
      },
    },
  },
};

export const LongChunks: Story = {
  args: {
    pieces: ["Schlüs", "sel"],
    article: "der",
    seed: "chunkCompose:Schlüssel",
  },
};
