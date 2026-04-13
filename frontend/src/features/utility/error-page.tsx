import { useParams } from 'react-router'
import { UtilityLayoutPage } from '@/services/utility'
import { routes, type RoutesParams } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'

const errors: Record<string, { title: string; description: string }> = {
  '404': {
    title: 'Ошибка 404',
    description: 'Что-то пошло не так. Страница, которую вы запрашиваете, не существует.',
  },

  '403': {
    title: 'Ошибка 403',
    description: 'Доступ запрещен. У вас не достаточно прав для доступа к странице.',
  },
}

const ErrorPage = () => {
  const { errorId = '404' } = useParams<RoutesParams[typeof routes.ERROR]>()
  const { title, description } = errors[errorId]

  return (
    <UtilityLayoutPage>
      <UtilityLayoutPage.Header>
        <UtilityLayoutPage.Title>{title}</UtilityLayoutPage.Title>
        <UtilityLayoutPage.Description>{description}</UtilityLayoutPage.Description>
      </UtilityLayoutPage.Header>
      <UtilityLayoutPage.Actions>
        <Link
          to={routes.DASHBOARD}
          tabIndex={-1}
          variant='secondary-button'
        >
          Перейти на главную
        </Link>
      </UtilityLayoutPage.Actions>
    </UtilityLayoutPage>
  )
}

export const Component = ErrorPage
