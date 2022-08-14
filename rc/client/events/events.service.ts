import { RespCB } from '../../../types/main'
import Utils from '@shared/utils/misc'
import logger from '@utils/logger'

export class _EventsService {
  private events: Map<string, Function>
  private utils: typeof Utils
  constructor() {
    this.events = new Map()
    this.utils = Utils
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

    if (!this.events.has(eventName)) {
      this.events.set(eventName, callback)
    }

    const randomID = this.utils.uuid()

    const respEventName: string = `${eventName}::NX::${randomID}`

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
    on(`__cfx_nui:${eventName}`, (data?: T, cb?: RespCB) => {
      handler(data, cb)
    })
  }
}

const EventsService = new _EventsService()
export default EventsService
