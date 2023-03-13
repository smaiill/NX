import { PlayerEvents } from '@nx/types'
import { OnlyClient, OnNet } from 'decorators/Event'
import { BansError, BansLogger } from './bans.misc'
import { CreateBanType } from './bans.schema'
import { BansService } from './bans.service'

export class BansController {
  @OnlyClient()
  @OnNet(PlayerEvents.BAN_PLAYER)
  async handleBanPlayer(data: CreateBanType) {
    try {
      const { license } = await BansService.banPlayer(data)

      BansLogger.info(`Succesfully banned player with license [${license}]`)
    } catch (error: unknown) {
      BansLogger.error((error as BansError).message)
    }
  }
}
