import { useMutation } from '@tanstack/react-query'
import { execute, graphql, type ResetPasswordMutationVariables } from '@/shared/gql'

export const restoringAccessConfirm = graphql(`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`)

export function useRestoringAccessConfirmMutation({
  onSuccess,
  onError,
}: {
  onSuccess: () => void
  onError: () => void
}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (variables: ResetPasswordMutationVariables) =>
      execute(restoringAccessConfirm, variables),
    onSuccess,
    onError,
  })

  return {
    mutate,
    isPending,
    error,
  }
}
