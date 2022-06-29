import { _PlayerDB } from './player.db'
import { _PlayerUtils } from './player.utils'
import { PlayerI } from '../../types/player'
import _Player from './player.class'
import { PlayerEventsE } from '../../types/events'

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
    console.log(naPlayer)
    return (this.PlayersCollection = this.PlayersCollection.filter(
      (player) => player.source !== source
    ))
  }

  private async loadPlayer(player: PlayerI, source: number) {
    const naPlayer = new _Player(
      player.identifier,
      JSON.parse(player.charinfo),
      JSON.parse(player.inventory),
      JSON.parse(player.accounts),
      JSON.parse(player.position),
      player.permissions,
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

    console.log(this.PlayersCollection)
  }

  async playerDropped(reason: string, source: number) {
    await this.unloadPlayer(source)
  }

  private async createPlayer(license: string, source: number) {
    console.log('create player !')
    const res = await _PlayerDB.createPlayer(license)
    if (res) {
      const [player] = await _PlayerDB.getPlayerFromDB(license)
      await this.loadPlayer(player, source)
    }
  }

  async getPlayers() {
    return this.PlayersCollection
  }

  async getPlayer(source: number) {
    const naPlayer = this.PlayersCollection.find(
      (player) => player.source === source
    )

    return {
      data: naPlayer,
      GetName: naPlayer.getName.bind(naPlayer),
      GetIdentifier: naPlayer.getIdentifier.bind(naPlayer),
      GetAccountMoney: naPlayer.getAccountMoney.bind(naPlayer),
      GetCharInfo: naPlayer.getCharInfo.bind(naPlayer),
    }
  }
}

// 644270566e360a57fd3810d581e6e46773250193

const PlayerService = new _PlayerService()

export default PlayerService
