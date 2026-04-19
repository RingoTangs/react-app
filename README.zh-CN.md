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

### 数据请求

模板不内置共享 HTTP client。接口函数放在所属 feature 的 `api`，query keys 放在 `model`，React Query hooks 放在 `hooks`，loading、error、empty、success 状态由 feature `ui` 处理。

```text
src/features/example-posts/
├── api/getPosts.ts             # 使用原生 fetch 的 endpoint 专属请求函数
├── hooks/usePostsQuery.ts      # React Query 绑定
├── model/queryKeys.ts          # query key 工厂
├── model/types.ts              # 领域类型
└── ui/PostsPreview.tsx         # 异步 UI 状态
```

不要新增顶层 `src/api`。不要在 React 组件或 hooks 中直接调用 `fetch`，应放在 feature 的 `api` 文件中。当真实后端集成需要 baseURL、认证、重试、OpenAPI、ky、Axios 或 RPC client 时，再基于项目需求设计传输层。

### Routes 与 Feature 页面

页面级业务组件应放在 `features/<feature-name>/ui`。路由文件应保持薄层，并专注于路由语义：路径映射、路由参数、search schema、loader、guard，以及路由级 pending 或 error 行为。

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { UserListPage } from '@/features/users/ui/UserListPage'

export const Route = createFileRoute('/users')({
  component: UserListPage,
})
```

如果 404、通用错误态等 fallback 页面不归属某个具体 feature，并且可跨业务复用，应放在 `shared/ui`。

## 模板默认规则

- Router 和 React Query devtools 只在开发环境启用。
- 模板全局使用显式导入；例如 `tv()` 这类 helper 应在使用处显式导入。
- React Query 使用保守默认值：`staleTime: 30s`、`retry: 1`、`refetchOnWindowFocus: false`。
- 模板不预设共享 HTTP client；示例 feature 只在自己的 `api` 文件中使用原生 `fetch`。
- 错误边界通过 `QueryErrorResetBoundary` 恢复，并通过单一 adapter 上报。

## 开发规则

- React、router 和应用工具都使用显式导入。
- 不要把业务逻辑放进 `app/`；随着项目增长，产品行为应放到 feature 模块中。
- 可复用 UI 放在 `shared/ui`，纯工具函数放在 `shared/lib`。
- Feature 专属请求放在所属 feature 下；只有真实集成需求能支撑时，才引入共享传输层。
- 不要重新引入顶层泛目录 `components/` 或 `utils/`；根据归属放到 `shared` 或 `features`。
- 不要手动编辑生成文件 `src/routeTree.gen.ts`。
- 提交 PR 前运行 `pnpm check`。
