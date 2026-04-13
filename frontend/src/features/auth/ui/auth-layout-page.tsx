import type { ReactNode } from 'react'

function AuthLayoutPageWrapper({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <section className='relative flex w-full flex-1 flex-col items-stretch justify-center gap-6 pt-16 pb-25 *:px-8 lg:*:px-20'>
      {children}
    </section>
  )
}

function AuthLayoutPageHeader({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <header>
      <h1 className='text-[2rem] font-medium'>{children}</h1>
    </header>
  )
}
function AuthLayoutPageFooter({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <footer className='border-foreground/8 text-auth-footer-foreground absolute right-0 bottom-0 left-0 w-full border-t py-8 text-center'>
      {children}
    </footer>
  )
}
function AuthLayoutPageActions({ children }: Readonly<{ children: ReactNode }>) {
  return <div className='flex flex-col gap-8 py-8'>{children}</div>
}

export const AuthLayoutPage = Object.assign(AuthLayoutPageWrapper, {
  Header: AuthLayoutPageHeader,
  Footer: AuthLayoutPageFooter,
  Actions: AuthLayoutPageActions,
})
