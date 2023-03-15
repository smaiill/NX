import { ExportMethod, ExportService } from '@decorators/Export'
import { CodeColors } from '@nx/types'
import { LG } from '@utils/logger'
import { getSrc } from '@utils/src'

@ExportService('Events')
class _EventsService {
  private events: Map<string, (src: number, ...args: unknown[]) => void>
  private activeEvents: string[]
  constructor() {
    this.events = new Map()
    this.activeEvents = []
  }

  @ExportMethod()
  async _debug({ name, age }: { name: string; age: number }): Promise<string> {
    console.log(`Hello world ! ${age}`, name)

    return ''
  }

  @ExportMethod()
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
