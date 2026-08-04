import type { DefaultOptions } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

export const defaultQueryOptions: DefaultOptions = {
  // Keep global defaults conservative and product-agnostic.
  // Feature-level policies should be set in feature queryOptions().
  queries: {
    // Treat data as fresh briefly to reduce duplicate fetches across remounts.
    staleTime: 30_000,
    // Match TanStack Query's default inactive cache lifetime explicitly.
    gcTime: 5 * 60 * 1000,
    // Retry read requests once without amplifying backend failures too much.
    retry: 1,
    // Avoid noisy refetches while switching between tabs and devtools.
    refetchOnWindowFocus: false,
    // Let stale data self-heal when the network connection comes back.
    refetchOnReconnect: true,
  },
  mutations: {
    // Do not retry writes by default to avoid duplicate submissions.
    retry: 0,
  },
}

export const createAppQueryClient = () => {
  return new QueryClient({
    defaultOptions: defaultQueryOptions,
  })
}

export const appQueryClient = createAppQueryClient()
