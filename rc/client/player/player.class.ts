import { PlayerEventsE } from '../../types/events'

class _Player {
  public loaded: boolean
  public playerData: any
  constructor() {
    this.loaded = false
    this.playerData = {}
  }

  public hasLoaded() {
    return this.loaded
  }

  public setPlayerData(data: any) {
    return (this.playerData = data)
  }

  public getPlayerData() {
    return this.playerData
  }

  public setValue(key: string, value: any) {
    return (this.playerData[key] = value)
  }

  public setStatus(key: string, value: number) {
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
