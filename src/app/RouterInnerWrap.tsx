import { LoaderSync } from './LoaderSync'

// 在路由匹配树的 Suspense 外同步状态，首次加载时也能工作。
export const RouterInnerWrap = ({ children }: React.PropsWithChildren) => (
  <>
    <LoaderSync />
    {children}
  </>
)
