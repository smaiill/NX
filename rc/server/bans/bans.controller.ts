import { PlayerEventsE } from '../../types/events'
import { BanEventDataT } from '../../types/main'
import BansService from './bans.service'
import { logger } from 's@utils/logger'

// ? Server and Client.
onNet(
  PlayerEventsE.BAN_PLAYER,
  ({ target, reason, duration, bannedBy }: BanEventDataT): void => {
    if (!target) return
    BansService.banPlayer({ target, reason, duration, bannedBy })
      .then(({ data }) => {
        logger.info(`Succesfully banned player with license [${data.license}]`)
      })
      .catch((err) => {
        logger.error(`${err.message}`)
      })
  }
)
