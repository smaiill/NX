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
      const naPlayerData = Player.getPlayerData()

      Player.setStatus('thirst', parseFloat(naPlayerData.charinfo.thirst) - 0.4)
      Player.setStatus('hunger', parseFloat(naPlayerData.charinfo.hunger) - 0.4)

      emit(PlayerEventsE.STATUS_UPDATED, {
        hunger: naPlayerData.charinfo.hunger,
        thirst: naPlayerData.charinfo.thirst,
      })
      emitNet(PlayerEventsE.UPDATE_STATUS, {
        hunger: naPlayerData.charinfo.hunger,
        thirst: naPlayerData.charinfo.thirst,
      })
    }, 30_000)
  }
  syncPlayer() {
    this.syncPlayerCoords()
    this.syncPlayerStatus()
  }
}

const PlayerService = new _PlayerService()
export default PlayerService
