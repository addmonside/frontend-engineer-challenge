import { routes } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'
import { AuthLayoutPage } from './ui/auth-layout-page'
import { AuthLoginForm } from './ui/auth-login-form'

function AuthLoginPage() {
  return (
    <AuthLayoutPage
      header='Войти в систему'
      footer={
        <>
          Еще не зарегистрированы? <Link to={routes.REGISTER}>Регистрация</Link>
        </>
      }
    >
      <AuthLoginForm />
    </AuthLayoutPage>
  )
}

export const Component = AuthLoginPage
