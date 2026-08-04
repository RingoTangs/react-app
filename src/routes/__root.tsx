import type { QueryClient } from '@tanstack/react-query'
import type { ErrorComponentProps } from '@tanstack/react-router'
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

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Outlet,
  errorComponent: RootErrorComponent,
  onCatch: (error) => {
    reportError(error)
  },
})
