import { PlayerEventsE } from '../../types/events'
import Player from './player.class'

class _PlayerService {
  constructor() {}

  private syncCoords(): void {
    setInterval(() => {
      const ped = Player.getValue('ped')
      const coords = GetEntityCoords(ped, false)
      const heading = GetEntityHeading(ped)
      emitNet(PlayerEventsE.UPDATE_COORDS, coords, heading)
    }, 3_000)
  }

  private syncStatus(): void {
    setInterval(() => {
      const nxPlayerData = Player.getData()
      Player.setStatus('thirst', parseFloat(nxPlayerData.charinfo.thirst) - 0.4)
      Player.setStatus('hunger', parseFloat(nxPlayerData.charinfo.hunger) - 0.4)
    }, 250)
  }

  public setPlayerLoadedData(nxPlayer: any) {
    Player.setData(nxPlayer)
    Player.setValue('ped', PlayerPedId())
    Player.loaded = true
  }

  public syncPlayer(): void {
    this.syncCoords()
    this.syncStatus()
  }
}

const PlayerService = new _PlayerService()
export default PlayerService
