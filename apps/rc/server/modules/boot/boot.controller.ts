import { LG } from '@utils/logger'
import { On } from 'decorators/Event'
import { BootService } from './boot.service'

export class BootController {
  @On<BootController>('onResourceStart')
  async handleOnResourceStart(resourceName: string) {
    if (resourceName === GetCurrentResourceName()) {
      BootService.checkResource()
    }
  }
  @On<BootController>('onResourceStop')
  async handleOnResourceStop(resourceName: string) {
    if (GetCurrentResourceName() !== resourceName) return
    LG.warn(`[NX] Has been stopped.`)
  }
}
