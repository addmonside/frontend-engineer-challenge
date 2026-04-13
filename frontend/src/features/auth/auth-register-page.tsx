import { routes } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'
import { AuthLayoutPage } from './ui/auth-layout-page'
import { AuthRegisterForm } from './ui/auth-register-form'

function AuthRegisterPage() {
  return (
    <AuthLayoutPage>
      <AuthLayoutPage.Header>Регистрация в системе</AuthLayoutPage.Header>
      <AuthRegisterForm />
      <AuthLayoutPage.Footer>
        Уже есть аккаунт? <Link to={routes.AUTH_LOGIN}>Войти</Link>
      </AuthLayoutPage.Footer>
    </AuthLayoutPage>
  )
}

export const Component = AuthRegisterPage
