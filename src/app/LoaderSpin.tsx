import { Spin } from '@/components/Spin'
import { useLoaderStore } from './loaderStore'

export function LoaderSpin() {
  const loading = useLoaderStore((state) => state.mode === 'boot')

  if (!loading) {
    return null
  }

  return <Spin size="xl" fullscreen label="loading..." />
}
