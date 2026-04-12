import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode } from 'react'
import { queryClient } from '@/shared/gql'
import { config } from '@/shared/model/config'

export function QueryProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {config.DEVTOOLS_ENABLED && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}
