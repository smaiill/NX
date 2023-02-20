import { Ban, BanEventData } from '@nx/types'
import { PlayerService } from '@player/player.service'
import { bans } from '@shared/load.file'
import { Utils } from '@shared/utils/misc'

class _BansService {
  private bans: Map<string, Ban>
  private readonly permaBanValue: number
  constructor() {
    this.bans = new Map()
    this.permaBanValue = 3000000000 // ? 24/01/2065 06:20:00
    this.init()
  }

  public fetchAll(): Map<string, Ban> {
    return this.bans
  }

  private loadBans(bans: Ban[]): void {
    for (const ban of bans) {
      this.bans.set(ban.id, ban)
    }
  }

  private findBanByLicense(license: string): Ban | false {
    const [isBanned] = [...this.bans.entries()]
      .filter(({ 1: ban }) => ban.license === license)
      .map(([, val]) => val)

    if (!isBanned) {
      return false
    }

    return isBanned
  }

  public async isBanned(license: string): Promise<false | Ban> {
    const isBanned = await this.findBanByLicense(license)
    return isBanned
  }

  private msToS(date: Date = new Date()): number {
    const timestamp = date.getTime() / 1000
    return parseInt(timestamp.toString().split('.')[0])
  }

  private createExpirationDate(days: number): number {
    if (days === 0) return this.permaBanValue

    const date = new Date()
    date.setDate(date.getDate() + days)
    return this.msToS(date)
  }

  public async banPlayer(data: BanEventData): Promise<Ban> {
    if (!data || !data.target) {
      throw `Invalid data while trying to ban player, data provided: [${data}]`
    }

    // TODO: Check player permissions

    const nxTarget = await PlayerService.getPlayer(data.target)

    if (!nxTarget) {
      throw `Target: [${data.target}] not found.`
    }

    const expirationTimestamp = this.createExpirationDate(data.duration)

    const id = Utils.uuid('MEDIUM')
    const nxTargetIdentifier = nxTarget.GetIdentifier()

    const banData: Ban = {
      license: nxTargetIdentifier,
      bannedBy: 'niiyy',
      identifiers: getPlayerIdentifiers(data.target),
      reason: data.reason,
      id,
      date: this.msToS(),
      expire: expirationTimestamp,
    }

    try {
      const bansFile: Ban[] = JSON.parse(
        LoadResourceFile(GetCurrentResourceName(), 'config/nx.bans.json')
      )

      const alreadyExists = bansFile.find(
        (ban) => ban.license === nxTargetIdentifier
      )

      if (alreadyExists) {
        throw `Error while banning player: [${nxTargetIdentifier}]. already banned.`
      }

      bansFile.push(banData)

      SaveResourceFile(
        GetCurrentResourceName(),
        'config/nx.bans.json',
        JSON.stringify(bansFile, null, 2),
        -1
      )
      this.bans.set(id as string, banData)

      return banData
    } catch (error) {
      throw 'error'
    }
  }

  public async unbanPlayer(id: string): Promise<boolean> {
    try {
      const bansFile: Ban[] = JSON.parse(
        LoadResourceFile(GetCurrentResourceName(), 'config/nx.bans.json')
      )
      const newBansFile = bansFile.filter((ban: Ban) => ban.id !== id)
      SaveResourceFile(
        GetCurrentResourceName(),
        'config/nx.bans.json',
        JSON.stringify(newBansFile, null, 2),
        -1
      )
      this.bans.delete(id)

      return true
    } catch (error) {
      throw error
    }
  }

  public async checkUnban(license: string): Promise<boolean> {
    const player = this.findBanByLicense(license)
    const date = Date.now() / 1000

    if (!player) {
      throw 'Player not found'
    }

    if (player.expire < date) {
      try {
        await this.unbanPlayer(player.id)

        return true
      } catch (error) {
        throw `Error while trying to unban player [${license}]`
      }
    }

    return false
  }

  public init(): void {
    this.loadBans(bans)
  }
}

const BansService = new _BansService()
export { BansService }
