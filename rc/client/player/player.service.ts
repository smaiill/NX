import { PlayerEventsE } from '../../types/events'

class _PlayerService {
  constructor() {}

  syncPlayer() {
    setInterval(() => {
      const ped = PlayerPedId()
      const coords = GetEntityCoords(ped, false)
      const heading = GetEntityHeading(ped)
      emitNet(PlayerEventsE.UPDATE_COORDS, coords, heading)
    }, 3_000)
  }
}

const PlayerService = new _PlayerService()
export default PlayerService
