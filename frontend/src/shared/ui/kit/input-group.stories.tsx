import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { InputGroup } from './input-group'

const meta = {
  title: 'ui/input-group',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      defaultValue: 'default',
      options: ['default', 'auth'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <InputGroup.Addon>
          <InputGroup.Text>textvsdrsrtstse</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Control />
      </>
    ),
  },
}

export const Auth: Story = {
  args: {
    variant: 'auth',
    children: (
      <>
        <InputGroup.Addon>
          <InputGroup.Text>auth</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Control />
      </>
    ),
  },
}

export const Ghost: Story = {
  args: {
    children: (
      <>
        <InputGroup.Control />
        <InputGroup.Button>123</InputGroup.Button>
        <InputGroup.Text>textvsdrsrtstse</InputGroup.Text>
      </>
    ),
  },
}
