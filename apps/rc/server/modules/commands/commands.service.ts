import { PermissionsService } from '@modules/services/permissions.service'
import { PermissionsFlags } from '@nx/types'
import { LG } from '@utils/logger'
import { ExportMethod, ExportService } from 'decorators/Export'
import { PlayerService } from 'modules/player/player.service'

@ExportService('Commands')
class _CommandsServices {
  @ExportMethod()
  public async addCommand(
    name: string,
    cb: (source: number, args: unknown[]) => void,
    authFlags: PermissionsFlags[] = [],
  ) {
    if (!name || !cb) {
      LG.warn("Couldn't register a command name or callback was not provided")
      return
    }
    RegisterCommand(
      name,
      async (source: number, args: unknown[]): Promise<void> => {
        const nxPlayer = await PlayerService.getPlayer(source)

        if (!nxPlayer) return

        const hasPermissions = PermissionsService.doesGroupHasAllFlags({
          group: nxPlayer.GetGroup(),
          flags: authFlags,
        })

        if (!hasPermissions) {
          // DropPlayer(
          //   source as unknown as string,
          //   "You don't have group to execute this command !"
          // )
          LG.warn(
            `[${nxPlayer.GetName()}] tried to execute command [${name}] without having group.`,
          )
          return
        }

        cb(source, args)
      },
      false,
    )
  }
}

const CommandsServices = new _CommandsServices()
export { CommandsServices }
