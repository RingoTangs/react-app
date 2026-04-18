import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import axios from 'axios'

export interface HttpClientOptions extends AxiosRequestConfig {
  onResponseError?: (error: AxiosError) => void | Promise<void>
}

export type HttpClient = AxiosInstance

export const createHttpClient = ({
  onResponseError,
  ...config
}: HttpClientOptions = {}): HttpClient => {
  const client = axios.create(config)

  if (onResponseError) {
    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        await onResponseError(error)
        return Promise.reject(error)
      },
    )
  }

  return client
}
