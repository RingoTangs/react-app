import { Link } from '@tanstack/react-router'

const features = [
  {
    title: 'Typed Routing',
    description: 'TanStack Router with file-based routes and generated types.',
  },
  {
    title: 'Data Layer',
    description:
      'React Query wired with conservative defaults for team projects.',
  },
  {
    title: 'Quality Gates',
    description: 'TypeScript, Vitest, ESLint, and Prettier aligned for CI use.',
  },
  {
    title: 'App Boundaries',
    description:
      'Providers, monitoring, and runtime config live outside features.',
  },
]

export const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 via-slate-900 to-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-amber-300 uppercase">
            React Template
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
            Start from a stable baseline, not a demo.
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            This starter keeps runtime defaults conservative and pushes
            environment config, monitoring, providers, and transport concerns
            into clear boundaries.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/error"
              className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-stone-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Verify Error Boundary
            </Link>
            <a
              href="https://github.com/RingoTangs/react-app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 bg-slate-800/50 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-slate-400 hover:bg-slate-700/50"
            >
              Open Repository
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:bg-white/8"
            >
              <h3 className="mb-3 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-slate-500">
          <p>Extend through features, keep app wiring centralized.</p>
        </div>
      </div>
    </div>
  )
}
