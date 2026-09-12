import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as errorReporting from '@/app/reportError'
import { postsQueryOptions } from '@/features/example-posts'
import { getPosts } from '@/features/example-posts/api/getPosts'
import { routeTree } from '@/routeTree.gen'

vi.mock('@/features/example-posts/api/getPosts', () => ({
  getPosts: vi.fn(),
}))

const mockedGetPosts = vi.mocked(getPosts)
const queryClients: QueryClient[] = []
const posts = [
  {
    id: 1,
    userId: 1,
    title: 'Architecture boundaries stay explicit',
    body: 'Feature-owned query options stay reusable across routes.',
  },
]

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

  return { history, queryClient, router }
}

beforeEach(() => {
  // jsdom 不实现页面滚动；这些测试只验证路由和数据状态。
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  mockedGetPosts.mockReset()
  mockedGetPosts.mockResolvedValue([])
})

afterEach(() => {
  cleanup()
  queryClients.splice(0).forEach((client) => client.clear())
  vi.restoreAllMocks()
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
  })

  it('preloads feature data through router context loaders', async () => {
    mockedGetPosts.mockResolvedValue(posts)

    const { router, queryClient } = renderWithRouter(['/posts'])

    expect(router.state.location.pathname).toBe('/posts')

    expect(
      await screen.findByText('Posts Route + Feature Query Options'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Architecture boundaries stay explicit'),
    ).toBeInTheDocument()
    expect(queryClient.getQueryData(postsQueryOptions().queryKey)).toEqual(
      posts,
    )
    expect(
      router.state.matches.find((match) => match.routeId === '/posts')
        ?.loaderData,
    ).toEqual(posts)
    expect(mockedGetPosts).toHaveBeenCalledTimes(1)
  })

  it('reuses preloaded query data when navigating to posts', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    mockedGetPosts.mockResolvedValue(posts)
    const { router, queryClient } = renderWithRouter(['/error'])
    await screen.findByText('Oops! Something went wrong')

    await act(async () => {
      await router.preloadRoute({ to: '/posts' })
    })
    expect(queryClient.getQueryData(postsQueryOptions().queryKey)).toEqual(
      posts,
    )
    expect(mockedGetPosts).toHaveBeenCalledTimes(1)

    await act(async () => {
      await router.navigate({ to: '/posts' })
    })
    expect(await screen.findByText(posts[0]!.title)).toBeInTheDocument()
    expect(mockedGetPosts).toHaveBeenCalledTimes(1)
  })

  it('retries a failed loader and renders the route after recovery', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    mockedGetPosts
      .mockRejectedValueOnce(new Error('Posts request failed'))
      .mockResolvedValueOnce([])

    const user = userEvent.setup()
    renderWithRouter(['/posts'])

    expect(
      await screen.findByText('Oops! Something went wrong'),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Try Again' }))

    expect(
      await screen.findByText('Posts Route + Feature Query Options'),
    ).toBeInTheDocument()
    expect(mockedGetPosts).toHaveBeenCalledTimes(2)
  })

  it('returns stale cached data from the loader while the page refreshes in the background', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { router, queryClient } = renderWithRouter(['/error'])
    await screen.findByText('Oops! Something went wrong')

    queryClient.setQueryData(postsQueryOptions().queryKey, posts, {
      updatedAt: Date.now() - 60_000,
    })
    let resolveRefresh!: (value: typeof posts) => void
    mockedGetPosts.mockReturnValue(
      new Promise<typeof posts>((resolve) => {
        resolveRefresh = resolve
      }),
    )

    await act(async () => {
      await router.preloadRoute({ to: '/posts' })
    })
    expect(mockedGetPosts).not.toHaveBeenCalled()

    await act(async () => {
      await router.navigate({ to: '/posts' })
    })
    expect(await screen.findByText(posts[0]!.title)).toBeInTheDocument()
    expect(
      router.state.matches.find((match) => match.routeId === '/posts')
        ?.loaderData,
    ).toEqual(posts)
    await waitFor(() => expect(mockedGetPosts).toHaveBeenCalledTimes(1))
    expect(
      queryClient.isFetching({ queryKey: postsQueryOptions().queryKey }),
    ).toBe(1)

    const refreshedPosts = [{ ...posts[0]!, title: 'Refreshed posts' }]
    await act(async () => resolveRefresh(refreshedPosts))
    expect(await screen.findByText('Refreshed posts')).toBeInTheDocument()
    expect(screen.queryByText(posts[0]!.title)).not.toBeInTheDocument()
    expect(queryClient.getQueryData(postsQueryOptions().queryKey)).toEqual(
      refreshedPosts,
    )
  })
})
