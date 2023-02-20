export const getSrc = () => globalThis.source

export const rpcFromClientSide = (): number | false =>
  typeof globalThis.source === 'number' && globalThis.source !== 0
    ? globalThis.source
    : false
