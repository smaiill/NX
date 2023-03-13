import { ExportMethod, ExportService } from '@decorators/Export'
import { ItemsService } from '@modules/items/items.service'
import {
  CodeColors,
  InventoryItem,
  NXPlayer,
  NXPlayerMethodsCapitalized,
  PlayerEvents,
} from '@nx/types'
import { _Player } from './player.class'
import { PlayerDB } from './player.db'
import { getPlayerMethods } from './player.methods'
import { PlayerError, PlayerLogger } from './player.misc'
import { PlayerUtils } from './player.utils'

@ExportService('Players')
class _PlayerService {
  private playersCollection: Map<number, NXPlayer>
  private playerDB: typeof PlayerDB

  constructor() {
    this.playersCollection = new Map()
    this.playerDB = PlayerDB

    // this.playersCollection.set(1, {identifier: 'a8ba95eb67cf3857bda530724b653569e42f8160'})
  }

  async findPlayer(source: number): Promise<NXPlayer | false> {
    const nxPlayer = await this.playersCollection.get(source)

    if (!nxPlayer) return false

    return nxPlayer
  }

  public async newPlayer(identifiers: string[], source: number): Promise<void> {
    const license = await PlayerUtils.getPlayerIdentifier(
      identifiers,
      'license',
    )

    if (!license) {
      throw new PlayerError('License not found !')
    }

    const player = await this.playerDB.getPlayerFromDB(license)

    if (!player) {
      return this.createPlayer(license, source)
    }

    this.loadPlayer(player, source)
  }

  private async unloadPlayer(source: number): Promise<void> {
    const nxPlayer = await this.findPlayer(source)

    if (!nxPlayer) return

    try {
      await this.playerDB.savePlayer(nxPlayer)
      PlayerLogger.info(`Player: [${nxPlayer.name}] saved with success.`)
      this.playersCollection.delete(source)
      emit(PlayerEvents.PLAYER_DROPPED, source)
    } catch (error) {
      PlayerLogger.error(
        `Error while saving player: [${GetPlayerName(
          source as unknown as string,
        )}] | ERROR: ${error}`,
      )
    }
  }

  @ExportMethod('SaveAll')
  public async savePlayers() {
    const start = Date.now()

    for (const nxPlayer of this.playersCollection) {
      this.playerDB.savePlayer(nxPlayer)
    }

    const duration = Date.now() - start
    PlayerLogger.info(
      `Saved all players in ${CodeColors.WHITE}[${duration}] ms`,
    )
  }

  private async loadPlayer(player: NXPlayer, source: number): Promise<void> {
    const nxPlayerData: {
      inventory: Record<string, InventoryItem>
      weight: number
    } = {
      inventory: {},
      weight: 0,
    }

    if (Object.getOwnPropertyNames(player.inventory).length > 0) {
      let itemsWeight = 0
      for (const property in player.inventory) {
        const item = ItemsService.isValidItem(property)
        if (item) {
          nxPlayerData.inventory[property] = {
            ...item,
            amount: Math.trunc(player.inventory[property].amount),
          }
          const itemWeight =
            player.inventory[property].amount *
            ItemsService.getItemWeight(property)

          itemsWeight += itemWeight
        }
      }

      nxPlayerData.weight = itemsWeight
    }

    const nxPlayer = new _Player(
      player.identifier,
      player.charinfo,
      nxPlayerData.inventory,
      player.accounts as unknown as Record<string, number>,
      player.position,
      player.group,
      nxPlayerData.weight,
      GetPlayerName(source.toString()),
      source,
      player.uid,
      player.skin,
    )

    // console.log(nxPlayer)

    this.playersCollection.set(source, nxPlayer)

    ItemsService.createMissingPickups(source)

    emitNet(PlayerEvents.PLAYER_LOADED, source, {
      accounts: nxPlayer.accounts,
      position: nxPlayer.position,
      identifier: nxPlayer.identifier,
      inventory: nxPlayer.inventory,
      charinfo: nxPlayer.charinfo,
      group: nxPlayer.group,
      uid: nxPlayer.uid,
      skin: nxPlayer.skin,
    })
  }

  public doesPlayerExist(identifier: string): NXPlayer | false {
    for (const [, player] of this.playersCollection) {
      if (player.identifier === identifier) {
        return player
      }
    }

    return false
  }

  public async playerDropped(source: number): Promise<void> {
    await this.unloadPlayer(source)
  }

  private async createPlayer(license: string, source: number): Promise<void> {
    const res = await this.playerDB.createPlayer(license)

    if (!res)
      return DropPlayer(
        source as unknown as string,
        'error while creating your data into the database.',
      )

    const player = await this.playerDB.getPlayerFromDB(license)

    await this.loadPlayer(player, source)

    const nxPlayer = await this.getPlayer(source)

    if (nxPlayer) {
      nxPlayer.EmitEvent(PlayerEvents.PLAYER_FIRST_CONNECTION, player)
    }
  }

  @ExportMethod('GetAll')
  public async getPlayers(): Promise<number[] | []> {
    const nxPlayersSources: number[] = []

    if (this.playersCollection.size > 0) {
      for (const [source] of this.playersCollection) {
        nxPlayersSources.push(source)
      }

      return nxPlayersSources
    }

    return nxPlayersSources
  }

  @ExportMethod('Get')
  public async getPlayer(
    source: number,
  ): Promise<NXPlayerMethodsCapitalized | false> {
    const nxPlayer = await this.findPlayer(source)

    if (!nxPlayer) return false

    return getPlayerMethods(nxPlayer)
  }

  @ExportMethod('GetAllData')
  public async getPlayersData(): Promise<NXPlayer[] | []> {
    const nxPlayersData: NXPlayer[] = []

    if (this.playersCollection.size > 0) {
      for (const [, player] of this.playersCollection) {
        nxPlayersData.push(player)
      }

      return nxPlayersData
    }

    return nxPlayersData
  }

  @ExportMethod('GetData')
  public async getPlayerData(source: number): Promise<NXPlayer | false> {
    const nxPlayer = await this.findPlayer(source)

    if (!nxPlayer) return false

    return nxPlayer
  }
}

const PlayerService = new _PlayerService()
export { PlayerService }
