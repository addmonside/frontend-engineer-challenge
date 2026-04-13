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
        path: routes.ROOT,
        loader: () => redirect(href(routes.DASHBOARD)),
      },
      {
        middleware: [authRoutesGuard],
        children: [
          {
            lazy: () => import('@/features/auth/auth-layout'),
            children: [
              {
                path: routes.AUTH_LOGIN,
            lazy: async () => import('@/features/auth/auth-login-page'),
          },
          {
                path: routes.AUTH_REGISTER,
                lazy: async () => import('@/features/auth/auth-register-page'),
              },
            ],
          },
          {
          },
        ],
      },
      {
        middleware: [privateRoutesGuard],
        children: [
          {
            path: routes.DASHBOARD,
        // loader: dashboardLoader,
        lazy: async () => import('@/features/dashboard/dashboard-page'),
          },
        ],
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
