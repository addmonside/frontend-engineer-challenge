import { execute, queryClient } from '@/shared/gql'
import { me } from './use-account-query'

export async function getAccount() {
  const data = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: () =>
      execute(me)
        .then(res => ({
          me: res.me,
        }))
        .catch(() => null),
  })
  return data
}
