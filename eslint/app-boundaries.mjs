const restrictedBarrelMessage =
  'Do not add barrel exports here. Import app, route, and feature internals explicitly unless a feature intentionally exposes a stable public API.'

export const appBoundaryRules = [
  // shared is the lowest product-agnostic layer. It must not import app,
  // route, or feature modules, otherwise reusable helpers become coupled
  // to product behavior.
  // shared 是产品无关的底层复用层，不能反向依赖 app、routes 或
  // features，否则通用 helper 会被具体产品行为耦合。
  {
    name: 'app-boundaries/shared',
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*', '@/routes/*', '@/features/*'],
              message:
                'Shared code must stay product-agnostic. Move business logic to features or pass values into shared utilities.',
            },
          ],
        },
      ],
    },
  },

  // routes own URL semantics and loading orchestration. Data details should
  // stay in the owning feature so loaders and hooks can share query options.
  // routes 负责 URL 语义和加载编排。数据细节应留在所属 feature，
  // 这样 loaders 和 hooks 才能复用同一份 query options。
  {
    name: 'app-boundaries/routes',
    files: ['src/routes/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: 'fetch',
          message:
            'Route files must not call fetch directly. Use feature api + model/queryOptions and preload through context.queryClient.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/api/*'],
              message:
                'Route files must not import feature API functions directly. Use feature model/queryOptions for loader preloading.',
            },
            {
              group: ['@/features/*/model/queryKeys'],
              message:
                'Route files must not own query keys. Use feature model/queryOptions instead.',
            },
          ],
        },
      ],
    },
  },

  // app wires infrastructure such as providers, router, and runtime config.
  // Feature data definitions should remain in features and be passed through
  // explicit integration points such as router context.
  // app 负责 providers、router、runtime config 等基础设施装配。
  // Feature 数据定义应留在 features，并通过 router context 等显式集成点连接。
  {
    name: 'app-boundaries/app',
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/api/*', '@/features/*/model/queryOptions'],
              message:
                'App infrastructure must not own feature data definitions. Keep feature APIs and query options in features.',
            },
          ],
        },
      ],
    },
  },

  // Barrel exports are allowed only at stable public boundaries. App, route,
  // and feature internals should keep explicit imports to avoid hiding
  // ownership and dependency direction.
  // Barrel export 只允许用于稳定公共边界。App、route 和 feature 内部
  // 应保持显式导入，避免隐藏代码归属和依赖方向。
  {
    name: 'app-boundaries/no-default-barrels',
    files: [
      'src/app/**/index.ts',
      'src/features/index.ts',
      'src/features/*/*/index.ts',
      'src/routes/**/index.ts',
    ],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportAllDeclaration',
          message: restrictedBarrelMessage,
        },
        {
          selector: 'ExportNamedDeclaration',
          message: restrictedBarrelMessage,
        },
      ],
    },
  },
]
