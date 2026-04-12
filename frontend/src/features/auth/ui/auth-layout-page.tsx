import type { ReactNode } from 'react'

export function AuthLayoutPage({
  children,
  header,
  footer,
}: Readonly<{ children: ReactNode; header: ReactNode; footer: ReactNode }>) {
  return (
    <div className='flex w-full flex-1 flex-col px-8 lg:*:px-20'>
      <section className='flex flex-1 flex-col items-stretch justify-center gap-6 pt-16'>
        <header>
          <h1 className='text-[2rem] font-medium'>{header}</h1>
        </header>
        {children}
      </section>
      <footer className='border-foreground/8 text-auth-footer-foreground w-full border-t py-8 text-center'>
        {footer}
      </footer>
    </div>
  )
}
