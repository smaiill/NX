import { PlayerEventsE } from '../../types/events'
import { RespCB } from '../../types/main'
import BansService from './bans.service'

onNet(
  PlayerEventsE.BAN_PLAYER,
  (
    {
      target,
      reason,
      duration,
      bannedBy,
    }: {
      target: number
      reason: string
      duration: number
      bannedBy: string
    },
    cb?: RespCB
  ): void => {
    if (!target) return
    BansService.banPlayer({ target, reason, duration, bannedBy }, cb)
  }
)
