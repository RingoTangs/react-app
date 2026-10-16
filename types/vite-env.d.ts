interface ImportMetaEnv {
  readonly VITE_ROUTER_HISTORY: 'browser' | 'hash'
  readonly VITE_SITE_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
