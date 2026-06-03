import { RouterProvider } from '@tanstack/react-router'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { appQueryClient } from '@/app/query/queryClient'
import { router } from '@/app/router/router'

const App: React.FC = () => {
  return (
    <QueryProvider client={appQueryClient}>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

export default App
