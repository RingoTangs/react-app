import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  useRouter,
} from '@tanstack/react-router'
import { reportError } from '@/app/reportError'
import { NotFound, PageErrorFallback } from '@/components'

const RootNotFoundComponent: React.FC = () => {
  const router = useRouter()

  return (
    <NotFound
      onBackHome={() => {
        router.navigate({ to: '/' }).catch(reportError)
      }}
    />
  )
}

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
  head: () => {
    return {
      meta: [
        {
          title: import.meta.env.VITE_SITE_NAME,
        },
        {
          name: 'description',
          content:
            'A React application template with typed routing, shared state, and async data examples.',
        },
      ],
    }
  },
  shellComponent: ({ children }) => (
    <>
      <HeadContent />
      {children}
    </>
  ),
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFoundComponent,
  onCatch: (error) => {
    reportError(error)
  },
})
