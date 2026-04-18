import type { DefaultOptions } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appEnv } from '@/app/config/env'

const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 30_000,
    retry: 1,
    refetchOnWindowFocus: false,
  },
}

const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
})

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {appEnv.isDev ? (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom"
          buttonPosition="bottom-right"
        />
      ) : null}
    </QueryClientProvider>
  )
}
