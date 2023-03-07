const isEnvBrowser = (): boolean => !window.invokeNative

const uuid = () => crypto.randomUUID()

export { isEnvBrowser, uuid }
