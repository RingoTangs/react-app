# Shared

## Purpose

`shared` contains reusable, product-agnostic building blocks. Code here should be safe to use across multiple features without owning business behavior.

`shared` 用于产品无关的可复用基础模块。这里的代码应能安全地被多个 feature 复用，并且不拥有具体业务行为。

## Put Here

Use `ui/` for reusable UI components and fallback states. Use `lib/` for pure helpers and framework-light utilities. Add shared request infrastructure only when real integration requirements justify it.

`ui/` 放可复用 UI 组件和通用 fallback 状态，`lib/` 放纯工具函数和轻框架工具。只有真实集成需求能支撑时，才添加共享请求基础设施。

Use `index.ts` only for stable shared public APIs such as `ui` and `lib`.

`index.ts` 只用于 `ui`、`lib` 这类稳定的 shared 公共 API。

## Avoid

Do not import from `app`, `routes`, or `features`. Do not place feature-specific copy, workflows, API functions, or domain decisions here.

不要从 `app`、`routes` 或 `features` 导入。不要在这里放 feature 专属文案、业务流程、API 函数或领域决策。

Do not put public business features here. Reused business capabilities such as auth, current user, permissions, or notifications still belong in `features/<domain>`.

不要把公共业务 feature 放在这里。可复用的业务能力，例如鉴权、当前用户、权限或通知，仍然应放在 `features/<domain>`。

## Examples

- `ui/Button.tsx`
- `ui/NotFound.tsx`
- `lib/dayjs.ts`
- `lib/sleep.ts`
