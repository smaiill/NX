const isEnvBrowser = (): boolean => !(window as any).invokeNative

const uuid = () => {
  return crypto.randomUUID()
}

export { isEnvBrowser, uuid }
