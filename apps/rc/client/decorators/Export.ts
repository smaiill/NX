import { DecoratorsTokens } from '@nx/types'

export const ExportMethod = <T extends object>(customMethodName?: string) => {
  return function (
    service: T,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) {
    if (!Reflect.hasMetadata(DecoratorsTokens.__EXPORTED_METHODS, service)) {
      Reflect.defineMetadata(DecoratorsTokens.__EXPORTED_METHODS, [], service)
    }

    const __exportedMethods = Reflect.getMetadata(
      DecoratorsTokens.__EXPORTED_METHODS,
      service,
    )

    const _methodName = customMethodName || methodName

    const capitalizedMethodName = `${_methodName
      .charAt(0)
      .toUpperCase()}${_methodName.slice(1)}`

    __exportedMethods.push(
      Object.assign(
        {
          originalName: _methodName,
          capitalizedName: capitalizedMethodName,
        },
        descriptor,
      ),
    )
  }
}

export const ExportService = (serviceName: string) => {
  return function <T extends { new (...args: any[]): object }>(
    __constructor: T,
  ) {
    return class extends __constructor {
      constructor(...args: any[]) {
        super(...args)

        if (!Reflect.hasMetadata(DecoratorsTokens.__EXPORTED_METHODS, this)) {
          Reflect.defineMetadata(DecoratorsTokens.__EXPORTED_METHODS, [], this)
        }

        Reflect.defineMetadata(
          DecoratorsTokens.__SERVICE_NAME,
          serviceName,
          this,
        )
      }
    }
  }
}
