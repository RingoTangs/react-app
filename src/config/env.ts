export const appEnv = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}

export const isDev = () => appEnv.isDev

export const isProd = () => appEnv.isProd
