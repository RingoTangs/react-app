const features = [
  {
    title: 'React 19',
    description: 'Latest React with improved performance and new features',
    icon: '⚛️',
  },
  {
    title: 'TanStack Router',
    description: 'Type-safe routing with file-based route generation',
    icon: '🧭',
  },
  {
    title: 'TanStack Query',
    description: 'Powerful data fetching and caching solution',
    icon: '🔄',
  },
  {
    title: 'Tailwind CSS v4',
    description: 'Utility-first CSS framework for rapid UI development',
    icon: '🎨',
  },
]

export const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-7xl">
            Welcome to{' '}
            <span className="bg-linear-to-br from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              React App
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-300">
            A modern React application built with the latest technologies. Fast,
            type-safe, and ready for production.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/"
              className="rounded-full bg-linear-to-br from-purple-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25"
            >
              Get Started
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 bg-slate-800/50 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:bg-slate-700/50"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-slate-800/50"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-slate-500">
          <p>Built with modern web technologies</p>
        </div>
      </div>
    </div>
  )
}
