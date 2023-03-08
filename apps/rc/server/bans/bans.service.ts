import { Ban, PermissionsFlags, SavedBan } from '@nx/types'
import { PlayerService } from '@player/player.service'
import { uuid } from '@shared/utils/random'
import { LG } from '@utils/logger'
import { getSrc } from '@utils/src'
import { PermissionsService } from 'services/permissions.service'
import { BansDB } from './bans.db'
import { createBanSchema, CreateBanType } from './bans.schema'

class _BansService {
  private bans: Map<string, SavedBan>
  private readonly permaBanValue: number
  private db: typeof BansDB
  constructor() {
    this.bans = new Map()
    this.permaBanValue = 1740421649000 // ? Monday 24 February 2025 18:27:29
    this.db = BansDB
    this.init()
  }

  public fetchAll() {
    return this.bans
  }

  private loadBans(bans: SavedBan[]) {
    for (const ban of bans) {
      ban.identifiers = JSON.parse(ban.identifiers as unknown as string)
      this.bans.set(ban.id, ban)
    }
  }

  private findBanByLicense(license: string): SavedBan | false {
    const [isBanned] = [...this.bans.entries()]
      .filter(({ 1: ban }) => ban.license === license)
      .map(([, val]) => val)

    if (!isBanned) {
      return false
    }

    return isBanned
  }

  public isBanned(license: string): false | SavedBan {
    const isBanned = this.findBanByLicense(license)
    return isBanned
  }

  private msToS(date: Date = new Date()): number {
    const timestamp = date.getTime() / 1000
    return parseInt(timestamp.toString().split('.')[0])
  }

  private createExpirationDate(days: number): Date | number {
    if (days === 0) {
      return this.msToS(new Date(this.permaBanValue))
    }

    const date = new Date()
    date.setDate(date.getDate() + days)
    return this.msToS(date)
  }

  public async banPlayer(data: CreateBanType): Promise<Ban> {
    const res = createBanSchema.safeParse(data)
    const src = getSrc()

    if (!res.success) {
      throw 'Invalid data for to ban player.'
    }

    // TODO: Check player permissions
    const banAuthor = await PlayerService.getPlayer(src)

    if (!banAuthor) {
      throw 'Invalid ban author.'
    }

    const canBan = PermissionsService.doesGroupHasFlag({
      group: banAuthor.GetGroup(),
      flag: PermissionsFlags.PLAYER_BAN,
    })

    if (!canBan) {
      throw 'Invalid permissions to ban player.'
    }

    const nxTarget = await PlayerService.getPlayer(data.target)

    if (!nxTarget) {
      throw `Target: [${data.target}] not found.`
    }

    const expirationTimestamp = this.createExpirationDate(
      Number(data.duration ?? 0),
    )

    const id = uuid()
    const nxTargetIdentifier = nxTarget.GetIdentifier()

    const alreadyBan = this.findBanByLicense(nxTargetIdentifier)

    if (alreadyBan) {
      throw `The user with license: ${nxTargetIdentifier} is already banned`
    }

    const banData = {
      license: nxTargetIdentifier,
      bannedBy: 'niiyy',
      identifiers: getPlayerIdentifiers(data.target),
      reason: data.reason,
      id,
      expire: expirationTimestamp as number,
    } as Ban

    try {
      await this.db.create(banData)

      this.bans.set(id as string, {
        ...banData,
        date: new Date(),
      })

      return banData
    } catch (error) {
      throw `Cant ban player: ${error}`
    }
  }

  public async unbanPlayer(id: string): Promise<boolean> {
    try {
      await this.db.delete(id)
      this.bans.delete(id)

      return true
    } catch (error) {
      LG.error(`Couldn't unban player with ID: ${id}`)
      throw error
    }
  }

  public async checkUnban(license: string): Promise<boolean> {
    const player = this.findBanByLicense(license)
    const date = Date.now() / 1000

    if (!player) {
      throw 'Player not found'
    }

    if (new Date(player.expire).getTime() / 1000 < date) {
      try {
        await this.unbanPlayer(player.id)

        return true
      } catch (error) {
        throw `Error while trying to unban player [${license}]`
      }
    }

    return false
  }

  public async init(): Promise<void> {
    const bans = await this.db.fetchAll()

    this.loadBans(bans)
  }
}

const BansService = new _BansService()
export { BansService }
