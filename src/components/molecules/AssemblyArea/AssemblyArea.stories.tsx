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
          "Shared tile-puzzle mechanic for the Scrambled + ChunkCompose Learn variants. Thin horizontal dashes for empty slots, bold tiles, backspace at the end of the tile row. Slots turn green when the assembled sequence matches the target.",
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
    seed: "scrambled:Brot",
  },
};

export const ChunkPieces: Story = {
  args: {
    pieces: ["Fa", "mi", "lie"],
    seed: "chunkCompose:Familie",
  },
};

export const LongScramble: Story = {
  args: {
    pieces: "schreiben".split(""),
    seed: "scrambled:schreiben",
  },
};

export const TwoChunks: Story = {
  args: {
    pieces: ["Schlüs", "sel"],
    seed: "chunkCompose:Schlüssel",
  },
};
