import type { ErrorComponentProps } from '@tanstack/react-router'
import type { AppRouterContext } from '@/app/router'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { reportError } from '@/app/reportError'
import { PageErrorFallback } from '@/shared/ui'

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

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: Outlet,
  errorComponent: RootErrorComponent,
  onCatch: (error) => {
    reportError(error)
  },
})
