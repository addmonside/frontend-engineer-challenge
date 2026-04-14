import { QueryClient } from '@tanstack/react-query'
import { config } from '../model/config'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...config.QUERY_CONFIG,
    },
  },
})
