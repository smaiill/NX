import { PlayerEventsE } from '../../types/events'
import Logger from '../utils/logger'

class _Player {
  loaded: boolean
  playerData: any
  constructor() {
    this.loaded = false
    this.playerData = {}
  }

  hasLoaded() {
    return this.loaded
  }

  setPlayerData(data: any) {
    return (this.playerData = data)
  }

  getPlayerData() {
    return this.playerData
  }

  setValue(key: string, value: any) {
    return (this.playerData[key] = value)
  }

  setStatus(key: string, value: number) {
    if (key !== 'hunger' && key !== 'thirst') {
      return
    }

    if (value > 100) value = 100

    this.playerData.charinfo[key] = value

    emit(PlayerEventsE.STATUS_UPDATED, {
      hunger: this.playerData.charinfo.hunger,
      thirst: this.playerData.charinfo.thirst,
    })

    emitNet(PlayerEventsE.UPDATE_STATUS, {
      hunger: this.playerData.charinfo.hunger,
      thirst: this.playerData.charinfo.thirst,
    })
  }
}

const Player = new _Player()
export default Player
