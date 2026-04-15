import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useRegisterMutation } from './use-register-mutation'
import { getEmailSchema, getPasswordSchema } from './validation'

const schema = z
  .object({
    email: getEmailSchema(),
    password: getPasswordSchema(),
    passwordConfirmation: z.string('Подтверждение пароля не может быть пустым'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirmation'],
  })

export function useRegisterForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const { mutate, isPending, error } = useRegisterMutation({
    onSuccess() {
      onSuccess?.()
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value: { email, password } }) => mutate({ input: { email, password } }),
  })

  return {
    form,
    isLoading: isPending,
    error,
  }
}
