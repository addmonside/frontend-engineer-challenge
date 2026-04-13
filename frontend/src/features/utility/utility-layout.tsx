import { Outlet } from 'react-router'
import { Logo } from '@/shared/ui/logo'

function UtilityLayout() {
  return (
    <div
      className='bg-background flex min-h-dvh w-full items-center justify-center px-5 pt-14 pb-6'
      data-slot='utility-layout'
    >
      <Logo className='absolute top-4 left-5 z-30' />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export const Component = UtilityLayout
