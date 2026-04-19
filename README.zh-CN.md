# React App Template

[English](./README.md) | 简体中文

一个面向团队协作的 React 工程模板，基于 React 19、Vite 8、TanStack Router、TanStack Query、Tailwind CSS v4 和 Vitest 构建。模板保持运行时默认配置克制，并将应用装配、监控和传输层扩展点放入清晰边界。

## 快速开始

### 环境要求

- Node.js `>=22.0.0`
- pnpm `>=10.24.0`

### 本地运行

```bash
pnpm install
pnpm dev
```

开发服务器运行在 `http://localhost:3000`。

## 脚本

```bash
pnpm dev          # 启动 Vite 开发服务器
pnpm build        # 执行类型检查并生成生产构建
pnpm preview      # 本地预览生产构建
pnpm test         # 以 watch 模式运行 Vitest
pnpm test:run     # 单次运行测试，适合 CI
pnpm lint         # 运行 ESLint
pnpm format:check # 检查 Prettier 格式
pnpm check        # lint + format + typecheck + test
```

## Docker 部署

构建静态生产镜像，并通过 Nginx 托管：

```bash
docker build -t react-app:local .
docker run --rm -p 8080:80 react-app:local
```

容器访问地址为 `http://localhost:8080`。镜像使用多阶段构建：Node 和 pnpm 负责生成 Vite `dist/` 产物，最终阶段只用 Nginx 托管静态资源。

根目录 `nginx.conf` 已包含 SPA fallback，TanStack Router 路由可以直接刷新。`VITE_*` 环境变量是构建期注入；如果项目需要运行时切换环境，应额外设计 `/config.js` 或 `/env.json` 这类运行时配置机制。

## 项目结构

```text
src/
├── main.tsx                    # React 应用启动入口
├── App.tsx                     # 根组件；将应用级装配委托给 app providers
├── style.css                   # 全局样式和 Tailwind CSS 入口
├── setupTests.ts               # Vitest 与 Testing Library 测试初始化
├── routeTree.gen.ts            # TanStack Router 生成的路由树；不要手动编辑
│
├── app/                        # 应用级基础设施和装配
│   ├── config/                 # 运行时环境配置
│   │   └── env.ts
│   ├── monitoring/             # 错误上报集成点
│   │   └── reportError.ts
│   ├── providers/              # 全局 provider 组合
│   │   ├── AppProviders.tsx
│   │   └── QueryProvider.tsx
│   └── router/                 # Router 实例、默认配置和 devtools
│       ├── router.tsx
│       └── RouterDevtools.tsx
│
├── routes/                     # TanStack 文件路由
│   ├── __root.tsx              # 根路由布局、Outlet 和错误边界
│   ├── index.tsx               # / 路由
│   └── error.tsx               # 错误边界验证用 demo 路由
│
├── features/                   # 按业务域组织的产品或 demo 能力
│   ├── home/
│   │   └── ui/
│   │       └── HomePage.tsx
│   ├── example-counter/
│   │   ├── hooks/
│   │   │   └── useCounter.ts
│   │   ├── lib/
│   │   │   └── getNextCount.ts
│   │   ├── model/
│   │   │   ├── constants.ts
│   │   │   └── types.ts
│   │   └── ui/
│   │       ├── Counter.tsx
│   │       └── Counter.spec.tsx
│   └── example-posts/          # Feature 自有 API + React Query 示例
│       ├── api/
│       ├── hooks/
│       ├── model/
│       └── ui/
│
└── shared/                     # 产品无关的可复用基础模块
    ├── ui/                     # 共享 UI 组件
    │   ├── Button.tsx
    │   ├── NotFound.tsx
    │   ├── PageErrorFallback.tsx
    │   └── index.ts
    └── lib/                    # 纯工具函数和轻框架工具
        ├── dayjs.ts
        ├── sleep.ts
        └── index.ts
```

### 目录边界

- `app` 负责跨应用基础设施：providers、router setup、环境配置、devtools 和监控。
- `routes` 负责 URL 到页面的映射。路由文件应保持薄层，并将页面实现委托给 `features`。
- `features` 负责业务或 demo 能力。新增真实产品行为时，优先按业务域放到这里。
- `shared` 负责可复用 UI 和纯工具。它不应依赖 `app`、`routes` 或 `features`。
- `routeTree.gen.ts` 由 TanStack Router 生成，不要手动编辑。

Features 可以读取 `app/config` 中的稳定运行时配置，例如 `appEnv`，但不应依赖 `app/router`、`app/providers` 或 `app/monitoring` 这类 app 装配能力。Shared 代码不能读取 `app/config`；如需环境派生值，应由上层注入。

### Feature 模块约定

Feature 模块从小开始，按需要增长。使用 `ui/` 放 feature 自己拥有的组件和页面分区，`api/` 放 feature 专属数据访问，`model/` 放领域类型、schema、query keys 或局部状态，`hooks/` 放 feature 专属 React hooks，`lib/` 放只服务当前 feature 的纯工具函数，`constants/` 放 feature 私有常量。

```text
src/features/<feature-name>/
├── ui/
├── api/
├── model/
├── hooks/
├── lib/
└── constants/
```

不要默认创建空目录。只有当 feature 中确实有对应代码时才新增目录。Feature 专属请求应放在所属 feature 下；只有当项目真正需要通用传输层或 generated SDK 时，才引入共享请求基础设施。

