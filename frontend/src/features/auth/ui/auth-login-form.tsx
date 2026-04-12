import { Button } from '@/shared/ui/kit/button'
import { Field, FieldGroup } from '@/shared/ui/kit/field'
import { Input } from '@/shared/ui/kit/input'
import { PasswordInput } from '@/shared/ui/password-input'
import { useLogin } from '../model/use-login'

export function AuthLoginForm() {
  const { form, isLoading, error } = useLogin()

  return (
    <form
      id='auth-login-form'
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      {!!error && <output>{error.message}</output>}
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
                <Field.Label htmlFor='auth-login-form-email'>email</Field.Label>
                <Field.Content>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    id='auth-login-form-email'
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
        <form.Field
          name='password'
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field
                variant='auth'
                data-invalid={isInvalid}
              >
                <Field.Label htmlFor='auth-login-form-email'>email</Field.Label>
                <Field.Content>
                  <PasswordInput
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    id='auth-login-form-password'
                    placeholder='Введите пароль'
                    variant='auth'
                    autoComplete='password'
                  />
                </Field.Content>
                {isInvalid && <Field.Error errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <Button
          disabled={isLoading}
          type='submit'
        >
          submit
        </Button>
      </FieldGroup>
    </form>
  )
}
