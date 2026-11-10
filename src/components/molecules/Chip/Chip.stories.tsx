import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip, type ChipKind, type ChipState } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Molecules/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A single row in the /try/ left card's picker. Four kinds (`words`, `grammar`, `sentence`, `reading`) each driving the icon + color; four states (`default` / `selected` / `done` / reserved `locked`) each driving the surface + border + icon slot. Spec: `claude/GenauApp_Web_Try_ChipPicker_Brief.md` §2-3.",
      },
    },
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["words", "grammar", "sentence", "reading"],
    },
    state: {
      control: "select",
      options: ["default", "selected", "done", "locked"],
    },
    title: { control: "text" },
    meta: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  args: {
    kind: "words",
    state: "default",
    title: "Words",
    meta: "20 words · ~5 min",
  },
};

// ---------- Per-kind defaults (one card per kind) ----------

const KIND_COPY: Record<ChipKind, { title: string; meta: string }> = {
  words: { title: "Words", meta: "20 words · ~5 min" },
  grammar: { title: "Grammar", meta: "20 questions · ~5 min" },
  sentence: { title: "Sentence", meta: "12 sentences · ~4 min" },
  reading: { title: "Reading", meta: "1 passage · 5 questions" },
};

export const WordsDefault: Story = {
  args: { kind: "words", state: "default", ...KIND_COPY.words },
};
export const GrammarDefault: Story = {
  args: { kind: "grammar", state: "default", ...KIND_COPY.grammar },
};
export const SentenceDefault: Story = {
  args: { kind: "sentence", state: "default", ...KIND_COPY.sentence },
};
export const ReadingDefault: Story = {
  args: { kind: "reading", state: "default", ...KIND_COPY.reading },
};

// ---------- State matrix for a single kind ----------

export const WordsStateMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The four `data-state` variants on the Words chip. `locked` is reserved per spec §1 (not used in v1) but kept visually so dev tooling can preview a disabled chip.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {(["default", "selected", "done", "locked"] as ChipState[]).map((s) => (
        <Chip
          key={s}
          kind="words"
          state={s}
          title={`Words (${s})`}
          meta={KIND_COPY.words.meta}
        />
      ))}
    </div>
  ),
};

// ---------- Full 4×4 kind × state grid ----------

const ALL_KINDS: ChipKind[] = ["words", "grammar", "sentence", "reading"];
const ALL_STATES: ChipState[] = ["default", "selected", "done", "locked"];

export const FullMatrix: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Every combination of kind × state side by side. Use this to sanity-check that the chip-color token flows correctly through every surface + border + icon slot in every state.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1320, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14,
      }}
    >
      {ALL_KINDS.flatMap((k) =>
        ALL_STATES.map((s) => (
          <Chip
            key={`${k}-${s}`}
            kind={k}
            state={s}
            title={KIND_COPY[k].title}
            meta={`${s}`}
          />
        )),
      )}
    </div>
  ),
};
