import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WordsChip, type WordsChipWord } from "./WordsChip";

const meta: Meta<typeof WordsChip> = {
  title: "Organisms/WordsChip",
  component: WordsChip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The full Words-chip right-column experience: ModeToggle + current Learn card + Repeat/I-know mechanics + Learn completion + Exercise placeholder. Content comes in as a `words` prop so parents (and future sessions in other levels) can swap decks without remounting.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof WordsChip>;

/* Placeholder A1 deck — 3 nouns (one each der/die/das) + 2 verbs
   (one aux-sein, one reflexive). Mert's curated deck swaps in here
   when the content lands. */

const DEMO_DECK: WordsChipWord[] = [
  {
    id: "das-brot",
    german: "Brot",
    english: "bread",
    article: "das",
    rule: "Nouns ending in -brot are neuter. → das Brot.",
    example: "Ich esse Brot zum Frühstück.",
  },
  {
    id: "der-hund",
    german: "Hund",
    english: "dog",
    article: "der",
    rule: "Most male animals take der. → der Hund.",
    example: "Der Hund schläft im Garten.",
  },
  {
    id: "die-katze",
    german: "Katze",
    english: "cat",
    article: "die",
    rule: "Nouns ending in -e are usually die. → die Katze.",
    example: "Die Katze trinkt Milch.",
  },
  {
    id: "gehen",
    german: "gehen",
    english: "to go (on foot)",
    grammarTags: ["aux-sein"],
    rule: "Movement verbs use sein as auxiliary in Perfekt.",
    example: "Ich gehe zur Arbeit.",
  },
  {
    id: "sich-freuen",
    german: "sich freuen",
    english: "to be happy",
    grammarTags: ["reflexive"],
    rule: "sich freuen is reflexive. It always needs sich.",
    example: "Ich freue mich auf das Wochenende.",
  },
];

export const Default: Story = {
  args: { words: DEMO_DECK },
  parameters: {
    docs: {
      description: {
        story:
          "Start of a fresh Learn deck. Tap `I know` to advance; tap `Repeat` to put the current card back into the deck at a random later position. Counter only advances on `I know`.",
      },
    },
  },
};

export const StartsOnExercise: Story = {
  args: { words: DEMO_DECK, initialMode: "exercise" },
  parameters: {
    docs: {
      description: {
        story:
          "Exercise mode is a placeholder until the article picker + translation quiz + keyboard write cards land. Flip back to Learn to try the deck.",
      },
    },
  },
};

export const SingleWord: Story = {
  args: { words: [DEMO_DECK[0]] },
  parameters: {
    docs: {
      description: {
        story:
          "Deck of 1. Repeat leaves the card in slot 0 (per spec edge case); I-know completes the deck.",
      },
    },
  },
};

export const EmptyDeck: Story = {
  args: { words: [] },
  parameters: {
    docs: {
      description: {
        story:
          "Defensive state — no words in the deck. Shouldn't happen in production but the organism doesn't crash.",
      },
    },
  },
};
