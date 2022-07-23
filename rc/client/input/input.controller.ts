import logger from 'c@utils/logger'
import { InputEvents } from '../../types/events'
import { InputsDataT } from '../../types/input'
import InputService from './input.service'

onNet(InputEvents.CREATE_INPUT, (data: InputsDataT) => {
  if (!data) {
    return logger.error(`Incorrect data.`)
  }
  if (!InputService.isActive()) {
    InputService.create(data)
  }
})
