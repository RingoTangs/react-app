import { ThemeProvider } from '@ringotangs/react-theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { queryClient } from '@/app/queryClient'
import { router } from '@/app/router'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} />
        <ReactQueryDevtools client={queryClient} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
