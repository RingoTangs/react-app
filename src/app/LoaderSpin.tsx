import { useEffect, useRef, useState } from 'react'

import { Spin } from '@/components'
import { useLoaderStore } from './loaderStore'

const SHOW_DELAY = 150
const MIN_VISIBLE = 300

export function LoaderSpin() {
  const loading = useLoaderStore((state) => state.mode === 'boot')

  const [visible, setVisible] = useState(false)
  const visibleAtRef = useRef(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    if (loading) {
      timer = setTimeout(() => {
        visibleAtRef.current = performance.now()
        setVisible(true)
      }, SHOW_DELAY)
    } else if (visible) {
      const elapsed = performance.now() - visibleAtRef.current

      const remaining = Math.max(MIN_VISIBLE - elapsed, 0)

      timer = setTimeout(() => {
        setVisible(false)
      }, remaining)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [loading, visible])

  if (!visible) {
    return null
  }

  return <Spin size="xl" fullscreen label="loading..." />
}
