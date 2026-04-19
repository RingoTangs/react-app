import { usePostsQuery } from '../hooks/usePostsQuery'

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'Unable to load posts.'
}

export const PostsPreview: React.FC = () => {
  const postsQuery = usePostsQuery()

  if (postsQuery.isPending) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
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

  if (postsQuery.isError) {
    return (
      <section className="rounded-3xl border border-red-400/30 bg-red-950/30 p-8 backdrop-blur-sm">
        <p className="text-sm font-medium tracking-[0.16em] text-red-200 uppercase">
          Data Fetching
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Failed to load posts
        </h2>
        <p className="mt-3 text-sm text-red-100">
          {getErrorMessage(postsQuery.error)}
        </p>
      </section>
    )
  }

  const posts = postsQuery.data ?? []

  if (posts.length === 0) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
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
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      <div className="mb-6 max-w-2xl">
        <p className="text-sm font-medium tracking-[0.16em] text-amber-300 uppercase">
          Data Fetching
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Feature-owned API + React Query
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          This example keeps transport in shared/api, endpoint calls inside the
          feature, query keys in model, and async UI state in the feature UI.
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
