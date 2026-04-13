/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react'

function UtilityLayoutPageWrapper({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <section
      className='grid w-full max-w-md items-stretch justify-center gap-6 py-16'
      data-slot='utility-layout-page'
    >
      {children}
    </section>
  )
}

function UtilityLayoutPageHeader({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <header
      className='has-data-[slot=utility-layout-page-media]:[>[data-slot=utility-layout-page-description]]:col-span-2 grid gap-x-2 gap-y-6 has-data-[slot=utility-layout-page-media]:grid-cols-[1.5rem_1fr]'
      data-slot='utility-layout-page-header'
    >
      {children}
    </header>
  )
}

function UtilityLayoutPageTitle({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <h1
      className='text-[2rem] leading-tight font-medium'
      data-slot='utility-layout-page-title'
    >
      {children}
    </h1>
  )
}
function UtilityLayoutPageDescription({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p
      className='text-foreground-secondary col-span-2 text-sm'
      data-slot='utility-layout-page-description'
    >
      {children}
    </p>
  )
}

function UtilityLayoutPageMedia({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div
      className='flex items-center justify-center *:[svg]:size-6'
      data-slot='utility-layout-page-media'
    >
      {children}
    </div>
  )
}

function UtilityLayoutPageActions({ children }: Readonly<{ children: ReactNode }>) {
  return <div className='grid gap-8 pt-2'>{children}</div>
}

UtilityLayoutPageWrapper.displayName = 'UtilityLayoutPage'
export const UtilityLayoutPage = Object.assign(UtilityLayoutPageWrapper, {
  Header: UtilityLayoutPageHeader,
  Title: UtilityLayoutPageTitle,
  Description: UtilityLayoutPageDescription,
  Actions: UtilityLayoutPageActions,
  Media: UtilityLayoutPageMedia,
})
