import { UtilityLayoutPage } from '@/services/utility'
import { Alert } from '@/shared/ui/kit/alert'
import { Button } from '@/shared/ui/kit/button'
import { Field, FieldGroup } from '@/shared/ui/kit/field'
import { PasswordInput } from '@/shared/ui/password-input'
import { useRestoringAccessConfirmForm } from '../model/use-restoring-access-confirm-form'

export function AuthRestoringAccessConfirmForm({
  token,
  onSuccess,
  onError,
}: Readonly<{ token: string; onSuccess: () => void; onError: () => void }>) {
  const { form, isLoading, error } = useRestoringAccessConfirmForm({ token, onSuccess, onError })

  return (
    <form
      id='auth-restoring-access-confirm-form'
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
          name='password'
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field
                variant='auth'
                data-invalid={isInvalid}
              >
                <Field.Label htmlFor='auth-restoring-access-confirm-form-password'>
                  Пароль
                </Field.Label>
                <Field.Content>
                  <PasswordInput
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    id='auth-restoring-access-confirm-form-password'
                    data-testid='auth-restoring-access-confirm-form-password'
                    placeholder='Введите пароль'
                    variant='auth'
                    autoComplete='new-password'
                  />
                </Field.Content>
                {isInvalid && <Field.Error errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name='passwordConfirmation'
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field
                variant='auth'
                data-invalid={isInvalid}
              >
                <Field.Label htmlFor='auth-restoring-access-confirm-form-password-confirmation'>
                  Подтвердите пароль
                </Field.Label>
                <Field.Content>
                  <PasswordInput
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    id='auth-restoring-access-confirm-form-password-confirmation'
                    data-testid='auth-restoring-access-confirm-form-password-confirmation'
                    placeholder='Введите пароль'
                    variant='auth'
                    autoComplete='new-password'
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
          data-testid='auth-restoring-access-confirm-form-submit'
          disabled={isLoading}
          type='submit'
        >
          Изменить пароль
        </Button>
      </UtilityLayoutPage.Actions>
    </form>
  )
}
