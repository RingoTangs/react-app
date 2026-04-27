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

const readmeContent = `# React App Template

<p align="center">
  <img src="./public/app-icon.svg" alt="React App Template" width="96" height="96" />
</p>

<p align="center">
  <strong>A team-oriented React starter for scalable frontend applications.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" />
  <img alt="TanStack Router" src="https://img.shields.io/badge/TanStack_Router-file--based-ff4154" />
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-server_state-ff4154" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss&logoColor=white" />
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-tested-6e9f18?logo=vitest&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm&logoColor=white" />
</p>

<p align="center">
  English | <a href="./README.zh-CN.md">简体中文</a>
</p>

A team-oriented React starter built on React 19, Vite 8, TanStack Router, TanStack Query, Tailwind CSS v4, and Vitest. This initialized version keeps only the architectural baseline so product teams can start from a clean app skeleton.

## Quick Start

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

The dev server runs on \`http://localhost:3000\`.

## Scripts

\`\`\`bash
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm test:run
pnpm lint
pnpm format:check
pnpm check
\`\`\`

## Project Layout

\`\`\`text
public/
└── app-icon.svg

types/
└── .gitkeep

src/
├── main.tsx
├── App.tsx
├── style.css
├── setupTests.ts
├── routeTree.gen.ts
├── config/
├── app/
├── routes/
│   ├── __root.tsx
│   └── index.tsx
├── features/
│   ├── README.md
│   └── home/
│       └── ui/
│           └── HomePage.tsx
└── shared/
\`\`\`

## Architecture Rules

- \`config\` owns stable runtime configuration that may be read by \`app\`, \`routes\`, and \`features\`.
- \`app\` owns infrastructure wiring such as providers, router setup, devtools, and monitoring.
- \`routes\` maps URLs to route behavior and delegates page implementation to \`features\`.
- \`features\` owns product capabilities by domain.
- \`shared\` owns reusable UI and pure helpers and must stay independent from \`app\`, \`routes\`, and \`features\`.

## Data Fetching

This template does not preselect a shared HTTP client. Put request functions in the owning feature's \`api/\`, query keys and query options in \`model/\`, React Query bindings in \`hooks/\`, and async UI states in feature \`ui/\`.

When route loaders need data, call feature-owned \`queryOptions()\` helpers through \`context.queryClient.ensureQueryData(...)\` so loaders and components reuse the same cache entry.

## Next Steps

- Add your first product feature under \`src/features/<domain>\`
- Add route files under \`src/routes\`
- Keep route files thin and move business UI into features
- Introduce a shared transport layer only when a real backend requires it
`

const readmeZhContent = `# React App Template

<p align="center">
  <img src="./public/app-icon.svg" alt="React App Template" width="96" height="96" />
</p>

<p align="center">
  <strong>一个面向团队协作、可扩展前端应用的 React 工程模板。</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" />
  <img alt="TanStack Router" src="https://img.shields.io/badge/TanStack_Router-file--based-ff4154" />
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-server_state-ff4154" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss&logoColor=white" />
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-tested-6e9f18?logo=vitest&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm&logoColor=white" />
</p>

<p align="center">
  <a href="./README.md">English</a> | 简体中文
</p>

这是执行初始化脚本后的精简版模板说明。它保留团队工程的架构基线，让业务项目从更干净的起点开始，而不是继续携带示例 feature 和示例路由。

## 快速开始

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

开发服务器运行在 \`http://localhost:3000\`。

## 常用命令

\`\`\`bash
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm test:run
pnpm lint
pnpm format:check
pnpm check
\`\`\`

## 目录结构

\`\`\`text
public/
└── app-icon.svg

types/
└── .gitkeep

src/
├── main.tsx
├── App.tsx
├── style.css
├── setupTests.ts
├── routeTree.gen.ts
├── config/
├── app/
├── routes/
│   ├── __root.tsx
│   └── index.tsx
├── features/
│   ├── README.md
│   └── home/
│       └── ui/
│           └── HomePage.tsx
└── shared/
\`\`\`

## 架构规则

- \`config\` 负责稳定运行时配置，可被 \`app\`、\`routes\`、\`features\` 读取。
- \`app\` 负责 providers、router、devtools、monitoring 等基础设施装配。
- \`routes\` 负责 URL 到路由行为的映射，并把页面实现委托给 \`features\`。
- \`features\` 负责按业务域组织产品能力。
- \`shared\` 负责可复用 UI 和纯工具函数，必须独立于 \`app\`、\`routes\`、\`features\`。

## 数据请求

模板不预设共享 HTTP client。请求函数放在所属 feature 的 \`api/\`，query key 和 query options 放在 \`model/\`，React Query 绑定放在 \`hooks/\`，异步 UI 状态放在 feature 的 \`ui/\`。

如果 route loader 需要预取数据，应通过 \`context.queryClient.ensureQueryData(...)\` 调用 feature 自己的 \`queryOptions()\`，让 loader 与组件共享同一份缓存。

## 下一步

- 在 \`src/features/<domain>\` 下添加你的第一个业务 feature
- 在 \`src/routes\` 中增加真实业务路由
- 保持 route 文件轻量，把页面级业务 UI 放进 feature
- 只有当真实后端出现共性需求时，再抽共享传输层
`

