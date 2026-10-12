import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { templateEnvPlugin } from './vite-env-plugin.ts'

const PORT = 3000
const PROJECT_ROOT = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    templateEnvPlugin(),
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      generatedRouteTree: path.resolve(
        PROJECT_ROOT,
        'src/app/router/routeTree.gen.ts',
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
      '@': path.resolve(PROJECT_ROOT, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  build: {
    target: ['chrome111', 'edge111', 'firefox128', 'safari16.4'],
  },
})
