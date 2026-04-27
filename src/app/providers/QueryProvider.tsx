import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appEnv } from '@/config/env'
interface QueryProviderProps {
  children: React.ReactNode
  client: QueryClient
}

export const QueryProvider: React.FC<QueryProviderProps> = ({
  children,
  client,
}) => {
  return (
    <QueryClientProvider client={client}>
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
