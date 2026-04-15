import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useRestoringAccessConfirmMutation } from './use-restoring-access-confirm-mutation'
import { getPasswordSchema } from './validation'

const schema = z
  .object({
    token: z.string(),
    password: getPasswordSchema(),
    passwordConfirmation: z.string('Подтверждение пароля не может быть пустым'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirmation'],
  })

export function useRestoringAccessConfirmForm({
  token,
  onSuccess,
  onError,
}: {
  token: string
  onSuccess: () => void
  onError: () => void
}) {
  const { mutate, isPending, error } = useRestoringAccessConfirmMutation({
    onSuccess,
    onError,
  })

  const form = useForm({
    defaultValues: {
      token,
      password: '',
      passwordConfirmation: '',
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value: { token, password } }) =>
      mutate({ input: { token, newPassword: password } }),
  })

  return {
    form,
    isLoading: isPending,
    error,
  }
}
