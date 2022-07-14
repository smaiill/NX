import PlayerService from 's@player/player.service'
import { logger } from 's@utils/logger'

class _CommandsServices {
  constructor() {}

  public async addCommand(
    name: string,
    cb: Function,
    authPermissions: string[] = ['user']
  ) {
    if (!name || !cb) return

    RegisterCommand(
      name,
      async (source: number, args: any[]) => {
        const nxPlayer = await PlayerService.getPlayer(source)

        if (nxPlayer) {
          if (!authPermissions.includes(nxPlayer.GetPermissions())) {
            DropPlayer(source as unknown as string, 'dont do that again.')
            logger.warn(
              `[${nxPlayer.GetName()}] tried to execute command [${name}] without having permissions.`
            )
          }

          cb(source, args)
        }
      },
      false
    )
  }
}

const CommandsServices = new _CommandsServices()
export default CommandsServices
