import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const homePageContent = `export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 via-slate-900 to-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-amber-300 uppercase">
            React Template
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
            Start from a stable baseline for your product.
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            The template keeps runtime defaults conservative and leaves room for
            your own features, routes, providers, and transport decisions.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="https://github.com/RingoTangs/react-app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 bg-slate-800/50 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-slate-400 hover:bg-slate-700/50"
            >
              Open Repository
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Typed Routing',
              description:
                'TanStack Router with file-based routes and generated types.',
            },
            {
              title: 'Data Layer',
              description:
                'React Query infrastructure is ready for feature-owned queries.',
            },
            {
              title: 'Quality Gates',
              description:
                'TypeScript, Vitest, ESLint, and Prettier stay aligned for CI.',
            },
            {
              title: 'App Boundaries',
              description:
                'Providers, monitoring, and runtime config stay outside features.',
            },
          ].map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:bg-white/8"
            >
              <h3 className="mb-3 text-lg font-semibold text-white">
                {highlight.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-slate-500">
          <p>Create your first product feature under src/features.</p>
        </div>
      </div>
    </div>
  )
}
`

const rootSpecContent = `import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createAppRouter } from '@/app/router/router'

const renderWithRouter = (initialEntries: Array<string>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const history = createMemoryHistory({ initialEntries })
  const router = createAppRouter(queryClient, {
    history,
  })

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { router }
}

afterEach(() => {
  cleanup()
})

describe('root route', () => {
  it('renders the starter home page', async () => {
    const { router } = renderWithRouter(['/'])

    expect(router.state.location.pathname).toBe('/')
    expect(
      await screen.findByText('Start from a stable baseline for your product.'),
    ).toBeInTheDocument()
  })
})
`

const readmeLayoutBlockEn = `├── routes/                     # TanStack file-based routes
│   ├── __root.tsx              # Root route layout, outlet, and error boundary
│   ├── index.tsx               # Route for /
│   ├── posts.tsx               # Loader + query preloading example route
│   └── error.tsx               # Demo route for error boundary verification
│
├── features/                   # Product or demo capabilities grouped by domain
│   ├── home/
│   │   └── ui/
│   │       └── HomePage.tsx
│   ├── example-counter/
│   │   ├── assets/             # Feature-owned media imported by feature code
│   │   │   └── counter-mark.svg
│   │   ├── hooks/
│   │   │   └── useCounter.ts
│   │   ├── lib/
│   │   │   └── getNextCount.ts
│   │   ├── model/
│   │   │   ├── constants.ts
│   │   │   └── types.ts
│   │   └── ui/
│   │       ├── Counter.tsx
│   │       └── Counter.spec.tsx
│   └── example-posts/          # Feature-owned API + React Query example
│       ├── api/
│       ├── hooks/
│       ├── model/
│       └── ui/
│
└── shared/                     # Reusable, product-agnostic building blocks`

const readmeLayoutReplacementEn = `├── routes/                     # TanStack file-based routes
│   ├── __root.tsx              # Root route layout, outlet, and error boundary
│   └── index.tsx               # Route for /
│
├── features/                   # Product or demo capabilities grouped by domain
│   ├── README.md
│   └── home/
│       └── ui/
│           └── HomePage.tsx
│
└── shared/                     # Reusable, product-agnostic building blocks`

const readmeLayoutBlockZh = `├── routes/                     # TanStack 文件路由
│   ├── __root.tsx              # 根路由布局、Outlet 和错误边界
│   ├── index.tsx               # / 路由
│   ├── posts.tsx               # loader + query 预取示例路由
│   └── error.tsx               # 错误边界验证用 demo 路由
│
├── features/                   # 按业务域组织的产品或 demo 能力
│   ├── home/
│   │   └── ui/
│   │       └── HomePage.tsx
│   ├── example-counter/
│   │   ├── assets/             # Feature 自有、由 feature 代码 import 的媒体资源
│   │   │   └── counter-mark.svg
│   │   ├── hooks/
│   │   │   └── useCounter.ts
│   │   ├── lib/
│   │   │   └── getNextCount.ts
│   │   ├── model/
│   │   │   ├── constants.ts
│   │   │   └── types.ts
│   │   └── ui/
│   │       ├── Counter.tsx
│   │       └── Counter.spec.tsx
│   └── example-posts/          # Feature 自有 API + React Query 示例
│       ├── api/
│       ├── hooks/
│       ├── model/
│       └── ui/
│
└── shared/                     # 产品无关的可复用基础模块`

const readmeLayoutReplacementZh = `├── routes/                     # TanStack 文件路由
│   ├── __root.tsx              # 根路由布局、Outlet 和错误边界
│   └── index.tsx               # / 路由
│
├── features/                   # 按业务域组织的产品或 demo 能力
│   ├── README.md
│   └── home/
│       └── ui/
│           └── HomePage.tsx
│
└── shared/                     # 产品无关的可复用基础模块`

