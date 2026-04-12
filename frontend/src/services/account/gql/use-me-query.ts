import { useQuery } from '@tanstack/react-query'
import { execute, graphql } from '@/shared/gql'

export const me = graphql(`
  query me {
    me {
      id
      email
      isActive
    }
  }
`)

export function useMeQuery() {
  const { data, refetch, isPending } = useQuery({
    queryKey: ['me'],
    queryFn: () => execute(me),
  })

  return { data, refetch, isPending }
}
