import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  useRouter,
} from '@tanstack/react-router'
import { reportError } from '@/reportError'
import { NotFound, PageErrorFallback } from '@/shared/ui'

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
  head: ({ match }) => {
    // 当前 Router 用内部字段 _notFound 标记未匹配路径；升级时需运行 404 回归测试。
    const isNotFound = match._notFound || match.status === 'notFound'
    return {
      meta: [
        {
          title: isNotFound
            ? '404 - Page Not Found | React App Template'
            : 'React App Template',
        },
        {
          name: 'description',
          content: isNotFound
            ? 'The page you are looking for does not exist.'
            : 'A React application template with typed routing, shared state, and async data examples.',
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
