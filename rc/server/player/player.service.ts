import { _PlayerDB } from './player.db'
import { _PlayerUtils } from './player.utils'

class _PlayerService {
  PlayersCollection: any

  constructor() {
    this.PlayersCollection = {}
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

  async loadPlayer(player: any, source: number) {
    console.log('Load player !')
    this.PlayersCollection[source] = player

    console.log(this.PlayersCollection)
  }

  async createPlayer(license: string, source: number) {
    console.log('create player !')
    const [res] = await _PlayerDB.createPlayer(license)
    // ! CHECK THIS !
    // const [player] = await _PlayerDB.getPlayerFromDB(license)
    // this.loadPlayer(player, source)

    console.log(this.PlayersCollection)
  }

  async playerDropped(reason: string, source: number) {
    delete this.PlayersCollection[source]

    console.log(this.PlayersCollection)
  }

  async getPlayers() {
    return this.PlayersCollection
  }
}

// 644270566e360a57fd3810d581e6e46773250193

const PlayerService = new _PlayerService()
export default PlayerService
