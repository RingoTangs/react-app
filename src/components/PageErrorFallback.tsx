import { Button } from './Button'

interface PageErrorFallbackProps {
  onRetry: () => void
  onBackHome: () => void
}

export const PageErrorFallback: React.FC<PageErrorFallbackProps> = ({
  onRetry,
  onBackHome,
}) => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8 text-center font-sans">
      <h1 className="text-foreground mb-4 text-4xl leading-tight font-bold">
        Oops! Something went wrong
      </h1>
      <p className="text-muted-foreground mb-8 max-w-[500px] text-lg">
        We encountered an unexpected error. Please try again or return to the
        home page.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button type="button" intent="primary" onClick={onRetry}>
          Try Again
        </Button>
        <Button type="button" intent="secondary" onClick={onBackHome}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
