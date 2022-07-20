import { logger } from 's@utils/logger'
export class _Events {
  private Events: Map<string, Function>
  private ActiveEvents: string[]
  constructor() {
    this.Events = new Map()
    this.ActiveEvents = []
  }

  async onServerEvent(eventName: string, callback: Function) {
    if (!callback || typeof callback !== 'function') {
      return logger.error(
        `Can't register event: [${eventName}] callback most be provided !`
      )
    }

    const eventHandler: Function = (
      respEventName: string,
      ...args: any[]
    ): void => {
      const source: number = globalThis.source
      const eventCallback = this.Events.get(eventName)
      if (eventCallback) {
        eventCallback(source, ...args, (...respArgs: any[]) => {
          emitNet(respEventName, globalThis.source, ...respArgs)
        })
      }
    }

    this.Events.set(eventName, callback)
    if (!this.ActiveEvents.includes(eventName)) {
      onNet(eventName, eventHandler)
      this.ActiveEvents.push(eventName)
    }
  }
}

const Events = new _Events()
export default Events
