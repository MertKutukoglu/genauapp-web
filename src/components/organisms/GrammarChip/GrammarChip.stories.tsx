import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarChip } from "./GrammarChip";
import { GRAMMAR_A1 } from "@/content/grammar-a1";

const meta: Meta<typeof GrammarChip> = {
  title: "Organisms/GrammarChip",
  component: GrammarChip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The full Grammar-chip right-column experience: ModeToggle + current Learn card dispatched by `learn.layout` + Repeat/I-know mechanics + Learn completion + Exercise stub (the real Exercise deck lands in the follow-up pass). Learn walks the 5 anchor questions (one per topic); the remaining 15 drill-only items belong to Exercise.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarChip>;

export const FullLearn: Story = {
  args: { items: GRAMMAR_A1 },
  parameters: {
    docs: {
      description: {
        story:
          "The full deck. Learn mode filters to the anchor questions and dispatches each to its layout (verbParadigm × 2 for sein/haben, pronounChart × 1, articleSingle × 3 for der/die/das walked in that order, verbConjugation × 1 for regular verbs).",
      },
    },
  },
};

export const StartsOnExercise: Story = {
  args: { items: GRAMMAR_A1, initialMode: "exercise" },
  parameters: {
    docs: {
      description: {
        story:
          "Exercise mode in v1 shows a short stub inviting the user back to Learn. The real Exercise deck (12 multipleChoice + 8 fillBlank) lands next.",
      },
    },
  },
};

export const SingleAnchor: Story = {
  args: { items: [GRAMMAR_A1[0]] },
  parameters: {
    docs: {
      description: {
        story:
          "Deck of 1 anchor (Verb sein). Repeat leaves the card in slot 0 per spec; I know completes the deck.",
      },
    },
  },
};
