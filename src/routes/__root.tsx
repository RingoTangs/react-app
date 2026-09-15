import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, useRouter } from '@tanstack/react-router'
import { reportError } from '@/reportError'
import { PageErrorFallback } from '@/shared/ui'

const RootErrorComponent: React.FC = () => {
  const router = useRouter()

  return (
    <PageErrorFallback
      onRetry={() => {
        router.invalidate().catch(reportError)
      }}
      onBackHome={() => {
        router.navigate({ to: '/' }).catch(reportError)
      }}
    />
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  errorComponent: RootErrorComponent,
  onCatch: (error) => {
    reportError(error)
  },
})
