import logger from '../utils/logger'
import { uuid } from '../utils/misc'

export class _Events {
  Events: any
  constructor() {
    this.Events = {}
  }

  emitServerEvent(eventName: string, callback: Function, ...args: any[]) {
    if (eventName in this.Events) {
      logger.warn(`Event : ${eventName} already declared.`)
    } else {
      this.Events[eventName] = callback
    }

    const randomID = uuid()

    const respEventName: string = `${eventName}::${randomID}`

    const handleRespEvent: Function = (...args: any[]) => {
      callback(args)
      removeEventListener(respEventName, handleRespEvent)
    }

    onNet(respEventName, handleRespEvent)
    emitNet(eventName, respEventName, ...args)
  }
}

const Events = new _Events()
export default Events
