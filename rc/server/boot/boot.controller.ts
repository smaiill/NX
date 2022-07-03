import BootService from './boot.service'

on('onResourceStart', (resource: string) => {
  if (resource === GetCurrentResourceName()) {
    BootService.checkResource()
  }
})
