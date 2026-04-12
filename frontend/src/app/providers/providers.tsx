import { Outlet } from 'react-router'
import { QueryProvider } from './query-provider'

export function Providers() {
  return (
    <QueryProvider>
      <Outlet />
    </QueryProvider>
  )
}
