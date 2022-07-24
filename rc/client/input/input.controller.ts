import EventsService from 'c@events/events.service'
import { InputEvents } from '../../types/events'
import { RespT } from '../../types/main'
import InputService from './input.service'

EventsService.onNuiEvent(InputEvents.SUBMIT_DATA, (res: RespT): void => {
  InputService.handleInputResponse(res)
})
