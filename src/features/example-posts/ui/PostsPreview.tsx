import { usePostsQuery } from '../hooks/usePostsQuery'

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'Unable to load posts.'
}

export const PostsPreview: React.FC = () => {
  const postsQuery = usePostsQuery()
  const retryButton = (
    <button
      type="button"
      disabled={postsQuery.isFetching}
      onClick={() => {
        // 请求错误由 Query 管理；refetch 返回包含查询结果的 Promise。
        void postsQuery.refetch({ throwOnError: false })
      }}
      className="mt-4 rounded-lg bg-amber-400 px-4 py-2 font-semibold text-stone-950 hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {postsQuery.isFetching ? 'Retrying...' : 'Try Again'}
    </button>
  )
  const refreshError = postsQuery.isRefetchError ? (
    <div
      role="alert"
      className="mb-6 rounded-xl border border-red-400/30 bg-red-950/30 p-4 text-red-100"
    >
      <p>Unable to refresh posts. Showing previously loaded data.</p>
      <p className="mt-2 text-sm">{getErrorMessage(postsQuery.error)}</p>
      {retryButton}
    </div>
  ) : null

  if (postsQuery.isPending && !postsQuery.isFetched) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <p className="text-sm font-medium tracking-[0.16em] text-amber-300 uppercase">
          Data Fetching
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Loading posts...
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          React Query owns the async state while the UI stays declarative.
        </p>
      </section>
    )
  }

  if (postsQuery.data === undefined) {
    return (
      <section className="rounded-3xl border border-red-400/30 bg-red-950/30 p-6 backdrop-blur-sm sm:p-8">
        <p className="text-sm font-medium tracking-[0.16em] text-red-200 uppercase">
          Data Fetching
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Failed to load posts
        </h2>
        <p className="mt-3 text-sm text-red-100">
          {getErrorMessage(postsQuery.error ?? postsQuery.failureReason)}
        </p>
        {retryButton}
      </section>
    )
  }

  const posts = postsQuery.data

  if (posts.length === 0) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        {refreshError}
        <p className="text-sm font-medium tracking-[0.16em] text-amber-300 uppercase">
          Data Fetching
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          No posts found
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          Empty states should be handled next to the feature UI.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
      {refreshError}
      <div className="mb-6 max-w-2xl">
        <p className="text-sm font-medium tracking-[0.16em] text-amber-300 uppercase">
          Data Fetching
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Feature-owned API + React Query
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          This example keeps endpoint calls inside the feature, query keys in
          model, React Query bindings in hooks, and async UI state in the
          feature UI.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-slate-700/80 bg-slate-950/50 p-5"
          >
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
              Post #{post.id}
            </p>
            <h3 className="text-base leading-snug font-semibold text-white">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
              {post.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
