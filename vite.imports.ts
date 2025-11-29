import autoImport from 'unplugin-auto-import/vite'

export default () => {
  return autoImport({
    include: [/\.[tj]sx?$/],
    imports: [
      {
        from: 'tailwind-variants',
        imports: ['tv', 'cn', 'cx'],
      },
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
        ],
      },
      {
        from: 'react',
        imports: [
          'useState',
          'useEffect',
          'useCallback',
          'useMemo',
          'useRef',
          'useContext',
        ],
      },
    ],
    dirs: ['src/utils'],
    dts: 'types/auto-imports.d.ts',
  })
}
