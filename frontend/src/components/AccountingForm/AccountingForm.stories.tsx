import type { Meta, StoryObj } from "@storybook/react";
import AccountingForm from "./AccountingForm";

const meta = {
  title: "Example/AccountingForm",
  component: AccountingForm,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onAddRecord: (data: any) => console.log("Record added:", data),
  },
} satisfies Meta<typeof AccountingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAddRecord: (data: any) => console.log("Record added:", data),
  },
};
