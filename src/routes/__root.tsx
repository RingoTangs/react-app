import { createRootRoute, Outlet } from '@tanstack/react-router'
import PageErrorFallback from '@/components/PageErrorFallback'

const RootComponent: React.FC = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={PageErrorFallback}>
          <Outlet />
          <TanStackRouterDevtools position="bottom-left" />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
