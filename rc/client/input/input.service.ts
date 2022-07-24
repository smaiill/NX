import EventsService from 'c@events/events.service'
import logger from 'c@utils/logger'
import { InputEvents } from '../../types/events'
import { InputsDataT } from '../../types/input'
import { NuiAPP, RespCB, RespT } from '../../types/main'

class _InputService {
  private currentInputData: { active: boolean; handler: Function | null }
  constructor() {
    this.currentInputData = {
      active: false,
      handler: null,
    }
  }

  public isActive(): boolean {
    return this.currentInputData.active
  }

  private setInputState(
    key: keyof typeof this.currentInputData,
    value: any
  ): void {
    this.currentInputData[key] = value
  }

  public destroy(cb?: RespCB): Function | void {
    if (this.isActive()) {
      this.setInputState('handler', null)
      this.setInputState('active', false)
      cb &&
        cb({
          status: 'succes',
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
      return logger.error(`Another input already showed.`)
    }
    if (!data || (handler && typeof handler !== 'function')) {
      return logger.error('Incorrect input creation arguments.')
    }
    EventsService.emitNuiEvent<InputsDataT>(
      {
        app: NuiAPP.INPUT,
        method: InputEvents.CREATE_INPUT,
        data,
      },
      true
    )
    this.setInputState('handler', handler)
    this.setInputState('active', true)
  }

  public handleInputResponse(res: RespT): void {
    if (
      typeof this.currentInputData.handler === 'function' &&
      this.currentInputData.active
    ) {
      this.currentInputData.handler(res)
      this.setInputState('handler', null)
      this.setInputState('active', false)
    }
  }
}

const InputService = new _InputService()
export default InputService
