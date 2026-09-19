import { createFileRoute, useRouter } from '@tanstack/react-router'
import { reportError } from '@/app/reportError'
import { NotFound } from '@/components'

const NotFoundComponent: React.FC = () => {
  const router = useRouter()
  return (
    <NotFound
      onBackHome={() => {
        router.navigate({ to: '/' }).catch(reportError)
      }}
    />
  )
}

export const Route = createFileRoute('/$')({
  head: () => {
    return {
      meta: [
        {
          title: `404 - Page Not Found | ${import.meta.env.VITE_SITE_NAME}`,
        },
        {
          name: 'description',
          content: 'The page you are looking for does not exist.',
        },
      ],
    }
  },
  component: NotFoundComponent,
})
