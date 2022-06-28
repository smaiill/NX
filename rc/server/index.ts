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
import PlayerService from './player/player.service'

class Server {
  Players: typeof PlayerService
  constructor() {
    this.Players = PlayerService
  }
}

const server = new Server()

globalThis.exports('useServer', () => {
  return {
    getPlayers: server.Players.getPlayers.bind(server.Players),
  }
})
