import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  useRouterState,
} from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import { reportError } from '@/app/reportError'
import { GeneralError } from '@/features/errors/GeneralError'
import { NotFoundError } from '@/features/errors/NotFoundError'

const RootShell = ({ children }: { children: React.ReactNode }) => {
  const matches = useRouterState({ select: (state) => state.matches })

  useLayoutEffect(() => {
    const bootstrapTitle = document.getElementById('app-bootstrap-title')
    const routeTitle = document.head.querySelector(
      'title:not(#app-bootstrap-title)',
    )
    // 路由标题提交后再移除静态标题，避免启动阶段出现空标题。
    if (routeTitle) bootstrapTitle?.remove()
  }, [matches])

  return (
    <>
      <HeadContent />
      {children}
    </>
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
  shellComponent: RootShell,
  errorComponent: GeneralError,
  notFoundComponent: NotFoundError,
  onCatch: (error) => {
    reportError(error)
  },
})
