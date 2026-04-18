const getStringEnv = (value: string | undefined, fallback: string) => {
  return value && value.trim().length > 0 ? value : fallback
}

export const appEnv = {
  apiBaseUrl: getStringEnv(import.meta.env.VITE_API_BASE_URL, '/api'),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}

export const isDev = () => appEnv.isDev

export const isProd = () => appEnv.isProd
