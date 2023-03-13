import { LG } from '@utils/logger'
import { getSrc } from '@utils/src'
import { On } from 'decorators/Event'

export class DiscordController {
  @On('playerDropped')
  async handlePlayerDropped() {
    const src = getSrc()

    LG.info(`Connecting player with ID: ${src}`)
  }

  @On('playerConnecting')
  async handlePlayerConnecting() {
    const src = getSrc()

    LG.info(`Connecting player with ID: ${src}`)
  }
}
