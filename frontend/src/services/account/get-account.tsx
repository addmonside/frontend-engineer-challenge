import { execute, queryClient } from '@/shared/gql'
import { me } from './gql/use-me-query'

export async function getAccount() {
  const data = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: () => execute(me),
  })
  return data.me
}
