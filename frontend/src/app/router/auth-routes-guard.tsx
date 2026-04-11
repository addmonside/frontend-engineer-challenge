import { redirect } from 'react-router'
import { accountRouterContext, getAccount } from '@/services/account'
import { routes } from '@/shared/model'

export async function authRoutesGuard({ context }) {
  const user = await getAccount()
  if (user) {
    context.set(accountRouterContext, user)
    throw redirect(routes.DASHBOARD)
  }
}
