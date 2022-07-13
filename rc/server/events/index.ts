import { logger } from 's@utils/logger'
import { EventE } from '../../types/events'
export class _Events {
  private Events: EventE
  private ActiveEvents: string[]
  constructor() {
    this.Events = {}
    this.ActiveEvents = []
  }

  async onServerEvent(eventName: string, callback: Function) {
    if (!callback || typeof callback !== 'function') {
      return logger.error(
        `Can't register event: [${eventName}] callback most be provided !`
      )
    }

    const eventHandler = (respEventName: string, ...args: any[]): void => {
      const source = globalThis.source
      this.Events[eventName](source, ...args, (...respArgs: any[]) => {
        emitNet(respEventName, globalThis.source, ...respArgs)
      })
    }

    this.Events[eventName] = callback
    if (!this.ActiveEvents.includes(eventName)) {
      onNet(eventName, eventHandler)
      this.ActiveEvents.push(eventName)
    }
  }
}

const Events = new _Events()
export default Events
