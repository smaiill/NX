import { CodeColors } from '@nx/types'
import { LG } from '@utils/logger'

class _EventsService {
  private events: Map<string, Function>
  private activeEvents: string[]
  constructor() {
    this.events = new Map()
    this.activeEvents = []
  }

  async onServerEvent(eventName: string, callback: Function) {
    if (!callback || typeof callback !== 'function') {
      LG.warn(
        `Can't register event: ${CodeColors.GREEN}[${eventName}] ${CodeColors.ORANGE}callback most be provided !${CodeColors.WHITE}`
      )
      return
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

const EventsService = new _EventsService()
export { EventsService }
