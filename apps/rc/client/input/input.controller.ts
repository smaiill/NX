import { EventsService } from '@events/events.service'
import { InputEvents, Response, ResponseCB } from '@nx/types'
import { InputService } from './input.service'

EventsService.onNuiEvent<Response>(
  InputEvents.SUBMIT_DATA,
  (res: Response, cb: ResponseCB): void => {
    InputService.handleResponse(res, cb)
  }
)
