import Utils from '@shared/utils/misc'
import logger from 'c@utils/logger'

export class _Events {
  private Events: Map<string, Function>
  constructor() {
    this.Events = new Map()
  }

  public emitServerEvent(
    eventName: string,
    callback: Function,
    ...args: any[]
  ): void {
    if (!callback || typeof callback !== 'function') {
      return logger.error(
        `can't trigger event: ^2[${eventName}] ^9callback most be provided !`
      )
    }

    if (this.Events.has(eventName)) {
      logger.warn(`event : ^2[${eventName}] ^3already declared.`)
    } else {
      this.Events.set(eventName, callback)
    }

    const randomID = Utils.uuid()

    const respEventName: string = `${eventName}::NX::${randomID}`

    const handleRespEvent: Function = (...args: any[]) => {
      callback(...args)
      removeEventListener(respEventName, handleRespEvent)
    }

    emitNet(eventName, respEventName, ...args)
    onNet(respEventName, handleRespEvent)
  }
}

const Events = new _Events()
export default Events