const readmeDataFetchingBlockEn = `\`\`\`text
src/features/example-posts/
├── api/getPosts.ts             # feature-owned async request function
├── hooks/usePostsQuery.ts      # React Query binding
├── model/queryOptions.ts       # shared query options for hooks and loaders
├── model/queryKeys.ts          # query key factory
├── model/types.ts              # domain type
└── ui/PostsPage.tsx            # route page reusing feature query state
\`\`\`

When route loaders need data, they should call feature-owned query options, not feature endpoints directly. This keeps route preloading and component \`useQuery\` on the same query key and cache entry.

\`\`\`ts
export const Route = createFileRoute('/posts')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(postsQueryOptions())
  },
  component: PostsPage,
})
\`\`\`

Do not add a top-level \`src/api\`. Do not call \`fetch\` directly from React components, hooks, or route files; keep network access in feature \`api\` files when a real backend exists. The starter uses local async sample data by default so it works offline and on internal networks. When a real backend integration needs base URLs, authentication, retries, OpenAPI, ky, Axios, or RPC clients, design that transport layer from the project requirements instead of inheriting one from the template.`

const readmeDataFetchingReplacementEn = `\`\`\`text
src/features/orders/
├── api/getOrders.ts            # feature-owned request function
├── hooks/useOrdersQuery.ts     # React Query binding
├── model/queryOptions.ts       # shared query options for hooks and loaders
├── model/queryKeys.ts          # query key factory
├── model/types.ts              # domain type
└── ui/OrdersPage.tsx           # route page reusing feature query state
\`\`\`

When route loaders need data, they should call feature-owned query options, not feature endpoints directly. This keeps route preloading and component \`useQuery\` on the same query key and cache entry.

\`\`\`ts
export const Route = createFileRoute('/orders')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(ordersQueryOptions())
  },
  component: OrdersPage,
})
\`\`\`

Do not add a top-level \`src/api\`. Do not call \`fetch\` directly from React components, hooks, or route files; keep network access in feature \`api\` files when a real backend exists. When a real backend integration needs base URLs, authentication, retries, OpenAPI, ky, Axios, or RPC clients, design that transport layer from the project requirements instead of inheriting one from the template.`

const readmeDataFetchingBlockZh = `\`\`\`text
src/features/example-posts/
├── api/getPosts.ts             # feature 自己维护的异步请求函数
├── hooks/usePostsQuery.ts      # React Query 绑定
├── model/queryOptions.ts       # hooks 和 loaders 复用的 query options
├── model/queryKeys.ts          # query key 工厂
├── model/types.ts              # 领域类型
└── ui/PostsPage.tsx            # 复用 feature 查询状态的路由页面
\`\`\`

当 route loader 需要数据时，应调用 feature 自己暴露的 query options，而不是直接调用 feature endpoint。这样 route 预取和组件里的 \`useQuery\` 会使用同一个 query key 和缓存项。

\`\`\`ts
export const Route = createFileRoute('/posts')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(postsQueryOptions())
  },
  component: PostsPage,
})
\`\`\`

不要新增顶层 \`src/api\`。不要在 React 组件、hooks 或 route 文件中直接调用 \`fetch\`；如果有真实后端，再把网络访问放在 feature 的 \`api\` 文件中。模板默认使用本地异步示例数据，因此在离线或内网环境下也能稳定运行。当真实后端集成需要 baseURL、认证、重试、OpenAPI、ky、Axios 或 RPC client 时，再基于项目需求设计传输层。`

const readmeDataFetchingReplacementZh = `\`\`\`text
src/features/orders/
├── api/getOrders.ts            # feature 自己维护的请求函数
├── hooks/useOrdersQuery.ts     # React Query 绑定
├── model/queryOptions.ts       # hooks 和 loaders 复用的 query options
├── model/queryKeys.ts          # query key 工厂
├── model/types.ts              # 领域类型
└── ui/OrdersPage.tsx           # 复用 feature 查询状态的路由页面
\`\`\`

当 route loader 需要数据时，应调用 feature 自己暴露的 query options，而不是直接调用 feature endpoint。这样 route 预取和组件里的 \`useQuery\` 会使用同一个 query key 和缓存项。

\`\`\`ts
export const Route = createFileRoute('/orders')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(ordersQueryOptions())
  },
  component: OrdersPage,
})
\`\`\`

不要新增顶层 \`src/api\`。不要在 React 组件、hooks 或 route 文件中直接调用 \`fetch\`；如果有真实后端，再把网络访问放在 feature 的 \`api\` 文件中。当真实后端集成需要 baseURL、认证、重试、OpenAPI、ky、Axios 或 RPC client 时，再基于项目需求设计传输层。`

