import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { Link as RouterLink } from 'react-router'
import { cn } from '@/shared/lib'

const variants = cva(
  'aria-invalid:border-destructive transition-color rink-0 inline-flex cursor-pointer flex-row items-center justify-center gap-1.5 rounded-lg text-sm leading-none font-medium underline-offset-4 transition-colors outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'text-primary hover:text-primary-hover active:text-primary-active disabled:text-muted underline',
        secondary:
          'text-muted hover:text-primary-hover active:text-primary-active disabled:text-muted font-normal underline',
        'default-button':
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active h-12',
        'secondary-button':
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export function Link({
  variant,
  className,
  ...props
}: ComponentProps<typeof RouterLink> & VariantProps<typeof variants>) {
  return (
    <RouterLink
      className={cn(variants({ variant, className }))}
      {...props}
    />
  )
}
