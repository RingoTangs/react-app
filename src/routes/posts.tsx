import { createFileRoute } from '@tanstack/react-router'
import { PostsPage, postsQueryOptions } from '@/features/example-posts'

export const Route = createFileRoute('/posts')({
  loader: ({ context }) => {
    return context.queryClient.query({
      ...postsQueryOptions(),
      staleTime: 'static',
    })
  },
  component: PostsPage,
})
