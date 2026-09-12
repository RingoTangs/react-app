# 功能模块

按业务或功能组织代码。一个 feature 管理自己的页面、交互、状态、请求和私有资源；被多个页面复用的业务能力也留在 features。

简单静态页面和 feature 组合可直接放在路由文件中，例如[模板首页](../routes/index.tsx)。出现独立业务逻辑或复杂页面后再提取为 feature。

## 按需组织

| 子目录               | 放什么                                      |
| -------------------- | ------------------------------------------- |
| `ui/`                | 页面、组件及就近放置的组件测试              |
| `api/`               | 请求函数，不在组件、hook 或路由中直接发请求 |
| `model/`             | 领域类型、查询 key 工厂、共享 query options |
| `hooks/`             | 状态与查询 hook                             |
| `lib/`、`constants/` | 有独立价值的模块私有工具、常量              |
| `assets/`            | 模块私有的图片、SVG、视频等导入资源         |

不要凑齐所有目录，也不默认新增顶层 `src/api`。参考两个现有模块：

- [Counter](example-counter/)：仅保留资源、状态 hook 和 UI，简单默认值与加减运算直接放在 hook 中。
- [Posts](example-posts/)：请求、查询配置、hook 和 UI 分工；loader 与 hook 复用同一份 query options。

## 公共入口与依赖

- 模块可以使用 shared，以及其他 feature 的公共 API；不依赖 app 基础设施或直接读取环境变量，配置由调用方传入。
- 只有明确存在跨模块复用时，才添加 feature 级 `index.ts`；默认不添加 features 总入口或子目录统一导出文件。
- [Posts 公共入口](example-posts/index.ts) 仅导出 `PostsPage`、`PostsPreview` 和 `postsQueryOptions`。外部从 `@/features/example-posts` 导入，内部继续使用相对路径。
- `PostsPage` 为懒加载组件，路由提供 Suspense 边界；非路由调用方需自行提供。测试可直接模拟内部请求函数，无需为测试扩大公共 API。

完整模块约定见[项目说明](../../README.zh-CN.md)。
