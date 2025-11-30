import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

export interface InternalRequestConfig extends InternalAxiosRequestConfig {
  retry?: number
  retryDelay?: number
  skipAuth?: boolean
}

// Create axios instance
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Token injection
http.interceptors.request.use(
  (config: InternalRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor - Error handling + Retry
http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const config = error.config as InternalRequestConfig | undefined

    // Handle cancelled requests
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    // Retry logic
    if (config?.retry && config.retry > 0) {
      config.retry--
      await new Promise((resolve) =>
        setTimeout(resolve, config.retryDelay || 1000),
      )
      return http(config)
    }

    // Error handling by status
    const status = error.response?.status
    switch (status) {
      case 401:
        // Unauthorized - clear token and redirect
        localStorage.removeItem('token')
        break
      case 403:
        console.error('Forbidden: Access denied')
        break
      case 404:
        console.error('Not Found: Resource does not exist')
        break
      case 500:
        console.error('Server Error: Internal server error')
        break
    }

    return Promise.reject(error)
  },
)

export default http
