import DiscordService from './discord.service'
import { config } from '@shared/load.file'

if (config.discord.logs.logsConfiguration['playerJoin']) {
  on('playerConnecting', (playerName: string): void => {
    DiscordService.sendWebhook({
      data: {
        embeds: [
          {
            title: 'Player joined.',
            color: 3066993,
            description: `Player \`${playerName}\` has just connected to the server.`,
          },
        ],
      },
      options: {
        url: config.discord.logs.webhook
      }
    })
  })
}

if (config.discord.logs.logsConfiguration['playerDropped']) {
  on('playerDropped', (playerName: string): void => {
    DiscordService.sendWebhook({
      data: {
        embeds: [
          {
            title: 'Player dropped.',
            color: 15158332,
            description: `Player \`${playerName}\` has just left the server.`,
          },
        ],
      },
      options: {
        url: config.discord.logs.webhook
      }
    })
  })
}
