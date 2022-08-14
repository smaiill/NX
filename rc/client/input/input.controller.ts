import { InputEvents } from '../../../types/events'
import { RespCB, RespT } from '../../../types/main'
import InputService from './input.service'
import EventsService from 'c@events/events.service'

EventsService.onNuiEvent<RespT>(
  InputEvents.SUBMIT_DATA,
  (res: RespT, cb: RespCB): void => {
    InputService.handleResponse(res, cb)
  }
)
