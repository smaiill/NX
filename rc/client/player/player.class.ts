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

    return (this.playerData.charinfo[key] = value)
  }
}

const Player = new _Player()
export default Player
