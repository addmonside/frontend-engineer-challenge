/* eslint-disable react-refresh/only-export-components */
'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/kit/button'
import { Input } from '@/shared/ui/kit/input'

export const inputGroupVariants = cva(
  'group/input-group has-[[data-slot][aria-invalid=true]]:border-destructive relative flex w-full min-w-0 cursor-text items-center overflow-clip transition-colors outline-none has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=inline-end]]:[&>input]:pr-3 has-[>[data-align=inline-start]]:[&>input]:pl-3',
  {
    variants: {
      variant: {
        default:
          'h-12 rounded-md border has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3',

        auth: 'border-foreground/8 hover:border-foreground/16 has-[[data-slot=input-group-control]:disabled]:bg-foreground/5 has-[[data-slot=input-group-control]:disabled]:border-foreground/8 placeholder:text-foreground/8 has-[[data-slot=input-group-control]:focus-visible]:border-primary active:border-primary box-border border-b *:data-[slot=input-group-addon]:px-0 *:data-[slot=input-group-control]:py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function InputGroupWrapper({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      data-slot='input-group'
      data-variant={variant}
      role='group'
      className={cn(
        inputGroupVariants({
          variant,
          className,
        })
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-2 has-[>button]:-ml-1 has-[>kbd]:ml-[-0.15rem]',
        'inline-end': 'order-last pr-2 has-[>button]:-mr-1 has-[>kbd]:mr-[-0.15rem]',
        'block-start':
          'order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
        'block-end':
          'order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  }
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role='group'
      data-slot='input-group-addon'
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={e => {
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva('flex items-center gap-2 text-sm shadow-none', {
  variants: {
    size: {
      default: '',
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
      sm: '',
      'icon-xs':
        'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0 *:[svg]:size-5 *:[svg>path]:fill-amber-600',
      'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        "text-muted flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupControl({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <Input
      data-slot='input-group-control'
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent',
        className
      )}
      {...props}
    />
  )
}

InputGroupWrapper.displayName = 'InputGroup'
export const InputGroup = Object.assign(InputGroupWrapper, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Text: InputGroupText,
  Control: InputGroupControl,
})
