import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useLoginMutation } from './use-login-mutation'
import { getEmailSchema, getPasswordRangeSchema } from './validation'

const schema = z.object({
  email: getEmailSchema(),
  password: getPasswordRangeSchema(),
})

export function useLoginForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const { mutate, isPending, error } = useLoginMutation({
    onSuccess(token) {
      localStorage.setItem('token', token)
      onSuccess?.()
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => mutate({ input: value }),
  })

  return {
    form,
    isLoading: isPending,
    error,
  }
}
