import type { FallbackProps } from 'react-error-boundary'

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none',
  variants: {
    intent: {
      primary:
        'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:ring-blue-500',
      secondary:
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-500',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
})

const PageErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
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
        <button
          type="button"
          onClick={resetErrorBoundary}
          className={button({ intent: 'primary' })}
        >
          Try Again
        </button>
        <Link to="/" className={button({ intent: 'secondary' })}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default PageErrorFallback
