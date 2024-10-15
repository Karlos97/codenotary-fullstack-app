import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'Example/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'Account Number',
    name: 'accountNumber',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Account Number',
    name: 'accountNumber',
  },
};

export const WithError: Story = {
  args: {
    label: 'Account Number',
    name: 'accountNumber',
    error: { message: 'This field is required', type: 'required' },
  },
};
