import { createFileRoute } from '@tanstack/react-router'

const IndexComponent: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-2xl font-bold">Hello React</div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexComponent,
})
