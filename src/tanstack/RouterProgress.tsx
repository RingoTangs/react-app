import type { LoadingBarRef } from 'react-top-loading-bar'
import { useRouterState } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

// 导航超过这个时间才显示进度条，避免快速导航时闪烁。
const PROGRESS_DELAY_MS = 150

// 进度条外观。
const PROGRESS_COLOR = '#fbbf24'
const PROGRESS_HEIGHT_PX = 2

// 进度条宽度变化的动画时长。
const PROGRESS_LOADER_SPEED_MS = 300

// 到达 100% 后，等待多久开始淡出。
const PROGRESS_WAITING_TIME_MS = 100

// 淡出动画的时长。
const PROGRESS_TRANSITION_TIME_MS = 200

/*
 * RouterProgress 划分加载轮次，ProgressCycle 延迟显示，ActiveBar 控制动画。
 * 每轮使用独立实例，防止第三方库上一轮的完成定时器干扰新导航。
 */

/**
 * 百分比和动画交给第三方组件，不混用受控 progress 属性。
 */
const ActiveBar: React.FC<{
  pending: boolean
  onFinished: () => void
}> = ({ pending, onFinished }) => {
  // 记录本轮是否已开始、已完成，避免重渲染时重复调用动画方法。
  const barRef = useRef<LoadingBarRef>(null)
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const [initialPending] = useState(pending)

  useEffect(() => {
    // 同步启动，避免显示后还需等待另一个定时器才能开始。
    if (initialPending && barRef.current) {
      barRef.current.start()
      startedRef.current = true
    }
    /*
     * 仅随本轮实例挂载和卸载运行；StrictMode 重放时允许重新初始化。
     * 不依赖 pending，避免加载结束时先清理掉“已经启动”的记录。
     */
    return () => {
      startedRef.current = false
    }
  }, [initialPending])

  useEffect(() => {
    if (pending || completedRef.current) return
    completedRef.current = true
    if (startedRef.current && barRef.current) {
      barRef.current.complete()
    } else {
      // 显示更新与加载结束同时发生时，直接清理未启动实例，不播放完成动画。
      onFinished()
    }
  }, [pending, onFinished])

  return (
    <LoadingBar
      ref={barRef}
      height={PROGRESS_HEIGHT_PX}
      color={PROGRESS_COLOR}
      loaderSpeed={PROGRESS_LOADER_SPEED_MS}
      waitingTime={PROGRESS_WAITING_TIME_MS}
      transitionTime={PROGRESS_TRANSITION_TIME_MS}
      containerClassName="router-progress"
      onLoaderFinished={onFinished}
    />
  )
}

/**
 * 管理一轮显示：等待、播放完成动画、卸载。
 */
const ProgressCycle: React.FC<{ pending: boolean }> = ({ pending }) => {
  // visible 表示显示延迟已到；finished 表示完成动画已结束。
  const [visible, setVisible] = useState(false)
  const [finished, setFinished] = useState(false)
  const onFinished = useCallback(() => setFinished(true), [])

  useEffect(() => {
    if (!pending) return
    // 延迟显示，避免快速导航闪烁；提前结束或卸载时取消等待。
    const timer = setTimeout(setVisible, PROGRESS_DELAY_MS, true)
    return () => clearTimeout(timer)
  }, [pending])

  if (!visible || finished) return null

  // 加载结束后仍保留实例，等完成动画播放完再卸载。
  return <ActiveBar pending={pending} onFinished={onFinished} />
}

export const RouterProgress: React.FC = () => {
  // 仅关注路由加载和页面过渡，不跟随普通 React Query 请求。
  const pending = useRouterState({
    // router.state.status 表示整个 Router 当前的前台导航状态
    // 1. pending 表示“请求的目标路由还在加载，或者框架的过渡尚未稳定”
    // 2. idle 则表示当前没有这种前台导航等待
    select: (state) => state.status === 'pending',
  })
  // 保存上次状态和轮次编号；id 不是进度百分比。
  const [cycle, setCycle] = useState({ pending, id: 0 })

  /*
   * 仅进入 pending 时增加编号；结束时保持编号，让当前实例播放完成动画。
   * 在渲染阶段有条件地更新当前组件，React 会先重新渲染它，避免子组件沿用旧轮次处理新导航。
   * 更新后记录的状态与 pending 一致，条件不再成立，因此不会无限重新渲染。
   */
  if (pending !== cycle.pending) {
    setCycle({ pending, id: cycle.id + (pending ? 1 : 0) })
  }

  // 新 key 重建内部组件，将旧动画和回调隔离在旧实例中。
  return <ProgressCycle key={cycle.id} pending={pending} />
}
