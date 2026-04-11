import { Outlet } from 'react-router'

function AuthLayout() {
  return (
    <div>
      Hello "/auth"!
      <Outlet />
    </div>
  )
}

export const Component = AuthLayout
