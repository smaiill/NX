export const getSrc = () => globalThis.source

export const isRPCFromClientSide = (): number | false =>
  typeof globalThis.source === 'number' && globalThis.source !== 0
    ? globalThis.source
    : false
