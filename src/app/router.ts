import { createRouter } from '@tanstack/react-router'
import { queryClient } from '@/app/queryClient'
import { routeTree } from '@/routeTree.gen'
import { NotFound } from '@/shared/ui'

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
})
