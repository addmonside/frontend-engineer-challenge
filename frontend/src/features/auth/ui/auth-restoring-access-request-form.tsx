import { UtilityLayoutPage } from '@/services/utility'
import { Alert } from '@/shared/ui/kit/alert'
import { Button } from '@/shared/ui/kit/button'
import { Field, FieldGroup } from '@/shared/ui/kit/field'
import { Input } from '@/shared/ui/kit/input'
import { useRestoringAccessRequestForm } from '../model/use-restoring-access-request-form'

export function AuthRestoringAccessRequestForm({ onSuccess }: Readonly<{ onSuccess: () => void }>) {
  const { form, isLoading, error } = useRestoringAccessRequestForm({ onSuccess })

  return (
    <form
      id='auth-restoring-access-request-form'
      className='contents'
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      {!!error && (
        <output>
          <Alert variant='destructive'>
            <Alert.Description>{error.message}</Alert.Description>
          </Alert>
        </output>
      )}
      <FieldGroup>
        <form.Field
          name='email'
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field
                variant='auth'
                data-invalid={isInvalid}
              >
                <Field.Label htmlFor='auth-restoring-access-request-form-email'>email</Field.Label>
                <Field.Content>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    id='auth-restoring-access-request-form-email'
                    data-testid='auth-restoring-access-request-form-email'
                    placeholder='Введите e-mail'
                    variant='auth'
                    autoComplete='email'
                  />
                </Field.Content>
                {isInvalid && <Field.Error errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
      <UtilityLayoutPage.Actions>
        <Button
          variant='secondary'
          disabled={isLoading}
          type='submit'
          data-testid='auth-restoring-access-request-form-submit'
        >
          Восстановить пароль
        </Button>
      </UtilityLayoutPage.Actions>
    </form>
  )
}
