import { createFileRoute, Link } from '@tanstack/react-router'
import { sleep } from '@/lib/sleep'

const LoadingDemoPage: React.FC = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8 text-center font-sans">
      <h1 className="text-foreground mb-4 text-4xl leading-tight font-bold">
        Router Loading Demo
      </h1>
      <p className="text-muted-foreground mb-8 max-w-[500px] text-lg">
        Client-side navigation to this route displays the top progress bar while
        its loader waits. Reload the page to display the full-screen spinner
        during initial route resolution.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/loading"
          reloadDocument
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-base font-medium shadow-md transition-all duration-200 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Reload to Verify Spinner
        </Link>
        <Link
          to="/"
          className="border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex cursor-pointer items-center justify-center rounded-lg border px-6 py-3 text-base font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/loading')({
  loader: () => sleep(1500),
  head: () => ({
    meta: [
      {
        title: `Router Loading Demo - ${import.meta.env.VITE_SITE_NAME}`,
      },
      {
        name: 'description',
        content: 'Demonstrates initial and navigation loading feedback.',
      },
    ],
  }),
  component: LoadingDemoPage,
})
