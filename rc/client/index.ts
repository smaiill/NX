import './controllers'
import {
  Discord,
  Events,
  Input,
  LoadingBar,
  Misc,
  Notification,
  Object,
  Player,
  Vehicle,
} from './services'

class Client {
  Vehicles: typeof Vehicle
  Objects: typeof Object
  Misc: typeof Misc
  EventsService: typeof Events
  Player: typeof Player
  Input: typeof Input
  Discord: typeof Discord
  Notification: typeof Notification
  LoadingBar: typeof LoadingBar
  constructor() {
    this.EventsService = Events
    this.Objects = Object
    this.Vehicles = Vehicle
    this.Misc = Misc
    this.Player = Player
    this.Input = Input
    this.Discord = Discord
    this.Notification = Notification
    this.LoadingBar = LoadingBar
  }
}

const client = new Client()

globalThis.exports('useClient', () => {
  return {
    Player: {
      HasLoaded: client.Player.hasLoaded.bind(client.Player),
      GetData: client.Player.getData.bind(client.Player),
      SetData: client.Player.setData.bind(client.Player),
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
    LoadingBar: {
      Create: client.LoadingBar.create.bind(client.LoadingBar),
      IsActive: client.LoadingBar.isActive.bind(client.LoadingBar),
    },
    Input: {
      Create: client.Input.create.bind(client.Input),
      IsActive: client.Input.isActive.bind(client.Input),
      Destroy: client.Input.destroy.bind(client.Input),
    },
    Misc: {
      DrawText3D: client.Misc.drawText3D.bind(client.Misc),
      RequestAnim: client.Misc.requestAnim.bind(client.Misc),
      CreatePed: client.Misc.createPed.bind(client.Misc),
      CreateNotification: client.Notification.create.bind(client.Notification),
      EmitServerEvent: client.EventsService.emitServerEvent.bind(
        client.EventsService
      ),
    },
  }
})
