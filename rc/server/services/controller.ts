import { PlayerEventsE } from '../../types/events'
import BansService from './bans.service'

onNet(
  PlayerEventsE.BAN_PLAYER,
  ({
    target,
    reason = 'no reason',
    duration = 0,
  }: {
    target: number
    reason: string
    duration: number
  }) => {
    const source = globalThis.source
    BansService.banPlayer({ source, target, reason, duration })
  }
)
