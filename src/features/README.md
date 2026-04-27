# Features

## Purpose

`features` contains product or demo capabilities grouped by domain. A feature owns its business behavior, page-level components, local state, and feature-specific data access.

`features` 用于按业务域组织产品能力或 demo 能力。一个 feature 拥有自己的业务行为、页面级组件、局部状态和 feature 专属数据访问。

## Put Here

Use `ui/` for feature-owned components, `api/` for feature-specific requests, `model/` for domain types or query keys, `hooks/` for feature hooks, `lib/` for feature-only helpers, `constants/` for feature-only constants, and `assets/` for feature-private media imported by feature code.

`ui/` 放 feature 自己拥有的组件，`api/` 放 feature 专属请求，`model/` 放领域类型或 query keys，`hooks/` 放 feature hooks，`lib/` 放只服务当前 feature 的工具函数，`constants/` 放 feature 私有常量，`assets/` 放由 feature 代码 import 的 feature 私有媒体资源。

For data fetching, keep request functions in `api`, query key factories and query options in `model`, React Query bindings in `hooks`, and async UI states in `ui`.

数据请求场景中，请求函数放在 `api`，query key 工厂和 query options 放在 `model`，React Query 绑定放在 `hooks`，异步 UI 状态放在 `ui`。

If both a route loader and a hook need the same data, expose a `model/queryOptions.ts` helper and reuse it from both places instead of duplicating query keys or calling endpoints directly from routes.

如果 route loader 和 hook 都需要同一份数据，应提供 `model/queryOptions.ts` helper，并在两处复用它；不要重复定义 query key，也不要在 routes 中直接调用请求函数。

Public business capabilities also belong here, for example `auth`, `current-user`, `permissions`, or `notifications`. Add a feature-level `index.ts` only when that feature exposes a stable public API to multiple modules.

公共业务能力也应放在这里，例如 `auth`、`current-user`、`permissions` 或 `notifications`。只有当该 feature 需要向多个模块暴露稳定公共 API 时，才添加 feature 级 `index.ts`。

Features may read stable runtime config from `config`, for example `appEnv`. Do not depend on app wiring such as `app/router`, `app/providers`, or `app/monitoring`.

Features 可以读取 `config` 中的稳定运行时配置，例如 `appEnv`。不要依赖 `app/router`、`app/providers` 或 `app/monitoring` 这类 app 装配能力。

Features may depend on stable public APIs from `shared` or other public features. For provider-backed capabilities such as theme, auth, or i18n, import hooks and types from `shared/<capability>` or `features/<domain>`, not from `app/providers`.

Features 可以依赖 `shared` 或其他公共 feature 暴露的稳定公共 API。对于 theme、auth 或 i18n 这类 provider 支撑的能力，应从 `shared/<capability>` 或 `features/<domain>` 导入 hooks 和 types，不要从 `app/providers` 导入。

Feature assets include page illustrations, placeholders, business icons, and local videos that are not reused outside the owning feature.

Feature assets 包括页面插图、占位图、业务图标和局部视频等不被所属 feature 之外复用的资源。

## Avoid

Do not create empty folders by default. Do not add a top-level `src/api`; feature-specific requests belong under the owning feature unless a generated SDK or shared transport layer is introduced.

不要默认创建空目录。不要新增顶层 `src/api`；除非引入 generated SDK 或共享传输层，否则 feature 专属请求应放在所属 feature 下。

Do not add `src/features/index.ts` or feature subfolder barrels by default. Do not move business capabilities into `shared` just because they are reused by multiple pages.

默认不要新增 `src/features/index.ts` 或 feature 子目录 barrel。不要因为某个业务能力被多个页面复用，就把它移动到 `shared`。

Allowed: `import { appEnv } from '@/config/env'`. Avoid: `import { router } from '@/app/router/router'` or `import { useTheme } from '@/app/providers/ThemeProvider'`.

允许：`import { appEnv } from '@/config/env'`。避免：`import { router } from '@/app/router/router'` 或 `import { useTheme } from '@/app/providers/ThemeProvider'`。

## Examples

- `home/ui/HomePage.tsx`
- `example-counter/hooks/useCounter.ts`
- `example-counter/assets/counter-mark.svg`
- `example-counter/model/types.ts`
- `example-posts/api/getPosts.ts`
- `example-posts/hooks/usePostsQuery.ts`
- `example-posts/model/queryOptions.ts`
- `auth/ui/RequireAuth.tsx`
- `current-user/hooks/useCurrentUser.ts`
