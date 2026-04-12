import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Field, FieldGroup } from './field'
import { Input } from './input'

const meta = {
  title: 'ui/field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // variant: {
    //   control: 'select',
    //   defaultValue: 'default',
    //   options: ['default', 'auth'],
    // },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Field.Label>label</Field.Label>
        <Field.Content>
          <Input
            variant='auth'
            placeholder='email'
          />
        </Field.Content>
        <Field.Error>error</Field.Error>
      </>
    ),
  },
}

export const Auth: Story = {
  args: {
    variant: 'auth',
    children: (
      <>
        <Field.Label htmlFor='email'>email</Field.Label>
        <Field.Content>
          <Input
            id='email'
            variant='auth'
            placeholder='email'
          />
        </Field.Content>
        <Field.Error>error</Field.Error>
      </>
    ),
  },
  decorators: [
    Story => (
      <FieldGroup className='w-full min-w-40'>
        <Story />
        <Field variant='auth'>
          <Field.Label htmlFor='email'>email</Field.Label>
          <Field.Content>
            <Input
              id='email'
              variant='auth'
              placeholder='email'
            />
          </Field.Content>
          <Field.Error>1</Field.Error>
        </Field>
      </FieldGroup>
    ),
  ],
}
