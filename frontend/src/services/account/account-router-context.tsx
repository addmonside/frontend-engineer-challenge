import { createContext } from 'react-router'
import type { UserType } from '@/shared/gql/gen/graphql'

export const accountRouterContext = createContext<UserType | null>(null)
