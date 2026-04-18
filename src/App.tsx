import { RouterProvider } from '@tanstack/react-router'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { router } from '@/app/router/router'

const App: React.FC = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

export default App
