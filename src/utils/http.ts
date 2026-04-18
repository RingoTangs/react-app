import { appEnv } from '@/app/config/env'
import { createHttpClient } from '@/app/http/createHttpClient'

const http = createHttpClient({
  baseURL: appEnv.apiBaseUrl,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default http
