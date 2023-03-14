import { EventsService } from '@modules/events/events.service'
import { InputEvents, Response } from '@nx/types'
import { InputService } from './input.service'

EventsService.onNuiEvent<Response>(InputEvents.SUBMIT_DATA, (res, cb): void => {
  InputService.handleResponse(res, cb as (res: Response<unknown>) => void)
})
