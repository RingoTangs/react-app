import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { act, cleanup, render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { RouterPending } from './RouterPending'

const advance = async (ms: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms)
  })
}

const setup = (initialPath = '/loading') => {
  let resolve!: () => void
  let reject!: (error: Error) => void
  const task = new Promise<void>((done, fail) => {
    resolve = done
    reject = fail
  })
  const root = createRootRoute({
    component: Outlet,
    errorComponent: () => <h1>Failed</h1>,
  })
  const home = createRoute({
    getParentRoute: () => root,
    path: '/',
    component: () => <h1>Home</h1>,
  })
  const slow = createRoute({
    getParentRoute: () => root,
    path: '/loading',
    loader: () => task,
    component: () => <h1>Loaded</h1>,
  })
  const router = createRouter({
    routeTree: root.addChildren([home, slow]),
    history: createMemoryHistory({ initialEntries: [initialPath] }),
    defaultPendingComponent: RouterPending,
    defaultPendingMs: 150,
    defaultPendingMinMs: 300,
    defaultStaleReloadMode: 'blocking',
  })
  render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
  return { router, resolve, reject }
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  vi.clearAllTimers()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('路由原生加载反馈', () => {
  it('快速首次加载不显示 pending', async () => {
    const { resolve } = setup()
    await advance(100)
    expect(screen.queryByRole('status')).toBeNull()
    await act(async () => resolve())
    await advance(0)
    expect(screen.getByRole('heading', { name: 'Loaded' })).toBeInTheDocument()
    await advance(500)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('慢首次加载延迟显示，并由 Router 保证最短显示时间', async () => {
    const { resolve } = setup()
    await advance(149)
    expect(screen.queryByRole('status')).toBeNull()
    await advance(1)
    expect(screen.getByRole('status')).toHaveTextContent('Loading...')
    await act(async () => resolve())
    await advance(299)
    expect(screen.getByRole('status')).toBeInTheDocument()
    await advance(1)
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.getByRole('heading', { name: 'Loaded' })).toBeInTheDocument()
  })

  it('站内慢导航显示 pending，完成后进入目标页面', async () => {
    const { router, resolve } = setup('/')
    await advance(0)
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    await act(async () => {
      void router.navigate({ to: '/loading' })
    })
    await advance(150)
    expect(screen.getByRole('status')).toBeInTheDocument()
    await act(async () => resolve())
    await advance(300)
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.getByRole('heading', { name: 'Loaded' })).toBeInTheDocument()
  })

  it('loader 失败后进入错误界面，清除 pending', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { reject } = setup()
    await advance(150)
    expect(screen.getByRole('status')).toBeInTheDocument()
    await act(async () => reject(new Error('Load failed')))
    await advance(300)
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.getByRole('heading', { name: 'Failed' })).toBeInTheDocument()
  })

  it('预加载不显示前台 pending', async () => {
    const { router, resolve } = setup('/')
    await advance(0)
    let preload!: ReturnType<typeof router.preloadRoute>
    await act(async () => {
      preload = router.preloadRoute({ to: '/loading' })
    })
    await advance(500)
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    await act(async () => {
      resolve()
      await preload
    })
  })

  it('慢导航期间返回首页，不残留旧 pending', async () => {
    const { router, resolve } = setup('/')
    await advance(0)
    await act(async () => {
      void router.navigate({ to: '/loading' })
    })
    await advance(150)
    expect(screen.getByRole('status')).toBeInTheDocument()
    await act(async () => {
      void router.navigate({ to: '/' })
    })
    await advance(300)
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    expect(screen.queryByRole('status')).toBeNull()
    await act(async () => resolve())
    await advance(500)
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    expect(screen.queryByRole('status')).toBeNull()
  })
})
