import { createBrowserRouter, href, redirect } from 'react-router'
import { routes } from '@/shared/model'
import { Providers } from '../providers'
import { authRoutesGuard } from './auth-routes-guard'
import { privateRoutesGuard } from './private-routes-guard'

export const router = createBrowserRouter([
  {
    element: <Providers />,
    children: [
      {
        lazy: () => import('@/features/auth/auth-layout'),
        middleware: [authRoutesGuard],
        children: [
          {
            path: routes.LOGIN,
            lazy: async () => import('@/features/auth/auth-login-page'),
          },
          {
            path: routes.REGISTER,
            middleware: [authRoutesGuard],
            lazy: async () => import('@/features/auth/auth-register-page'),
          },
        ],
      },
      {
        path: routes.DASHBOARD,
        middleware: [privateRoutesGuard],
        // loader: dashboardLoader,
        lazy: async () => import('@/features/dashboard/dashboard-page'),
      },

      {
        path: routes.ERROR,
        lazy: () => import('@/features/utility/error-page'),
      },
      {
        path: '*',
        loader: () => redirect(href(routes.ERROR, { errorId: '404' })),
      },
    ],
  },
])
