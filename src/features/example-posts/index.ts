import { lazy } from 'react'

export { postsQueryOptions } from './model/queryOptions'
export { PostsPreview } from './ui/PostsPreview'

// Keep page code out of consumers that only need the preview or query options.
// The router provides the Suspense boundary when rendering this page.
export const PostsPage = lazy(async () => {
  const { PostsPage } = await import('./ui/PostsPage')
  return { default: PostsPage }
})
