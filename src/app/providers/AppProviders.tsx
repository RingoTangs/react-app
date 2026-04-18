import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/app/router/router'
import { QueryProvider } from './QueryProvider'

export const AppProviders: React.FC = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
