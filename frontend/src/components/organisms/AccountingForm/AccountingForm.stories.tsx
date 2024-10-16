import type { Meta, StoryObj } from '@storybook/react';
import AccountingForm from './AccountingForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta = {
  title: 'Example/AccountingForm',
  component: AccountingForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof AccountingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <QueryClientProvider client={queryClient}>
      <AccountingForm {...args} />
    </QueryClientProvider>
  ),
  args: {},
};
