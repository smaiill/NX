import { config } from '@shared/load.file'
import DiscordService from './discord.service'

if (config.discord.logs.logsConfiguration['playerJoin']) {
  on('playerConnecting', (playerName: string): void => {
    DiscordService.sendWebhook({
      data: {
        embeds: [
          {
            title: 'Player joined.',
            // ? Check this link for colors: https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
            color: 3066993,
            description: `Player \`${playerName}\` has just connected to the server.`,
          },
        ],
      },
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
            // ? Check this link for colors: https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
            color: 15158332,
            description: `Player \`${playerName}\` has just left the server.`,
          },
        ],
      },
    })
  })
}
