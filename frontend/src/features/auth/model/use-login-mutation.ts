import { useMutation } from '@tanstack/react-query'
import {
  ApiError,
  type AuthenticateMutation,
  type AuthenticateMutationVariables,
  execute,
  graphql,
} from '@/shared/gql'

export const authLogin = graphql(`
  mutation authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      accessToken
      userId
    }
  }
`)

export function useLoginMutation({ onSuccess }: { onSuccess: (token: string) => void }) {
  const { mutate, isPending, error } = useMutation<
    AuthenticateMutation,
    ApiError,
    AuthenticateMutationVariables
  >({
    mutationFn: (variables: AuthenticateMutationVariables) => execute(authLogin, variables),
    onSuccess(data) {
      onSuccess(data.authenticate.accessToken)
    },
    onError(error: ApiError) {
      console.error(error)
    },
  })

  return {
    mutate,
    isPending,
    error,
  }
}
