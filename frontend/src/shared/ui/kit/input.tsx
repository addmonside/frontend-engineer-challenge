import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

const variants = cva(
  'aria-invalid:border-destructive transition-color cursor-text text-[15px] leading-[160%] font-normal transition-colors outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: '',
        auth: 'border-foreground/8 hover:border-foreground/16 disabled:bg-foreground/5 disabled:border-foreground/8 placeholder:text-foreground/8 focus-visible:border-primary active:border-primary placeholder-shown:text-foreground/8 border-b pt-4 pb-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export function Input({
  variant,
  type = 'text',
  className,
  ...props
}: ComponentProps<'input'> & VariantProps<typeof variants>) {
  return (
    <input
      type={type}
      className={cn(variants({ variant, className }))}
      data-variant={variant}
      data-slot='input'
      {...props}
    />
  )
}