### 导出与公共 Feature

Barrel export 只用于稳定公共边界。模板保留 `src/shared/ui/index.ts` 和 `src/shared/lib/index.ts`，因为这些目录对外提供产品无关的可复用 API。不要为了缩短导入路径而新增 `src/app/index.ts`、`src/features/index.ts`、路由 barrel 或 feature 子目录 barrel。

公共业务能力仍然放在 `src/features/<domain>`，不要放进 `shared`。典型例子包括 `auth`、`current-user`、`permissions` 和 `notifications`。只有当某个 feature 明确需要向多个模块暴露稳定公共 API 时，才添加 `src/features/<feature>/index.ts`；它只应导出公共组件、hooks 和类型，不导出私有 endpoint、测试或实现细节。

### 数据请求

模板不内置共享 HTTP client。接口函数放在所属 feature 的 `api`，query keys 和 query options 放在 `model`，React Query hooks 放在 `hooks`，loading、error、empty、success 状态由 feature `ui` 处理。

```text
src/features/example-posts/
├── api/getPosts.ts             # 使用原生 fetch 的 endpoint 专属请求函数
├── hooks/usePostsQuery.ts      # React Query 绑定
├── model/queryOptions.ts       # hooks 和 loaders 复用的 query options
├── model/queryKeys.ts          # query key 工厂
├── model/types.ts              # 领域类型
└── ui/PostsPreview.tsx         # 异步 UI 状态
```

当 route loader 需要数据时，应调用 feature 自己暴露的 query options，而不是直接调用 feature endpoint。这样 route 预取和组件里的 `useQuery` 会使用同一个 query key 和缓存项。

```ts
export const Route = createFileRoute('/posts')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(postsQueryOptions())
  },
  component: PostsPage,
})
```

不要新增顶层 `src/api`。不要在 React 组件、hooks 或 route 文件中直接调用 `fetch`，应放在 feature 的 `api` 文件中。当真实后端集成需要 baseURL、认证、重试、OpenAPI、ky、Axios 或 RPC client 时，再基于项目需求设计传输层。

### Routes 与 Feature 页面

页面级业务组件应放在 `features/<feature-name>/ui`。路由文件应保持薄层，并专注于路由语义：路径映射、路由参数、search schema、loader、guard、redirect，以及路由级 pending 或 error 行为。

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { UserListPage } from '@/features/users/ui/UserListPage'

export const Route = createFileRoute('/users')({
  component: UserListPage,
})
```

如果 404、通用错误态等 fallback 页面不归属某个具体 feature，并且可跨业务复用，应放在 `shared/ui`。

如果 route loader 要预取 React Query 数据，app router context 必须暴露共享的 `queryClient`。app 层负责这类基础设施装配；route 文件仍然只使用 feature 的 `queryOptions`，不拥有 API 细节。

### 错误兜底

路由级 render error、loader error 和 route match error 应使用 TanStack Router `errorComponent` 处理。根路由提供默认 fallback UI，并通过 `reportError` 统一上报捕获到的错误。

React Query 错误仍应在路由错误 fallback 内通过 `QueryErrorResetBoundary` reset。这样用户重试时，query error 状态会被清理，并允许重新请求。

`react-error-boundary` 只用于 feature 内部局部失败兜底，例如某个 widget 失败但页面其他区域仍可用。不要在 root route 中用通用 `react-error-boundary` 包裹 `<Outlet />`，因为它不拥有 TanStack Router 的 route match 生命周期。事件回调、定时器和未处理 Promise 中的错误不能依赖 ErrorBoundary，必须在调用点使用 `try/catch` 或 `.catch()` 处理。

## 模板默认规则

- Router 和 React Query devtools 只在开发环境启用。
- 模板全局使用显式导入；例如 `tv()` 这类 helper 应在使用处显式导入。
- React Query 使用保守默认值：`staleTime: 30s`、`gcTime: 5m`、query `retry: 1`、mutation `retry: 0`、`refetchOnWindowFocus: false`、`refetchOnReconnect: true`。
- 模板不预设共享 HTTP client；示例 feature 只在自己的 `api` 文件中使用原生 `fetch`。
- 路由错误使用 TanStack Router `errorComponent`；query 错误重试通过 `QueryErrorResetBoundary` reset，并通过单一 adapter 上报。

## 开发规则

- React、router 和应用工具都使用显式导入。
- 不要把业务逻辑放进 `app/`；随着项目增长，产品行为应放到 feature 模块中。
- 可复用 UI 放在 `shared/ui`，纯工具函数放在 `shared/lib`。
- Feature 必要时可以读取 `app/config` 中的稳定运行时配置，但应避免依赖 app router、providers 和 monitoring 装配。
- Feature 专属请求放在所属 feature 下；只有真实集成需求能支撑时，才引入共享传输层。
- 路由级错误兜底使用 TanStack Router `errorComponent`。`react-error-boundary` 只用于明确的 feature 局部组件兜底。
- Barrel export 只用于 `shared/ui`、`shared/lib` 这类稳定公共边界；默认不要新增 feature 级或 app 级 barrel。
- 不要重新引入顶层泛目录 `components/` 或 `utils/`；根据归属放到 `shared` 或 `features`。
- 不要手动编辑生成文件 `src/routeTree.gen.ts`。
- 提交 PR 前运行 `pnpm check`。
