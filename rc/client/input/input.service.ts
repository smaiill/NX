import EventsService from 'c@events/events.service'
import { InputEvents } from '../../types/events'
import { InputsDataT } from '../../types/input'
import { NuiAPP } from '../../types/main'

class _InputService {
  active: boolean
  constructor() {
    this.active = false
  }

  public isActive(): boolean {
    return this.active
  }

  public create(data: InputsDataT): void {
    EventsService.emitNuiEvent<InputsDataT>(
      {
        app: NuiAPP.INPUT,
        method: InputEvents.CREATE_INPUT,
        data,
      },
      true
    )
  }
}

const InputService = new _InputService()
export default InputService
