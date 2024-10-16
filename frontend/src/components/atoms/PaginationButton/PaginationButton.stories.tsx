/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import PaginationButton from './PaginationButton';
import IconLeft from '../Icons/IconLeft';

const meta = {
  title: 'Example/PaginationButton',
  component: PaginationButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: '1',
    disabled: false,
    isActive: true,
    isIcon: false,
    onClick: () => {
      console.log('switch page');
    },
  },
} satisfies Meta<typeof PaginationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '1',
    disabled: false,
    isActive: false,
    isIcon: false,
    onClick: () => {
      console.log('switch page');
    },
  },
};

export const DefaultActive: Story = {
  args: {
    children: '1',
    disabled: false,
    isActive: true,
    isIcon: false,
    onClick: () => {
      console.log('switch page');
    },
  },
};

export const AsIcon: Story = {
  args: {
    children: <IconLeft />,
    disabled: false,
    isActive: false,
    isIcon: true,
    onClick: () => {
      console.log('switch page');
    },
  },
};
