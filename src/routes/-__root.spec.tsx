import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { act, cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getPosts } from '@/features/example-posts/api/getPosts'
import { usePostsQuery } from '@/features/example-posts/hooks/usePostsQuery'
import { routeTree } from '@/routeTree.gen'

vi.mock('@/features/example-posts/api/getPosts', () => ({
  getPosts: vi.fn(),
}))

vi.mock('@/features/example-posts/hooks/usePostsQuery', () => ({
  usePostsQuery: vi.fn(),
}))

const mockedGetPosts = vi.mocked(getPosts)
const mockedUsePostsQuery = vi.mocked(usePostsQuery)

const renderWithRouter = (initialEntries: Array<string>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const history = createMemoryHistory({ initialEntries })
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    history,
  })

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { history, queryClient, router }
}

beforeEach(() => {
  mockedGetPosts.mockReset()
  mockedGetPosts.mockResolvedValue([])
  mockedUsePostsQuery.mockReturnValue({
    data: [],
    error: null,
    isError: false,
    isPending: false,
    isSuccess: true,
  } as unknown as ReturnType<typeof usePostsQuery>)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('root route error boundary', () => {
  it('resets the error fallback when browser history goes back to a healthy route', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

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
    mockedUsePostsQuery.mockReturnValue({
      data: [
        {
          id: 1,
          userId: 1,
          title: 'Architecture boundaries stay explicit',
          body: 'Feature-owned query options stay reusable across routes.',
        },
      ],
      error: null,
      isError: false,
      isPending: false,
      isSuccess: true,
    } as unknown as ReturnType<typeof usePostsQuery>)

    const { router } = renderWithRouter(['/posts'])

    expect(router.state.location.pathname).toBe('/posts')

    expect(
      await screen.findByText('Posts Route + Feature Query Options'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Architecture boundaries stay explicit'),
    ).toBeInTheDocument()
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
})
