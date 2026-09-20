interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string
  readonly VITE_SITE_NAME: string
  readonly VITE_THEME_STORAGE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
