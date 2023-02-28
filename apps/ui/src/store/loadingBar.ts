import { LoadingBarData, LoadingBarState } from '@nx/types'
import { create } from 'zustand'

interface LoadingBarStore extends LoadingBarState {
  createLoadingBar: (data: LoadingBarData) => void
  removeLoadingBar: () => void
}

const useLoadingBarStore = create<LoadingBarStore>((set: any) => ({
  loadingBar: null,

  createLoadingBar: (loadingBar: LoadingBarData) =>
    set((state: LoadingBarState) => ({ ...state, loadingBar })),

  removeLoadingBar: () =>
    set((state: LoadingBarState) => ({ ...state, loadingBar: null })),
}))

export { useLoadingBarStore }
