import { createFileRoute } from '@tanstack/react-router'

const AboutComponent: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-2xl font-bold">About</div>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})
