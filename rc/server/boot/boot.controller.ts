import { logger } from 's@utils/logger'
import BootService from './boot.service'

on('onResourceStart', (resource: string): void => {
  if (resource === GetCurrentResourceName()) {
    BootService.checkResource()
  }
})

on('onResourceStop', (resourceName: string): void => {
  if (GetCurrentResourceName() !== resourceName) return
  logger.warn('Resource has stopped.')
})
