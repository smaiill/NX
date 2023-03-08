export const getSrc = () => globalThis.source

export const isRPCFromClientSide = (): boolean =>
  typeof globalThis.source === 'number' && globalThis.source !== 0
    ? true
    : false
