import { LG } from '@utils/logger'
import { BootService } from './boot.service'

on('onResourceStart', (resource: string): void => {
  if (resource === GetCurrentResourceName()) {
    BootService.checkResource()
  }
})

on('onResourceStop', (resourceName: string): void => {
  if (GetCurrentResourceName() !== resourceName) return
  LG.warn('Resource has stopped.')
})
