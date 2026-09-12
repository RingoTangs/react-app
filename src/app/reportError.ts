import { appEnv } from '@/app/env'

export const reportError = (error: unknown) => {
  // 错误上报接入点：模板尚未配置生产环境监控。
  if (appEnv.isDev) {
    console.error('Unhandled application error', error)
  }
}
