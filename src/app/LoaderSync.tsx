import { useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useLoaderStore } from './loaderStore'

export function LoaderSync() {
  const routerState = useRouterState({
    select: (state) => ({
      pending: state.status === 'pending',
      resolved: state.resolvedLocation !== undefined,
    }),
  })

  const setBootLoading = useLoaderStore((state) => state.setBootLoading)

  const setNavigationLoading = useLoaderStore(
    (state) => state.setNavigationLoading,
  )

  const clearLoading = useLoaderStore((state) => state.clearLoading)

  useEffect(() => {
    if (!routerState.pending) {
      clearLoading()
      return
    }

    if (!routerState.resolved) {
      setBootLoading()
      return
    }

    setNavigationLoading()
  }, [
    routerState.pending,
    routerState.resolved,
    setBootLoading,
    setNavigationLoading,
    clearLoading,
  ])

  return null
}
