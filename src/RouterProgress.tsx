import type { LoadingBarRef } from 'react-top-loading-bar'
import { useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

/*
 * 三层分别负责：RouterProgress 开启新轮次，ProgressCycle 决定何时显示，ActiveBar 控制动画。
 * 开始切换 → 新轮次 → 等待 150ms → 显示；切换结束 → 完成动画 → 卸载。
 * 短于 150ms 的切换不显示；完成动画期间再次导航，则换一个新实例。
 * 这样做是因为第三方库上一轮的完成定时器可能干扰下一轮，不能一直复用同一个实例。
 */

/* 只控制本轮的开始和完成；百分比及动画交给第三方组件，不混用受控 progress 属性。 */
const ActiveBar: React.FC<{
  pending: boolean
  onFinished: () => void
}> = ({ pending, onFinished }) => {
  /* barRef 用来调用动画方法；另外两个 ref 记录本轮是否已开始、已完成，避免重复调用。 */
  const barRef = useRef<LoadingBarRef>(null)
  const startedRef = useRef(false)
  const completedRef = useRef(false)

  useEffect(() => {
    if (pending && !startedRef.current) {
      /*
       * 这里的 0ms 不是防闪烁延迟，而是把启动安排到当前 effect 执行之后。
       * 避免第三方组件初始化，以及 StrictMode 重放 effect 时，将刚启动的进度覆盖为 0。
       */
      const timer = setTimeout(() => {
        barRef.current?.start()
        startedRef.current = true
      }, 0)
      /* 状态变化、卸载或 StrictMode 重放时，取消尚未执行的启动任务。 */
      return () => clearTimeout(timer)
    } else if (!pending && startedRef.current && !completedRef.current) {
      /* 只完成真正启动过的进度条，避免空闲时也闪过一条 100% 的进度。 */
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

/* 管理一个轮次：等待显示、保留完成动画，最后移除进度条。 */
const ProgressCycle: React.FC<{ pending: boolean }> = ({ pending }) => {
  /* visible 表示显示延迟已到；finished 表示完成动画已经结束。 */
  const [visible, setVisible] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!pending) return
    /* 等待 150ms 再显示，避免快速导航闪烁；提前结束或卸载会取消等待。 */
    const timer = setTimeout(setVisible, 150, true)
    return () => clearTimeout(timer)
  }, [pending])

  if (!visible || finished) return null

  /* pending 结束时仍保留实例，等 onFinished 通知动画结束后再卸载。 */
  return <ActiveBar pending={pending} onFinished={() => setFinished(true)} />
}

export const RouterProgress: React.FC = () => {
  /* 这里只关心路由加载及页面过渡，不跟随普通 React Query 请求。 */
  const pending = useRouterState({
    select: (state) => state.status === 'pending',
  })
  /* pending 保存上次观察到的状态；id 是轮次编号，不是进度百分比。 */
  const [cycle, setCycle] = useState({ pending, id: 0 })

  /*
   * 仅进入 pending 时增加编号；结束时保持编号，让当前实例播放完成动画。
   * 在渲染阶段有条件地更新当前组件，React 会先重新渲染它，避免子组件沿用旧轮次处理新导航。
   * 更新后记录的状态与 pending 一致，条件不再成立，因此不会无限重新渲染。
   */
  if (pending !== cycle.pending) {
    setCycle({ pending, id: cycle.id + (pending ? 1 : 0) })
  }

  /* key 改变会重建整个内部组件，旧轮次的动画和回调不能再影响新实例。 */
  return <ProgressCycle key={cycle.id} pending={pending} />
}
