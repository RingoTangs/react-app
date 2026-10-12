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
import { Route } from './__root'

const advance = async (ms: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms)
  })
}

const setup = (initialPath: string, withRootTitle = true) => {
  let resolve!: () => void
  let reject!: (error: Error) => void
  const task = new Promise<void>((done, fail) => {
    resolve = done
    reject = fail
  })
  const root = createRootRoute({
    component: Outlet,
    head: () => ({ meta: withRootTitle ? [{ title: 'Root' }] : [] }),
    shellComponent: (
      Route.options as unknown as {
        shellComponent: (props: {
          children: React.ReactNode
        }) => React.ReactNode
      }
    ).shellComponent,
    errorComponent: () => <h1>Failed</h1>,
  })
  const home = createRoute({
    getParentRoute: () => root,
    path: '/',
    head: () => ({ meta: [{ title: 'Home' }] }),
    component: () => <h1>Home</h1>,
  })
  const loading = createRoute({
    getParentRoute: () => root,
    path: '/loading',
    loader: () => task,
    head: () => ({ meta: [{ title: 'Loaded' }] }),
    component: () => <h1>Loaded</h1>,
  })
  const error = createRoute({
    getParentRoute: () => root,
    path: '/error',
    head: () => ({ meta: [{ title: 'Error' }] }),
    component: () => {
      throw new Error('Render failed')
    },
  })
  const notFound = createRoute({
    getParentRoute: () => root,
    path: '$',
    head: () => ({ meta: [{ title: 'Not Found' }] }),
    component: () => <h1>Not Found</h1>,
  })
  const router = createRouter({
    routeTree: root.addChildren([home, loading, error, notFound]),
    history: createMemoryHistory({ initialEntries: [initialPath] }),
    defaultPendingComponent: () => <div role="status">Loading...</div>,
    defaultPendingMs: 150,
    defaultPendingMinMs: 0,
  })
  render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
  return { router, resolve, reject }
}

const expectTitle = (title: string) => {
  expect(document.head.querySelectorAll('title')).toHaveLength(1)
  expect(document.title).toBe(title)
  expect(document.getElementById('app-bootstrap-title')).toBeNull()
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  const title = document.createElement('title')
  title.id = 'app-bootstrap-title'
  title.textContent = 'Bootstrap'
  document.head.append(title)
})

afterEach(() => {
  cleanup()
  document.head.querySelectorAll('title').forEach((title) => title.remove())
  vi.clearAllTimers()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('根路由标题交接', () => {
  it('慢加载未生成路由标题时保留静态标题，完成后只保留路由标题', async () => {
    const { resolve } = setup('/loading', false)
    await advance(150)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(document.title).toBe('Bootstrap')
    expect(document.getElementById('app-bootstrap-title')).toBeInTheDocument()
    await act(async () => resolve())
    await advance(0)
    expectTitle('Loaded')
  })

  it('严格模式下首次加载和连续导航保持一个正确标题', async () => {
    const { router, resolve } = setup('/')
    await advance(0)
    expectTitle('Home')
    await act(async () => {
      void router.navigate({ to: '/loading' })
    })
    await advance(150)
    expect(document.title).toBeTruthy()
    await act(async () => resolve())
    await advance(0)
    expectTitle('Loaded')
    await act(async () => {
      await router.navigate({ to: '/' })
    })
    expectTitle('Home')
  })

  it('loader 失败时仍保留 Router 管理的路由标题', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { reject } = setup('/loading')
    await advance(150)
    await act(async () => reject(new Error('Load failed')))
    await advance(0)
    expectTitle('Loaded')
    expect(screen.getByRole('heading', { name: 'Failed' })).toBeInTheDocument()
  })

  it.each(['/missing', '/error'])(
    '直接访问 %s 时不残留静态标题',
    async (path) => {
      vi.spyOn(console, 'warn').mockImplementation(() => {})
      vi.spyOn(console, 'error').mockImplementation(() => {})
      setup(path)
      await advance(0)
      expectTitle(path === '/error' ? 'Error' : 'Not Found')
      expect(
        screen.getByRole('heading', {
          name: path === '/error' ? 'Failed' : 'Not Found',
        }),
      ).toBeInTheDocument()
    },
  )
})
