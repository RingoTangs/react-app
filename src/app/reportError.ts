import type { ErrorInfo } from 'react'
import { appEnv } from '@/app/env'

export const reportError = (error: unknown, info?: ErrorInfo) => {
  if (appEnv.isDev) {
    console.error('Unhandled application error', error, info)
  }
}
