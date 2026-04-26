import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { appEnv } from '@/config/env'

export const RouterDevtools: React.FC = () => {
  if (!appEnv.isDev) {
    return null
  }

  return <TanStackRouterDevtools position="bottom-left" />
}
