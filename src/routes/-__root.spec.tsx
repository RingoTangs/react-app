import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { act, cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { routeTree } from '@/routeTree.gen'

vi.mock('@/features/example-posts/hooks/usePostsQuery', () => ({
  usePostsQuery: () => ({
    data: [],
    error: null,
    isError: false,
    isPending: false,
    isSuccess: true,
  }),
}))

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
    history,
  })

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { history, queryClient, router }
}

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
})
