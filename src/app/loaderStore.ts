import { create } from 'zustand'

type LoadingMode = 'idle' | 'boot' | 'navigation'

interface LoadingState {
  mode: LoadingMode

  setBootLoading: () => void
  setNavigationLoading: () => void
  clearLoading: () => void
}

export const useLoaderStore = create<LoadingState>((set) => ({
  mode: 'boot',

  setBootLoading: () => {
    set({ mode: 'boot' })
  },

  setNavigationLoading: () => {
    set({ mode: 'navigation' })
  },

  clearLoading: () => {
    set({ mode: 'idle' })
  },
}))
