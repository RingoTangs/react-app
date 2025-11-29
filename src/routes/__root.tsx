import { createRootRoute, Outlet } from '@tanstack/react-router'

const RootComponent: React.FC = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
