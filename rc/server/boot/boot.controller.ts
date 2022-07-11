import { logger } from '../utils/logger'
import BootService from './boot.service'

on('onResourceStart', (resource: string) => {
  if (resource === GetCurrentResourceName()) {
    BootService.checkResource()
  }
})

on('onResourceStop', (resourceName: string) => {
  if (GetCurrentResourceName() !== resourceName) return
  logger.warn('Resource has stopped.')
})
