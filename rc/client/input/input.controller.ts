import { InputEventsE } from '../../../types/events'
import { RespCB, RespT } from '../../../types/main'
import InputService from './input.service'
import EventsService from '@events/events.service'

EventsService.onNuiEvent<RespT>(
  InputEventsE.SUBMIT_DATA,
  (res: RespT, cb: RespCB): void => {
    InputService.handleResponse(res, cb)
  }
)
