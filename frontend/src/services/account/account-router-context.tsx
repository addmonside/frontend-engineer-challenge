import { createContext } from 'react-router'

type User = {
  id: string
  email: string
  name: string
}

export const accountRouterContext = createContext<User | null>(null)
