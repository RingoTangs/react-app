import { RouterProvider } from '@tanstack/react-router'
import { appQueryClient } from '@/app/query/queryClient'
import { router } from '@/app/router/router'
import { QueryProvider } from './QueryProvider'

export const AppProviders: React.FC = () => {
  return (
    <QueryProvider client={appQueryClient}>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
