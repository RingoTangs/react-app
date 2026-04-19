# Shared

## Purpose

`shared` contains reusable, product-agnostic building blocks. Code here should be safe to use across multiple features without owning business behavior.

`shared` 用于产品无关的可复用基础模块。这里的代码应能安全地被多个 feature 复用，并且不拥有具体业务行为。

## Put Here

Use `ui/` for reusable UI components and fallback states. Use `lib/` for pure helpers and framework-light utilities. Add shared request infrastructure only when a real transport layer exists.

`ui/` 放可复用 UI 组件和通用 fallback 状态，`lib/` 放纯工具函数和轻框架工具。只有当项目真正引入传输层时，才添加共享请求基础设施。

Use `api/` for product-agnostic transport primitives such as `fetchJson` and `HttpError`. Keep feature endpoints and query keys outside `shared`.

`api/` 放产品无关的传输基础能力，例如 `fetchJson` 和 `HttpError`。Feature 专属 endpoint 和 query keys 不应放在 `shared`。

## Avoid

Do not import from `app`, `routes`, or `features`. Do not place feature-specific copy, workflows, API functions, or domain decisions here.

不要从 `app`、`routes` 或 `features` 导入。不要在这里放 feature 专属文案、业务流程、API 函数或领域决策。

## Examples

- `ui/Button.tsx`
- `ui/NotFound.tsx`
- `api/fetchJson.ts`
- `lib/dayjs.ts`
- `lib/sleep.ts`
