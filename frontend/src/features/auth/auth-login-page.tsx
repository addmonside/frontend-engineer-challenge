import { routes } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'
import { AuthLayoutPage } from './ui/auth-layout-page'
import { AuthLoginForm } from './ui/auth-login-form'

function AuthLoginPage() {
  return (
    <AuthLayoutPage>
      <AuthLayoutPage.Header>Войти в систему</AuthLayoutPage.Header>
      <AuthLoginForm />
      <AuthLayoutPage.Footer>
        Еще не зарегистрированы? <Link to={routes.AUTH_REGISTER}>Регистрация</Link>
      </AuthLayoutPage.Footer>
    </AuthLayoutPage>
  )
}

export const Component = AuthLoginPage
