import type { Post } from '../model/types'
import { fetchJson } from '@/shared/api'

const POSTS_PREVIEW_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5'

export const getPosts = async (): Promise<Post[]> => {
  return fetchJson<Post[]>(POSTS_PREVIEW_URL)
}
