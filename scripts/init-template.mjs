import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
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
                'Providers, monitoring, and app wiring stay outside features.',
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

const packageInitLine =
  '    "init:template": "node scripts/init-template.mjs",\n'

const readmeInitCommandEn =
  'pnpm init:template # one-time cleanup of demo features and routes, then self-remove\n'

const readmeInitCommandZh =
  'pnpm init:template # 一次性清理 demo feature 和路由，然后自删除\n'

const agentsInitLine =
  '- `pnpm init:template` is a one-time initializer that removes demo features and routes, updates starter files, regenerates the route tree, then deletes its own command entry and script file.\n'

const cleanProjectLayoutEn = `## Project Layout

\`\`\`text
public/
└── app-icon.svg                # Static public asset served from a stable URL

types/
└── .gitkeep                    # Placeholder for repo-level ambient declarations

src/
├── main.tsx                    # React app bootstrap
├── App.tsx                     # Root component; delegates app wiring to app providers
├── style.css                   # Global styles and Tailwind CSS entry
├── setupTests.ts               # Vitest and Testing Library setup
├── routeTree.gen.ts            # Generated TanStack Router route tree; do not edit manually
│
├── config/                     # Runtime environment config shared by app, routes, and features
│   ├── README.md
│   └── env.ts
│
├── app/                        # App-level infrastructure and wiring
│   ├── monitoring/             # Error reporting integration point
│   ├── providers/              # Global provider composition
│   ├── query/                  # Shared app-level QueryClient setup
│   └── router/                 # Router instance, defaults, and devtools
│
├── routes/                     # TanStack file-based routes
│   ├── -__root.spec.tsx        # Root route behavior tests
│   ├── __root.tsx              # Root route layout, outlet, and error boundary
│   └── index.tsx               # Route for /
│
├── features/                   # Product capabilities grouped by domain
│   └── home/
│       └── ui/
│           └── HomePage.tsx
│
└── shared/                     # Reusable, product-agnostic building blocks
    ├── assets/                 # Shared media imported by application code
    ├── ui/                     # Shared UI components
    └── lib/                    # Pure helpers and framework-light utilities
\`\`\`

`

const cleanProjectLayoutZh = `## 项目结构

\`\`\`text
public/
└── app-icon.svg                # 固定 URL 访问的公共静态资产

types/
└── .gitkeep                    # Repo 级 ambient declarations 的占位目录

src/
├── main.tsx                    # React 应用启动入口
├── App.tsx                     # 根组件；将应用级装配委托给 app providers
├── style.css                   # 全局样式和 Tailwind CSS 入口
├── setupTests.ts               # Vitest 与 Testing Library 测试初始化
├── routeTree.gen.ts            # TanStack Router 生成的路由树；不要手动编辑
│
├── config/                     # app、routes 和 features 可读取的运行时环境配置
│   ├── README.md
│   └── env.ts
│
├── app/                        # 应用级基础设施和装配
│   ├── monitoring/             # 错误上报集成点
│   ├── providers/              # 全局 provider 组合
│   ├── query/                  # 应用级共享 QueryClient 配置
│   └── router/                 # Router 实例、默认配置和 devtools
│
├── routes/                     # TanStack 文件路由
│   ├── -__root.spec.tsx        # 根路由行为测试
│   ├── __root.tsx              # 根路由布局、Outlet 和错误边界
│   └── index.tsx               # / 路由
│
├── features/                   # 按业务域组织的产品能力
│   └── home/
│       └── ui/
│           └── HomePage.tsx
│
└── shared/                     # 产品无关的可复用基础模块
    ├── assets/                 # 由应用代码 import 的共享媒体资源
    ├── ui/                     # 共享 UI 组件
    └── lib/                    # 纯工具函数和轻框架工具
\`\`\`

`

const cleanDataFetchingEn = `### Data Fetching

This template does not include a shared HTTP client. Keep request functions inside the owning feature, query keys and query options in \`model\`, React Query hooks in \`hooks\`, and loading, error, empty, and success states in feature \`ui\`.

When route loaders need data, they should call feature-owned query options, not feature endpoints directly. This keeps route preloading and component \`useQuery\` on the same query key and cache entry.

\`\`\`tsx
import { createFileRoute } from '@tanstack/react-router'
import { usersQueryOptions } from '@/features/users/model/queryOptions'
import { UsersPage } from '@/features/users/ui/UsersPage'

export const Route = createFileRoute('/users')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(usersQueryOptions())
  },
  component: UsersPage,
})
\`\`\`

Do not add a top-level \`src/api\`. Do not call \`fetch\` directly from React components, hooks, or route files; keep network access in feature \`api\` files when a real backend exists. When a real backend integration needs base URLs, authentication, retries, OpenAPI, ky, Axios, or RPC clients, design that transport layer from the project requirements instead of inheriting one from the template.

`

