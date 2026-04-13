import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useRestoringAccessRequestMutation } from './use-restoring-access-request-mutation'
import { getEmailVallidationSchema } from './validation'

const schema = z.object({
  email: getEmailVallidationSchema(),
})

export function useRestoringAccessRequestForm({ onSuccess }: { onSuccess: () => void }) {
  const { mutate, isPending, error } = useRestoringAccessRequestMutation({
    onSuccess,
  })

  const form = useForm({
    defaultValues: {
      email: '',
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
