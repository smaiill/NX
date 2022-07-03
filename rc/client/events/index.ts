import logger from '../utils/logger'
import Utils from '../../shared/utils/misc'

export class _Events {
  Events: any
  constructor() {
    this.Events = {}
  }

  emitServerEvent(eventName: string, callback: Function, ...args: any[]) {
    if (!callback || typeof callback !== 'function') {
      return logger.error(
        `Can't trigger event: ^2[${eventName}] ^9callback most be provided !`
      )
    }

    if (eventName in this.Events) {
      logger.warn(`Event : ${eventName} already declared.`)
    } else {
      this.Events[eventName] = callback
    }

    const randomID = Utils.uuid()

    const respEventName: string = `${eventName}::${randomID}`

    const handleRespEvent: Function = (...args: any[]) => {
      callback(args)
      removeEventListener(respEventName, handleRespEvent)
    }

    emitNet(eventName, respEventName, ...args)
    onNet(respEventName, handleRespEvent)
  }
}

const Events = new _Events()
export default Events
