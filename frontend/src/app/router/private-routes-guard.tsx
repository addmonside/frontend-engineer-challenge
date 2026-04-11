import { redirect } from 'react-router'
import { accountRouterContext, getAccount } from '@/services/account'
import { routes } from '@/shared/model'

export async function privateRoutesGuard({ context }) {
  const user = await getAccount()
  if (!user) {
    throw redirect(routes.LOGIN)
  }
  context.set(accountRouterContext, user)
}
