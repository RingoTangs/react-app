# 应用基础设施

这里管理应用级配置和基础设施，由 [App.tsx](../App.tsx) 组合全局 Provider、路由和开发工具。

## 文件职责

| 文件                             | 职责                                        |
| -------------------------------- | ------------------------------------------- |
| [env.ts](env.ts)                 | 统一读取 Vite 环境变量                      |
| [queryClient.ts](queryClient.ts) | 创建共享 QueryClient，设置通用查询默认值    |
| [router.ts](router.ts)           | 创建路由实例，将 QueryClient 注入路由上下文 |
| [reportError.ts](reportError.ts) | 错误上报接入点，当前仅输出开发日志          |

## 使用边界

- 页面、业务逻辑、请求函数和业务查询配置放在所属 feature 中。
- feature 不直接依赖 app；需要环境配置时，通过参数或公共接口传入。
- Provider 的组合放在 App.tsx；供 feature 使用的能力本身放在 `shared/<能力>` 或 `features/<业务域>`。
- 基础设施按文件显式导入，例如 `@/app/queryClient`；默认不添加统一导出入口，相关文件增多后再按需分目录。

完整目录划分见[项目说明](../../README.zh-CN.md)。
