import { PlayerEvents } from '@nx/types'
import { LG } from '@utils/logger'
import { isRPCFromClientSide } from '@utils/src'
import { CreateBanType } from './bans.schema'
import { BansService } from './bans.service'

// ? Only from client side !
onNet(PlayerEvents.BAN_PLAYER, async (data: CreateBanType): Promise<void> => {
  const isClientSide = isRPCFromClientSide()

  if (!isClientSide) {
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
