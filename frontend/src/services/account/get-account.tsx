import { execute, queryClient } from '@/shared/gql'
import { config } from '@/shared/model'
import { me } from './use-account-query'
import { accountQueryResponseSchema } from './validation'

export async function getAccount() {
  const data = await queryClient.fetchQuery({
    queryKey: ['account'],
    queryFn: () =>
      execute(me)
        .then(res => {
          const result = accountQueryResponseSchema.safeParse(res?.me)
          return result.success ? result.data : null
        })
        .catch(() => null),
    staleTime: config.QUERY_CONFIG.staleTime,
  })
  return data
}
