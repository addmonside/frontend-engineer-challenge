import { Outlet } from 'react-router'
import AuthMediaIcon from '@/shared/assets/icons/auth-media.svg'
import { Logo } from '@/shared/ui/logo'

function AuthLayout() {
  return (
    <div
      className='bg-auth relative grid min-h-dvh w-full grid-cols-1 px-5 pt-14 pb-6 lg:grid-cols-[35rem_1fr] lg:p-0'
      data-slot='auth-layout'
    >
      <Logo className='absolute top-4 left-5 z-30' />
      <div className='bg-background/85 lg:bg-background relative z-20 rounded-xl backdrop-blur-lg lg:rounded-none'>
        <main className='flex h-full flex-col lg:items-center'>
          <Outlet />
        </main>
      </div>
      <aside className='fixed z-10 flex h-full w-full items-center justify-center lg:relative'>
        <AuthMediaIcon
          width={512}
          height={480}
          className='animate-[spin_10s_linear_infinite]'
        />
      </aside>
    </div>
  )
}

export const Component = AuthLayout
