const restrictedBarrelMessage =
  'Do not add barrel exports here. Import app, route, and feature internals explicitly unless a feature intentionally exposes a stable public API.'

export const appBoundaryRules = [
  // shared is the lowest product-agnostic layer. It must not import app,
  // route, or feature modules, otherwise reusable helpers become coupled
  // to product behavior.
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
