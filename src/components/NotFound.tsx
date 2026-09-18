import { Button } from './Button'

interface NotFoundProps {
  onBackHome: () => void
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackHome }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center font-sans">
      <h1 className="mb-4 text-8xl font-bold text-gray-300">404</h1>
      <h2 className="mb-4 text-4xl leading-tight font-bold text-gray-900">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-[500px] text-lg text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button type="button" intent="primary" onClick={onBackHome}>
        Back to Home
      </Button>
    </div>
  )
}
