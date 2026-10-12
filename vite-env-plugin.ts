import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { z } from 'zod'

const DIRNAME = import.meta.dirname

const DEFAULT_ENV = {
  VITE_BASE_PATH: '/',
  VITE_ROUTER_HISTORY: 'browser',
  VITE_SITE_NAME: 'React App Template',
  VITE_THEME_STORAGE_KEY: 'theme',
} as const

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
    .default(DEFAULT_ENV.VITE_BASE_PATH),
  VITE_ROUTER_HISTORY: nonEmptyString
    .pipe(z.enum(['browser', 'hash']))
    .default(DEFAULT_ENV.VITE_ROUTER_HISTORY),
  VITE_SITE_NAME: nonEmptyString.default(DEFAULT_ENV.VITE_SITE_NAME),
  VITE_THEME_STORAGE_KEY: nonEmptyString.default(
    DEFAULT_ENV.VITE_THEME_STORAGE_KEY,
  ),
})

export const viteEnvPlugin = (): Plugin => ({
  name: 'app:vite-env-plugin',
  // 在 Vitest 读取配置前注入环境变量。
  enforce: 'pre',
  config: (_, { mode }) => {
    const result = envSchema.safeParse(loadEnv(mode, DIRNAME, 'VITE_'))

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
