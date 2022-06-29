import { _Object } from './class/object'
import { _Vehicle } from './class/vehicle'
import { _Misc } from './class/misc'
import Events from './events'
import './main'

class Client {
  Vehicles: _Vehicle
  Objects: _Object
  Misc: _Misc
  Events: typeof Events
  constructor() {
    this.Events = Events
    this.Objects = new _Object()
    this.Vehicles = new _Vehicle()
    this.Misc = new _Misc()
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
      Keyboard: client.Misc.keyboard.bind(client.Misc),
    },
  }
})
