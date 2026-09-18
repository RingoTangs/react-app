import { act, cleanup, render } from '@testing-library/react'
import { StrictMode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LoaderProgress } from './LoaderProgress'

const routeState = vi.hoisted(() => ({
  status: 'idle',
  resolvedLocation: undefined as object | undefined,
  read: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
  useRouterState: routeState.read,
}))

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms))
const container = () => document.querySelector('.router-progress')
const bar = () => container()?.firstElementChild as HTMLElement | undefined

beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(Math, 'random').mockReturnValue(0)
  routeState.status = 'idle'
  routeState.resolvedLocation = undefined
  routeState.read.mockImplementation(
    ({ select }: { select: (state: typeof routeState) => boolean }) =>
      select(routeState),
  )
})

afterEach(() => {
  cleanup()
  act(() => vi.runOnlyPendingTimers())
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('路由进度条', () => {
  it('初始空闲不显示进度条，也不启动定时器', () => {
    render(<LoaderProgress />)
    advance(2000)
    expect(container()).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('短于 150ms 的导航不显示进度条', () => {
    const { rerender } = render(<LoaderProgress />)
    routeState.status = 'pending'
    routeState.resolvedLocation = {}
    rerender(<LoaderProgress />)
    advance(149)
    expect(container()).toBeNull()
    routeState.status = 'idle'
    rerender(<LoaderProgress />)
    advance(2000)
    expect(container()).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('持续加载延迟显示，重渲染不重启，完成后移除实例', () => {
    routeState.status = 'pending'
    routeState.resolvedLocation = {}
    const { rerender } = render(<LoaderProgress />)
    advance(150)
    expect(bar()?.style.width).toBe('10%')
    advance(1000)
    const width = bar()?.style.width
    rerender(<LoaderProgress />)
    expect(bar()?.style.width).toBe(width)
    expect(width).not.toBe('10%')
    routeState.status = 'idle'
    rerender(<LoaderProgress />)
    expect(bar()?.style.width).toBe('100%')
    advance(500)
    advance(1000)
    expect(container()).toBeNull()
  })

  it('150ms 到期后立即结束会正常完成并卸载', () => {
    routeState.status = 'pending'
    routeState.resolvedLocation = {}
    const { rerender } = render(<LoaderProgress />)
    advance(150)
    expect(bar()?.style.width).toBe('10%')
    routeState.status = 'idle'
    rerender(<LoaderProgress />)
    expect(bar()?.style.width).toBe('100%')
    advance(500)
    advance(1000)
    expect(container()).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('显示延迟与 idle 更新同时提交时直接清理未启动实例', () => {
    routeState.status = 'pending'
    routeState.resolvedLocation = {}
    const { rerender } = render(<LoaderProgress />)
    act(() => {
      vi.advanceTimersByTime(150)
      routeState.status = 'idle'
      rerender(<LoaderProgress />)
    })
    expect(container()).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
    advance(2000)
    expect(container()).toBeNull()
  })

  it('上一轮完成定时器不会隐藏、归零或卸载下一轮', () => {
    routeState.status = 'pending'
    routeState.resolvedLocation = {}
    const { rerender } = render(<LoaderProgress />)
    advance(150)
    const first = container()
    routeState.status = 'idle'
    rerender(<LoaderProgress />)
    advance(100)
    routeState.status = 'pending'
    rerender(<LoaderProgress />)
    expect(container()).toBeNull()
    advance(150)
    const second = container()
    expect(second).not.toBe(first)
    expect(bar()?.style.opacity).toBe('1')
    advance(500)
    advance(1000)
    expect(container()).toBe(second)
    expect(bar()?.style.opacity).toBe('1')
    expect(Number.parseFloat(bar()!.style.width)).toBeGreaterThan(0)
    expect(Number.parseFloat(bar()!.style.width)).toBeLessThan(100)
  })

  it.each([50, 150])('加载 %sms 后卸载会清理等待或递增定时器', (ms) => {
    routeState.status = 'pending'
    routeState.resolvedLocation = {}
    const { unmount } = render(<LoaderProgress />)
    advance(ms)
    if (ms >= 150) {
      expect(bar()?.style.width).toBe('10%')
    }
    unmount()
    expect(container()).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('在 StrictMode 下正确初始化且重渲染不重启或遗留定时器', () => {
    routeState.status = 'pending'
    routeState.resolvedLocation = {}
    const { rerender, unmount } = render(
      <StrictMode>
        <LoaderProgress />
      </StrictMode>,
    )
    expect(vi.getTimerCount()).toBe(1)
    advance(150)
    expect(bar()?.style.width).toBe('10%')
    expect(vi.getTimerCount()).toBe(1)
    advance(1000)
    const width = bar()?.style.width
    rerender(
      <StrictMode>
        <LoaderProgress />
      </StrictMode>,
    )
    expect(bar()?.style.width).toBe(width)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
