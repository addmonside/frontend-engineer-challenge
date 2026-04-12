import { useMutation } from '@tanstack/react-query'
import { execute, graphql } from '@/shared/gql'
import type { AuthenticateMutationVariables } from '@/shared/gql/gen/graphql'

export const authLogin = graphql(`
  mutation authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      accessToken
      userId
    }
  }
`)

export function useLoginMutation({ onSuccess }: { onSuccess: (token: string) => void }) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (variables: AuthenticateMutationVariables) => execute(authLogin, variables),
    onSuccess(data) {
      onSuccess(data.authenticate.accessToken)
    },
  })

  return {
    mutate,
    isPending,
    error,
  }
}
