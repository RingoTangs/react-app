import autoImport from 'unplugin-auto-import/vite'

export default () => {
  return autoImport({
    include: [/\.[tj]sx?$/],
    imports: [
      // react
      {
        from: 'react',
        imports: [
          'StrictMode',
          'useState',
          'useEffect',
          'useMemo',
          'useCallback',
          'useRef',
        ],
      },

      // tailwind-variants
      {
        from: 'tailwind-variants',
        imports: ['tv', 'cn', 'cx'],
      },

      // @tanstack/react-query
      {
        from: '@tanstack/react-query',
        imports: ['useQuery', 'useMutation', 'useQueryClient'],
      },

      // @tanstack/react-router
      {
        from: '@tanstack/react-router',
        imports: ['Link', 'useNavigate'],
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
