import type { Meta, StoryObj } from "@storybook/react";
import { WordCard } from "./WordCard";
import { GrammarInfoModule } from "./GrammarInfoModule";
import { DICT_ENTRIES } from "@/content/dictionary/entries";

/**
 * Stories for the Dictionary molecules. Each story renders a real
 * entry from the prototype entries file so the preview matches what
 * ships on the live route.
 */

const meta: Meta<typeof WordCard> = {
  title: "Molecules/Dictionary",
  component: WordCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof WordCard>;

function page(slug: string, locale: "en" | "tr" = "en") {
  const entry = DICT_ENTRIES.find((e) => e.slug === slug)!;
  return (
    <div style={{ width: 420, display: "flex", flexDirection: "column", gap: 20 }}>
      <WordCard entry={entry} locale={locale} />
      <GrammarInfoModule entry={entry} locale={locale} />
    </div>
  );
}

export const NounWithRule_EN: Story = {
  name: "Noun · die Erfahrung (EN)",
  render: () => page("erfahrung", "en"),
};

export const NounWithRule_TR: Story = {
  name: "Noun · die Erfahrung (TR)",
  render: () => page("erfahrung", "tr"),
};

export const NounNoRule_EN: Story = {
  name: "Noun · das Buch (EN)",
  render: () => page("buch", "en"),
};

export const Verb_EN: Story = {
  name: "Verb · buchstabieren (EN)",
  render: () => page("buchstabieren", "en"),
};

export const Verb_TR: Story = {
  name: "Verb · buchstabieren (TR)",
  render: () => page("buchstabieren", "tr"),
};

export const Adjective_EN: Story = {
  name: "Adjective · gut (EN)",
  render: () => page("gut", "en"),
};

export const CardOnly_Noun: Story = {
  name: "WordCard alone · die Erfahrung",
  render: () => (
    <div style={{ width: 420 }}>
      <WordCard entry={DICT_ENTRIES[0]} locale="en" />
    </div>
  ),
};

export const CardOnly_Verb: Story = {
  name: "WordCard alone · buchstabieren",
  render: () => (
    <div style={{ width: 420 }}>
      <WordCard
        entry={DICT_ENTRIES.find((e) => e.slug === "buchstabieren")!}
        locale="en"
      />
    </div>
  ),
};
