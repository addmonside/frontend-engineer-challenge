import { routes } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'
import { AuthLayoutPage } from './ui/auth-layout-page'
import { AuthRegisterForm } from './ui/auth-register-form'

function AuthRegisterPage() {
  return (
    <AuthLayoutPage
      header='Регистрация в системе'
      footer={
        <>
          Уже есть аккаунт? <Link to={routes.LOGIN}>Войти</Link>
        </>
      }
    >
      <AuthRegisterForm />
    </AuthLayoutPage>
  )
}

export const Component = AuthRegisterPage
