import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Input } from './input'

const meta = {
  title: 'ui/input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      type: 'string',
      control: 'select',
      options: ['text', 'email', 'search'],
      description: 'Input type',
      default: 'text',
    },
    placeholder: {
      type: 'string',
      control: 'text',
      description: 'Компания / контакт / email',
      default: '',
    },
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'Input disabled',
      default: false,
    },
    autoFocus: {
      type: 'boolean',
      control: 'boolean',
      description: 'Input auto focus',
      default: false,
    },
    defaultValue: {
      type: 'string',
      control: 'text',
      description: 'Input default value',
      default: '',
    },
    variant: {
      control: 'select',
      defaultValue: 'default',
      options: ['default', 'auth'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Auth: Story = {
  args: {
    variant: 'auth',
  },
}
