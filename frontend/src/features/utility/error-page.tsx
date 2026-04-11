import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { routes, type RoutesParams } from '@/shared/model'

const errors = new Map<string | undefined, { title: string; description: string }>([
  [
    '404',
    {
      title: 'Ошибка 404',
      description: 'Что-то пошло не так. Страница, которую вы запрашиваете, не существует.',
    },
  ],
  [
    '403',
    {
      title: 'Ошибка 403',
      description: 'Доступ запрещен. У вас не достаточно прав для доступа к странице.',
    },
  ],
])

const ErrorPage = () => {
  const { errorId } = useParams<RoutesParams[typeof routes.ERROR]>()
  const { title, description } = useMemo(
    () => (errors.has(errorId) ? errors.get(errorId) : errors.get('404')),
    [errorId]
  )
  return (
    <section>
      <header>
        <strong>{title}</strong>
        <span>{description}</span>
      </header>
      <div>
        <Link
          to={routes.DASHBOARD}
          tabIndex={-1}
        >
          <span>Перейти на главную</span>
        </Link>
      </div>
    </section>
  )
}

export const Component = ErrorPage
