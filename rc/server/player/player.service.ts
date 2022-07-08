import { _PlayerDB } from './player.db'
import { _PlayerUtils } from './player.utils'
import _Player from './player.class'
import { PlayerEventsE } from '../../types/events'
import _ItemsService from '../items/items.service'
import { logger } from '../utils/logger'

class _PlayerService {
  PlayersCollection: any[]

  constructor() {
    this.PlayersCollection = []
  }

  async newPlayer(identifiers: string[], source: number): Promise<void> {
    const license = await _PlayerUtils.getPlayerLicense(identifiers)
    if (!license) return
    const [player] = await _PlayerDB.getPlayerFromDB(license)
    if (player) {
      this.loadPlayer(player, source)
    } else {
      this.createPlayer(license, source)
    }
  }

  private async unloadPlayer(source: number): Promise<void> {
    const naPlayer = this.PlayersCollection.find(
      (player) => player.source === source
    )

    _PlayerDB
      .savePlayer(naPlayer)
      .then(() => {
        logger.info(`Player: [${naPlayer.name}] saved with succes.`)
        this.PlayersCollection = this.PlayersCollection.filter(
          (player) => player.source !== source
        )
      })
      .catch((error: any) => {
        logger.error(
          `Error while saving player: [${GetPlayerName(
            source as unknown as string
          )}]`
        )
      })
  }

  private async loadPlayer(player: any, source: number): Promise<void> {
    player.charinfo = JSON.parse(player.charinfo)
    player.accounts = JSON.parse(player.accounts)
    player.position = JSON.parse(player.position)

    if (player.inventory) {
      player.inventory = JSON.parse(player.inventory)
    }

    const naPlayerData: any = {
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
        const item = _ItemsService.isValidItem(property)
        if (item) {
          naPlayerData.inventory[property] = {
            amount: ~~player.inventory[property].amount,
            type: item.type,
          }
          const itemWeight =
            player.inventory[property].amount *
            _ItemsService.getItemWeight(property)

          itemsWeight += itemWeight
        }
      }

      naPlayerData.weight = itemsWeight
    }

    if (player.skin) {
      naPlayerData.skin = JSON.parse(player.skin)
    } else {
      if (player.charinfo.sex === 'female') {
        naPlayerData.skin = { sex: 1 }
      } else {
        naPlayerData.skin = { sex: 0 }
      }
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
      skin: naPlayerData.skin,
    })

    _ItemsService.createMissingPickups(source)
  }

  async playerDropped(reason: string, source: number): Promise<void> {
    await this.unloadPlayer(source)
  }

  private async createPlayer(license: string, source: number): Promise<void> {
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

  async getPlayer(source: number): Promise<any> {
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
      GetJob: naPlayer.getJob.bind(naPlayer),
      GetInventoryItem: naPlayer.getInventoryItem.bind(naPlayer),
      SetCoords: naPlayer.setCoords.bind(naPlayer),
      SetJob: naPlayer.setJob.bind(naPlayer),
      HasItem: naPlayer.hasItem.bind(naPlayer),
      RemoveItem: naPlayer.removeInventoryItem.bind(naPlayer),
      AddItem: naPlayer.addInventoryItem.bind(naPlayer),
      EmitEvent: naPlayer.emitEvent.bind(naPlayer),
    }
  }
}

const PlayerService = new _PlayerService()
export default PlayerService
