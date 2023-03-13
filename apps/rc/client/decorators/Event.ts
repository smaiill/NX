export function On<T>(eventName: string) {
  return function (target: T, _: unknown, descriptor: PropertyDescriptor) {
    on(eventName, async (...args: unknown[]) => {
      await descriptor.value.apply(target, args)
    })
  }
}

export function OnNet<T>(eventName: string) {
  return function (target: T, _: unknown, descriptor: PropertyDescriptor) {
    onNet(eventName, async (...args: unknown[]) => {
      await descriptor.value.apply(target, args)
    })
  }
}
