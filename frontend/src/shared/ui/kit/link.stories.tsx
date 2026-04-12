import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { fn } from 'storybook/test'
import { Link } from './link'

const meta = {
  title: 'ui/link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: 'text',
      defaultValue: '/',
    },
    children: {
      control: 'text',
      defaultValue: 'link',
    },
    variant: {
      control: 'select',
      defaultValue: 'default',
      options: ['default', 'secondary'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    to: '/',
    children: 'link',
  },
}

export const Secondary: Story = {
  args: {
    to: '/',
    variant: 'secondary',
    children: 'link',
  },
}
