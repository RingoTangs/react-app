import autoImport from 'unplugin-auto-import/vite'

export default () => {
  return autoImport({
    include: [/\.[tj]sx?$/],
    imports: [
      // tailwind-variants
      {
        from: 'tailwind-variants',
        imports: ['tv', 'cn', 'cx'],
      },

      // @tanstack/react-query
      {
        from: '@tanstack/react-query',
        imports: [
          'useQuery',
          'useQueries',
          'useInfiniteQuery',
          'useMutation',
          'useQueryClient',
          'queryOptions',
          'QueryClient',
          'QueryClientProvider',
          'QueryErrorResetBoundary',
        ],
      },

      // @tanstack/react-query-devtools
      {
        from: '@tanstack/react-query-devtools',
        imports: ['ReactQueryDevtools'],
      },

      // react
      {
        from: 'react',
        imports: [
          'useState',
          'useEffect',
          'useCallback',
          'useMemo',
          'useRef',
          'useContext',
          'StrictMode',
        ],
      },

      // react-dom/client
      {
        from: 'react-dom/client',
        imports: ['createRoot'],
      },

      // @tanstack/react-router
      {
        from: '@tanstack/react-router',
        imports: ['Link', 'useNavigate'],
      },

      // @tanstack/react-router-devtools
      {
        from: '@tanstack/react-router-devtools',
        imports: ['TanStackRouterDevtools'],
      },
      // react-error-boundary
      {
        from: 'react-error-boundary',
        imports: ['ErrorBoundary'],
      },
    ],
    dirs: ['src/utils'],
    dts: 'types/auto-imports.d.ts',
  })
}
