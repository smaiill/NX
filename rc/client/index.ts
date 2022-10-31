import './controllers'
import {
  Discord,
  Events,
  Input,
  LoadingBar,
  Menu,
  Misc,
  Notification,
  Object,
  Player,
  Timeline,
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
  Timeline: typeof Timeline
  Menu: typeof Menu
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
    this.Timeline = Timeline
    this.Menu = Menu
  }
}

const client = new Client()

globalThis.exports('useClient', () => {
  return {
    Player: {
      HasLoaded: client.Player.hasLoaded.bind(client.Player),
      GetData: client.Player.getData.bind(client.Player),
      GetValue: client.Player.getValue.bind(client.Player),
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
    Timeline: {
      Create: client.Timeline.create.bind(client.Timeline),
      Update: client.Timeline.update.bind(client.Timeline),
      Destroy: client.Timeline.destroy.bind(client.Timeline),
      IsActive: client.Timeline.isActive.bind(client.Timeline),
    },
    Menu: {
      Create: client.Menu.createMenu.bind(client.Menu),
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

setTimeout(() => {
  // Events.emitNuiEvent(    {
  //   app: 'NX::menu',
  //   method: 'NX::createMenu',
  //   data: {
  //     options: {
  //       title: 'Custom',
  //       banner:
  //         'https://thorntons-investments.co.uk/wp-content/uploads/2017/08/400x200.png',
  //       width: 400,
  //       // color: ''
  //     },
  //     items: [
  //       {
  //         type: 'BUTTON',
  //         label: 'CLick here',
  //       },
  //       {
  //         type: 'SLIDER',
  //         label: 'CLick here',
  //         max: 100,
  //         min: 5,
  //       },
  //       {
  //         type: 'CHECKBOX',
  //         label: 'CLick here',
  //       },
  //       {
  //         type: 'SEPARATOR',
  //         label: 'SEPARATOR',
  //       },
  //     ],
  //   },
  // })

  Menu.createMenu({
    options: {
      title: 'Custom',
      banner:
        'https://thorntons-investments.co.uk/wp-content/uploads/2017/08/400x200.png',
      width: 400,
    },
    items: [
      {
        type: 'BUTTON',
        label: 'CLick here',
      },
      {
        type: 'SLIDER',
        label: 'CLick here',
        max: 100,
        min: 5,
      },
      {
        type: 'SEPARATOR',
        label: 'SEPARATOR',
      },
      {
        type: 'CHECKBOX',
        label: 'CLick here',
      },
    ],
  })
}, 500)
