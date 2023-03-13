// organize-imports-ignore
import 'reflect-metadata'
import './translation'
import './modules/bans'
import './modules/boot'
import { CommandsServices } from './modules/commands/commands.service'
import './modules/discord'
import { EventsService } from './modules/events/events.service'
import './modules/items'
import { ItemsService } from './modules/items/items.service'
import './modules/player'
import { PlayerService } from './modules/player/player.service'
import { DecoratorsTokens } from '@nx/types'
import { LG } from '@utils/logger'
import { _export } from 'globals'
import { PermissionsService } from '@modules/services/permissions.service'

class Server {
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
    _export('useServer', () => this._services)
  }
}

new Server()
  .addModule(CommandsServices)
  .addModule(PermissionsService)
  .addModule(EventsService)
  .addModule(ItemsService)
  .addModule(PlayerService)
  .exportAll()
