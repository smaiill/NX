class _Player {
  loaded: boolean
  constructor() {
    this.loaded = false
  }

  hasLoaded() {
    return this.loaded
  }
}

const Player = new _Player()
export default Player
