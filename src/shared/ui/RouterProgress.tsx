import { useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useLoadingBar } from 'react-top-loading-bar'

export const RouterProgress: React.FC = () => {
  const isLoading = useRouterState({
    select: (state) => state.isLoading,
  })

  const { start, complete } = useLoadingBar({
    height: 2,
  })

  useEffect(() => {
    if (isLoading) {
      start()
    } else {
      complete()
    }
  }, [isLoading, start, complete])

  return null
}
