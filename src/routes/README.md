# Routes

## Purpose

`routes` contains TanStack file-based route definitions. It maps URLs to route behavior and delegates page rendering to features.

`routes` 用于 TanStack 文件路由定义。它负责将 URL 映射到路由行为，并把页面渲染委托给 features。

## Put Here

Use route files for path mapping, route params, search schemas, loaders, `beforeLoad`, route-level pending states, and route-level error behavior.

路由文件适合放路径映射、路由参数、search schema、loader、`beforeLoad`、路由级 pending 状态和路由级错误行为。

When a loader needs data, call `context.queryClient.query({ ...postsQueryOptions(), staleTime: 'static' })` with the owning feature's query options. Return cached data immediately, fetching only when data is absent. Keep this override local to the loader so feature hooks can still refresh stale data; let request errors propagate to the router.

当 loader 需要数据时，将所属 feature 的 query options 传给 `context.queryClient.query({ ...postsQueryOptions(), staleTime: 'static' })`，优先返回已有缓存，没有数据时才请求。该覆盖仅放在 loader 中，feature hook 仍可刷新过期数据；请求错误继续向路由传播。

## Avoid

Do not build full page implementations or business workflows directly in route files. Page-level business components should live in `features/<feature>/ui`.

不要直接在 route 文件中实现完整页面或业务流程。页面级业务组件应放在 `features/<feature>/ui`。

Do not call `fetch`, build endpoint URLs, define query keys, or place API functions in route files. Those details belong to the owning feature.

不要在 route 文件中直接调用 `fetch`、拼接 endpoint、定义 query key 或放置 API 函数。这些细节属于所属 feature。

## Examples

- `__root.tsx` for the root route layout and outlet
- `index.tsx` for `/`
- `users.index.tsx` importing `features/users/ui/UserListPage`
- `settings.tsx` loading `features/settings/model/queryOptions.ts`
