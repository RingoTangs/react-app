import { useNavigate } from '@tanstack/react-router'
import { Button } from './Button'

interface PageErrorFallbackProps {
  error?: unknown
  resetErrorBoundary: () => void
}

export const PageErrorFallback: React.FC<PageErrorFallbackProps> = ({
  resetErrorBoundary,
}) => {
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate({ to: '/' }).then(() => resetErrorBoundary())
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center font-sans">
      <h1 className="mb-4 text-4xl leading-tight font-bold text-gray-900">
        Oops! Something went wrong
      </h1>
      <p className="mb-8 max-w-[500px] text-lg text-gray-500">
        We encountered an unexpected error. Please try again or return to the
        home page.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button type="button" intent="primary" onClick={resetErrorBoundary}>
          Try Again
        </Button>
        <Button type="button" intent="secondary" onClick={handleBackHome}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
