import type { Plugin } from 'vite'
import { loadEnv } from 'vite'

const DIRNAME = import.meta.dirname

const DEFAULT_ENV = {
  VITE_BASE_PATH: '/',
  VITE_ROUTER_HISTORY: 'browser',
  VITE_SITE_NAME: 'React App Template',
  VITE_THEME_STORAGE_KEY: 'theme',
} as const

type EnvKey = keyof typeof DEFAULT_ENV

const readEnv = (env: Record<string, string>, key: EnvKey): string => {
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

const resolveConfigEnv = (env: Record<string, string>) => {
  const configEnv = {
    VITE_BASE_PATH: readEnv(env, 'VITE_BASE_PATH'),
    VITE_ROUTER_HISTORY: readEnv(env, 'VITE_ROUTER_HISTORY'),
    VITE_SITE_NAME: readEnv(env, 'VITE_SITE_NAME'),
    VITE_THEME_STORAGE_KEY: readEnv(env, 'VITE_THEME_STORAGE_KEY'),
  }

  parseBasePath(configEnv.VITE_BASE_PATH)
  validateRouterHistory(configEnv.VITE_ROUTER_HISTORY)

  return configEnv
}

export const viteEnvPlugin = (): Plugin => ({
  name: 'app:vite-env-plugin',
  // 在 Vitest 读取配置前注入环境变量。
  enforce: 'pre',
  config: (_, { mode }) => {
    const env = resolveConfigEnv(loadEnv(mode, DIRNAME, 'VITE_'))

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
