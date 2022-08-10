import BansService from '../bans/bans.service'
import Utils from '@shared/utils/misc'
import PlayerService from 's@player/player.service'
import PlayerUtils from 's@player/player.utils'
import { logger } from 's@utils/logger'

class _DeferralsService {
  utils: typeof Utils
  playerUtils: typeof PlayerUtils
  bansService: typeof BansService
  constructor() {
    this.utils = Utils
    this.playerUtils = PlayerUtils
    this.bansService = BansService
  }

  public async validatePlayer(
    source: number,
    name: string,
    identifiers: string[],
    deferrals: any,
    reject: Function
  ) {
    deferrals.defer()
    deferrals.update(`${name} wait while checking your license`)

    const license = await this.playerUtils.getPlayerIdentifier(
      identifiers,
      'license'
    )

    if (!license) return deferrals.done('Not valid license')

    const isBanned = await this.bansService.isBanned(license)
    if (isBanned) {
      const unban = await this.bansService.checkUnban(license)

      if (!unban) {
        deferrals.done(
          `you are banned from this server.\nReason: ${
            isBanned.reason
          }.\nBan Date: ${this.utils.parseDate(
            isBanned.date
          )}.\nExpiration: ${this.utils.parseDate(isBanned.expire)}`
        )
        return
      }
    }

    PlayerService.doesPlayerExist(license)
      .then(() => {
        deferrals.done()
      })
      .catch((player) => {
        deferrals.done(
          `Player already connected with the same license: ${license}`
        )
        logger.warn(
          `Player: [${name}] tried to connect with the same license as: [${player.name}] | license: ${license}`
        )
      })
  }
}

const DeferralsService = new _DeferralsService()
export default DeferralsService
