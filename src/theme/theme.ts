export const THEME_STORAGE_KEY = import.meta.env.VITE_THEME_STORAGE_KEY
export const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)'

export const themeModes = ['light', 'dark', 'system'] as const

export type ThemeMode = (typeof themeModes)[number]
export type ResolvedTheme = Exclude<ThemeMode, 'system'>

export const isThemeMode = (value: unknown): value is ThemeMode => {
  return typeof value === 'string' && themeModes.includes(value as ThemeMode)
}

export const readStoredTheme = (): ThemeMode => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeMode(storedTheme) ? storedTheme : 'system'
  } catch {
    return 'system'
  }
}

export const persistTheme = (theme: ThemeMode): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // 存储不可用时仍允许在当前页面切换主题。
  }
}

export const getSystemTheme = (): ResolvedTheme => {
  return matchMedia(SYSTEM_THEME_QUERY).matches ? 'dark' : 'light'
}

export const resolveTheme = (
  theme: ThemeMode,
  systemTheme: ResolvedTheme,
): ResolvedTheme => {
  return theme === 'system' ? systemTheme : theme
}

export const applyTheme = (theme: ResolvedTheme): void => {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}
