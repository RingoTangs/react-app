# App

## Purpose

`app` contains application-level infrastructure. The root component in `src/App.tsx` composes providers and the router from these modules.

`app` 用于应用级基础设施。`src/App.tsx` 负责组合这里提供的 providers 和 router。

## Put Here

Use this directory for application environment config, router setup, the shared app-level query client, and monitoring adapters. Keep the small infrastructure surface flat; introduce a subdirectory only when several related files form a clear boundary. Global providers and development-only tooling are composed in `src/App.tsx`.

这里适合放应用环境配置、router setup、应用级共享 query client 和监控适配器。小规模基础设施保持扁平，只有多个相关文件构成明确边界时才引入子目录。全局 providers 和仅开发环境使用的工具由 `src/App.tsx` 组合。

If route loaders need React Query preloading, create the shared `QueryClient` here and inject it into the router context. Keep global query defaults conservative and product-agnostic; feature-level cache lifetimes, polling, placeholders, and error behavior belong in feature `queryOptions()`.

如果 route loader 需要 React Query 预取，应在这里创建共享的 `QueryClient` 并注入 router context。全局 query 默认配置应保持保守、产品无关；feature 级缓存时间、轮询、placeholder 和错误行为应放在 feature 的 `queryOptions()` 中。

## Avoid

Do not place business logic, page implementations, feature-specific API calls, or reusable product UI here. `src/app/router.ts` owns the router instance and defaults, while the root route declares the context contract.

不要在这里放业务逻辑、页面实现、feature 专属 API 调用或可复用产品 UI。`src/app/router.ts` 负责 router 实例和默认配置，根路由负责声明 context contract。

Do not place feature query options or endpoint calls in app. App may pass `queryClient` through context, but features still own the data definitions.

不要在 app 中放 feature 的 query options 或 endpoint 调用。App 可以通过 context 传递 `queryClient`，但数据定义仍由 features 拥有。

Features should not depend on app infrastructure. If a provider exposes reusable behavior to features, place that behavior in `shared/<capability>` or `features/<domain>`, then compose it in `src/App.tsx`.

Features 不应依赖 app 基础设施。如果某个 provider 向 feature 暴露可复用能力，应将能力本身放到 `shared/<capability>` 或 `features/<domain>`，再由 `src/App.tsx` 组合。

Keep Vite environment access behind `env.ts`. Features should receive environment-derived values through their public interfaces instead of importing app config.

将 Vite 环境变量访问封装在 `env.ts` 中。Features 应通过自身公共接口接收环境派生值，不要导入 app 配置。

Do not add `src/app/index.ts` or subdirectory barrels by default. Import app infrastructure explicitly, for example `@/app/queryClient` or `@/app/router`.

默认不要新增 `src/app/index.ts` 或 app 子目录 barrel。应用基础设施应使用显式路径导入，例如 `@/app/queryClient` 或 `@/app/router`。

## Examples

- `queryClient.ts`
- `env.ts`
- `reportError.ts`
- `router.ts`
