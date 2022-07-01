import './main'
import Object from './class/object'
import Vehicle from './class/vehicle'
import Misc from './class/misc'
import Events from './events'
import Player from './player/player.class'

class Client {
  Vehicles: typeof Vehicle
  Objects: typeof Object
  Misc: typeof Misc
  Events: typeof Events
  Player: typeof Player
  constructor() {
    this.Events = Events
    this.Objects = Object
    this.Vehicles = Vehicle
    this.Misc = Misc
    this.Player = Player
  }
}

const client = new Client()

globalThis.exports('useClient', () => {
  return {
    Vehicles: {
      Create: client.Vehicles.create.bind(client.Vehicles),
      Random: client.Vehicles.random.bind(client.Vehicles),
      Repair: client.Vehicles.repair.bind(client.Vehicles),
      Delete: client.Vehicles.delete.bind(client.Vehicles),
    },
    Object: {
      Create: client.Objects.create.bind(client.Objects),
      Delete: client.Objects.delete.bind(client.Objects),
    },
    Misc: {
      CreatePed: client.Misc.createPed.bind(client.Misc),
      EmitServerEvent: client.Events.emitServerEvent.bind(client.Events),
    },
  }
})
