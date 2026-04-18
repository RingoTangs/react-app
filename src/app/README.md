# App

## Purpose

`app` contains application-level infrastructure and composition. Code here wires the runtime together; it should stay stable and cross-cutting.

`app` 用于应用级基础设施和装配。这里的代码负责把运行时能力组合起来，应保持稳定、跨应用、非业务化。

## Put Here

Use this directory for provider composition, router setup, runtime environment config, monitoring adapters, and development-only tooling such as router devtools.

这里适合放 provider 组合、router setup、运行时环境配置、监控适配器，以及 router devtools 这类仅开发环境使用的工具。

## Avoid

Do not place business logic, page implementations, feature-specific API calls, or reusable product UI here. `src/app/router` owns the router instance and defaults, not file-based route definitions.

不要在这里放业务逻辑、页面实现、feature 专属 API 调用或可复用产品 UI。`src/app/router` 负责 router 实例和默认配置，不负责文件路由定义。

## Examples

- `providers/AppProviders.tsx`
- `router/router.tsx`
- `config/env.ts`
- `monitoring/reportError.ts`
