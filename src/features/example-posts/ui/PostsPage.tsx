import { PostsPreview } from './PostsPreview'

export const PostsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 via-slate-900 to-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-medium tracking-[0.2em] text-amber-300 uppercase">
            Posts Route
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Posts Route + Feature Query Options
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            This route preloads feature-owned query options through the router
            context, then renders the same query from feature UI.
          </p>
        </div>

        <PostsPreview />
      </div>
    </div>
  )
}