const cleanDataFetchingZh = `### 数据请求

模板不内置共享 HTTP client。请求函数放在所属 feature 的 \`api\`，query keys 和 query options 放在 \`model\`，React Query hooks 放在 \`hooks\`，loading、error、empty、success 状态由 feature \`ui\` 处理。

当 route loader 需要数据时，应调用 feature 自己暴露的 query options，而不是直接调用 feature endpoint。这样 route 预取和组件里的 \`useQuery\` 会使用同一个 query key 和缓存项。

\`\`\`tsx
import { createFileRoute } from '@tanstack/react-router'
import { usersQueryOptions } from '@/features/users/model/queryOptions'
import { UsersPage } from '@/features/users/ui/UsersPage'

export const Route = createFileRoute('/users')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(usersQueryOptions())
  },
  component: UsersPage,
})
\`\`\`

不要新增顶层 \`src/api\`。不要在 React 组件、hooks 或 route 文件中直接调用 \`fetch\`；如果有真实后端，再把网络访问放在 feature 的 \`api\` 文件中。当真实后端集成需要 baseURL、认证、重试、OpenAPI、ky、Axios 或 RPC client 时，再基于项目需求设计传输层。

`

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

const replaceSection = (
  content,
  startHeading,
  endHeading,
  replacement,
  filePath,
) => {
  const startIndex = content.indexOf(startHeading)
  const endIndex = content.indexOf(endHeading, startIndex)

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error(
      `Could not find expected section in ${filePath}: ${startHeading}`,
    )
  }

  return `${content.slice(0, startIndex)}${replacement}${content.slice(endIndex)}`
}

const patchMarkdownSections = async (relativePath, sections) => {
  const absolutePath = path.join(rootDir, relativePath)
  let content = await readFile(absolutePath, 'utf8')

  for (const [startHeading, endHeading, replacement] of sections) {
    content = replaceSection(
      content,
      startHeading,
      endHeading,
      replacement,
      relativePath,
    )
  }

  await writeFile(absolutePath, content)
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

const patchTextFile = async (relativePath, replacements) => {
  const absolutePath = path.join(rootDir, relativePath)
  let content = await readFile(absolutePath, 'utf8')

  for (const [before, after] of replacements) {
    content = replaceExact(content, before, after, relativePath)
  }

  await writeFile(absolutePath, content)
}

const patchDocsAndConfigs = async () => {
  await patchMarkdownSections('README.md', [
    ['### Optional initialization\n', '## Scripts\n', ''],
    ['## Project Layout\n', '### Directory Boundaries\n', cleanProjectLayoutEn],
    [
      '### Data Fetching\n',
      '### Routes vs Feature Pages\n',
      cleanDataFetchingEn,
    ],
  ])
  await patchTextFile('README.md', [[readmeInitCommandEn, '']])

  await patchMarkdownSections('README.zh-CN.md', [
    ['### 可选初始化\n', '## 脚本\n', ''],
    ['## 项目结构\n', '### 目录边界\n', cleanProjectLayoutZh],
    ['### 数据请求\n', '### Routes 与 Feature 页面\n', cleanDataFetchingZh],
  ])
  await patchTextFile('README.zh-CN.md', [[readmeInitCommandZh, '']])

  await patchTextFile('AGENTS.md', [[agentsInitLine, '']])
  await patchTextFile('package.json', [[packageInitLine, '']])
}

const regenerateRouteTree = () => {
  execFileSync('pnpm', ['exec', 'vite', 'build'], {
    cwd: rootDir,
    stdio: 'inherit',
  })
}

const removeBuildArtifacts = async () => {
  await rm(path.join(rootDir, 'dist'), { recursive: true, force: true })
}

const removeInitializer = async () => {
  await rm(__filename, { force: true })

  const scriptsDir = path.join(rootDir, 'scripts')
  const entries = await readdir(scriptsDir).catch(() => [])

  if (entries.length === 0) {
    await rm(scriptsDir, { recursive: true, force: true })
  }
}

const printSummary = async () => {
  const routeTreeExists = existsSync(path.join(rootDir, 'src/routeTree.gen.ts'))
  const packageContent = await readFile(
    path.join(rootDir, 'package.json'),
    'utf8',
  )
  const readmePreview = await readFile(path.join(rootDir, 'README.md'), 'utf8')
  const hasInitCommand = packageContent.includes('init:template')

  console.log('\nTemplate initialization complete.\n')
  console.log('Removed demo content:')
  for (const target of filesToDelete) {
    console.log(`- ${target}`)
  }

  console.log('\nUpdated starter files:')
  for (const target of filesToWrite.keys()) {
    console.log(`- ${target}`)
  }
  console.log('- README.md')
  console.log('- README.zh-CN.md')
  console.log('- AGENTS.md')
  console.log('- package.json')

  console.log(`\nRegenerated route tree: ${routeTreeExists ? 'yes' : 'no'}`)
  console.log(`Initializer command removed: ${hasInitCommand ? 'no' : 'yes'}`)
  console.log(
    `README title: ${readmePreview.split('\n')[0].replace(/^# /, '') || 'n/a'}`,
  )
  console.log('\nNext steps:')
  console.log('- Review the updated HomePage copy and remaining documentation')
  console.log('- Add your first real feature under src/features')
  console.log('- Run pnpm check')
}

const main = async () => {
  ensureCleanWorktree()
  await removeTargets()
  await writeTargets()
  await patchDocsAndConfigs()
  regenerateRouteTree()
  await removeBuildArtifacts()
  await removeInitializer()
  await printSummary()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
