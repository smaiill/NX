import { logger } from 's@utils/logger'

export class _Events {
  private events: Map<string, Function>
  private activeEvents: string[]
  constructor() {
    this.events = new Map()
    this.activeEvents = []
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
      const eventCallback = this.events.get(eventName)
      if (eventCallback) {
        eventCallback(source, ...args, (...respArgs: any[]) => {
          emitNet(respEventName, globalThis.source, ...respArgs)
        })
      }
    }

    this.events.set(eventName, callback)
    if (!this.activeEvents.includes(eventName)) {
      onNet(eventName, eventHandler)
      this.activeEvents.push(eventName)
    }
  }
}

const Events = new _Events()
export default Events
