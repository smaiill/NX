interface Window {
  GetParentResourceName: () => string
  invokeNative(): void
}

declare var window: Window
