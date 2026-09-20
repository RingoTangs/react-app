import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const PORT = 3000

const PROJECT_ROOT = import.meta.dirname
const BASE_PATH_PATTERN = /^\/(?:[^/?#\\\s]+\/)*$/

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, PROJECT_ROOT, 'VITE_')

  if (!env.VITE_SITE_NAME?.trim()) {
    throw new Error('Missing required environment variable: VITE_SITE_NAME')
  }

  if (!env.VITE_THEME_STORAGE_KEY?.trim()) {
    throw new Error(
      'Missing required environment variable: VITE_THEME_STORAGE_KEY',
    )
  }

  const basePath = env.VITE_BASE_PATH?.trim()

  if (!basePath) {
    throw new Error('Missing required environment variable: VITE_BASE_PATH')
  }

  const hasDotSegment = basePath
    .split('/')
    .some((segment) => segment === '.' || segment === '..')

  if (!BASE_PATH_PATTERN.test(basePath) || hasDotSegment) {
    throw new Error(
      'Invalid VITE_BASE_PATH: expected "/" or an absolute path ending in "/", for example "/react-app/"',
    )
  }

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
