export const routes = {
  ROOT: '/',

  // auth
  LOGIN: '/login',
  REGISTER: '/register',
  RECOVERY: '/recovery',

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
