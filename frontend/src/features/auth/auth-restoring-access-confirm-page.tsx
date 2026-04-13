import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { UtilityLayoutPage } from '@/services/utility'
import { routes } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'
import { AuthRestoringAccessConfirmForm } from './ui/auth-restoring-access-confirm-form'

type Status = 'idle' | 'success' | 'error'
const texts = new Map<Status, { title: string; description: string }>([
  [
    'idle',
    {
      title: 'Задайте пароль',
      description: 'Напишите новый пароль, который будете использовать для входа',
    },
  ],
  [
    'success',
    {
      title: 'Пароль был восстановлен',
      description: 'Перейдите на страницу авторизации, чтобы войти в систему с новым паролем',
    },
  ],
  [
    'error',
    {
      title: 'Пароль не был восстановлен',
      description:
        'По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте ещё раз через некоторое время.',
    },
  ],
])

function AuthRestoringAccessPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const text = texts.has(status) ? texts.get(status) : texts.get('idle')

  return (
    <UtilityLayoutPage>
      <UtilityLayoutPage.Header>
        <UtilityLayoutPage.Title>{text?.title}</UtilityLayoutPage.Title>
        <UtilityLayoutPage.Description>{text?.description}</UtilityLayoutPage.Description>
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