const readmeTemplateDefaultsBlockEn =
  '- The template does not preselect a shared HTTP client; the example feature uses native `fetch` inside its own `api` file.'
const readmeTemplateDefaultsReplacementEn =
  '- The template does not preselect a shared HTTP client; feature-owned `api` files may use native `fetch` until a real shared transport layer is justified.'

const readmeTemplateDefaultsBlockZh =
  '- 模板不预设共享 HTTP client；示例 feature 只在自己的 `api` 文件中使用原生 `fetch`。'
const readmeTemplateDefaultsReplacementZh =
  '- 模板不预设共享 HTTP client；在真实共享传输层出现前，feature 自己的 `api` 文件可以先使用原生 `fetch`。'

const filesToDelete = [
  'src/features/example-counter',
  'src/features/example-posts',
  'src/routes/posts.tsx',
  'src/routes/error.tsx',
]

const filesToWrite = new Map([
  ['src/features/home/ui/HomePage.tsx', homePageContent],
  ['src/routes/-__root.spec.tsx', rootSpecContent],
])

const docsToPatch = [
  {
    path: 'README.md',
    replacements: [
      [readmeLayoutBlockEn, readmeLayoutReplacementEn],
      [readmeDataFetchingBlockEn, readmeDataFetchingReplacementEn],
      [readmeTemplateDefaultsBlockEn, readmeTemplateDefaultsReplacementEn],
    ],
  },
  {
    path: 'README.zh-CN.md',
    replacements: [
      [readmeLayoutBlockZh, readmeLayoutReplacementZh],
      [readmeDataFetchingBlockZh, readmeDataFetchingReplacementZh],
      [readmeTemplateDefaultsBlockZh, readmeTemplateDefaultsReplacementZh],
    ],
  },
]

const ensureCleanWorktree = () => {
  const output = execFileSync('git', ['status', '--porcelain'], {
    cwd: rootDir,
    encoding: 'utf8',
  }).trim()

  if (output) {
    console.error(
      'Initialization aborted: the worktree is not clean. Commit or stash changes before running pnpm init:template.',
    )
    process.exit(1)
  }
}

const replaceExact = (content, before, after, filePath) => {
  if (!content.includes(before)) {
    throw new Error(`Could not find expected content in ${filePath}`)
  }

  return content.replace(before, after)
}

const removeTargets = async () => {
  for (const target of filesToDelete) {
    await rm(path.join(rootDir, target), { recursive: true, force: true })
  }
}

const writeTargets = async () => {
  for (const [target, content] of filesToWrite) {
    const absolutePath = path.join(rootDir, target)
    await mkdir(path.dirname(absolutePath), { recursive: true })
    await writeFile(absolutePath, `${content.trim()}\n`)
  }
}

const patchDocs = async () => {
  for (const doc of docsToPatch) {
    const absolutePath = path.join(rootDir, doc.path)
    let content = await readFile(absolutePath, 'utf8')

    for (const [before, after] of doc.replacements) {
      content = replaceExact(content, before, after, doc.path)
    }

    await writeFile(absolutePath, content)
  }
}

const removeBuildArtifacts = async () => {
  await rm(path.join(rootDir, 'dist'), { recursive: true, force: true })
}

const regenerateRouteTree = () => {
  execFileSync('pnpm', ['exec', 'vite', 'build'], {
    cwd: rootDir,
    stdio: 'inherit',
  })
}

const printSummary = async () => {
  const routeTreeExists = existsSync(path.join(rootDir, 'src/routeTree.gen.ts'))
  const readmePreview = await readFile(path.join(rootDir, 'README.md'), 'utf8')

  console.log('\nTemplate initialization complete.\n')
  console.log('Removed demo content:')
  for (const target of filesToDelete) {
    console.log(`- ${target}`)
  }

  console.log('\nUpdated starter files:')
  for (const target of filesToWrite.keys()) {
    console.log(`- ${target}`)
  }
  for (const doc of docsToPatch) {
    console.log(`- ${doc.path}`)
  }

  console.log(`\nRegenerated route tree: ${routeTreeExists ? 'yes' : 'no'}`)
  console.log(
    `README title: ${readmePreview.split('\n')[0].replace(/^# /, '') || 'n/a'}`,
  )
  console.log('\nNext steps:')
  console.log('- Review the updated README sections and HomePage copy')
  console.log('- Add your first real feature under src/features')
  console.log('- Run pnpm check')
}

const main = async () => {
  ensureCleanWorktree()
  await removeTargets()
  await writeTargets()
  await patchDocs()
  regenerateRouteTree()
  await removeBuildArtifacts()
  await printSummary()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
