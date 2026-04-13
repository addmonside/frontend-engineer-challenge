import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { UtilityLayoutPage } from '@/services/utility'
import { routes } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'
import { AuthRestoringAccessConfirmForm } from './ui/auth-restoring-access-confirm-form'

function AuthRestoringAccessPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const title = useMemo(
    () =>
      status === 'idle'
        ? 'Задайте пароль'
        : status === 'success'
          ? 'Пароль был восстановлен'
          : 'Пароль не был восстановлен',
    [status]
  )
  const description = useMemo(
    () =>
      status === 'idle'
        ? 'Напишите новый пароль, который будете использовать для входа'
        : status === 'success'
          ? 'Перейдите на страницу авторизации, чтобы войти в систему с новым паролем'
          : 'По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте ещё раз через некоторое время.',
    [status]
  )

  return (
    <UtilityLayoutPage>
      <UtilityLayoutPage.Header>
        <UtilityLayoutPage.Title>{title}</UtilityLayoutPage.Title>
        <UtilityLayoutPage.Description>{description}</UtilityLayoutPage.Description>
      </UtilityLayoutPage.Header>
      {status === 'idle' && (
        <AuthRestoringAccessConfirmForm
          token={token || ''}
          onSuccess={() => setStatus('success')}
          onError={() => setStatus('error')}
        />
      )}
      {status !== 'idle' && (
        <UtilityLayoutPage.Actions>
          <Link
            to={routes.AUTH_LOGIN}
            variant='default-button'
          >
            Назад в авторизацию
          </Link>
          {status === 'error' && (
            <Link
              to={routes.AUTH_RESTORE_ACCESS_REQUEST}
              variant='secondary-button'
            >
              Попробовать заново
            </Link>
          )}
        </UtilityLayoutPage.Actions>
      )}
    </UtilityLayoutPage>
  )
}

export const Component = AuthRestoringAccessPage
