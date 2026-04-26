# Config

## Purpose

`config` contains stable runtime configuration for this application. It is the explicit entrypoint for environment-derived values that app infrastructure, routes, and features may need.

`config` 存放当前应用的稳定运行时配置。它是 app 基础设施、routes 和 features 读取环境派生值的显式入口。

## Put Here

Use this directory for small, typed configuration wrappers around `import.meta.env`, feature flags, build-time environment switches, or future runtime config adapters.

这里适合放围绕 `import.meta.env` 的小型类型化配置封装、feature flags、构建期环境开关，或未来的运行时配置适配器。

## Avoid

Do not put app wiring, providers, router setup, monitoring adapters, business logic, or shared pure helpers here.

不要在这里放 app 装配、providers、router setup、监控适配器、业务逻辑或 shared 纯工具。

Shared code should not import from `config`. If a shared helper needs an environment-derived value, accept it as a parameter or factory option.

Shared 代码不应从 `config` 导入。如果 shared helper 需要环境派生值，应通过参数或工厂选项传入。

## Examples

- `env.ts`
