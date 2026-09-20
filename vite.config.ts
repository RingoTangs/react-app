import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const PORT = 3000

const PROJECT_ROOT = import.meta.dirname
const BASE_PATH_PATTERN = /^\/(?:[^/?#\\\s]+\/)*$/
const ROUTER_HISTORIES = ['browser', 'hash']

type RequiredEnvKey =
  | 'VITE_BASE_PATH'
  | 'VITE_ROUTER_HISTORY'
  | 'VITE_SITE_NAME'
  | 'VITE_THEME_STORAGE_KEY'

const getRequiredEnv = (
  env: Record<string, string>,
  key: RequiredEnvKey,
): string => {
  const value = env[key]?.trim()

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

const parseEnv = (env: Record<string, string>) => {
  getRequiredEnv(env, 'VITE_SITE_NAME')
  getRequiredEnv(env, 'VITE_THEME_STORAGE_KEY')

  const basePath = getRequiredEnv(env, 'VITE_BASE_PATH')

  const hasDotSegment = basePath
    .split('/')
    .some((segment) => segment === '.' || segment === '..')

  if (!BASE_PATH_PATTERN.test(basePath) || hasDotSegment) {
    throw new Error(
      'Invalid VITE_BASE_PATH: expected "/" or an absolute path ending in "/", for example "/react-app/"',
    )
  }

  const routerHistory = getRequiredEnv(env, 'VITE_ROUTER_HISTORY')

  if (!ROUTER_HISTORIES.includes(routerHistory)) {
    throw new Error('Invalid VITE_ROUTER_HISTORY: expected "browser" or "hash"')
  }

  return { basePath }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { basePath } = parseEnv(loadEnv(mode, PROJECT_ROOT, 'VITE_'))

  return {
    base: basePath,
    plugins: [
      // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
      tanstackRouter({
        target: 'react',
        generatedRouteTree: path.resolve(
          PROJECT_ROOT,
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
        '@': path.resolve(PROJECT_ROOT, './src'),
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
