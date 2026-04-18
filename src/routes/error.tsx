import { createFileRoute } from '@tanstack/react-router'

const ErrorRouteDemo: React.FC = () => {
  throw new Error('1')
}

export const Route = createFileRoute('/error')({
  component: ErrorRouteDemo,
})
