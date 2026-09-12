# 文件路由

这里负责 URL 到页面的映射，以及参数校验、loader、导航前检查和路由级加载、错误状态。页面实现放在所属 feature 中。

## 数据加载

参考 [Posts 路由](posts.tsx)：从 feature 公共入口导入页面和 `postsQueryOptions`，由上下文中的 QueryClient 执行查询。

`query({ ...postsQueryOptions(), staleTime: 'static' })` 会优先返回已有缓存，没有数据时才请求。这个覆盖仅用于 loader；组件仍通过 feature hook 按正常过期策略后台刷新。请求失败继续交给路由错误边界。

路由不直接调用 `fetch`、拼接接口地址或定义查询 key，这些内容由 feature 管理。

## 错误处理与生成文件

- [根路由](__root.tsx) 声明上下文类型和默认错误界面。使用 `errorComponent` 处理路由渲染及加载错误，通过 `router.invalidate()` 重试。
- 查询使用 suspense 或 `throwOnError` 时，先通过 `useQueryErrorResetBoundary()` 重置查询错误，再重试路由。
- 不用通用错误边界包裹根路由的 Outlet；事件处理、定时器和 Promise 错误在调用处处理。
- [routeTree.gen.ts](../routeTree.gen.ts) 由插件生成，不手动编辑。

完整路由约定见[项目说明](../../README.zh-CN.md)。
