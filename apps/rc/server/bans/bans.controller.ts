import { BanEventData, PlayerEvents } from '@nx/types'
import { LG } from '@utils/logger'
import { isRPCFromClientSide } from '@utils/src'
import { BansService } from './bans.service'

// ? Only from client side !
onNet(PlayerEvents.BAN_PLAYER, async (data: BanEventData): Promise<void> => {
  const src = isRPCFromClientSide()

  if (!src) {
    LG.warn(`someone tried to ban from server side, info provided: ${data}`)
    return
  }

  try {
    const { license } = await BansService.banPlayer(data)

    LG.info(`Succesfully banned player with license [${license}]`)
  } catch (message) {
    LG.error(message)
  }
})