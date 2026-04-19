export class HttpError extends Error {
  readonly status: number
  readonly statusText: string
  readonly body: unknown

  constructor(
    message: string,
    status: number,
    statusText: string,
    body: unknown,
  ) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.statusText = statusText
    this.body = body
  }
}

const readResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

export const fetchJson = async <TData>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<TData> => {
  const headers = new Headers(init?.headers)

  if (!headers.has('accept')) {
    headers.set('accept', 'application/json')
  }

  const response = await fetch(input, {
    ...init,
    headers,
  })
  const body = await readResponseBody(response)

  if (!response.ok) {
    throw new HttpError(
      `Request failed with ${response.status} ${response.statusText}`,
      response.status,
      response.statusText,
      body,
    )
  }

  return body as TData
}
