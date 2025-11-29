import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    AutoImport({
      include: [/\.[tj]sx?$/],
      imports: [
        'react',
        'react-dom',
        {
          from: 'tailwind-variants',
          imports: ['tv', 'cn', 'cx'],
        },
      ],
      dirs: [],
      dts: 'types/auto-imports.d.ts',
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
