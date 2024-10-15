import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta = {
  title: 'Example/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'Type',
    name: 'type',
    options: [
      { value: 'sending', label: 'Sending' },
      { value: 'receiving', label: 'Receiving' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Type',
    name: 'type',
    options: [
      { value: 'sending', label: 'Sending' },
      { value: 'receiving', label: 'Receiving' },
    ],
  },
};
