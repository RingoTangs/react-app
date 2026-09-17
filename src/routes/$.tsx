import { createFileRoute, useRouter } from '@tanstack/react-router'
import { reportError } from '@/reportError'
import { NotFound } from '@/shared/ui'

export const Route = createFileRoute('/$')({
  head: () => {
    return {
      meta: [
        {
          title: '404 - Page Not Found | React App Template',
        },
        {
          name: 'description',
          content: 'The page you are looking for does not exist.',
        },
      ],
    }
  },
  component: NotFoundPage,
})

function NotFoundPage() {
  const router = useRouter()
  return (
    <NotFound
      onBackHome={() => {
        router.navigate({ to: '/' }).catch(reportError)
      }}
    />
  )
}
