/* eslint-disable react-refresh/only-export-components */
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, useMemo } from 'react'
import { cn } from '@/shared/lib/cn'

function FieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot='field-set'
      className={cn(
        'flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot='field-legend'
      data-variant={variant}
      className={cn(
        'mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-group'
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva('group/field data-[invalid=true]:text-destructive flex w-full', {
  variants: {
    variant: {
      default: 'flex-col gap-3',
      auth: 'relative flex-col gap-0 *:data-[slot=field-content]:pt-2 *:data-[slot=field-label]:absolute *:data-[slot=field-label]:top-2 *:data-[slot=field-label]:cursor-text *:data-[slot=field-label]:text-xs [&:has(input:placeholder-shown):not(:has(input:-webkit-autofill))_[data-slot=field-label]]:top-6.5 [&:has(input:placeholder-shown):not(:has(input:-webkit-autofill))_[data-slot=field-label]]:text-[0.9375rem] **:[input]:placeholder:text-transparent',
      // + ' [&:has(input:focus)_[data-slot=field-label]]:top-2! [&:has(input:focus)_[data-slot=field-label]]:text-xs!'
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function FieldWrapper({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role='group'
      data-slot='field'
      data-variant={variant}
      className={cn(fieldVariants({ variant }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-content'
      className={cn('group/field-content flex flex-1 flex-col gap-1 leading-snug', className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  htmlFor,
  ...props
}: ComponentProps<'label'> & { htmlFor: string }) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot='field-label'
      className={cn(
        'group/field-label peer/field-label has-data-checked:border-primary/30 has-data-checked:bg-primary/5 flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-3',
        'text-muted transition-[top,font-size,color] ease-in has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
        className
      )}
      {...props}
    />
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [...new Map(errors.map(error => [error?.message, error])).values()]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className='ml-4 flex list-disc flex-col gap-1'>
        {uniqueErrors.map(error => error?.message && <li key={error?.message}>{error.message}</li>)}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role='alert'
      data-slot='field-error'
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    >
      {content}
    </div>
  )
}

export { FieldGroup, FieldLegend, FieldSet }

FieldWrapper.displayName = 'Field'
export const Field = Object.assign(FieldWrapper, {
  Label: FieldLabel,
  Error: FieldError,
  Content: FieldContent,
})
