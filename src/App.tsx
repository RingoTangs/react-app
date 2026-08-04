import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { queryClient } from '@/app/queryClient'
import { router } from '@/app/router'
import { appEnv } from '@/config/env'

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {appEnv.isDev ? (
        <>
          <TanStackRouterDevtools router={router} position="bottom-left" />
          <ReactQueryDevtools
            initialIsOpen={false}
            position="bottom"
            buttonPosition="bottom-right"
          />
        </>
      ) : null}
    </QueryClientProvider>
  )
}

export default App
