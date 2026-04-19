# Features

## Purpose

`features` contains product or demo capabilities grouped by domain. A feature owns its business behavior, page-level components, local state, and feature-specific data access.

`features` 用于按业务域组织产品能力或 demo 能力。一个 feature 拥有自己的业务行为、页面级组件、局部状态和 feature 专属数据访问。

## Put Here

Use `ui/` for feature-owned components, `api/` for feature-specific requests, `model/` for domain types or query keys, `hooks/` for feature hooks, `lib/` for feature-only helpers, and `constants/` for feature-only constants.

`ui/` 放 feature 自己拥有的组件，`api/` 放 feature 专属请求，`model/` 放领域类型或 query keys，`hooks/` 放 feature hooks，`lib/` 放只服务当前 feature 的工具函数，`constants/` 放 feature 私有常量。

For data fetching, keep endpoint functions in `api`, query key factories in `model`, React Query bindings in `hooks`, and async UI states in `ui`.

数据请求场景中，endpoint 请求函数放在 `api`，query key 工厂放在 `model`，React Query 绑定放在 `hooks`，异步 UI 状态放在 `ui`。

## Avoid

Do not create empty folders by default. Do not add a top-level `src/api`; feature-specific requests belong under the owning feature unless a generated SDK or shared transport layer is introduced.

不要默认创建空目录。不要新增顶层 `src/api`；除非引入 generated SDK 或共享传输层，否则 feature 专属请求应放在所属 feature 下。

## Examples

- `home/ui/HomePage.tsx`
- `example-counter/hooks/useCounter.ts`
- `example-counter/model/types.ts`
- `example-posts/api/getPosts.ts`
- `example-posts/hooks/usePostsQuery.ts`
