# App

## Purpose

`app` contains application-level infrastructure and composition. Code here wires the runtime together; it should stay stable and cross-cutting.

`app` 用于应用级基础设施和装配。这里的代码负责把运行时能力组合起来，应保持稳定、跨应用、非业务化。

## Put Here

Use this directory for provider composition, router setup, monitoring adapters, and development-only tooling such as router devtools.

这里适合放 provider 组合、router setup、监控适配器，以及 router devtools 这类仅开发环境使用的工具。

`providers/` should compose global providers for the application shell. It should not be the public import path for feature-consumable context, hooks, or domain providers.

`providers/` 应只负责应用壳的全局 provider 组合，不应作为 feature 消费 context、hook 或领域 provider 的公共导入入口。

If route loaders need React Query preloading, create the shared `QueryClient` in app infrastructure and inject it into the router context from here.

如果 route loader 需要 React Query 预取，应在 app 基础设施中创建共享的 `QueryClient`，并从这里注入 router context。

Keep `QueryProvider` defaults conservative and product-agnostic. Feature-level cache lifetimes, polling, placeholders, and error behavior should be defined in feature `queryOptions()`.

`QueryProvider` 的默认配置应保持保守、产品无关。Feature 级缓存时间、轮询、placeholder 和错误处理策略应放在 feature 的 `queryOptions()` 中定义。

## Avoid

Do not place business logic, page implementations, feature-specific API calls, or reusable product UI here. `src/app/router` owns the router instance and defaults, not file-based route definitions.

不要在这里放业务逻辑、页面实现、feature 专属 API 调用或可复用产品 UI。`src/app/router` 负责 router 实例和默认配置，不负责文件路由定义。

Do not place feature query options or endpoint calls in app. App may pass `queryClient` through context, but features still own the data definitions.

不要在 app 中放 feature 的 query options 或 endpoint 调用。App 可以通过 context 传递 `queryClient`，但数据定义仍由 features 拥有。

Do not make features depend on app wiring modules such as `router/`, `providers/`, or `monitoring/`; those are application shell concerns.

不要让 features 依赖 `router/`、`providers/` 或 `monitoring/` 这类 app 装配模块；它们属于应用壳职责。

If a provider exposes reusable behavior to features, place that behavior in `shared/<capability>` or `features/<domain>` and import it into `app/providers` for composition.

如果某个 provider 向 feature 暴露可复用能力，应将能力本身放到 `shared/<capability>` 或 `features/<domain>`，再由 `app/providers` 导入并组合。

Do not add `src/app/index.ts` or subdirectory barrels by default. App infrastructure should be imported explicitly, for example `@/app/providers/AppProviders` or `@/app/router/router`.

默认不要新增 `src/app/index.ts` 或 app 子目录 barrel。App 基础设施应使用显式路径导入，例如 `@/app/providers/AppProviders` 或 `@/app/router/router`。

## Examples

- `providers/AppProviders.tsx`
- `router/router.tsx`
- `monitoring/reportError.ts`
