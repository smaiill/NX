import { ItemsService } from '@items/items.service'
import {
  CodeColors,
  InventoryItem,
  NXPlayer,
  PlayerDataBase,
  PlayerEvents,
} from '@nx/types'
import { LG } from '@utils/logger'
import { _Player } from './player.class'
import { PlayerDB } from './player.db'
import { PlayerUtils } from './player.utils'

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
      'license'
    )

    if (!license) {
      throw 'License not found !'
    }

    const [player] = await this.playerDB.getPlayerFromDB(license)

    if (!player) return this.createPlayer(license, source)

    this.loadPlayer(player, source)
  }

  private async unloadPlayer(source: number): Promise<void> {
    const nxPlayer = await this.findPlayer(source)

    if (!nxPlayer) return

    try {
      await this.playerDB.savePlayer(nxPlayer)
      LG.info(`Player: [${nxPlayer.name}] saved with success.`)
      this.playersCollection.delete(source)
      emit(PlayerEvents.PLAYER_DROPPED, source)
    } catch (error) {
      LG.error(
        `Error while saving player: [${GetPlayerName(
          source as unknown as string
        )}] | ERROR: ${error}`
      )
    }
  }

  public async savePlayers() {
    const start = Date.now()

    for (const nxPlayer of this.playersCollection) {
      this.playerDB.savePlayer(nxPlayer)
    }

    const duration = Date.now() - start
    LG.info(`Saved all players in ${CodeColors.WHITE}[${duration}] ms`)
  }

  private async loadPlayer(
    player: PlayerDataBase,
    source: number
  ): Promise<void> {
    player.inventory = JSON.parse(player.inventory)
    player.accounts = JSON.parse(player.accounts)
    player.position = JSON.parse(player.position as unknown as string)
    player.skin = JSON.parse(player.skin)
    player.charinfo = JSON.parse(player.charinfo)

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
            amount: Math.trunc(player.inventory[property].amount),
            type: item.type,
            name: item.name,
            label: item.label,
            weight: item.weight,
            props: item.props,
            unique: item.unique,
            maxInSlot: item.maxInSlot,
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
      player.permissions,
      nxPlayerData.weight,
      GetPlayerName(source.toString()),
      source,
      player.uid,
      player.skin
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
      permissions: nxPlayer.permissions,
      uid: nxPlayer.uid,
      skin: nxPlayer.skin,
    })
  }

  public doesPlayerExist(identifier: string): NXPlayer | false {
    for (const [_, player] of this.playersCollection) {
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
        'error while creating your data into the database.'
      )

    const [player] = await this.playerDB.getPlayerFromDB(license)

    await this.loadPlayer(player, source)

    const nxPlayer = await this.getPlayer(source)

    if (nxPlayer) {
      nxPlayer.EmitEvent(PlayerEvents.PLAYER_FIRST_CONNECTION, player)
    }
  }

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

  public async getPlayer(source: number): Promise<any> {
    const nxPlayer = await this.findPlayer(source)

    if (!nxPlayer) return false

    return {
      GetName: nxPlayer.getName.bind(nxPlayer),
      GetIdentifier: nxPlayer.getIdentifier.bind(nxPlayer),
      GetAccountMoney: nxPlayer.getAccountMoney.bind(nxPlayer),
      GetCharInfo: nxPlayer.getCharInfo.bind(nxPlayer),
      GetCoords: nxPlayer.getCoords.bind(nxPlayer),
      GetWeight: nxPlayer.getWeight.bind(nxPlayer),
      GetMaxWeight: nxPlayer.getMaxWeight.bind(nxPlayer),
      GetInventory: nxPlayer.getInventory.bind(nxPlayer),
      GetAccounts: nxPlayer.getAccounts.bind(nxPlayer),
      GetPermissions: nxPlayer.getPermissions.bind(nxPlayer),
      GetBloodType: nxPlayer.getBloodType.bind(nxPlayer),
      GetThirst: nxPlayer.getThirst.bind(nxPlayer),
      GetHunger: nxPlayer.getHunger.bind(nxPlayer),
      GetJob: nxPlayer.getJob.bind(nxPlayer),
      GetJobs: nxPlayer.getJobs.bind(nxPlayer),
      GetUID: nxPlayer.getUID.bind(nxPlayer),
      SetCoords: nxPlayer.setCoords.bind(nxPlayer),
      SetJob: nxPlayer.setJob.bind(nxPlayer),
      SetPermissions: nxPlayer.setPermissions.bind(nxPlayer),
      SetThirst: nxPlayer.setThirst.bind(nxPlayer),
      SetHunger: nxPlayer.setHunger.bind(nxPlayer),
      SetCharInfoKey: nxPlayer.setCharInfoKey.bind(nxPlayer),
      SetAccountMoney: nxPlayer.setAccountMoney.bind(nxPlayer),
      HasItem: nxPlayer.hasItem.bind(nxPlayer),
      RemoveItem: nxPlayer.removeInventoryItem.bind(nxPlayer),
      AddItem: nxPlayer.addInventoryItem.bind(nxPlayer),
      EmitEvent: nxPlayer.emitEvent.bind(nxPlayer),
      Kick: nxPlayer.kick.bind(nxPlayer),
      Save: nxPlayer.save.bind(nxPlayer),
    }
  }

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

  public async getPlayerData(source: number): Promise<NXPlayer | false> {
    const nxPlayer = await this.findPlayer(source)

    if (!nxPlayer) return false

    return nxPlayer
  }
}

const PlayerService = new _PlayerService()
export { PlayerService }
