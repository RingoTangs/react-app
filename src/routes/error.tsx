import { createFileRoute } from '@tanstack/react-router'
import { SITE_NAME } from '@/site'

const ErrorDemoPage: React.FC = () => {
  throw new Error('Intentional error for testing the route error boundary.')
}

export const Route = createFileRoute('/error')({
  head: () => ({
    meta: [
      { title: `Error Demo - ${SITE_NAME}` },
      {
        name: 'description',
        content: 'Demonstrates route error handling and recovery.',
      },
    ],
  }),
  component: ErrorDemoPage,
})
