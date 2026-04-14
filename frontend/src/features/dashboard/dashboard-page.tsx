import { useAccountQuery } from '@/services/account/use-account-query'
import { routes } from '@/shared/model'
import { Link } from '@/shared/ui/kit/link'

function DashboardPage() {
  const { data, isPending } = useAccountQuery()
  return (
    <div>
      <h1>Dashboard</h1>

      {isPending ? 'loading' : data?.email}
      <Link to={routes.AUTH_LOGIN}>login</Link>
    </div>
  )
}

export const Component = DashboardPage
