import { config } from '@shared/load.file'
import { LG } from '@utils/logger'
import { getSrc } from '@utils/src'

if (config.discord.logs.logsConfiguration['playerJoin']) {
  on('playerConnecting', (): void => {
    const src = getSrc()

    LG.info(`Connecting player with ID: ${src}`)
  })
}

if (config.discord.logs.logsConfiguration['playerDropped']) {
  on('playerDropped', (): void => {
    const src = getSrc()

    LG.info(`Connecting player with ID: ${src}`)
  })
}
