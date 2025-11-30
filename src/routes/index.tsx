import { createFileRoute } from '@tanstack/react-router'
import { Welcome } from '@/components/builtin'

export const Route = createFileRoute('/')({
  component: Welcome,
})
