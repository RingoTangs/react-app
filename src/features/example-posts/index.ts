import { lazy } from 'react'

export { postsQueryOptions } from './model/queryOptions'
export { PostsPreview } from './ui/PostsPreview'

// 页面懒加载，避免仅使用预览组件或查询配置时加载页面实现。
// 路由渲染该页面时提供 Suspense 边界。
export const PostsPage = lazy(async () => {
  const { PostsPage } = await import('./ui/PostsPage')
  return { default: PostsPage }
})
