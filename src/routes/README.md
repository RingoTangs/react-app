# Routes

## Purpose

`routes` contains TanStack file-based route definitions. It maps URLs to route behavior and delegates page rendering to features.

`routes` 用于 TanStack 文件路由定义。它负责将 URL 映射到路由行为，并把页面渲染委托给 features。

## Put Here

Use route files for path mapping, route params, search schemas, loaders, `beforeLoad`, route-level pending states, and route-level error behavior.

路由文件适合放路径映射、路由参数、search schema、loader、`beforeLoad`、路由级 pending 状态和路由级错误行为。

## Avoid

Do not build full page implementations or business workflows directly in route files. Page-level business components should live in `features/<feature>/ui`.

不要直接在 route 文件中实现完整页面或业务流程。页面级业务组件应放在 `features/<feature>/ui`。

## Examples

- `__root.tsx` for the root route layout and outlet
- `index.tsx` for `/`
- `users.index.tsx` importing `features/users/ui/UserListPage`
