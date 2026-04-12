import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { Link as RouterLink } from 'react-router'
import { cn } from '@/shared/lib'

const variants = cva(
  'aria-invalid:border-destructive transition-color rink-0 inline-flex cursor-pointer flex-row items-center justify-center gap-1.5 truncate rounded-lg px-3 text-sm leading-none font-medium whitespace-nowrap transition-colors outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'text-primary hover:text-primary-hover active:text-primary-active disabled:text-muted',
        secondary:
          'text-muted hover:text-primary-hover active:text-primary-active disabled:text-muted font-normal underline underline-offset-3',
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
