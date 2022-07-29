import { InputEvents } from '../../types/events'
import { InputsDataT } from '../../types/input'
import { NuiAPP, RespCB, RespT } from '../../types/main'
import EventsService from 'c@events/events.service'
import logger from 'c@utils/logger'

class _InputService {
  private readonly currentInputState: {
    active: boolean
    handler: Function | null
  }
  constructor() {
    this.currentInputState = {
      active: false,
      handler: null,
    }
  }

  public isActive(): boolean {
    return this.currentInputState.active
  }

  private setState(key: keyof typeof this.currentInputState, value: any): void {
    this.currentInputState[key] = value
  }

  public destroy(cb?: RespCB): Function | void {
    if (this.isActive()) {
      this.setState('handler', null)
      this.setState('active', false)
      EventsService.emitNuiEvent({
        app: NuiAPP.INPUT,
        method: InputEvents.DESTROY_INPUT,
      })
      cb &&
        cb({
          status: 'succes',
          message: 'input deleted.',
        })
      return
    }

    cb &&
      cb({
        status: 'error',
        message: 'no input detected.',
      })
  }

  public create(data: InputsDataT, handler: Function): void {
    if (this.isActive()) {
      return logger.error(`another input already showed.`)
    }
    if (!data || (handler && typeof handler !== 'function')) {
      return logger.error('incorrect input creation arguments.')
    }
    EventsService.emitNuiEvent<InputsDataT>(
      {
        app: NuiAPP.INPUT,
        method: InputEvents.CREATE_INPUT,
        data,
      },
      true
    )
    this.setState('handler', handler)
    this.setState('active', true)
  }

  public handleResponse(res: RespT, cb: RespCB): void {
    if (
      typeof this.currentInputState.handler === 'function' &&
      this.currentInputState.active
    ) {
      this.currentInputState.handler(res)
      this.setState('handler', null)
      this.setState('active', false)

      SetNuiFocus(false, false)
      cb({ status: 'succes', message: 'succefully removed.' })
      return
    }

    cb({ status: 'error', message: 'error while removing.' })
  }
}

const InputService = new _InputService()
export default InputService
