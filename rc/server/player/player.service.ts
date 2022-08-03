import { PlayerEventsE } from '../../types/events'
import _Player from './player.class'
import { _PlayerDB } from './player.db'
import PlayerUtils from './player.utils'
import ItemsService from 's@items/items.service'
import { logger } from 's@utils/logger'

class _PlayerService {
  private PlayersCollection: any[]

  constructor() {
    this.PlayersCollection = []
  }

  async findPlayer(source: number): Promise<any> {
    const nxPlayer = await this.PlayersCollection.find(
      (player) => player.source === source
    )

    if (nxPlayer) {
      return nxPlayer
    }

    return false
  }

  public async newPlayer(identifiers: string[], source: number): Promise<void> {
    const license = await PlayerUtils.getPlayerLicense(identifiers)
    const [player] = await _PlayerDB.getPlayerFromDB(license)
    if (player) {
      this.loadPlayer(player, source)
    } else {
      this.createPlayer(license, source)
    }
  }

  private async unloadPlayer(source: number): Promise<void> {
    const nxPlayer = await this.findPlayer(source)

    if (!nxPlayer) return

    _PlayerDB
      .savePlayer(nxPlayer)
      .then(() => {
        logger.info(`Player: [${nxPlayer.name}] saved with succes.`)
        this.PlayersCollection = this.PlayersCollection.filter(
          (player) => player.source !== source
        )
        emit(PlayerEventsE.PLAYER_DROPPED, source)
      })
      .catch((error: any) => {
        logger.error(
          `Error while saving player: [${GetPlayerName(
            source as unknown as string
          )}]`
        )
      })
  }

  public async savePlayers() {
    for (const nxPlayer of this.PlayersCollection) {
      _PlayerDB.savePlayer(nxPlayer)
    }

    logger.info(`Saved all players.`)
  }

  private async loadPlayer(player: any, source: number): Promise<void> {
    player.charinfo = JSON.parse(player.charinfo)
    player.accounts = JSON.parse(player.accounts)
    player.position = JSON.parse(player.position)

    if (player.inventory) {
      player.inventory = JSON.parse(player.inventory)
    }

    const nxPlayerData: any = {
      inventory: {},
      skin: {},
      weight: 0,
    }

    if (
      player.inventory &&
      Object.getOwnPropertyNames(player.inventory).length > 0
    ) {
      let itemsWeight = 0
      for (const property in player.inventory) {
        const item = ItemsService.isValidItem(property)
        if (item) {
          nxPlayerData.inventory[property] = {
            amount: ~~player.inventory[property].amount,
            type: item.type,
          }
          const itemWeight =
            player.inventory[property].amount *
            ItemsService.getItemWeight(property)

          itemsWeight += itemWeight
        }
      }

      nxPlayerData.weight = itemsWeight
    }

    if (player.skin) {
      nxPlayerData.skin = JSON.parse(player.skin)
    } else {
      if (player.charinfo.sex === 'female') {
        nxPlayerData.skin = { sex: 1 }
      } else {
        nxPlayerData.skin = { sex: 0 }
      }
    }

    const nxPlayer = new _Player(
      player.identifier,
      player.charinfo,
      nxPlayerData.inventory,
      player.accounts,
      player.position,
      player.permissions,
      nxPlayerData.weight,
      GetPlayerName(source.toString()),
      source
    )
    this.PlayersCollection.push(nxPlayer)

    emitNet(PlayerEventsE.PLAYER_LOADED, source, {
      accounts: nxPlayer.accounts,
      position: nxPlayer.position,
      identifier: nxPlayer.identifier,
      inventory: nxPlayer.inventory,
      charinfo: nxPlayer.charinfo,
      permissions: nxPlayer.permissions,
      skin: nxPlayerData.skin,
    })

    ItemsService.createMissingPickups(source)
  }

  public async doesPlayerExist(identifier: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const nxPlayer = await this.PlayersCollection.find(
        (player) => player.identifier === identifier
      )

      if (nxPlayer) return reject(nxPlayer)

      resolve('')
    })
  }

  public async playerDropped(reason: string, source: number): Promise<void> {
    await this.unloadPlayer(source)
  }

  private async createPlayer(license: string, source: number): Promise<void> {
    const res = await _PlayerDB.createPlayer(license)
    if (res) {
      const [player] = await _PlayerDB.getPlayerFromDB(license)
      await this.loadPlayer(player, source)
    }
  }

  public async getPlayers(): Promise<number[] | []> {
    const nxPlayersSources: number[] = []

    if (this.PlayersCollection.length > 0) {
      this.PlayersCollection.forEach((nxPlayer) => {
        nxPlayersSources.push(nxPlayer.source)
      })

      return nxPlayersSources
    }

    return []
  }

  public async getPlayer(source: number): Promise<any> {
    const nxPlayer = await this.findPlayer(source)

    if (!nxPlayer) {
      return false
    }

    return {
      data: nxPlayer,
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
      GetInventoryItem: nxPlayer.getInventoryItem.bind(nxPlayer),
      SetCoords: nxPlayer.setCoords.bind(nxPlayer),
      SetJob: nxPlayer.setJob.bind(nxPlayer),
      SetThirst: nxPlayer.setThirst.bind(nxPlayer),
      SetHunger: nxPlayer.setHunger.bind(nxPlayer),
      HasItem: nxPlayer.hasItem.bind(nxPlayer),
      RemoveItem: nxPlayer.removeInventoryItem.bind(nxPlayer),
      AddItem: nxPlayer.addInventoryItem.bind(nxPlayer),
      EmitEvent: nxPlayer.emitEvent.bind(nxPlayer),
      Kick: nxPlayer.kick.bind(nxPlayer),
      Save: nxPlayer.save.bind(nxPlayer),
    }
  }
}

const PlayerService = new _PlayerService()
export default PlayerService
