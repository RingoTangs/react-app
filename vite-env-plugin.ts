import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { z } from 'zod'

const DIRNAME = import.meta.dirname

export interface ViteEnvPluginOptions {
  basePath?: string
  routerHistory?: 'browser' | 'hash'
  siteName: string
  themeStorageKey?: string
}

const nonEmptyString = z.string().trim().min(1, 'Must not be empty')
const BASE_PATH_PATTERN = /^\/(?:[^/?#\\\s]+\/)*$/

const envSchema = z.object({
  VITE_BASE_PATH: nonEmptyString
    .regex(
      BASE_PATH_PATTERN,
      'Expected "/" or an absolute path ending in "/", for example "/react-app/"',
    )
    .refine(
      (value) =>
        !value
          .split('/')
          .some((segment) => segment === '.' || segment === '..'),
      'Path must not contain "." or ".." segments',
    )
    .default('/'),
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
      VITE_BASE_PATH: options.basePath,
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
      base: env.VITE_BASE_PATH,
      define: Object.fromEntries(
        Object.entries(env).map(([key, value]) => [
          `import.meta.env.${key}`,
          JSON.stringify(value),
        ]),
      ),
    }
  },
})
