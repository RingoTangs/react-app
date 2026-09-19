import { createFileRoute, Link } from '@tanstack/react-router'
import { SITE_NAME } from '@/app/site'
import { sleep } from '@/lib'

const LoadingDemoPage: React.FC = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-6 py-20">
      <main className="border-border bg-surface w-full max-w-3xl rounded-3xl border p-8 text-center shadow-lg sm:p-12">
        <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
          TanStack Router
        </p>
        <h1 className="text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Router Loading Demo
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl leading-relaxed">
          Client-side navigation to this route displays the top progress bar
          while its loader waits. Reload the page to display the full-screen
          spinner during initial route resolution.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-ring rounded-full px-8 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Back to Home
          </Link>
          <a
            href="/loading"
            className="border-border bg-surface text-foreground hover:border-muted-foreground hover:bg-surface-hover focus-visible:outline-ring rounded-full border px-8 py-3 font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Reload to Verify Spinner
          </a>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/loading')({
  loader: () => sleep(1500),
  head: () => ({
    meta: [
      { title: `Router Loading Demo - ${SITE_NAME}` },
      {
        name: 'description',
        content: 'Demonstrates initial and navigation loading feedback.',
      },
    ],
  }),
  component: LoadingDemoPage,
})
