import type { QueryClient } from '@tanstack/react-query'
import type { RouterHistory } from '@tanstack/react-router'
import { createRouter } from '@tanstack/react-router'
import { queryClient } from '@/app/queryClient'
import { routeTree } from '@/routeTree.gen'
import { NotFound } from '@/shared/ui'

export interface AppRouterContext {
  queryClient: QueryClient
}

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

export const router = createAppRouter(queryClient)

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
