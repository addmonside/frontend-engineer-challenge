import { useForm } from '@tanstack/react-form'
import { useNavigate } from 'react-router'
import z from 'zod'
import { routes } from '@/shared/model'
import { useRegisterMutation } from '../gql/auth-register'

const schema = z.object({
  email: z
    .email('Invalid email address.')
    .min(5, 'Email must be at least 5 characters.')
    .max(64, 'Email must be at most 64 characters.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(64, 'Password must be at most 64 characters.'),
})

export function useRegister() {
  const navigate = useNavigate()
  const { mutate, isPending, error } = useRegisterMutation({
    onSuccess() {
      navigate(routes.LOGIN)
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
