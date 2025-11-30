import { useNavigate } from '@tanstack/react-router'

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

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center font-sans">
      <h1 className="mb-4 text-8xl font-bold text-gray-300">404</h1>
      <h2 className="mb-4 text-4xl leading-tight font-bold text-gray-900">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-[500px] text-lg text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        type="button"
        onClick={() => navigate({ to: '/' })}
        className={button({ intent: 'primary' })}
      >
        Back to Home
      </button>
    </div>
  )
}

export default NotFound
