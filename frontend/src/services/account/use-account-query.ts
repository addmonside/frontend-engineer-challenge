import { useQuery } from '@tanstack/react-query'
import { execute, graphql } from '@/shared/gql'
import { config } from '@/shared/model'
import { accountQueryResponseSchema } from './validation'

export const me = graphql(`
  query me {
    me {
      id
      email
      isActive
    }
  }
`)

export function useAccountQuery() {
  const { data, refetch, isPending } = useQuery({
    queryKey: ['account'],
    queryFn: () => execute(me),
    select: res => {
      const result = accountQueryResponseSchema.safeParse(res)
      return result.success ? result.data : null
    },
    staleTime: config.QUERY_CONFIG.staleTime,
  })

  return { data, refetch, isPending }
}
