import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCounterStore } from '@/features/example-counter/model/counterStore'
import { getPosts } from '@/features/example-posts/api/getPosts'
import * as errorReporting from '@/reportError'
import { routeTree } from '@/routeTree.gen'

vi.mock('@/features/example-posts/api/getPosts', () => ({
  getPosts: vi.fn(),
}))

const mockedGetPosts = vi.mocked(getPosts)
const queryClients: QueryClient[] = []

const expectHead = async (title: string, description: string) => {
  await waitFor(() => {
    expect(document.title).toBe(title)
    expect(document.head.querySelectorAll('title')).toHaveLength(1)
    const descriptions = document.head.querySelectorAll(
      'meta[name="description"]',
    )
    expect(descriptions).toHaveLength(1)
    expect(descriptions[0]).toHaveAttribute('content', description)
  })
}

const expectHomeHead = () =>
  expectHead(
    'Home - React App Template',
    'Explore Zustand shared state and TanStack Query data examples.',
  )

const renderWithRouter = (initialEntries: Array<string>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 30_000,
      },
    },
  })
  queryClients.push(queryClient)
  const history = createMemoryHistory({ initialEntries })
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    history,
    defaultPreloadStaleTime: 0,
  })

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { history, router }
}

beforeEach(() => {
  useCounterStore.setState(useCounterStore.getInitialState(), true)
  // jsdom 不实现页面滚动；这些测试只验证路由和数据状态。
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  mockedGetPosts.mockReset()
  mockedGetPosts.mockResolvedValue([])
})

afterEach(() => {
  cleanup()
  useCounterStore.setState(useCounterStore.getInitialState(), true)
  queryClients.splice(0).forEach((client) => client.clear())
  vi.restoreAllMocks()
  expect(
    document.head.querySelectorAll('title, meta[name="description"]'),
  ).toHaveLength(0)
})

describe('首页示例', () => {
  it('同时展示计数器和文章预览，支持加减及重置', async () => {
    const user = userEvent.setup()
    renderWithRouter(['/'])
    expect(
      await screen.findByRole('heading', { name: 'Counter', level: 2 }),
    ).toBeInTheDocument()
    expect(await screen.findByText('No posts found')).toBeInTheDocument()
    await expectHomeHead()
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 0')
    await user.click(screen.getByRole('button', { name: 'Increase count' }))
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 1')
    await user.click(screen.getByRole('button', { name: 'Decrease count' }))
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 0')
    await user.click(screen.getByRole('button', { name: 'Decrease count' }))
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: -1')
    await user.click(screen.getByRole('button', { name: 'Reset count' }))
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 0')
    expect(screen.getByText('No posts found')).toBeInTheDocument()
  })
})

describe('根路由 404 页面', () => {
  it.each(['/missing-page', '/posts'])(
    '%s 展示 404，点击按钮后返回首页',
    async (pathname) => {
      const user = userEvent.setup()
      const { history, router } = renderWithRouter([pathname])

      expect(
        await screen.findByRole('heading', { name: 'Page Not Found' }),
      ).toBeInTheDocument()
      await expectHead(
        'React App Template',
        'A React application template with typed routing, shared state, and async data examples.',
      )
      await user.click(screen.getByRole('button', { name: 'Back to Home' }))

      expect(
        await screen.findByText('Start from a stable baseline, not a demo.'),
      ).toBeInTheDocument()
      expect(router.state.location.pathname).toBe('/')
      expect(history.location.pathname).toBe('/')
      expect(screen.queryByText('Page Not Found')).not.toBeInTheDocument()
      await expectHomeHead()
    },
  )

  it('返回首页失败时上报错误并保留 404 页面', async () => {
    const user = userEvent.setup()
    const { router } = renderWithRouter(['/missing-page'])
    await screen.findByRole('heading', { name: 'Page Not Found' })

    const error = new Error('Navigation failed')
    const navigate = vi.spyOn(router, 'navigate').mockRejectedValueOnce(error)
    const reportError = vi
      .spyOn(errorReporting, 'reportError')
      .mockImplementation(() => {})

    await user.click(screen.getByRole('button', { name: 'Back to Home' }))

    expect(navigate).toHaveBeenCalledWith({ to: '/' })
    await waitFor(() => expect(reportError).toHaveBeenCalledWith(error))
    expect(reportError).toHaveBeenCalledTimes(1)
    expect(router.state.location.pathname).toBe('/missing-page')
    expect(
      screen.getByRole('heading', { name: 'Page Not Found' }),
    ).toBeInTheDocument()
  })
})

describe('root route error boundary', () => {
  it('resets the error fallback when browser history goes back to a healthy route', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const reportError = vi.spyOn(errorReporting, 'reportError')

    const user = userEvent.setup()
    const { history, router } = renderWithRouter(['/'])

    expect(
      await screen.findByText('Start from a stable baseline, not a demo.'),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('link', { name: 'Verify Error Boundary' }),
    )

    expect(
      await screen.findByText('Oops! Something went wrong'),
    ).toBeInTheDocument()
    expect(reportError).toHaveBeenCalledWith(expect.any(Error))
    await expectHead(
      'Error Demo - React App Template',
      'Demonstrates route error handling and recovery.',
    )

    await act(async () => {
      history.back()
    })

    expect(history.location.pathname).toBe('/')
    expect(router.state.location.pathname).toBe('/')

    expect(
      await screen.findByText('Start from a stable baseline, not a demo.'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Oops! Something went wrong'),
    ).not.toBeInTheDocument()
    await expectHomeHead()
  })
})
