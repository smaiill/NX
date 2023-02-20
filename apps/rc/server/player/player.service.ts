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
  private playersCollection: NXPlayer[]
  private playerDB: typeof PlayerDB

  constructor() {
    this.playersCollection = []
    this.playerDB = PlayerDB
  }

  async findPlayer(source: number): Promise<NXPlayer | false> {
    const nxPlayer = await this.playersCollection.find(
      (player) => player.source === source
    )

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

    this.playerDB
      .savePlayer(nxPlayer)
      .then(() => {
        LG.info(`Player: [${nxPlayer.name}] saved with success.`)
        this.playersCollection = this.playersCollection.filter(
          (player) => player.source !== source
        )
        emit(PlayerEvents.PLAYER_DROPPED, source)
      })
      .catch((error: any) => {
        LG.error(
          `Error while saving player: [${GetPlayerName(
            source as unknown as string
          )}] | ERROR: ${error}`
        )
      })
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
    player.charinfo = JSON.parse(player.charinfo)
    player.accounts = JSON.parse(player.accounts)
    player.position = JSON.parse(player.position)
    player.inventory && (player.inventory = JSON.parse(player.inventory))

    const nxPlayerData: {
      inventory: Record<string, InventoryItem>
      skin: any
      weight: number
    } = {
      inventory: {},
      skin: {},
      weight: 0,
    }

    // TODO: Put this on player.utils.ts
    if (
      player.inventory &&
      Object.getOwnPropertyNames(player.inventory).length > 0
    ) {
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

    const skin = PlayerUtils.loadPlayerSkin(player.skin, player.charinfo.sex)
    nxPlayerData.skin = skin

    const nxPlayer = new _Player(
      player.identifier,
      player.charinfo,
      nxPlayerData.inventory,
      player.accounts,
      player.position,
      player.permissions,
      nxPlayerData.weight,
      GetPlayerName(source.toString()),
      source,
      player.uid
    )

    this.playersCollection.push(nxPlayer)

    ItemsService.createMissingPickups(source)

    emitNet(PlayerEvents.PLAYER_LOADED, source, {
      accounts: nxPlayer.accounts,
      position: nxPlayer.position,
      identifier: nxPlayer.identifier,
      inventory: nxPlayer.inventory,
      charinfo: nxPlayer.charinfo,
      permissions: nxPlayer.permissions,
      uid: nxPlayer.uid,
      skin: nxPlayerData.skin,
    })
  }

  public async doesPlayerExist(identifier: string): Promise<NXPlayer> {
    try {
      const nxPlayer = await this.playersCollection.find(
        (player) => player.identifier === identifier
      )

      if (!nxPlayer) {
        throw 'Player not found !'
      }

      return nxPlayer
    } catch (error) {
      throw error
    }
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

    if (this.playersCollection.length > 0) {
      for (const player of this.playersCollection) {
        nxPlayersSources.push(player.source)
      }

      return nxPlayersSources
    }

    return nxPlayersSources
  }

  public async getPlayer(source: number): Promise<any | false> {
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

    if (this.playersCollection.length > 0) {
      for (const player of this.playersCollection) {
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
