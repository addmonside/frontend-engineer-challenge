import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './button'

const meta = {
  title: 'ui/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean', defaultValue: false },
    variant: {
      control: 'select',
      defaultValue: 'default',
      options: ['default', 'secondary', 'ghost'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'button',
  },
}
