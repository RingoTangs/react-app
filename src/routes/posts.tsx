import { createFileRoute } from '@tanstack/react-router'
import { postsQueryOptions } from '@/features/example-posts/model/queryOptions'
import { PostsPage } from '@/features/example-posts/ui/PostsPage'

export const Route = createFileRoute('/posts')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(postsQueryOptions())
  },
  component: PostsPage,
})
