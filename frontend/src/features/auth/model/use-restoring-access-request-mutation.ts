import { useMutation } from '@tanstack/react-query'
import { execute, graphql, type RequestPasswordResetMutationVariables } from '@/shared/gql'

export const restoringAccessRequest = graphql(`
  mutation requestPasswordReset($input: RequestResetInput!) {
    requestPasswordReset(input: $input) {
      ok
      deliveryMode
      resetUrlPreview
    }
  }
`)

export function useRestoringAccessRequestMutation({ onSuccess }: { onSuccess: () => void }) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (variables: RequestPasswordResetMutationVariables) =>
      execute(restoringAccessRequest, variables),
    onSuccess,
  })

  return {
    mutate,
    isPending,
    error,
  }
}
