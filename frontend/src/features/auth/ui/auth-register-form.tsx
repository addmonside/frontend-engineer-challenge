import { useNavigate } from 'react-router'
import { routes } from '@/shared/model'
import { Alert } from '@/shared/ui/kit/alert'
import { Button } from '@/shared/ui/kit/button'
import { Field, FieldGroup } from '@/shared/ui/kit/field'
import { Input } from '@/shared/ui/kit/input'
import { Link } from '@/shared/ui/kit/link'
import { PasswordInput } from '@/shared/ui/password-input'
import { useRegisterForm } from '../model/use-register-form'
import { AuthLayoutPage } from './auth-layout-page'

export function AuthRegisterForm() {
  const navigate = useNavigate()
  const { form, isLoading, error } = useRegisterForm({
    onSuccess() {
      navigate(routes.AUTH_LOGIN)
    },
  })

  return (
    <form
      id='auth-register-form'
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
                <Field.Label htmlFor='auth-register-form-email'>email</Field.Label>
                <Field.Content>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    id='auth-register-form-email'
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
                <Field.Label htmlFor='auth-register-form-password'>Пароль</Field.Label>
                <Field.Content>
                  <PasswordInput
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    id='auth-register-form-password'
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
                <Field.Label htmlFor='auth-register-form-password-confirmation'>
                  Подтвердите пароль
                </Field.Label>
                <Field.Content>
                  <PasswordInput
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    id='auth-register-form-password'
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
      <AuthLayoutPage.Actions>
        <Button
          disabled={isLoading}
          type='submit'
        >
          Зарегистрироваться
        </Button>
        <p className='text-muted text-center text-xs text-pretty'>
          Зарегистрировавшись, пользователь принимает условия{' '}
          <Link
            to={routes.DOCS_OFFER}
            variant='secondary'
            className='text-xs'
          >
            договора оферты
          </Link>{' '}
          и{' '}
          <Link
            to={routes.DOCS_POLICY}
            variant='secondary'
            className='text-xs'
          >
            политики конфиденциальности
          </Link>
        </p>
      </AuthLayoutPage.Actions>
    </form>
  )
}
