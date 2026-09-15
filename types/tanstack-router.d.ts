import type { router } from '@/tanstack/router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
