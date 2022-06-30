import Player from './player/player.service'
import Events from './events'
import './player/index'
import './items/index'
class Server {
  Players: typeof Player
  Events: typeof Events
  constructor() {
    this.Players = Player
    this.Events = Events
  }
}

const server = new Server()

globalThis.exports('useServer', () => {
  return {
    Players: {
      GetAll: server.Players.getPlayers.bind(server.Players),
      Get: server.Players.getPlayer.bind(server.Players),
    },

    Misc: {
      OnServerEvent: server.Events.onServerEvent.bind(server.Events),
    },
  }
})
