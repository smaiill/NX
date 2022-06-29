// import { logger } from "./utils/logger";

// class Server {
//     constructor() {}

// }

// import mysql from 'mysql2';

// // create the connection to database

// globalThis.exports('useServer', () => {
//     const server = new Server()

//     return {}
// })
import './player/index'
import Player from './player/player.service'
import Events from './events'

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
      GetPlayers: server.Players.getPlayers.bind(server.Players),
      GetPlayer: server.Players.getPlayer.bind(server.Players),
    },
  }
})