const featuresReadmeContent = `# Features

## Purpose

\`features\` contains product capabilities grouped by domain. A feature owns its business behavior, page-level components, local state, and feature-specific data access.

\`features\` 用于按业务域组织产品能力。一个 feature 拥有自己的业务行为、页面级组件、局部状态和 feature 专属数据访问。

## Put Here

Use \`ui/\` for feature-owned components, \`api/\` for feature-specific requests, \`model/\` for domain types or query keys, \`hooks/\` for feature hooks, \`lib/\` for feature-only helpers, \`constants/\` for feature-only constants, and \`assets/\` for feature-private media imported by feature code.

\`ui/\` 放 feature 自己拥有的组件，\`api/\` 放 feature 专属请求，\`model/\` 放领域类型或 query keys，\`hooks/\` 放 feature hooks，\`lib/\` 放只服务当前 feature 的工具函数，\`constants/\` 放 feature 私有常量，\`assets/\` 放由 feature 代码 import 的 feature 私有媒体资源。

For data fetching, keep request functions in \`api\`, query key factories and query options in \`model\`, React Query bindings in \`hooks\`, and async UI states in \`ui\`.

数据请求场景中，请求函数放在 \`api\`，query key 工厂和 query options 放在 \`model\`，React Query 绑定放在 \`hooks\`，异步 UI 状态放在 \`ui\`。

If both a route loader and a hook need the same data, expose a \`model/queryOptions.ts\` helper and reuse it from both places instead of duplicating query keys or calling endpoints directly from routes.

如果 route loader 和 hook 都需要同一份数据，应提供 \`model/queryOptions.ts\` helper，并在两处复用它；不要重复定义 query key，也不要在 routes 中直接调用请求函数。

## Avoid

Do not create empty folders by default. Do not add a top-level \`src/api\`; feature-specific requests belong under the owning feature unless a generated SDK or shared transport layer is introduced.

不要默认创建空目录。不要新增顶层 \`src/api\`；除非引入 generated SDK 或共享传输层，否则 feature 专属请求应放在所属 feature 下。

Do not add \`src/features/index.ts\` or feature subfolder barrels by default. Do not move business capabilities into \`shared\` just because they are reused by multiple pages.

默认不要新增 \`src/features/index.ts\` 或 feature 子目录 barrel。不要因为某个业务能力被多个页面复用，就把它移动到 \`shared\`。

## Examples

- \`billing/ui/BillingPage.tsx\`
- \`billing/api/getInvoices.ts\`
- \`billing/model/queryOptions.ts\`
- \`current-user/hooks/useCurrentUser.ts\`
- \`notifications/constants/channels.ts\`
`

const routesReadmeContent = `# Routes

## Purpose

\`routes\` contains TanStack file-based route definitions. It maps URLs to route behavior and delegates page rendering to features.

\`routes\` 用于 TanStack 文件路由定义。它负责将 URL 映射到路由行为，并把页面渲染委托给 features。

## Put Here

Use route files for path mapping, route params, search schemas, loaders, \`beforeLoad\`, route-level pending states, and route-level error behavior.

路由文件适合放路径映射、路由参数、search schema、loader、\`beforeLoad\`、路由级 pending 状态和路由级错误行为。

When a loader needs data, call the owning feature's \`queryOptions()\` and let \`context.queryClient.ensureQueryData(...)\` handle preloading and cache reuse.

当 loader 需要数据时，调用所属 feature 的 \`queryOptions()\`，并通过 \`context.queryClient.ensureQueryData(...)\` 完成预取和缓存复用。

## Avoid

Do not build full page implementations or business workflows directly in route files. Page-level business components should live in \`features/<feature>/ui\`.

不要直接在 route 文件中实现完整页面或业务流程。页面级业务组件应放在 \`features/<feature>/ui\`。

Do not call \`fetch\`, build endpoint URLs, define query keys, or place API functions in route files. Those details belong to the owning feature.

不要在 route 文件中直接调用 \`fetch\`、拼接 endpoint、定义 query key 或放置 API 函数。这些细节属于所属 feature。

## Examples

- \`__root.tsx\` for the root route layout and outlet
- \`index.tsx\` for \`/\`
- \`users.index.tsx\` importing \`features/users/ui/UserListPage\`
- \`settings.tsx\` loading \`features/settings/model/queryOptions.ts\`
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
  ['README.md', readmeContent],
  ['README.zh-CN.md', readmeZhContent],
  ['src/features/README.md', featuresReadmeContent],
  ['src/routes/README.md', routesReadmeContent],
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

  console.log(`\nRegenerated route tree: ${routeTreeExists ? 'yes' : 'no'}`)
  console.log(
    `README title: ${readmePreview.split('\n')[0].replace(/^# /, '') || 'n/a'}`,
  )
  console.log('\nNext steps:')
  console.log('- Review the new README and HomePage copy')
  console.log('- Add your first real feature under src/features')
  console.log('- Run pnpm check')
}

const main = async () => {
  ensureCleanWorktree()
  await removeTargets()
  await writeTargets()
  regenerateRouteTree()
  await removeBuildArtifacts()
  await printSummary()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
