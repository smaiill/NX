export interface LoadingBarStyle {
  container?: Record<string, string>
  label?: Record<string, string>
  bar?: Record<string, string>
}

export interface LoadingBarData {
  duration: number
  label?: string
  style?: LoadingBarStyle
}

export interface LoadingBarState {
  loadingBar: LoadingBarData | null
}
