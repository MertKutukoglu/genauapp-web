import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LanguagePicker } from "./LanguagePicker";

/**
 * Note: usePathname / useRouter come from next/navigation. Storybook's
 * Next adapter supplies a mock router + pathname by default; the
 * picker will read the mocked pathname and render "EN" active.
 */

const meta: Meta<typeof LanguagePicker> = {
  title: "Atoms/LanguagePicker",
  component: LanguagePicker,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof LanguagePicker>;

export const Default: Story = {};

export const OnDarkBg: Story = {
  decorators: [
    (Story) => (
      <div className="bg-bg p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: "dark" },
  },
};
