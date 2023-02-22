import { config } from '@shared/load.file'
import { getSrc } from '@utils/src'

if (config.discord.logs.logsConfiguration['playerJoin']) {
  on('playerConnecting', (playerName: string): void => {
    const src = getSrc()
  })
}

if (config.discord.logs.logsConfiguration['playerDropped']) {
  on('playerDropped', (playerName: string): void => {
    const src = getSrc()
  })
}
