export const routes = {
  ROOT: '/',

  // auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_RESTORE_ACCESS_REQUEST: '/auth/recovery',
  AUTH_RESTORE_ACCESS_CONFIRM: '/reset-password', // ссылка с бека такая

  DOCS_OFFER: '/docs/offer',
  DOCS_POLICY: '/docs/policy',

  DASHBOARD: '/dashboard',

  ERROR: '/errors/:errorId',
} as const

export type RoutesParams = {
  [routes.ERROR]: {
    errorId: string
  }
}

declare module 'react-router' {
  interface Register {
    params: RoutesParams
  }
}
