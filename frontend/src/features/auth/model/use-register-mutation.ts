import { useMutation } from '@tanstack/react-query'
import { execute, graphql, type RegisterMutationVariables } from '@/shared/gql'

export const authRegister = graphql(`
  mutation register($input: RegisterUserInput!) {
    register(input: $input) {
      id
      email
      isActive
    }
  }
`)

export function useRegisterMutation({ onSuccess }: { onSuccess: () => void }) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (variables: RegisterMutationVariables) => execute(authRegister, variables),
    onSuccess,
  })

  return {
    mutate,
    isPending,
    error,
  }
}
