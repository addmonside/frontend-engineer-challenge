import { createBrowserRouter, href, redirect } from 'react-router'
import { routes } from '@/shared/model'
import { Loader } from '@/shared/ui/loader'
import { Providers } from '../providers'
import { authRoutesGuard } from './auth-routes-guard'
import { privateRoutesGuard } from './private-routes-guard'

export const router = createBrowserRouter([
  {
    element: <Providers />,
    HydrateFallback: () => (
      <div className='flex min-h-dvh items-center justify-center'>
        <Loader />
      </div>
    ),
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
            lazy: async () => import('@/features/utility/utility-layout'),
            children: [
              {
                path: routes.AUTH_RESTORE_ACCESS_REQUEST,
                lazy: async () => import('@/features/auth/auth-restoring-access-request-page'),
              },
              {
                path: routes.AUTH_RESTORE_ACCESS_CONFIRM,
                lazy: async () => import('@/features/auth/auth-restoring-access-confirm-page'),
              },
            ],
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
        lazy: async () => import('@/features/utility/utility-layout'),
        children: [
          {
            path: routes.ERROR,
            lazy: () => import('@/features/utility/error-page'),
          },
        ],
      },
      {
        path: '*',
        loader: () => redirect(href(routes.ERROR, { errorId: '404' })),
      },
    ],
  },
])
