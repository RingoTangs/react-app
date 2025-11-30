// components/PageErrorFallback.tsx
import type { FallbackProps } from 'react-error-boundary'

const PageErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title & Description */}
        <h2 className="mb-2 text-2xl font-bold text-gray-900">出错了</h2>
        <p className="mb-8 text-gray-500">
          抱歉，页面加载过程中发生了意外错误。
        </p>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 focus:outline-none"
          >
            重试
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 focus:outline-none"
          >
            刷新页面
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageErrorFallback
