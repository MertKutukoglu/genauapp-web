import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ParadigmGrid } from "./ParadigmGrid";

const meta: Meta<typeof ParadigmGrid> = {
  title: "Molecules/ParadigmGrid",
  component: ParadigmGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grammar chip's 2-col pronoun → form table. Left column right-aligned muted; right column left-aligned semi-bold `--fg`. Shared by verbParadigm, pronounChart, and verbConjugation. For verbConjugation the right column takes a React node so the caller can compose `stem · ending` with its own typography.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ParadigmGrid>;

export const VerbSein: Story = {
  args: {
    rows: [
      { pronoun: "ich", form: "bin" },
      { pronoun: "du", form: "bist" },
      { pronoun: "er / sie / es", form: "ist" },
      { pronoun: "wir", form: "sind" },
      { pronoun: "ihr", form: "seid" },
      { pronoun: "sie / Sie", form: "sind" },
    ],
  },
};

export const PronounChart: Story = {
  args: {
    rows: [
      { pronoun: "ich", form: "I" },
      { pronoun: "du", form: "you" },
      { pronoun: "er", form: "he" },
      { pronoun: "sie", form: "she / they" },
      { pronoun: "es", form: "it" },
      { pronoun: "wir", form: "we" },
      { pronoun: "ihr", form: "you (plural)" },
      { pronoun: "Sie", form: "you (formal)" },
    ],
  },
};

export const VerbConjugationStemEnding: Story = {
  args: {
    rows: ["e", "st", "t", "en", "t", "en"].map((ending, i) => ({
      pronoun: ["ich", "du", "er / sie / es", "wir", "ihr", "sie / Sie"][i],
      form: (
        <span className="inline-flex items-baseline gap-1.5">
          <span className="font-sans font-normal text-[17px] text-fg-muted">
            geh
          </span>
          <span className="font-sans text-fg-faint text-[15px]" aria-hidden>·</span>
          <span
            className="font-sans font-bold text-[17px]"
            style={{ color: "var(--chip-grammar-color)" }}
          >
            {ending}
          </span>
        </span>
      ),
    })),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The verbConjugation shape — stem (muted regular) · (middot) · ending (bold, grammar purple). Encoded in typography so the pattern reads without a legend: the stem is fixed, the ending is the pattern.",
      },
    },
  },
};
