import { createContext } from 'react-router'

export type User = {
  id: string
  email: string
  name: string
}

export const accountRouterContext = createContext<User | null>(null)
