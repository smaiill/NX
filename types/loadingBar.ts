export interface LoadingBarStyleT {
  container?: Record<string, string>
  label?: Record<string, string>
  bar?: Record<string, string>
}

export interface LoadingBarDataT {
  duration: number
  label?: string
  style?: LoadingBarStyleT
}

export interface LoadingBarState {
  loadingBar: LoadingBarDataT | null
}
