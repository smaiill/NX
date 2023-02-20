import { ResponseCB } from '@nx/types'
import { Utils } from '@shared/utils/misc'
import { LG } from '@utils/logger'

class _EventsService {
  private events: Map<string, Function>
  private utils: typeof Utils
  constructor() {
    this.events = new Map()
    this.utils = Utils
  }

  public emitServerEvent(
    eventName: string,
    callback: (...args: any[]) => void,
    ...args: any[]
  ): void {
    if (!callback || typeof callback !== 'function') {
      return LG.error(
        `can't trigger event: ^2[${eventName}] ^9callback most be provided !`
      )
    }

    if (!this.events.has(eventName)) {
      this.events.set(eventName, callback)
    }

    const randomID = this.utils.uuid('LARGE')

    const respEventName = `${eventName}::NX::${randomID}`

    const handleRespEvent = (...args: any[]) => {
      callback(...args)
      removeEventListener(respEventName, handleRespEvent)
    }

    emitNet(eventName, respEventName, ...args)
    onNet(respEventName, handleRespEvent)
  }

  public emitNuiEvent<T = any>(
    { app, method, data }: { app: string; method: string; data?: T },
    useCursor: boolean = false
  ): void {
    SetNuiFocus(useCursor, useCursor)
    SendNuiMessage(
      JSON.stringify({
        app,
        method,
        data,
      })
    )
  }

  public onNuiEvent<T = any>(eventName: string, handler: Function): void {
    RegisterNuiCallbackType(eventName)
    on(`__cfx_nui:${eventName}`, (data?: T, cb?: ResponseCB) => {
      handler(data, cb)
    })
  }
}

const EventsService = new _EventsService()
export { EventsService }
