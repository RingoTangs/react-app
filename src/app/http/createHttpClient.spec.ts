import type { InternalAxiosRequestConfig } from 'axios'
import { AxiosError } from 'axios'
import { createHttpClient } from './createHttpClient'

describe('createHttpClient', () => {
  it('returns the full axios response by default', async () => {
    const client = createHttpClient()

    client.defaults.adapter = async (config) => {
      return {
        config,
        data: { ok: true },
        headers: {},
        status: 200,
        statusText: 'OK',
      }
    }

    const response = await client.get('/health')

    expect(response.status).toBe(200)
    expect(response.data).toEqual({ ok: true })
  })

  it('calls the optional response error handler before rejecting', async () => {
    const onResponseError = vi.fn()
    const client = createHttpClient({ onResponseError })

    client.defaults.adapter = async (config) => {
      throw new AxiosError(
        'Request failed',
        'ERR_BAD_RESPONSE',
        config as InternalAxiosRequestConfig,
      )
    }

    await expect(client.get('/boom')).rejects.toBeInstanceOf(AxiosError)
    expect(onResponseError).toHaveBeenCalledTimes(1)
  })
})
