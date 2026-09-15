import type { AppRouter } from '@/App'

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter
  }
}
