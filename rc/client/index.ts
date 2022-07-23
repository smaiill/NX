import './player'
import './items'
import './events'
import Object from 'c@class/object'
import Vehicle from 'c@class/vehicle'
import Misc from 'c@class/misc'
import Events from './events/events.service'
import Player from './player/player.class'

class Client {
  Vehicles: typeof Vehicle
  Objects: typeof Object
  Misc: typeof Misc
  EventsService: typeof Events
  Player: typeof Player
  constructor() {
    this.EventsService = Events
    this.Objects = Object
    this.Vehicles = Vehicle
    this.Misc = Misc
    this.Player = Player
  }
}

const client = new Client()

globalThis.exports('useClient', () => {
  return {
    Player: {
      HasLoaded: client.Player.hasLoaded.bind(client.Player),
      GetPlayerData: client.Player.getPlayerData.bind(client.Player),
      SetPlayerData: client.Player.setPlayerData.bind(client.Player),
    },
    Vehicles: {
      Create: client.Vehicles.create.bind(client.Vehicles),
      Random: client.Vehicles.random.bind(client.Vehicles),
      Repair: client.Vehicles.repair.bind(client.Vehicles),
      Delete: client.Vehicles.delete.bind(client.Vehicles),
    },
    Objects: {
      Create: client.Objects.create.bind(client.Objects),
      Delete: client.Objects.delete.bind(client.Objects),
    },
    Misc: {
      DrawText3D: client.Misc.drawText3D.bind(client.Misc),
      RequestAnim: client.Misc.requestAnim.bind(client.Misc),
      CreatePed: client.Misc.createPed.bind(client.Misc),
      EmitServerEvent: client.EventsService.emitServerEvent.bind(
        client.EventsService
      ),
    },
  }
})

setTimeout(() => {
  SendNuiMessage(
    JSON.stringify({
      app: 'NX::input',
      method: 'NX::createInput',
      data: {
        title: 'Set group',
        rows: [
          {
            label: 'Name',
            id: 'name',
          },
          {
            label: 'Amount',
            id: 'amount',
          },
        ],
      },
    })
  )
}, 1000)

setTimeout(() => {
  SendNuiMessage(
    JSON.stringify({
      app: 'NX::notification',
      method: 'NX::createNotification',
      data: {
        type: 'SUCCES',
        duration: 200,
        body: {
          content: 'SUCCES',
        },
      },
    })
  )
}, 500)

setTimeout(() => {
  SendNuiMessage(
    JSON.stringify({
      app: 'NX::notification',
      method: 'NX::createNotification',
      data: {
        type: 'ERROR',
        duration: 200,
        body: {
          content: 'ERROR',
        },
      },
    })
  )
}, 1000)

setTimeout(() => {
  SendNuiMessage(
    JSON.stringify({
      app: 'NX::notification',
      method: 'NX::createNotification',
      data: {
        type: 'WARN',
        duration: 200,
        body: {
          content: 'WARN',
        },
      },
    })
  )
}, 2000)

setTimeout(() => {
  SendNuiMessage(
    JSON.stringify({
      app: 'NX::notification',
      method: 'NX::createNotification',
      data: {
        type: 'NORMAL',
        duration: 200,
        body: {
          content: 'NORMAL',
        },
      },
    })
  )
}, 2000)
