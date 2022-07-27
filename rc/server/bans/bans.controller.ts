import { PlayerEventsE } from '../../types/events'
import { RespCB } from '../../types/main'
import BansService from './bans.service'

onNet(
  PlayerEventsE.BAN_PLAYER,
  (
    {
      target,
      reason = 'no reason',
      duration = 0,
      bannedBy = 'Unknown',
    }: {
      target: number
      reason: string
      duration: number
      bannedBy: string
    },
    cb?: RespCB
  ): void => {
    BansService.banPlayer({ target, reason, duration, bannedBy })
  }
)
