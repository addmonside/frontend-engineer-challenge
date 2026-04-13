import { useMemo, useState } from 'react'
import { UtilityLayoutPage } from '@/services/utility'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left-icon.svg'
import { routes } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'
import { AuthRestoringAccessRequestForm } from './ui/auth-restoring-access-request-form'

function AuthRestoringAccessRequestPage() {
  const [isSuccess, setIsSuccess] = useState(false)
  const title = useMemo(
    () => (isSuccess ? 'Проверьте свою почту' : 'Восстановление пароля'),
    [isSuccess]
  )
  const description = useMemo(
    () =>
      isSuccess
        ? 'Мы отправили на почту письмо с ссылкой для восстановления пароля'
        : 'Укажите адрес почты на который был зарегистрирован аккаунт',
    [isSuccess]
  )

  return (
    <UtilityLayoutPage>
      <UtilityLayoutPage.Header>
        <UtilityLayoutPage.Media>
          {!isSuccess && (
            <Link to={routes.AUTH_LOGIN}>
              <ArrowLeftIcon />
            </Link>
          )}
        </UtilityLayoutPage.Media>
        <UtilityLayoutPage.Title>{title}</UtilityLayoutPage.Title>
        <UtilityLayoutPage.Description>{description}</UtilityLayoutPage.Description>
      </UtilityLayoutPage.Header>
      {!isSuccess && <AuthRestoringAccessRequestForm onSuccess={() => setIsSuccess(true)} />}
      {isSuccess && (
        <UtilityLayoutPage.Actions>
          <Link
            to={routes.AUTH_LOGIN}
            variant='default-button'
          >
            Назад в авторизацию
          </Link>
        </UtilityLayoutPage.Actions>
      )}
    </UtilityLayoutPage>
  )
}

export const Component = AuthRestoringAccessRequestPage
