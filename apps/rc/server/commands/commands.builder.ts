import { PermissionsFlags } from '@nx/types'
import { LG } from '@utils/logger'
import { CommandsServices } from './commands.service'

type CB = (source: number, args: unknown[]) => void
type NullishCB = null | CB

export class CommandBuilder {
  private name: string | null
  private cb: NullishCB
  private authPermissions: string[] | null
  private _cmdServices: typeof CommandsServices
  constructor() {
    this.name = null
    this.cb = null
    this.authPermissions = null
    this._cmdServices = CommandsServices
  }

  public setName(name: string) {
    this.name = name

    return this
  }

  public setHandler(cb: (source: number, args: unknown[]) => void) {
    this.cb = cb

    return this
  }

  public setPermissions(permissions: string[]) {
    this.authPermissions = permissions

    return this
  }

  public async build() {
    const isValid = await this.validateCommand()

    if (!isValid) {
      LG.error("Couldn't create the command, inavlid command.")
    }

    this._cmdServices.addCommand(
      this.name as unknown as string,
      this.cb as unknown as CB,
      this.authPermissions as unknown as PermissionsFlags[],
    )
  }

  private validateCommand() {
    if (!this.name || (this.name && this.name.length < 0)) {
      LG.error('Invalid name for building command use: setName(commandName)')
      return false
    }

    if (!this.authPermissions || !Array.isArray(this.authPermissions)) {
      LG.error(
        'Invalid permissions for building command use: setPermissions(permissions)',
      )
      return false
    }

    if (!this.cb || typeof this.cb !== 'function') {
      LG.error('Invalid callback for building command use: setHandler(handler)')
      return false
    }

    return true
  }
}
