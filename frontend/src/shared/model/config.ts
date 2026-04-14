import { keepPreviousData } from '@tanstack/react-query'

export const config = {
  DEVTOOLS_ENABLED:
    import.meta.env.VITE_ENV === 'localhost' || import.meta.env.VITE_ENV === 'development',
  API_URL: import.meta.env.VITE_API_URL,
  QUERY_CONFIG: {
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
    retry: 3,
  },
}
