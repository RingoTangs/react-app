import { Button } from './Button'

interface NotFoundProps {
  onBackHome: () => void
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackHome }) => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8 text-center font-sans">
      <h1 className="text-muted-foreground mb-4 text-8xl font-bold">404</h1>
      <h2 className="text-foreground mb-4 text-4xl leading-tight font-bold">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-[500px] text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button type="button" intent="primary" onClick={onBackHome}>
        Back to Home
      </Button>
    </div>
  )
}
