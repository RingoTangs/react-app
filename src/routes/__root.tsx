import type { ErrorComponentProps } from '@tanstack/react-router'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { reportError } from '@/app/monitoring/reportError'
import { RouterDevtools } from '@/app/router/RouterDevtools'
import { PageErrorFallback } from '@/shared/ui'

const RootComponent: React.FC = () => {
  return (
    <>
      <Outlet />
      <RouterDevtools />
    </>
  )
}

const RootErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
  reset,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset: resetQueries }) => (
        <PageErrorFallback
          error={error}
          resetErrorBoundary={() => {
            resetQueries()
            reset()
          }}
        />
      )}
    </QueryErrorResetBoundary>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  onCatch: (error) => {
    reportError(error)
  },
})
