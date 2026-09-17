import type { LoadingBarRef } from 'react-top-loading-bar'
import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const ActiveBar: React.FC<{
  pending: boolean
  onFinished: () => void
}> = ({ pending, onFinished }) => {
  const barRef = useRef<LoadingBarRef>(null)
  const startedRef = useRef(false)
  const completedRef = useRef(false)

  useEffect(() => {
    if (pending && !startedRef.current) {
      // 等待第三方组件的挂载 effect 完成；StrictMode 重放时先取消旧任务。
      const timer = setTimeout(() => {
        barRef.current?.start()
        startedRef.current = true
      }, 0)
      return () => clearTimeout(timer)
    } else if (!pending && startedRef.current && !completedRef.current) {
      barRef.current?.complete()
      completedRef.current = true
    }
  }, [pending])

  return (
    <LoadingBar
      ref={barRef}
      height={2}
      color="#fbbf24"
      containerClassName="router-progress"
      onLoaderFinished={onFinished}
    />
  )
}

const ProgressCycle: React.FC<{ pending: boolean }> = ({ pending }) => {
  const [visible, setVisible] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!pending) return
    const timer = setTimeout(setVisible, 150, true)
    return () => clearTimeout(timer)
  }, [pending])

  if (!visible || finished) return null

  return <ActiveBar pending={pending} onFinished={() => setFinished(true)} />
}

export const RouterProgress: React.FC = () => {
  const pending = useRouterState({
    select: (state) => state.status === 'pending',
  })
  const [cycle, setCycle] = useState({ pending, id: 0 })

  // 在渲染新一轮前替换实例，旧实例的完成动画和回调只属于旧轮次。
  if (pending !== cycle.pending) {
    setCycle({ pending, id: cycle.id + (pending ? 1 : 0) })
  }

  return <ProgressCycle key={cycle.id} pending={pending} />
}
