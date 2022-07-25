import { bans } from '@shared/load.file'
import Utils from '@shared/utils/misc'
import PlayerService from 's@player/player.service'
import { logger } from 's@utils/logger'
import { BanT, RespCB } from '../../types/main'

class _BansService {
  private Bans: Map<string, BanT>
  private Utils: typeof Utils
  private readonly permaBanValue: number
  constructor() {
    this.Bans = new Map()
    this.Utils = Utils
    this.permaBanValue = 3000000000 // ? 24/01/2065 06:20:00
  }

  public fetchAll(): Map<string, BanT> {
    return this.Bans
  }

  private loadBans(bans: BanT[]): void {
    for (const ban of bans) {
      this.Bans.set(ban.id, ban)
    }
  }

  private findBanByLicense(license: string): BanT | false {
    const [isBanned] = [...this.Bans.entries()]
      .filter(({ 1: ban }) => ban.license === license)
      .map(([id, val]) => val)

    if (!isBanned) {
      return false
    }

    return isBanned
  }

  public async isBanned(license: string): Promise<false | BanT> {
    const isBanned = await this.findBanByLicense(license)
    return isBanned
  }

  private msToS(date: Date): number {
    const timestamp = date.getTime() / 1000
    return parseInt(timestamp.toString().split('.')[0])
  }

  private createExpirationDate(days: number): number {
    if (days === 0) return this.permaBanValue

    const date = new Date()
    date.setDate(date.getDate() + days)
    return this.msToS(date)
  }

  public async banPlayer(
    {
      source,
      target,
      reason,
      duration,
    }: {
      source: number
      target: number
      reason: string
      duration: number
    },
    cb?: RespCB
  ) {
    const nxTarget = await PlayerService.getPlayer(target)
    if (!nxTarget) {
      return (
        cb &&
        cb({ status: 'succes', message: `Target: [${target}] not found.` })
      )
    }
    const expirationTimestamp = this.createExpirationDate(duration)
    // @ts-ignore
    const id: string = this.Utils.uuid()
    const banData: BanT = {
      license: nxTarget.data.identifier,
      bannedBy: GetPlayerName(source as unknown as string),
      identifiers: getPlayerIdentifiers(target),
      reason,
      id,
      date: this.msToS(new Date()),
      expire: expirationTimestamp,
    }
    try {
      const bansFile: BanT[] = JSON.parse(
        LoadResourceFile(GetCurrentResourceName(), 'config/nx.bans.json')
      )

      const alreadyExists = bansFile.find(
        (ban) => ban.license === nxTarget.data.identifier
      )
      if (alreadyExists) {
        logger.error(
          `Error while banning player: [${nxTarget.data.identifier}]. already banned.`
        )
        return
      }

      bansFile.push(banData)

      SaveResourceFile(
        GetCurrentResourceName(),
        'config/nx.bans.json',
        JSON.stringify(bansFile),
        -1
      )
      this.Bans.set(id as string, banData)
      cb && cb({ status: 'succes', data: banData })
    } catch (error) {
      logger.error(
        `Error while banning player: [${nxTarget.data.identifier}]. ${error}`
      )

      cb && cb({ status: 'error', message: error })
    }
  }

  public unbanPlayer(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.Bans.delete(id)
      try {
        const bansFile: BanT[] = JSON.parse(
          LoadResourceFile(GetCurrentResourceName(), 'config/nx.bans.json')
        )
        const newBansFile = bansFile.filter((ban: BanT) => ban.id !== id)
        SaveResourceFile(
          GetCurrentResourceName(),
          'config/nx.bans.json',
          JSON.stringify(newBansFile),
          -1
        )
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }

  public checkUnban(license: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const player = this.findBanByLicense(license)
      const date = Date.now() / 1000

      if (player && player.expire < date) {
        this.unbanPlayer(player.id)
          .then(() => resolve(true))
          .catch(() => reject(false))
      }
    })
  }

  public init(): void {
    this.loadBans(bans)
  }
}

const BansService = new _BansService()
BansService.init()
export default BansService
