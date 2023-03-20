import { PermissionsService } from '@modules/services/permissions.service'
import { PermissionsFlags } from '@nx/types'
import { LG } from '@utils/logger'
import { ExportMethod, ExportService } from 'decorators/Export'
import { PlayerService } from 'modules/player/player.service'

@ExportService('Commands')
class _CommandsServices {
  /**
   * Register a command
   * @param name The command name.
   * @param cb The callback to execute when the command is executed.
   * @param authFlags The permissions flags to have to execute the command.
   * @example
   * AddCommand('ping', (_src) => console.log(`pong from: ${_src}`), ['PLAYER_TALK'])
   */
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

        const hasPermissions = PermissionsService.doesGroupHasAllFlags(
          nxPlayer.GetGroup(),
          authFlags,
        )

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
