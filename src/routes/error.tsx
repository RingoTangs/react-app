import { createFileRoute } from '@tanstack/react-router'

const ErrorDemoPage: React.FC = () => {
  throw new Error('Intentional error for testing the route error boundary.')
}

export const Route = createFileRoute('/error')({
  component: ErrorDemoPage,
})
