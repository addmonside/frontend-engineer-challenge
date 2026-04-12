import { Field, FieldGroup } from '@/shared/ui/kit/field'
import { Input } from '@/shared/ui/kit/input'
import { PasswordInput } from '@/shared/ui/password-input'

export function AuthLoginForm() {
  return (
    <form id='auth-login-form'>
      <FieldGroup>
        <Field variant='auth'>
          <Field.Label htmlFor='auth-login-form-email'>email</Field.Label>
          <Field.Content>
            <Input
              id='auth-login-form-email'
              placeholder='Введите e-mail'
              variant='auth'
            />
          </Field.Content>
          <Field.Error>error</Field.Error>
        </Field>
        <Field variant='auth'>
          <Field.Label htmlFor='auth-login-form-password'>password</Field.Label>
          <Field.Content>
            <PasswordInput
              id='auth-login-form-password'
              placeholder='Введите e-mail'
              variant='auth'
            />
          </Field.Content>
          <Field.Error>error</Field.Error>
        </Field>
      </FieldGroup>
    </form>
  )
}
