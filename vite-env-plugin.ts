import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { z } from 'zod'

const DIRNAME = import.meta.dirname

export interface ViteEnvPluginOptions {
  routerHistory?: 'browser' | 'hash'
  siteName: string
  themeStorageKey?: string
}

const nonEmptyString = z.string().trim().min(1, 'Must not be empty')

const envSchema = z.object({
  VITE_ROUTER_HISTORY: nonEmptyString
    .pipe(z.enum(['browser', 'hash']))
    .default('browser'),
  VITE_SITE_NAME: nonEmptyString,
  VITE_THEME_STORAGE_KEY: nonEmptyString.default('theme'),
})

export const viteEnvPlugin = (options: ViteEnvPluginOptions): Plugin => ({
  name: 'app:vite-env-plugin',
  // 在 Vitest 读取配置前注入环境变量。
  enforce: 'pre',
  config: (_, { mode }) => {
    const result = envSchema.safeParse({
      VITE_ROUTER_HISTORY: options.routerHistory,
      VITE_SITE_NAME: options.siteName,
      VITE_THEME_STORAGE_KEY: options.themeStorageKey,
      ...loadEnv(mode, DIRNAME, 'VITE_'),
    })

    if (!result.success) {
      const issues = result.error.issues.map(
        (issue) => `${issue.path.join('.')}: ${issue.message}`,
      )
      throw new Error(
        `Invalid environment configuration:\n${issues.join('\n')}`,
      )
    }

    const env = result.data

    return {
      define: Object.fromEntries(
        Object.entries(env).map(([key, value]) => [
          `import.meta.env.${key}`,
          JSON.stringify(value),
        ]),
      ),
    }
  },
})
