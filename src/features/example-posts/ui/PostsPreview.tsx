import { Button } from '@/components'
import { usePostsQuery } from '../hooks/usePostsQuery'

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'Unable to load posts.'
}

export const PostsPreview: React.FC = () => {
  const postsQuery = usePostsQuery()
  const retryButton = (
    <Button
      type="button"
      disabled={postsQuery.isFetching}
      onClick={() => {
        // 请求错误由 Query 管理；refetch 返回包含查询结果的 Promise。
        void postsQuery.refetch({ throwOnError: false })
      }}
      className="mt-4 px-4 py-2 font-semibold"
    >
      {postsQuery.isFetching ? 'Retrying...' : 'Try Again'}
    </Button>
  )
  const refreshError = postsQuery.isRefetchError ? (
    <div
      role="alert"
      className="border-danger-border/30 bg-danger-surface/30 text-danger-foreground mb-6 rounded-xl border p-4"
    >
      <p>Unable to refresh posts. Showing previously loaded data.</p>
      <p className="mt-2 text-sm">{getErrorMessage(postsQuery.error)}</p>
      {retryButton}
    </div>
  ) : null

  if (postsQuery.isPending && !postsQuery.isFetched) {
    return (
      <section className="border-border bg-surface rounded-3xl border p-6 backdrop-blur-sm sm:p-8">
        <p className="text-primary text-sm font-medium tracking-[0.16em] uppercase">
          Data Fetching
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-semibold">
          Loading posts...
        </h2>
        <p className="text-muted-foreground mt-3 text-sm">
          React Query owns the async state while the UI stays declarative.
        </p>
      </section>
    )
  }

  if (postsQuery.data === undefined) {
    return (
      <section className="border-danger-border/30 bg-danger-surface/30 rounded-3xl border p-6 backdrop-blur-sm sm:p-8">
        <p className="text-danger-foreground text-sm font-medium tracking-[0.16em] uppercase">
          Data Fetching
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-semibold">
          Failed to load posts
        </h2>
        <p className="text-danger-foreground mt-3 text-sm">
          {getErrorMessage(postsQuery.error ?? postsQuery.failureReason)}
        </p>
        {retryButton}
      </section>
    )
  }

  const posts = postsQuery.data

  if (posts.length === 0) {
    return (
      <section className="border-border bg-surface rounded-3xl border p-6 backdrop-blur-sm sm:p-8">
        {refreshError}
        <p className="text-primary text-sm font-medium tracking-[0.16em] uppercase">
          Data Fetching
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-semibold">
          No posts found
        </h2>
        <p className="text-muted-foreground mt-3 text-sm">
          Empty states should be handled next to the feature UI.
        </p>
      </section>
    )
  }

  return (
    <section className="border-border bg-surface rounded-3xl border p-6 backdrop-blur-sm sm:p-8">
      {refreshError}
      <div className="mb-6 max-w-2xl">
        <p className="text-primary text-sm font-medium tracking-[0.16em] uppercase">
          Data Fetching
        </p>
        <h2 className="text-foreground mt-3 text-3xl font-semibold">
          Feature-owned API + React Query
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          This example keeps endpoint calls inside the feature, query keys in
          model, React Query bindings in hooks, and async UI state in the
          feature UI.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border-border/80 bg-background rounded-2xl border p-5"
          >
            <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.14em] uppercase">
              Post #{post.id}
            </p>
            <h3 className="text-foreground text-base leading-snug font-semibold">
              {post.title}
            </h3>
            <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
              {post.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
