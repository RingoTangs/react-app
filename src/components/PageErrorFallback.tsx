// components/PageErrorFallback.tsx
import type { FallbackProps } from 'react-error-boundary'

const PageErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-600">页面加载失败了</h2>
        <pre className="mb-6 overflow-auto rounded bg-gray-100 p-4 text-left text-sm">
          {error.message}
        </pre>
        <div className="space-x-4">
          <button
            type="button"
            className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            onClick={resetErrorBoundary} // ← 会触发 QueryErrorResetBoundary 的 reset
          >
            重试
          </button>
          <button
            type="button"
            className="rounded bg-gray-600 px-6 py-3 text-white hover:bg-gray-700"
            onClick={() => window.location.reload()}
          >
            刷新页面
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageErrorFallback
