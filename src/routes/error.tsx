import { createFileRoute } from '@tanstack/react-router'

const ErrorComponent: React.FC = () => {
  throw new Error('1')
}

export const Route = createFileRoute('/error')({
  component: ErrorComponent,
})
