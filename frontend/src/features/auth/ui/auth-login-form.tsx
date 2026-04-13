import { useNavigate } from 'react-router'
import { routes } from '@/shared/model'
import { Alert } from '@/shared/ui/kit/alert'
import { Button } from '@/shared/ui/kit/button'
import { Field, FieldGroup } from '@/shared/ui/kit/field'
import { Input } from '@/shared/ui/kit/input'
import { Link } from '@/shared/ui/kit/link'
import { PasswordInput } from '@/shared/ui/password-input'
import { useLoginForm } from '../model/use-login-form'
import { AuthLayoutPage } from './auth-layout-page'

export function AuthLoginForm() {
  const navigate = useNavigate()
  const { form, isLoading, error } = useLoginForm({
    onSuccess() {
      navigate(routes.DASHBOARD)
    },
  })

  return (
    <form
      id='auth-login-form'
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
                <Field.Label htmlFor='auth-login-form-password'>Пароль</Field.Label>
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
                    autoComplete='current-password'
                  />
                </Field.Content>
                {isInvalid && <Field.Error errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
      <AuthLayoutPage.Actions>
        <Button
          disabled={isLoading}
          type='submit'
        >
          Войти
        </Button>
        <Link to={routes.AUTH_RESTORE_ACCESS_REQUEST}>Забыли пароль?</Link>
      </AuthLayoutPage.Actions>
    </form>
  )
}
