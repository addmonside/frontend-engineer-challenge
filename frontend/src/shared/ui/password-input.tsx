import type { VariantProps } from 'class-variance-authority'
import { type ComponentProps, useState } from 'react'
import UnisibleIcon from '../assets/icons/unvisible-icon.svg'
import VisibleIcon from '../assets/icons/visible-icon.svg'
import { InputGroup, inputGroupVariants } from './kit/input-group'

export function PasswordInput({
  variant,
  ...props
}: Omit<ComponentProps<'input'>, 'type'> & VariantProps<typeof inputGroupVariants>) {
  const [displayed, setDisplayed] = useState(false)

  return (
    <InputGroup variant={variant}>
      <InputGroup.Control
        type={displayed ? 'text' : 'password'}
        {...props}
      />
      <InputGroup.Button
        variant='ghost-gray'
        onClick={() => setDisplayed(prev => !prev)}
        size='icon-xs'
      >
        {displayed ? <VisibleIcon className='text-sm' /> : <UnisibleIcon />}
      </InputGroup.Button>
    </InputGroup>
  )
}
