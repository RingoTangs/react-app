import type { UseQueryResult } from '@tanstack/react-query'
import type { Post } from '../model/types'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePostsQuery } from '../hooks/usePostsQuery'
import { PostsPreview } from './PostsPreview'

vi.mock('../hooks/usePostsQuery', () => ({
  usePostsQuery: vi.fn(),
}))

const mockedUsePostsQuery = vi.mocked(usePostsQuery)

const setPostsQueryState = (state: Partial<UseQueryResult<Post[], Error>>) => {
  mockedUsePostsQuery.mockReturnValue({
    data: undefined,
    error: null,
    isError: false,
    isPending: false,
    isSuccess: false,
    ...state,
  } as UseQueryResult<Post[], Error>)
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('posts preview', () => {
  it('renders loading state', () => {
    setPostsQueryState({ isPending: true })

    render(<PostsPreview />)

    expect(screen.getByText('Loading posts...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    setPostsQueryState({
      isError: true,
      error: new Error('Network unavailable'),
    })

    render(<PostsPreview />)

    expect(screen.getByText('Failed to load posts')).toBeInTheDocument()
    expect(screen.getByText('Network unavailable')).toBeInTheDocument()
  })

  it('renders empty state', () => {
    setPostsQueryState({ data: [], isSuccess: true })

    render(<PostsPreview />)

    expect(screen.getByText('No posts found')).toBeInTheDocument()
  })

  it('renders post cards', () => {
    setPostsQueryState({
      data: [
        {
          id: 1,
          userId: 1,
          title: 'Architecture boundaries',
          body: 'Keep feature data access inside the owning feature.',
        },
      ],
      isSuccess: true,
    })

    render(<PostsPreview />)

    expect(screen.getByText('Post #1')).toBeInTheDocument()
    expect(screen.getByText('Architecture boundaries')).toBeInTheDocument()
  })
})
