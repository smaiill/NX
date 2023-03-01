const isEnvBrowser = (): boolean => !(window as any).invokeNative

const uuid = () => crypto.randomUUID()

export { isEnvBrowser, uuid }
