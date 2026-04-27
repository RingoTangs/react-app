import type { RouterHistory } from '@tanstack/react-router'
import type { AppRouterContext } from './context'
import { createRouter } from '@tanstack/react-router'
import { appQueryClient } from '@/app/query/queryClient'
import { routeTree } from '@/routeTree.gen'
import { NotFound } from '@/shared/ui'

interface CreateAppRouterOptions {
  history?: RouterHistory
}

export const createAppRouter = (
  queryClient: AppRouterContext['queryClient'],
  options?: CreateAppRouterOptions,
) => {
  return createRouter({
    routeTree,
    context: {
      queryClient,
    },
    history: options?.history,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
  })
}

export const router = createAppRouter(appQueryClient)

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
