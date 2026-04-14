import { useMutation } from '@tanstack/react-query'
import z from 'zod'
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
    }
  }
`)

const responseSchema = z.object({
  accessToken: z.string().regex(/^[\w-]+\.[\w-]+\.[\w-]+$/),
})

export function useLoginMutation({ onSuccess }: { onSuccess: (token: string) => void }) {
  const { mutate, isPending, error } = useMutation<
    AuthenticateMutation,
    ApiError,
    AuthenticateMutationVariables
  >({
    mutationFn: (variables: AuthenticateMutationVariables) => execute(authLogin, variables),
    onSuccess(data) {
      const result = responseSchema.safeParse(data.authenticate)
      if (!result.success) {
        throw new ApiError({
          status: 400,
          data: { message: 'Не удалось войти. Попробуйте ещё раз.' },
        })
      }
      onSuccess(result.data.accessToken)
    },
  })

  return {
    mutate,
    isPending,
    error,
  }
}
