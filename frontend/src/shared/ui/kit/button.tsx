import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

const variants = cva(
  'aria-invalid:border-destructive transition-color inline-flex h-12 shrink-0 cursor-pointer flex-row items-center justify-center gap-1.5 truncate rounded-lg px-3 text-sm leading-none font-medium whitespace-nowrap transition-colors outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active disabled:bg-muted',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active disabled:bg-muted/15 disabled:text-muted',
        ghost:
          'text-primary hover:text-primary-hover active:text-primary-active disabled:text-muted',
        'ghost-gray':
          'text-muted hover:text-primary-hover active:text-primary-active disabled:text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export function Button({
  variant,
  type = 'button',
  className,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof variants>) {
  return (
    <button
      type={type}
      className={cn(variants({ variant, className }))}
      data-variant={variant}
      data-slot='button'
      {...props}
    />
  )
}
