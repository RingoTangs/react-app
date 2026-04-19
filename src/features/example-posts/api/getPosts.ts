import type { Post } from '../model/types'

const POSTS_PREVIEW_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5'

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(POSTS_PREVIEW_URL, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to load posts: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<Post[]>
}
