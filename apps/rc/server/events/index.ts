import { CodeColors } from '@nx/types'
import { LG } from '@utils/logger'
import { getSrc } from '@utils/src'

class _EventsService {
  private events: Map<string, (src: number, ...args: unknown[]) => void>
  private activeEvents: string[]
  constructor() {
    this.events = new Map()
    this.activeEvents = []
  }

  async onServerEvent(eventName: string, callback: () => void) {
    if (!callback || typeof callback !== 'function') {
      LG.warn(
        `Can't register event: ${CodeColors.GREEN}[${eventName}] ${CodeColors.ORANGE}callback most be provided !${CodeColors.WHITE}`,
      )
      return
    }

    const eventHandler = (respEventName: string, ...args: unknown[]): void => {
      const src = getSrc()
      const eventCallback = this.events.get(eventName)
      if (!eventCallback) {
        return
      }

      eventCallback(src, ...args, (...respArgs: unknown[]) => {
        emitNet(respEventName, src, ...respArgs)
      })
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
