import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const PORT = 3000
const DIRNAME = import.meta.dirname

const DEFAULT_ENV = {
  VITE_BASE_PATH: '/',
  VITE_ROUTER_HISTORY: 'browser',
  VITE_SITE_NAME: 'React App Template',
  VITE_THEME_STORAGE_KEY: 'theme',
} as const

type EnvKey = keyof typeof DEFAULT_ENV

const resolveEnv = (env: Record<string, string>, key: EnvKey): string => {
  const value = (env[key] ?? DEFAULT_ENV[key]).trim()

  if (!value) {
    throw new Error(`Empty environment variable: ${key}`)
  }

  return value
}

const parseBasePath = (basePath: string): string => {
  const BASE_PATH_PATTERN = /^\/(?:[^/?#\\\s]+\/)*$/
  const hasDotSegment = basePath
    .split('/')
    .some((segment) => segment === '.' || segment === '..')

  if (!BASE_PATH_PATTERN.test(basePath) || hasDotSegment) {
    throw new Error(
      'Invalid VITE_BASE_PATH: expected "/" or an absolute path ending in "/", for example "/react-app/"',
    )
  }

  return basePath
}

const validateRouterHistory = (routerHistory: string): void => {
  const ROUTER_HISTORIES = ['browser', 'hash']

  if (!ROUTER_HISTORIES.includes(routerHistory)) {
    throw new Error('Invalid VITE_ROUTER_HISTORY: expected "browser" or "hash"')
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, DIRNAME, 'VITE_')
  const resolvedEnv = Object.fromEntries(
    Object.keys(DEFAULT_ENV).map((key) => [
      key,
      resolveEnv(env, key as EnvKey),
    ]),
  ) as Record<EnvKey, string>
  const basePath = parseBasePath(resolvedEnv.VITE_BASE_PATH)

  validateRouterHistory(resolvedEnv.VITE_ROUTER_HISTORY)

  return {
    base: basePath,
    define: Object.fromEntries(
      Object.entries(resolvedEnv).map(([key, value]) => [
        `import.meta.env.${key}`,
        JSON.stringify(value),
      ]),
    ),
    plugins: [
      // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
      tanstackRouter({
        target: 'react',
        generatedRouteTree: path.resolve(
          DIRNAME,
          './src/app/router/routeTree.gen.ts',
        ),
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
    ],
    server: {
      port: PORT,
    },
    preview: {
      port: PORT,
    },
    resolve: {
      alias: {
        '@': path.resolve(DIRNAME, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
    build: {
      target: ['chrome111', 'edge111', 'firefox128', 'safari16.4'],
    },
  }
})
