import { createFileRoute } from '@tanstack/react-router'
import { sleep } from '@/lib'
import { SITE_NAME } from '@/site'

const ErrorDemoPage: React.FC = () => {
  throw new Error('Intentional error for testing the route error boundary.')
}

export const Route = createFileRoute('/error')({
  loader: async () => {
    // 模拟加载延迟，方便测试加载进度条。
    await sleep(1500)
  },
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
