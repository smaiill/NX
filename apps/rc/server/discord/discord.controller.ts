import { config } from '@shared/load.file'

if (config.discord.logs.logsConfiguration['playerJoin']) {
  on('playerConnecting', (playerName: string): void => {
    const src = globalThis.source
  })
}

if (config.discord.logs.logsConfiguration['playerDropped']) {
  on('playerDropped', (playerName: string): void => {
    const src = globalThis.source
  })
}
