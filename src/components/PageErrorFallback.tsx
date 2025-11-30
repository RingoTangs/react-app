import type { FallbackProps } from 'react-error-boundary'
import { Link } from '@tanstack/react-router'
import './PageErrorFallback.css'

const PageErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <div className="page-error-fallback-container">
      <h1 className="page-error-title">Oops! Something went wrong</h1>
      <p className="page-error-description">
        We encountered an unexpected error. Please try again or return to the
        home page.
      </p>
      <div className="page-error-actions">
        <button
          type="button"
          onClick={resetErrorBoundary}
          className="page-error-button page-error-button-primary"
        >
          Try Again
        </button>
        <Link to="/" className="page-error-button page-error-button-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default PageErrorFallback
