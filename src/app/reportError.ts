import type { ErrorInfo } from 'react'

export const reportError = (error: unknown, info?: ErrorInfo) => {
  if (import.meta.env.DEV) {
    console.error('Unhandled application error', error, info)
  }
}
