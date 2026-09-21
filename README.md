# React App Template

<p align="center">
  <img src="./public/app-icon.svg" alt="React App Template" width="96" height="96" />
</p>

面向团队协作的 React 工程模板，基于 React 19、Vite 8、TypeScript、TanStack Router、TanStack Query、Tailwind CSS v4、Zustand 和 Vitest 构建。模板提供清晰的模块边界、路由与请求状态管理、错误兜底、主题切换、测试及部署配置。

## 快速开始

环境要求：Node.js `22.23.2`、pnpm `10.24.0`。

```bash
pnpm install
pnpm dev
```

开发服务器运行在 <http://localhost:3000>。

## 常用脚本

| 命令             | 说明                                  |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | 启动 Vite 开发服务器                  |
| `pnpm build`     | 执行类型检查并生成生产构建            |
| `pnpm preview`   | 本地预览生产构建                      |
| `pnpm test`      | 以 watch 模式运行 Vitest              |
| `pnpm test:run`  | 单次运行测试                          |
| `pnpm lint`      | 检查 ESLint 规则                      |
| `pnpm format`    | 检查 Prettier 格式                    |
| `pnpm typecheck` | 运行 TypeScript 项目检查              |
| `pnpm check`     | 依次运行 lint、format、类型检查和测试 |
| `pnpm check:fix` | 应用 ESLint 与 Prettier 自动修复      |

## 部署

### GitHub Pages

[部署工作流](.github/workflows/deploy-pages.yml) 会在推送到 `main` 时运行，也支持手动触发。在线地址为 <https://ringotangs.github.io/react-app/>。

首次部署或在 fork 中使用时，在 **Settings → Pages → Build and deployment** 中将 **Source** 设置为 **GitHub Actions**。工作流会自动配置部署子路径，并使用 hash 路由。

### Docker

```bash
docker build -t react-app:local .
docker run --rm -p 8080:80 react-app:local
```

访问 <http://localhost:8080>。镜像使用多阶段构建，由 Nginx 托管静态产物并提供 SPA fallback。

### 环境变量

根目录 `.env` 提供本地和默认 Docker 构建配置：

| 变量                     | 默认值               | 用途                       |
| ------------------------ | -------------------- | -------------------------- |
| `VITE_BASE_PATH`         | `/`                  | 静态资源与 Router 部署前缀 |
| `VITE_ROUTER_HISTORY`    | `browser`            | `browser` 或 `hash` 路由   |
| `VITE_SITE_NAME`         | `React App Template` | 页面标题中的站点名称       |
| `VITE_THEME_STORAGE_KEY` | `theme`              | 主题偏好的本地存储键       |

`VITE_*` 变量会写入前端产物，不得存放密钥。它们在构建时生效，修改后需要重新构建；`docker run -e` 无法改变已生成的静态文件。

## 项目结构

```text
public/                    # 固定 URL 访问的公共文件
types/                     # 仓库级 ambient declarations
src/
├── main.tsx               # React DOM 启动入口
├── App.tsx                # Provider 与开发工具装配
├── style.css              # 全局样式和 Tailwind 入口
├── setupTests.ts          # 测试环境初始化
├── app/                   # 应用配置、初始化和集成
│   ├── queryClient.ts     # 共享 QueryClient
│   ├── reportError.ts     # 错误上报入口
│   └── router/            # Router 配置、加载反馈和生成路由树
├── routes/                # TanStack 文件路由
├── features/              # 按业务域组织的功能
│   ├── example-counter/   # Zustand 客户端状态示例
│   └── example-posts/     # TanStack Query 请求示例
├── theme/                 # 主题状态与浏览器集成
├── components/            # 产品无关的通用 UI
├── assets/                # 共享导入媒体
└── lib/                   # 通用纯函数
```

### 目录约定

- `App.tsx` 只负责应用装配；`app` 只包含配置、初始化、错误上报和应用级集成。
- `routes` 负责 URL 映射与路由语义，可组合 feature；复杂页面和业务逻辑放在 `features`。
- Feature 从小开始，按需添加 `ui`、`api`、`model`、`hooks`、`lib`、`assets` 和 `constants`，不要创建空目录。
- Feature 请求函数放在自身 `api` 中，query keys、query options 和状态放在 `model` 中；组件、hooks 和路由不直接调用 `fetch`。
- 局部组件状态使用 React，跨组件客户端状态使用 feature 内的 Zustand，服务端数据使用 TanStack Query。
- `components`、`lib` 和 `assets` 必须独立于应用基础设施、路由与业务 feature；feature 私有内容留在所属 feature。
- `public` 存放固定 URL 文件，`src/assets` 存放共享导入媒体，feature 私有媒体放在其 `assets` 中。
- Provider 在 `App.tsx` 中组合。产品无关能力按需放在 `src/<capability>`，业务能力放在 `features/<domain>`。
- 路由错误使用 TanStack Router `errorComponent`；局部 widget 才使用 `react-error-boundary`。
- `src/app/router/routeTree.gen.ts` 由 TanStack Router 生成，不要手动编辑。

## 开发约定

- 使用 `@/` 引用 `src` 下模块，并保持显式导入。
- React 组件使用 PascalCase，工具函数使用 camelCase，测试以 `*.spec.tsx` 或 `*.spec.ts` 与源码共置。
- 通用代码不读取业务环境配置；由调用方传入环境派生值。
- 仅为稳定公共边界添加 barrel export，不创建顶层 `src/app/index.ts`、`src/features/index.ts` 或 route barrel。
- 提交前运行 `pnpm check`。

更完整的协作与代码组织规则见 [AGENTS.md](./AGENTS.md)。

## 许可证

本项目采用 [MIT 许可证](./LICENSE)，Copyright (c) 2026 RingoTangs。
