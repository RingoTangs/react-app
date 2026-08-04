import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { appQueryClient } from '@/app/queryClient'
import { router } from '@/app/router/router'
import { appEnv } from '@/config/env'

const App: React.FC = () => {
  return (
    <QueryClientProvider client={appQueryClient}>
      <RouterProvider router={router} />
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

export default App
