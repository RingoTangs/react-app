import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { appQueryClient } from '@/app/queryClient'
import { router } from '@/app/router/router'
import { appEnv } from '@/config/env'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>,
)
