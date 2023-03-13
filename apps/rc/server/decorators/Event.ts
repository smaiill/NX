import { LG } from '@utils/logger'
import { isRPCFromClientSide } from '@utils/src'

export function On<T = unknown>(eventName: string) {
  return function (target: T, _: unknown, descriptor: PropertyDescriptor) {
    on(eventName, async (...args: unknown[]) => {
      await descriptor.value.apply(target, args)
    })
  }
}

export function OnNet<T = unknown>(eventName: string) {
  return function (target: T, _: unknown, descriptor: PropertyDescriptor) {
    onNet(eventName, async (...args: unknown[]) => {
      await descriptor.value.apply(target, args)
    })
  }
}

export function OnlyClient<T = unknown>() {
  return function (
    target: T,
    methodName: unknown,
    descriptor: PropertyDescriptor,
  ) {
    const __defaultMethod = descriptor.value

    descriptor.value = function (...args: unknown[]) {
      const isClientSide = isRPCFromClientSide()

      if (!isClientSide) {
        LG.warn(
          `Someone tried to execute the following method: [${methodName}] from server side, info provided: ${JSON.stringify(
            args,
          )}`,
        )
        return
      }

      return __defaultMethod.apply(this, ...args)
    }
  }
}
