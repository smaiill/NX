import { PlayerEventsE } from '../../types/events'
import Player from './player.class'

class _PlayerService {
  constructor() {}

  syncPlayerCoords() {
    setInterval(() => {
      const ped = PlayerPedId()
      const coords = GetEntityCoords(ped, false)
      const heading = GetEntityHeading(ped)
      emitNet(PlayerEventsE.UPDATE_COORDS, coords, heading)
    }, 3_000)
  }

  syncPlayerStatus() {
    setInterval(() => {
      const nxPlayerData = Player.getPlayerData()
      Player.setStatus('thirst', parseFloat(nxPlayerData.charinfo.thirst) - 0.4)
      Player.setStatus('hunger', parseFloat(nxPlayerData.charinfo.hunger) - 0.4)
    }, 30_000)
  }
  syncPlayer() {
    this.syncPlayerCoords()
    this.syncPlayerStatus()
  }
}

const PlayerService = new _PlayerService()
export default PlayerService