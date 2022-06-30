import { _PlayerDB } from './player.db'
import { _PlayerUtils } from './player.utils'
import { PlayerI } from '../../types/player'
import _Player from './player.class'
import { PlayerEventsE } from '../../types/events'
import _ItemsService from '../items/items.service'
import { logger } from '../utils/logger'

class _PlayerService {
  PlayersCollection: any[]

  constructor() {
    this.PlayersCollection = []
  }

  async newPlayer(identifiers: string[], source: number) {
    const license = await _PlayerUtils.getPlayerLicense(identifiers)
    if (!license) return
    const [player] = await _PlayerDB.getPlayerFromDB(license)
    if (player) {
      this.loadPlayer(player, source)
    } else {
      this.createPlayer(license, source)
    }
  }

  private async unloadPlayer(source: number) {
    const naPlayer = this.PlayersCollection.find(
      (player) => player.source === source
    )

    _PlayerDB
      .savePlayer(naPlayer)
      .then(() => {
        logger.info(`Player saved.`)
        this.PlayersCollection = this.PlayersCollection.filter(
          (player) => player.source !== source
        )
        console.log(this.PlayersCollection)
      })
      .catch(() => {
        logger.error(`Error while saving player.`)
      })
  }

  private async loadPlayer(player: PlayerI, source: number) {
    player.charinfo = JSON.parse(player.charinfo)
    player.inventory = JSON.parse(player.inventory)
    player.accounts = JSON.parse(player.accounts)
    player.position = JSON.parse(player.position)

    const naPlayerData: any = {
      inventory: {},
      weight: 0,
    }

    if (Object.getOwnPropertyNames(player.inventory).length > 0) {
      let itemsWeight = 0
      for (const property in player.inventory) {
        const item = _ItemsService.isValidItem(property)
        if (item) {
          naPlayerData.inventory[property] = Math.floor(
            player.inventory[property]
          )

          const itemWeight =
            player.inventory[property] * _ItemsService.getItemWeight(property)

          itemsWeight += itemWeight
        }
      }

      naPlayerData.weight = itemsWeight
    }

    const naPlayer = new _Player(
      player.identifier,
      player.charinfo,
      naPlayerData.inventory,
      player.accounts,
      player.position,
      player.permissions,
      naPlayerData.weight,
      GetPlayerName(source.toString()),
      source
    )

    this.PlayersCollection.push(naPlayer)

    emitNet(PlayerEventsE.PLAYER_LOADED, source, {
      accounts: naPlayer.accounts,
      position: naPlayer.position,
      identifier: naPlayer.identifier,
      inventory: naPlayer.inventory,
      charinfo: naPlayer.charinfo,
      permissions: naPlayer.permissions,
      skin: player.skin ?? {},
    })
  }

  async playerDropped(reason: string, source: number) {
    await this.unloadPlayer(source)
  }

  private async createPlayer(license: string, source: number) {
    const res = await _PlayerDB.createPlayer(license)
    if (res) {
      const [player] = await _PlayerDB.getPlayerFromDB(license)
      await this.loadPlayer(player, source)
    }
  }

  async getPlayers(): Promise<number[] | []> {
    const naPlayersSources: number[] = []

    if (this.PlayersCollection.length > 0) {
      this.PlayersCollection.forEach((naPlayer) => {
        naPlayersSources.push(naPlayer.source)
      })

      return naPlayersSources
    }

    return []
  }

  async getPlayer(source: number) {
    const naPlayer = this.PlayersCollection.find(
      (player) => player.source === source
    )

    if (!naPlayer) {
      return false
    }

    return {
      data: naPlayer,
      GetName: naPlayer.getName.bind(naPlayer),
      GetIdentifier: naPlayer.getIdentifier.bind(naPlayer),
      GetAccountMoney: naPlayer.getAccountMoney.bind(naPlayer),
      GetCharInfo: naPlayer.getCharInfo.bind(naPlayer),
      GetCoords: naPlayer.getCoords.bind(naPlayer),
      GetWeight: naPlayer.getWeight.bind(naPlayer),
      GetInventory: naPlayer.getInventory.bind(naPlayer),
      GetAccounts: naPlayer.getAccounts.bind(naPlayer),
      GetPermissions: naPlayer.getPermissions.bind(naPlayer),
      GetInventoryItem: naPlayer.getInventoryItem.bind(naPlayer),
      SetCoords: naPlayer.setCoords.bind(naPlayer),
      HasItem: naPlayer.hasItem.bind(naPlayer),
      RemoveInventoryItem: naPlayer.removeInventoryItem.bind(naPlayer),
    }
  }
}

// 644270566e360a57fd3810d581e6e46773250193

const PlayerService = new _PlayerService()
export default PlayerService
