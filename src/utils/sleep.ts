/**
 * Sleep
 */
export const sleep = (ms: number = 1000) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

/**
 * Development sleep
 */
export const devSleep = (ms: number = 1000) => {
  if (isDev()) {
    return sleep(ms)
  }
  return Promise.resolve()
}
