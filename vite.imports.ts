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
    ],
    dts: 'types/auto-imports.d.ts',
  })
}
