// globalThis.exports('useClient', () => {
//   return {
//     Player: {
//       HasLoaded: client.Player.hasLoaded.bind(client.Player),
//       GetData: client.Player.getData.bind(client.Player),
//       GetValue: client.Player.getValue.bind(client.Player),
//     },
//     Vehicles: {
//       Create: client.Vehicles.create.bind(client.Vehicles),
//       Random: client.Vehicles.random.bind(client.Vehicles),
//       Repair: client.Vehicles.repair.bind(client.Vehicles),
//       Delete: client.Vehicles.delete.bind(client.Vehicles),
//     },
//     Objects: {
//       Create: client.Objects.create.bind(client.Objects),
//       Delete: client.Objects.delete.bind(client.Objects),
//     },
//     LoadingBar: {
//       Create: client.LoadingBar.create.bind(client.LoadingBar),
//       IsActive: client.LoadingBar.isActive.bind(client.LoadingBar),
//     },
//     Input: {
//       Create: client.Input.create.bind(client.Input),
//       IsActive: client.Input.isActive.bind(client.Input),
//       Destroy: client.Input.destroy.bind(client.Input),
//     },
//     Timeline: {
//       Create: client.Timeline.create.bind(client.Timeline),
//       Update: client.Timeline.update.bind(client.Timeline),
//       Destroy: client.Timeline.destroy.bind(client.Timeline),
//       IsActive: client.Timeline.isActive.bind(client.Timeline),
//     },
//     Menu: {
//       Create: client.Menu.createMenu.bind(client.Menu),
//     },
//     Misc: {
//       DrawText3D: client.Misc.drawText3D.bind(client.Misc),
//       RequestAnim: client.Misc.requestAnim.bind(client.Misc),
//       CreatePed: client.Misc.createPed.bind(client.Misc),
//       CreateNotification: client.Notification.create.bind(client.Notification),
//       EmitServerEvent: client.EventsService.emitServerEvent.bind(
//         client.EventsService,
//       ),
//     },
//   }
// })

// organize-imports-ignore
import 'reflect-metadata'
import { DecoratorsTokens } from '@nx/types'
import { _export } from '@shared/_export'
import { LG } from '@utils/logger'
import './controllers'
import {
  Events,
  Input,
  LoadingBar,
  Menu,
  Notification,
  Player,
  Timeline,
} from './services'

class Client {
  private _services: { [key: string]: any }

  constructor() {
    this._services = {}
  }

  private exportModule(service: object) {
    const serviceMethods = Reflect.getMetadata(
      DecoratorsTokens.__EXPORTED_METHODS,
      service,
    )
    const serviceName = Reflect.getMetadata(
      DecoratorsTokens.__SERVICE_NAME,
      service,
    )

    if (!serviceName) {
      return LG.error(
        'You are trying to export a service without having a name',
      )
    }

    if (serviceMethods.length === 0) {
      return LG.error(
        `You are trying to export the following service: [${serviceName}] without methods !`,
      )
    }

    const methods = {} as { [key: string]: any }

    for (const method of serviceMethods) {
      methods[method.capitalizedName] = method.value.bind(service)
    }

    _export(`use${serviceName}`, () => methods)
    this._services[serviceName] = { ...methods }
  }

  public addModule(service: object) {
    this.exportModule(service)

    return this
  }

  public exportAll() {
    _export('useClient', () => this._services)
  }
}

new Client()
  .addModule(Events)
  .addModule(Input)
  .addModule(LoadingBar)
  .addModule(Menu)
  .addModule(Notification)
  .addModule(Player)
  .addModule(Timeline)
  .exportAll()
