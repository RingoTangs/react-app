import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { reportError } from '@/app/monitoring/reportError'
import { RouterDevtools } from '@/app/router/RouterDevtools'
import { PageErrorFallback } from '@/components/builtin'

const RootComponent: React.FC = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={PageErrorFallback}
          onError={(error, info) => {
            reportError(error, info)
          }}
        >
          <Outlet />
          <RouterDevtools />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
