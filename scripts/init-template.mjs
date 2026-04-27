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

const packageInitLine =
  '    "init:template": "node scripts/init-template.mjs",\n'

const readmeInitSectionEn = `### Optional initialization

If you want a clean project baseline after cloning the template, run:

\`\`\`bash
pnpm init:template
\`\`\`

The one-time initializer removes demo features and demo routes, updates starter files, regenerates \`src/routeTree.gen.ts\`, and then deletes its own command entry and script file.

`

const readmeInitSectionZh = `### 可选初始化

如果你希望 clone 模板后立刻得到更干净的业务起点，可以执行：

\`\`\`bash
pnpm init:template
\`\`\`

这个一次性初始化器会移除 demo feature 和 demo 路由，更新 starter 文件，重新生成 \`src/routeTree.gen.ts\`，然后删除自己的命令入口和脚本文件。

`

const readmeInitCommandEn =
  'pnpm init:template # one-time cleanup of demo features and routes, then self-remove\n'

const readmeInitCommandZh =
  'pnpm init:template # 一次性清理 demo feature 和路由，然后自删除\n'

const agentsInitLine =
  '- `pnpm init:template` is a one-time initializer that removes demo features and routes, updates starter files, regenerates the route tree, then deletes its own command entry and script file.\n'

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
  await patchTextFile('README.md', [
    [readmeInitSectionEn, ''],
    [readmeInitCommandEn, ''],
  ])

  await patchTextFile('README.zh-CN.md', [
    [readmeInitSectionZh, ''],
    [readmeInitCommandZh, ''],
  ])

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
