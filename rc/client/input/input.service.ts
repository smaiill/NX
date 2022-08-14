import { InputEventsE } from '../../../types/events'
import { InputsDataT } from '../../../types/input'
import { NuiAPPS, RespCB, RespT } from '../../../types/main'
import InputUtils from './input.utils'
import EventsService from 'c@events/events.service'
import logger from 'c@utils/logger'

class _InputService {
  private readonly currentInputState: {
    active: boolean
    handler: Function | null
    data: InputsDataT | null
  }
  private inputUtils: typeof InputUtils
  constructor() {
    this.currentInputState = {
      active: false,
      handler: null,
      data: null,
    }
    this.inputUtils = InputUtils
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
        app: NuiAPPS.INPUT,
        method: InputEventsE.DESTROY_INPUT,
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
        app: NuiAPPS.INPUT,
        method: InputEventsE.CREATE_INPUT,
        data,
      },
      true
    )
    this.setState('handler', handler)
    this.setState('data', data)
    this.setState('active', true)
  }

  public async handleResponse(res: RespT, cb: RespCB): Promise<void> {
    if (
      typeof this.currentInputState.handler === 'function' &&
      this.currentInputState.active
    ) {
      const [isValid, error] = await this.inputUtils.isDataValid(
        res.data,
        this.currentInputState.data!
      )
      if (!isValid) {
        cb({ status: 'error', message: error })
        return
      }

      this.currentInputState.handler(res)
      this.setState('handler', null)
      this.setState('active', false)
      this.setState('data', null)

      SetNuiFocus(false, false)
      cb({ status: 'succes', message: 'succefully removed.' })
      return
    }

    cb({ status: 'error', message: 'error while removing.' })
  }
}

const InputService = new _InputService()
export default InputService
